=== README.md ===
```markdown
# PostMortemAgent

Processes performance data from CreativeAgent posts, analyzes KPIs, updates memory, and dispatches real-time triggers.

## Endpoints

-   `POST /api/analyze` — submit post metrics and receive analysis
-   `POST /api/dispatch` — send creative triggers based on analysis

## Signals

-   `signals/emotionalSurge.js` — standalone script to detect emotional tone surges

## Memory & Evolution

-   `data/evolution/tone-performance.json` — logs tone vs performance over time
-   `config/kpi-baselines.json` — target performance thresholds per niche
