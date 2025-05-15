=== signals/emotionalSurge.js ===
```javascript
const fs = require('fs');
const path = require('path');
const { logger } = require('../utils/logger'); // Use Winston
const { AppError } = require('../utils/errorHandling');

const performancePath = path.join(__dirname, '../data/logs');
const surgeOutputPath = path.join(__dirname, '../data/summary/emotionalSurge.json'); // Corrected variable name

function detectEmotionalSurge() {
  try {
    const files = fs.readdirSync(performancePath);
    const surge = [];
    for (const file of files) { //changed to const
      const filePath = path.join(performancePath, file);
      try{
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (data.tone === 'nostalgic & emotional' && data.views > 100000) {
          surge.push({ niche: data.niche, timestamp: data.timestamp });
        }
      } catch(parseErr){
        logger.error({message: "Error parsing file", error: parseErr, file: filePath});
        continue; // process next file
      }
    }
    fs.writeFileSync(surgeOutputPath, JSON.stringify(surge, null, 2));
    logger.info({ message: 'Detected emotional surges', count: surge.length });
  } catch (err) {
    const error = new AppError(500, `Error detecting emotional surges: ${err.message}`);
    logger.error({ message: 'Error in detectEmotionalSurge', error: error });
    throw error; //handle in  index.js
  }
}

// Run standalone if invoked
if (require.main === module) {
  try{
    detectEmotionalSurge();
  } catch(e){
    console.error("Error in main", e); //won't be caught by express
  }
}
module.exports = { detectEmotionalSurge };
