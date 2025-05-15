=== index.js - POSTMORTEM AGENT ===
```javascript
require('dotenv').config();
const express = require('express');
const app = express();
const { handleError } = require('./utils/errorHandling'); // Centralized error handling
require('express-async-errors');
const { logger } = require('./utils/logger'); // Use Winston for logging

app.use(express.json());

// Routes
app.use('/api/analyze', require('./api/analyze'));
app.use('/api/dispatch', require('./api/dispatchTriggers'));

// Global error handler
app.use(handleError);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`PostMortemAgent listening on port ${PORT}`));
