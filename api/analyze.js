=== api/analyze.js ===
```javascript
const express = require('express');
const router = express.Router();
const { kpiAnalyzer } = require('../utils/kpiAnalyzer');
const { memoryUpdater } = require('../utils/memoryUpdater');
const { logJSON, logger } = require('../utils/logger'); // Use Winston
const { AppError } = require('../utils/errorHandling'); //Custom error class

router.post('/', async (req, res) => {
  const performance = req.body; // { niche, views, saves, likes, comments, completionRate, rewatchRate }
  try {
    if (!performance || !performance.niche || !performance.views || !performance.completionRate) {
      throw new AppError(400, "Invalid performance data.  Required fields: niche, views, completionRate"); // improved error
    }
    const analysis = kpiAnalyzer(performance);
    await memoryUpdater(performance.niche, analysis);
    logJSON('performance-report.json', analysis);
    res.json({ success: true, analysis });
  } catch (err) {
    logger.error({ message: 'Error analyzing performance', error: err, performance: performance });
    //  Removed res.status here,  handled by global error handler
    throw err; // Propagate the error
  }
});

module.exports = router;
