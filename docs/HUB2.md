# Hub v2 contract

Hub v2 runs beside hub v1 (`HUB 1` to `HUB 8`). New work uses v2 only.

## The idea

Every automation reports through one door. One root cause makes one alert, with a
counter. Health is judged by outcomes. Only `act_now` reaches the phone.

## Alerts

- Alert id: `<system>:<cause>`. The cause names the root cause (for example
  `login_expired`, `key_rejected:apify`, `wf:<workflow id>:<step>`). It never
  contains a date or an hour.
- Levels: `act_now` (red, phone), `today` (amber, app and morning summary), `log`
  (grey, history only).
- Kinds in use: `error`, `needs_you` (only the owner can fix it), `outcome`.
- A repeat of an open alert raises its counter; it does not make a new alert.
- Error alerts start at `today` and become `act_now` after 3 occurrences.
- Closing: by the outcome watch when the condition clears, by the error-alert rule
  (no repeat in 48 h), or by the owner in the app.

## Workflows

| Workflow | Id | Role |
| --- | --- | --- |
| `HUB2 1 - Event Intake` | `jbGSi2YTtNvXdQsR` | Sub-workflow. The single door: raise, close, log. Writes `HUB2_ALERTS` and `HUB2_HISTORY`; sends `act_now` through Notify. |
| `HUB2 2 - Notify` | `ZwX1v6qAR7OJKl4h` | Sub-workflow. Pushover when the keys are set, otherwise Gmail. Holds notices during quiet hours unless forced. Also sends the morning summary. |
| `HUB2 3 - Error Catcher` | `LWxeg4ePQOkkWMwy` | Error workflow. Maps the failed workflow to a system by the registry prefixes and raises `wf:<id>:<step>`. |
| `HUB2 4 - Outcome Watch` | `Hgiqv1jFjb02JhHp` | Hourly. Checks what each automation produced, raises and closes alerts, sends the 09:00 summary. |
| `HUB2 5 - App API` | `mHt4NEFN13eVbRKB` | Webhook `hub2-api` for the app: `today`, `system`, `history`, `close`, `ping`. Key checked against `HUB_CONFIG` `HUB_KEY`. |

### Intake inputs

`system`, `cause`, `level`, `kind`, `title`, `detail`, `fix_hint`, `link`,
`actions`, `source`, `execution_url`, `op` (`raise` or `close`), `escalate_after`,
`resolution`, `closed_by`.

Returns `alert_id`, `status`, `level`, `count`, `notified`, `was_new`.

### Notify inputs

`alert_id`, `system`, `level`, `title`, `detail`, `fix_hint`, `link`, `count`,
`mode` (`alert` or `summary`), `summary_text`, `force`.

## Tables

| Table | Id | Holds |
| --- | --- | --- |
| `HUB2_ALERTS` | `0EMrTFdpOJq0deoJ` | One row per root cause: level, status, count, first and last seen, notified at, fix hint, resolution. |
| `HUB2_HISTORY` | `11iyf8Nuh3A2n6aj` | Every raise, repeat, close and notice. |
| `HUB2_REGISTRY` | `kznUg69KUWy4ywrt` | One row per automation: id, name, tab order, workflow-name prefixes. Adding an automation means adding a row. |
| `HUB2_SETTINGS` | `jEtkXcDl9mRqAsG5` | Pushover keys, fallback email, quiet hours, re-notify hours, app URL, summary hour. Secret values live here, never in this repository. |

## Settings

`PUSHOVER_USER_KEY`, `PUSHOVER_APP_TOKEN`, `FALLBACK_EMAIL`, `QUIET_START`
(23:00), `QUIET_END` (08:00), `RENOTIFY_HOURS` (24), `APP_URL`, `N8N_URL`,
`SUMMARY_HOUR` (9). Times are Asia/Karachi.

## Adding a new automation

1. Add a row to `HUB2_REGISTRY` with its id, name and workflow-name prefixes.
2. Set its workflows' error workflow to `HUB2 3 - Error Catcher`.
3. Add an outcome check to `HUB2 4 - Outcome Watch`: what should it have
   produced, and by when?
4. For anything running outside n8n, call Intake through a webhook (to be added
   with the app rebuild) instead of writing rows directly.
