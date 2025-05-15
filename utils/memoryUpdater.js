=== utils/memoryUpdater.js ===
```javascript
const fs = require('fs');
const path = require('path');
const { logger } = require('./logger'); // Use Winston
const { AppError } = require('./errorHandling');

async function memoryUpdater(niche, analysis) {
  const perfPath = path.join(__dirname, '../data/evolution', 'tone-performance.json');

  try {
    // Simplified: append to tone-performance.json
    let arr = [];
    if (fs.existsSync(perfPath)) {
      try {
        const fileContent = fs.readFileSync(perfPath, 'utf8');
        arr = JSON.parse(fileContent);
      } catch (parseErr) {
        logger.error({ message: "Error parsing tone-performance.json", error: parseErr });
        throw new AppError(500, "Error parsing existing performance data.");
      }
    }
    arr.push({ niche, ...analysis });
    fs.writeFileSync(perfPath, JSON.stringify(arr.slice(-100), null, 2)); //keep last 100 entries
    logger.info({ message: 'Updated memory', niche: niche });
  } catch (err) {
    logger.error({ message: 'Error updating memory', error: err, niche: niche, analysis: analysis });
    throw new AppError(500, "Failed to update memory.");
  }
}

module.exports = { memoryUpdater };
