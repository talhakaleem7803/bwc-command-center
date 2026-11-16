# Automations

State as audited on 14 to 15 Nov 2026. n8n project id: `pUWDfaRHbrYTWebj`.

| System id | Name | Runs on | Data | Workflow prefix |
| --- | --- | --- | --- | --- |
| `lileads` | LinkedIn lead generation | Python worker on the owner's PC | `HUB_EVENTS` (source `li-leadgen`), `HUB_COMMANDS` | none |
| `email` | Cold email outreach | n8n | Google Sheet CRM, `OR_CONFIG`, `OR_USAGE`, `OR_UI` | `OR ` |
| `linkedin` | LinkedIn posts | n8n | `LI_CONTENT`, `LI_LOG`, `LI_ASSETS`, `LI_CONFIG` | `BWC LI`, `BWC CE` |
| `x` | X posts | n8n | `X_CONTENT` | `BWC X` |
| `instagram` | Instagram posts | n8n | `IG_CONTENT` | `BWC IG` |
| `bids` | Upwork Bid Desk | n8n, plus Windows and Android apps | `JA_LOG`, `JA_CLAIMS`, `BD_HEALTH`, `BD_BRAIN`, `BD_DEVICES` | `JA ` |
| `seo` | Website SEO | n8n, weekly | `bwc_seo_weekly` | `BWC weekly SEO`, `BWC publish post` |
| `hub` | The hub itself | n8n | `HUB_*` (v1), `HUB2_*` (v2) | `HUB`, `HUB2` |

## LinkedIn lead generation (`lileads`)

- Code: `bwc-linkedin-automation/linkedin-automation/` on the owner's PC. Keys are in
  its `.env` (Anthropic, Apify, Apollo, hub key, Sheet secret); `li/settings.py`
  loads them when the worker starts, so a key change needs a worker restart
  (Windows scheduled task "BWC LinkedIn Worker").
- Three LinkedIn accounts: A (owner), B, C (warm-up).
- Talks to the hub by writing `HUB_EVENTS` rows and polling `HUB_COMMANDS`
  (only command: `fix`, which starts a local Claude session).
- Two rows are used as a key-value store: `lileads:metrics` and `lileads:messages`.
- Known failure modes:
  - Apify or Apollo key rejected (HTTP 401). Fix: new key in `.env`, restart worker.
  - Account paused by the circuit breaker after 2 failed actions. Fix: check the
    account in LinkedIn, then resume.
  - PC off or offline: the worker stops reporting.
  - Crash events are filed per hour (`lileads:crash:<job>:<YYYY-MM-DDTHH>`), so one
    cause makes many v1 alerts. Hub v2 folds them into one.
- The code is not in GitHub yet. It should be.

## Cold email (`email`)

- `OR 1` intake, `OR 2` drafter, `OR 3` sender (the only one that emails leads),
  `OR 4` inbox monitor, `OR 5` reports, `OR 6` dashboard and API, `OR 7` sheet
  writer, `OR 8` error alerts (email plus Activity_Log), `OR 10` qualifier,
  `OR 11` lead finder, `OR 12` deliverability, `OR 13` Jev triage.
- Approvals happen in the OR 6 dashboard.
- Known issues: the v1 app polls the OR 6 dashboard every 60 s (4.8 MB payload,
  11 to 15 s per call); sender health fell to 45/100 on 8 to 10 Nov.

## LinkedIn posts (`linkedin`)

- `BWC CE 1` writes tomorrow's post nightly at 20:00 PKT. `BWC LI 4` publishes
  approved, due posts every 15 min, gated by `LIVE_PUBLISHING` in `LI_CONFIG`.
  `BWC LI 6` dashboard and `BWC LI 3` control panel hold approvals.
- Known failure mode: the LinkedIn login (credential "LinkedIn account") expires
  about every 60 days and cannot refresh itself. The publisher catches its own
  error, so n8n records the run as a success. Fix: reconnect the credential in
  n8n, then re-queue failed posts. Lost so far: `LI-20261106-GAT6L`,
  `LI-20261111-5N0UB`.

## X and Instagram (`x`, `instagram`)

- Written hourly from upcoming LinkedIn posts (`BWC X 1`, `BWC IG 1`), approved by
  email link (`BWC X 2`, `BWC IG 2`), published every 15 min (`BWC X 3`,
  `BWC IG 3`). They stall whenever LinkedIn posts stall.
- Not present in hub v1 or the v1 app.

## Upwork Bid Desk (`bids`)

- `JA 1` reads Upwork job-alert emails from Gmail and scores them; `JA 2` feed and
  claim; `JA 3` shared brain; `JA 4` phone push; `JA 5` Anthropic health check.
- `JA 1` to `JA 4` do not save successful runs, so they look idle in n8n.
- The old `UP` system was archived on 14 Nov 2026.

## Website SEO (`seo`)

- `BWC weekly SEO snapshot` runs Mondays 06:00 PKT. `BWC publish post` creates or
  updates WordPress posts on bwcreations.co; it failed on 2, 9 and 16 Nov at
  "Find existing post".
- Cause (tested 16 Nov): WordPress answers every request from n8n as "not logged
  in", even with a made-up login, so it is not checking the login at all. The
  workflow is correct. Fix on the site, in this order:
  1. WP Admin, Users, Profile, "Application Passwords": make one named "n8n" and
     put it, with the WordPress username, in the n8n credential "Wordpress account".
  2. If one already exists and it still fails, the host is dropping the login
     header. Add the standard `HTTP_AUTHORIZATION` passthrough lines to the top of
     `.htaccess` (above `# BEGIN WordPress`).
  3. If it still fails, turn off Hostinger CDN for the site and test again; if
     that fixes it, ask Hostinger to forward the `Authorization` header.
  4. Test: `wp-json/wp/v2/users/me?context=edit` with the credential must return
     200 with an administrator or editor role.

## Limits that cannot be engineered away

- LinkedIn personal-profile comments and messages have no official API.
- An expired login or a paid key can only be renewed by the owner.
- n8n keeps about 2.5 days of run history.
