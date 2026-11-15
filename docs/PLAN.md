# Plan

Full audit and reasoning: the document "BWC Command Center: Audit and Plan".
Direction: keep n8n and this app; rebuild the layer between them around one
contract, one alert channel and one screen.

## Decisions (owner, 14 to 15 Nov 2026)

- Alert channel: Pushover on iPhone (Telegram is blocked in Pakistan). Email is the
  interim channel until the Pushover keys are in `HUB2_SETTINGS`.
- The Command Center is for the owner alone.
- Fix with Claude applies repairs on its own; every repair is logged and the
  previous workflow version is kept.
- Claude works autonomously and asks only for things it cannot do: logins, paid
  keys, anything on the owner's PC or phone.

## Phases

| Phase | Scope | Status |
| --- | --- | --- |
| 0 | Stop the bleeding: LinkedIn login, Apify key, Account A, lost posts, blog step, leftovers | Leftovers archived. Waiting on owner: LinkedIn reconnect, worker restart. |
| 1 | Hub contract: event intake, cause-based alerts, history, one error catcher, outcome checks | In progress (hub v2 workflows) |
| 2 | One alert channel: Pushover with action link, critical alerts, morning summary | Built into phase 1 notify; needs Pushover keys |
| 3 | App rebuild: Today screen, a tab per automation from the registry, approvals in place | Not started |
| 4 | Fix ladder, Fix with Claude in the cloud, weekly review, outside watchdog, Instagram comments | Not started |

## Waiting on the owner

1. Reconnect the "LinkedIn account" credential in n8n.
2. Confirm the lead-gen worker restarted with the new Apify token.
3. Install Pushover on the iPhone, create an application named "BWC Command
   Center" at pushover.net, and paste the user key and app token into
   `HUB2_SETTINGS` (n8n, Data tables).
4. Optional: enable "Available in MCP" on HUB 1 to 7 and HUB 8 Error Catcher.
