# Changelog

Newest first. One entry per change to n8n or the app.

## 16 Nov 2026

- Publishers `BWC LI 4`, `BWC X 3`, `BWC IG 3`: "Handle Failure" now treats login
  errors (token expired, reconnect, invalid_token, revoked, 401) as outside
  failures, so the post waits instead of using up its attempts. Rollback
  versions: LI 4 `f95a94e6-732b-4d5b-9518-5e269a4a3f8b`, X 3
  `55fb57c9-89da-4cdb-b35a-436758bc5240`, IG 3
  `71d1abde-bbf9-4c1e-ab72-fcd2aae40f3e`. Not yet proven on a real expired login.
- Owner dropped posts `LI-20261106-GAT6L` and `LI-20261111-5N0UB` and their X
  copies: `approval_status` set to `Rejected` (LinkedIn rows also `Unscheduled`).
- `HUB2 4 - Outcome Watch`: new alert `linkedin:login_expiring` (`today` at 50
  days, `act_now` at 56) from setting `LINKEDIN_LOGIN_RENEWED` (2026-11-16;
  update it after every reconnect). Rejected posts no longer count as failed.
  Rollback version `4c1b4972-dac3-4a5a-8a2b-4165143fc4bf`.

- Owner completed four fixes, each tested live at about 23:20 PKT: lead-gen
  worker restarted (reporting, new Apify key accepted, 35 leads found);
  "LinkedIn account" reconnected (token accepted; posting proven only when the
  17 Nov 10:00 PKT post goes out); "Wordpress account" now logs in as
  administrator and `status=any` works; Pushover keys set and a test alert was
  accepted by Pushover.
- Known gap in `BWC LI 4 - Publisher`: its "Handle Failure" step does not
  recognise "OAuth access token expired" as an outside failure, so an expired
  login burns all 3 attempts and parks the post as Failed. Not changed yet.

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
- Built `HUB2 5 - App API` (`mHt4NEFN13eVbRKB`): `POST /webhook/hub2-api` with
  `{op, k}`; ops `today`, `system`, `history`, `close`, `ping`. Uses the same hub
  key as v1 (`HUB_CONFIG`, `HUB_KEY`). Answers in under 0.2 s.
- Added `v2.html`, the new app screen: Today (Act now, Today, automations), a tab
  per automation from the registry, History. Each alert has its fix steps, "Open
  the fix", "Fix with Claude" and "Mark done". `index.html` (v1) is unchanged.
  Open `v2.html?demo` to see it without a key.
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
