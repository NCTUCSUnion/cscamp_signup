#!/bin/bash

# Define paths
SOURCE_DIR="/Users/jayinnn/cscamp_signup/網站自我介紹"
IMAGES_DIR="/Users/jayinnn/cscamp_signup/public/images/members"
CONTENT_DIR="/Users/jayinnn/cscamp_signup/public/contents/members"

# Create destination directories if they don't exist
mkdir -p "$IMAGES_DIR"
mkdir -p "$CONTENT_DIR"

# Process each team folder
for team_folder in "$SOURCE_DIR"/*; do
  if [ -d "$team_folder" ]; then
    team_name=$(basename "$team_folder")
    
    # Determine team_id based on folder name
    team_id=""
    case "$team_name" in
      "場器組") team_id="facilities" ;;
      "政動組") team_id="admin" ;;
      "活動組") team_id="event" ;;
      "生活組") team_id="life" ;;
      "美宣組") team_id="design" ;;
      "進修組") team_id="study" ;;
      *) team_id="" ;;
    esac
    
    echo "Processing team: $team_name ($team_id)"
    
    # Process each member folder
    for member_folder in "$team_folder"/*; do
      if [ -d "$member_folder" ]; then
        member_name=$(basename "$member_folder")
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
          # Look for any image file
          for img_file in "$member_folder"/*; do
            if [[ "$img_file" =~ \.(jpg|jpeg|png|JPG|JPEG|PNG)$ ]]; then
              image_file="$img_file"
              break
            fi
          done
        fi
        
        # Copy image file if found
        if [ -n "$image_file" ]; then
          # Determine target extension
          src_ext="${image_file##*.}"
          target_ext=$(echo "$src_ext" | tr '[:upper:]' '[:lower:]')
          
          # Copy and rename
          cp "$image_file" "$IMAGES_DIR/$member_name.$target_ext"
          echo "    Copied image: $image_file -> $IMAGES_DIR/$member_name.$target_ext"
          
          # Update the JSON file to use this extension
          if [ ! -z "$team_id" ]; then
            # This is a placeholder for JSON update - we'll update manually after seeing the file paths
            echo "    Remember to update JSON for this member to use photo: /images/members/$member_name.$target_ext"
          fi
        else
          echo "    No image file found for $member_name"
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
              # For docx, we can't convert automatically
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
        
        # Copy intro file if found
        if [ -n "$intro_file" ]; then
          cp "$intro_file" "$CONTENT_DIR/$member_name.txt"
          echo "    Copied intro: $intro_file -> $CONTENT_DIR/$member_name.txt"
          
          # Update the JSON file
          if [ ! -z "$team_id" ]; then
            echo "    Remember to update JSON for this member to use introFile: /contents/members/$member_name.txt"
          fi
        else
          echo "    No intro text file found for $member_name"
        fi
      fi
    done
  fi
done

echo "Finished organizing member files!"
echo "Don't forget to update camp-info.json with the correct file paths." 