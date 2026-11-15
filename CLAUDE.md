# BWC Command Center

One screen for every Broad Wave Creations automation. This repository is also the
system's memory: read `docs/` before changing anything.

## What is where

- `index.html`, `sw.js`, `manifest.json`, `sounds/`: the current app (v1), served by
  GitHub Pages from `main`. A single-file PWA that calls the n8n hub.
- `docs/SYSTEMS.md`: every automation, where it runs, its workflows, tables and
  known failure modes.
- `docs/HUB2.md`: the hub contract (events, heartbeats, commands), its tables and
  workflows. All new work follows this.
- `docs/PLAN.md`: the phased plan and what is done.
- `docs/CHANGELOG.md`: what changed, when and why. Add an entry for every change
  to n8n or the app.

## Rules

- n8n is the engine (`https://n8n.srv1962408.hstgr.cloud`), reached through the n8n
  MCP connector. The app holds no data or secrets.
- Never put keys, tokens, passwords or email addresses in this repository or in
  chat. Secrets live in n8n credentials or in the `HUB2_SETTINGS` table.
- One cause makes one alert. Never build an alert id that contains a date or hour.
- A workflow "ran" is not success. Health is judged by outcomes (a post was
  published, emails were sent), checked by `HUB2 4 - Outcome Watch`.
- Alert levels are `act_now`, `today` and `log`. Only `act_now` reaches the phone.
- Workflows `HUB 1` to `HUB 7` and `HUB 8 - Error Catcher` (hub v1) are not
  readable through MCP unless the owner enables "Available in MCP" on each. Do not
  depend on editing them; build beside them.
- The owner is not a developer. Explain outcomes in plain language, ask only when
  something truly needs him (logins, paid keys, anything on his PC or phone).
