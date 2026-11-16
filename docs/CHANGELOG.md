# Changelog

Newest first. One entry per change to n8n or the app.

## 16 Nov 2026

- Diagnosed `BWC publish post` (Mondays, fails at "Find existing post"). Cause is on
  the website, not in the workflow: WordPress treats every request from n8n as not
  logged in, so `status=any` is refused. Either the site has no application
  password for n8n, or the host strips the login header before WordPress sees it.
  Workflow left unchanged. Fix steps are in `docs/SYSTEMS.md`.
- Started `HUB2 4 - Outcome Watch` (hourly outcome checks, auto-close, 09:00
  summary).
- The lead-gen worker has not reported since 15 Nov 13:21 PKT, and the restart
  command queued on 15 Nov was never picked up. The PC or the worker task is off.

## 15 Nov 2026

- Created hub v2 tables: `HUB2_ALERTS`, `HUB2_HISTORY`, `HUB2_REGISTRY` (8
  automations seeded), `HUB2_SETTINGS`.
- Created `HUB2 1 - Event Intake`, `HUB2 2 - Notify`, `HUB2 3 - Error Catcher`.
- Queued a worker-restart command in `HUB_COMMANDS` for the Apify key.
- Added `CLAUDE.md` and `docs/` to this repository.

## 14 Nov 2026

- Archived 18 leftover workflows: the test harness, four TALHA drafts, Content
  Creation Automation, and the old Upwork set (UP 0b, 0c, 0d, 0e, 0f, 1, 2, 3, 5,
  7b, 7c, 9).
- Switched off `UP 4b Chaser` and `OR 0 Setup`.
- Full audit written: "BWC Command Center: Audit and Plan".
