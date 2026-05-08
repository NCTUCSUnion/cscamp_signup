#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define paths (relative to repo)
SOURCE_DIR="$SCRIPT_DIR/網站自我介紹"
IMAGES_DIR="$SCRIPT_DIR/public/images/members"
CONTENT_DIR="$SCRIPT_DIR/public/contents/members"
JSON_FILE="$SCRIPT_DIR/src/data/camp-info.json"

if ! command -v jq >/dev/null 2>&1; then
  echo "Error: jq is required but not found. Install it first (e.g. 'brew install jq')." >&2
  exit 1
fi

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: SOURCE_DIR not found: $SOURCE_DIR" >&2
  exit 1
fi

if [ ! -f "$JSON_FILE" ]; then
  echo "Error: camp-info.json not found: $JSON_FILE" >&2
  exit 1
fi

# Create destination directories if they don't exist
mkdir -p "$IMAGES_DIR" "$CONTENT_DIR"

update_team_members_in_json() {
  local team_name="$1"
  local members_json="$2"

  # Safety backup (only once per run)
  if [ ! -f "$JSON_FILE.bak" ]; then
    cp "$JSON_FILE" "$JSON_FILE.bak"
  fi

  local tmp_file
  tmp_file="$(mktemp)"

  jq --arg teamName "$team_name" --argjson members "$members_json" '
    if (.teams | map(.name) | index($teamName)) == null then
      .
    else
      (.teams[] | select(.name == $teamName) | .members) = $members
    end
  ' "$JSON_FILE" > "$tmp_file"

  mv "$tmp_file" "$JSON_FILE"
}

# Process each team folder (folder name must match teams[].name in camp-info.json)
for team_folder in "$SOURCE_DIR"/*; do
  [ -d "$team_folder" ] || continue

  team_name="$(basename "$team_folder")"
  echo "Processing team: $team_name"

  # Build members array for this team
  members_json='[]'
  any_skipped=0

  for member_folder in "$team_folder"/*; do
    [ -d "$member_folder" ] || continue

    member_name="$(basename "$member_folder")"
    echo "  Processing member: $member_name"

    # Find and copy image file
    image_file=""
    for ext in jpg jpeg png JPG JPEG PNG; do
      if [ -f "$member_folder/$member_name.$ext" ]; then
        image_file="$member_folder/$member_name.$ext"
        break
      fi
    done

    # If no image file with member name, look for any image file
    if [ -z "$image_file" ]; then
      for img_file in "$member_folder"/*; do
        if [[ "$img_file" =~ \.(jpg|jpeg|png|JPG|JPEG|PNG)$ ]]; then
          image_file="$img_file"
          break
        fi
      done
    fi

    photo_path=""
    if [ -n "$image_file" ]; then
      src_ext="${image_file##*.}"
      target_ext="$(echo "$src_ext" | tr '[:upper:]' '[:lower:]')"
      cp "$image_file" "$IMAGES_DIR/$member_name.$target_ext"
      photo_path="/images/members/$member_name.$target_ext"
      echo "    Copied image -> $photo_path"
    else
      echo "    No image file found (skip JSON entry)"
      any_skipped=1
    fi

    # Find and copy intro text file
    intro_file=""
    if [ -f "$member_folder/$member_name.txt" ]; then
      intro_file="$member_folder/$member_name.txt"
    elif [ -f "$member_folder/$member_name.txt.docx" ]; then
      echo "    Found DOCX file for $member_name - manual conversion needed"
      intro_file=""
    fi

    # Check for any .docx or .txt file as fallback
    if [ -z "$intro_file" ]; then
      for txt_file in "$member_folder"/*; do
        if [[ "$txt_file" =~ \.(txt|docx)$ ]]; then
          if [[ "$txt_file" =~ \.docx$ ]]; then
            echo "    Found DOCX file: $txt_file - manual conversion needed"
          else
            intro_file="$txt_file"
            echo "    Found alternative text file: $intro_file"
          fi
          break
        fi
      done
    fi

    intro_path=""
    if [ -n "$intro_file" ]; then
      cp "$intro_file" "$CONTENT_DIR/$member_name.txt"
      intro_path="/contents/members/$member_name.txt"
      echo "    Copied intro -> $intro_path"
    else
      echo "    No intro text file found (skip JSON entry)"
      any_skipped=1
    fi

    # Only add to JSON when both photo + intro exist
    if [ -n "$photo_path" ] && [ -n "$intro_path" ]; then
      members_json="$(jq --arg name "$member_name" \
                         --arg position "組員" \
                         --arg photo "$photo_path" \
                         --arg introFile "$intro_path" \
                         '. + [{name:$name, position:$position, photo:$photo, introFile:$introFile}]' \
                         <<<"$members_json")"
    fi
  done

  # Update JSON for this team (only if team exists in camp-info.json)
  if jq -e --arg teamName "$team_name" '(.teams | map(.name) | index($teamName)) != null' "$JSON_FILE" >/dev/null; then
    update_team_members_in_json "$team_name" "$members_json"
    echo "  Updated camp-info.json team members for: $team_name (count=$(jq 'length' <<<"$members_json"))"
  else
    echo "  Warning: team '$team_name' not found in camp-info.json (skipped JSON update)" >&2
  fi

  if [ "$any_skipped" -eq 1 ]; then
    echo "  Note: some members were skipped because image or intro was missing."
  fi
done

echo "Finished organizing member files!"
echo "Updated: $JSON_FILE"
echo "Backup:  $JSON_FILE.bak"