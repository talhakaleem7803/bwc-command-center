# Changelog

Newest first. One entry per change to n8n or the app.

## 16 Nov 2026

- Diagnosed `BWC publish post` (Mondays, fails at "Find existing post"). Cause is on
  the website, not in the workflow: WordPress treats every request from n8n as not
  logged in, so `status=any` is refused. Either the site has no application
  password for n8n, or the host strips the login header before WordPress sees it.
  Workflow left unchanged. Fix steps are in `docs/SYSTEMS.md`.
- Built and switched on `HUB2 4 - Outcome Watch` (`Hgiqv1jFjb02JhHp`): hourly
  outcome checks for LinkedIn, X, Instagram, Bid Desk, SEO, lead generation and
  stuck commands; closes alerts when the condition clears; resends held
  `act_now` notices after quiet hours; sends the 09:00 summary. First run raised
  8 alerts (3 `act_now`, sent by email). No cold-email check yet: sends and
  sender health are not in any data table.
- Error handling repointed to `HUB2 3 - Error Catcher` on 26 active workflows
  (BWC CE 1, IG 1 to 4, LI 1 to 6, X 1 to 3, publish post, weekly SEO, Asset
  Upload, JA 1 to 5, OR 11 to 13, HUB 8 Chat Inbox). Settings change only; no
  workflow version changed.
- `OR 8 - Error Alerts`: added one node, "Raise Hub2 Alert", so cold-email
  failures also reach the hub (system `email`). Its own email is unchanged.
  Previous version for rollback: `d89593b9-a41a-45fb-841b-7e73f5dacea4`.
- Left alone: `OR 0x` (unpublished draft differs; still on the old catcher),
  `OR 1` to `7` and `OR 10` (on OR 8), all hub v1 workflows.
- Not yet run live: quiet-hours hold, Pushover send (keys blank), the catcher's
  fallback when Intake itself fails.
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
