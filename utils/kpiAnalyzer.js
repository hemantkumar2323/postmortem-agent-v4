=== utils/kpiAnalyzer.js ===
```javascript
const { AppError } = require('./errorHandling'); // Import custom error

function kpiAnalyzer(perf) {
  const { views, saves, likes, comments, completionRate, rewatchRate } = perf;

  // Input validation: Check for required KPIs and their types
  if (
    typeof views !== 'number' ||
    typeof saves !== 'number' ||
    typeof likes !== 'number' ||
    typeof comments !== 'number' ||
    typeof completionRate !== 'number' ||
    typeof rewatchRate !== 'number'
  ) {
    throw new AppError(400, "Invalid KPI values. All KPIs must be numbers.");
  }

  const score =
    views * 0.2 +
    saves * 0.3 +
    likes * 0.1 +
    comments * 0.1 +
    completionRate * 0.2 +
    rewatchRate * 0.1;
  return { ...perf, compositeScore: Math.round(score) };
}

module.exports = { kpiAnalyzer };
