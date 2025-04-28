import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const SOURCE_DIR = path.join(__dirname, '網站自我介紹');
const CAMP_INFO_PATH = path.join(__dirname, 'src/data/camp-info.json');

// Team mapping (folder name to team ID)
const teamMapping = {
  '場器組': 'facilities',
  '政動組': 'admin',
  '活動組': 'event',
  '生活組': 'life',
  '美宣組': 'design',
  '進修組': 'study'
};

// Position mapping (will assign default positions)
const defaultPosition = '組員';
const teamLeaders = {
  'facilities': ['吳宇藤'], // Add the team leaders here 
  'admin': ['戚維凌'],
  'event': ['李馨亞'],
  'life': ['王皓平'],
  'design': ['李泓劭'],
  'study': ['周廷威']
};

async function main() {
  try {
    // Check if source directory exists
    if (!fs.existsSync(SOURCE_DIR)) {
      console.error(`Source directory does not exist: ${SOURCE_DIR}`);
      return;
    }

    // Read the JSON file
    let campInfoRaw = fs.readFileSync(CAMP_INFO_PATH, 'utf8');
    let campInfo = JSON.parse(campInfoRaw);
    
    // Process each team folder
    const teamFolders = fs.readdirSync(SOURCE_DIR);
    
    for (const teamFolder of teamFolders) {
      const teamPath = path.join(SOURCE_DIR, teamFolder);
      if (!fs.statSync(teamPath).isDirectory()) continue;
      
      const teamId = teamMapping[teamFolder];
      if (!teamId) {
        console.warn(`Warning: No mapping found for team ${teamFolder}`);
        continue;
      }
      
      console.log(`Processing team: ${teamFolder} (${teamId})`);
      
      // Find the team in the JSON
      const team = campInfo.teams.find(t => t.id === teamId);
      if (!team) {
        console.warn(`Warning: Team ${teamId} not found in the camp-info.json file`);
        continue;
      }
      
      // Clear existing members array or create it if it doesn't exist
      team.members = [];
      
      // Process each member folder
      let memberFolders;
      try {
        memberFolders = fs.readdirSync(teamPath);
      } catch (err) {
        console.error(`Error reading team directory ${teamPath}: ${err.message}`);
        continue;
      }
      
      for (const memberFolder of memberFolders) {
        const memberPath = path.join(teamPath, memberFolder);
        if (!fs.statSync(memberPath).isDirectory()) continue;
        
        console.log(`  Processing member: ${memberFolder}`);
        
        // Determine the position
        let position = defaultPosition;
        if (teamLeaders[teamId] && teamLeaders[teamId].includes(memberFolder)) {
          position = '組長';
        }
        
        // Find image file
        let photoFileName = null;
        const extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];
        
        // First try to find images with the member's name
        for (const ext of extensions) {
          const imagePath = path.join(memberPath, `${memberFolder}.${ext}`);
          if (fs.existsSync(imagePath)) {
            photoFileName = `${memberFolder}.${ext.toLowerCase()}`;
            break;
          }
        }
        
        // If not found, look for any image
        if (!photoFileName) {
          try {
            const files = fs.readdirSync(memberPath);
            for (const file of files) {
              const ext = path.extname(file).toLowerCase();
              if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                // For non-matching filenames, we still use the member's name for consistency
                const targetExt = ext.substring(1); // remove the dot
                photoFileName = `${memberFolder}.${targetExt}`;
                break;
              }
            }
          } catch (err) {
            console.error(`Error reading member directory ${memberPath}: ${err.message}`);
          }
        }
        
        // Determine intro file - check both normal .txt and .txt.docx variations
        let introFileExists = false;
        const txtPath = path.join(memberPath, `${memberFolder}.txt`);
        const docxPath = path.join(memberPath, `${memberFolder}.txt.docx`);
        const docxPath2 = path.join(memberPath, `${memberFolder}.docx`);
        
        if (fs.existsSync(txtPath)) {
          introFileExists = true;
        } else if (fs.existsSync(docxPath) || fs.existsSync(docxPath2)) {
          console.log(`    Note: Found DOCX for ${memberFolder}, but using txt path for future compatibility`);
          introFileExists = true; // We'll still point to the .txt file that should be created
        } else {
          // Look for any .txt file
          try {
            const files = fs.readdirSync(memberPath);
            for (const file of files) {
              if (file.toLowerCase().endsWith('.txt')) {
                introFileExists = true;
                break;
              }
            }
          } catch (err) {
            console.error(`Error checking for text files in ${memberPath}: ${err.message}`);
          }
        }
        
        // Create member object
        const member = {
          name: memberFolder,
          position: position,
          photo: photoFileName ? `/images/members/${photoFileName}` : null,
          introFile: introFileExists ? `/contents/members/${memberFolder}.txt` : null
        };
        
        // Add member to team
        team.members.push(member);
      }
    }
    
    // Write the updated JSON back to the file
    fs.writeFileSync(CAMP_INFO_PATH, JSON.stringify(campInfo, null, 2), 'utf8');
    console.log(`Updated ${CAMP_INFO_PATH} with member data`);
  } catch (err) {
    console.error(`Error in main process: ${err.message}`);
    console.error(err.stack);
  }
}

// Run the main function
main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
}); 