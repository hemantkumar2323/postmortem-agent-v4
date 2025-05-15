=== utils/triggerMapBuilder.js ===
```javascript
const { AppError } = require('./errorHandling');
const { logger } = require('./logger');

function triggerMapBuilder(insights) {
  // Build trigger list: e.g., tone or format shifts
  const triggers = [];

  if (!insights) {
    throw new AppError(400, "Insights object is required");
  }

  if (typeof insights.compositeScore !== 'number') {
    logger.warn("compositeScore is not a number, skipping trigger check", insights);
    return []; // important: return empty array, don't throw.
  }
  if (insights.compositeScore > 80) {
    triggers.push({ type: 'BOOST', niche: insights.niche, param: 'tone' });
  }
  return triggers;
}

module.exports = { triggerMapBuilder };
