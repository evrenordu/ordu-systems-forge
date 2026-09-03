# GA4 Event Schema

Single source of truth: `src/lib/analytics.ts` (`GA_EVENTS`, `CONTACT_FUNNEL_STEPS`).
Never send ad-hoc event names — add them to `GA_EVENTS` and this document first.

## Naming rules

- snake_case, `object_action` order (`hero_cta_click`, not `click_hero_cta`).
- Every event carries `page_path` (added automatically by `trackEvent`).
- Channel-specific variants are `contact_{channel}_click`.
- Parameter names are shared across events: `channel`, `destination`, `hostname`,
  `cta`, `step_name`, `step_number`, `link_type`, `page_path`.

## Events

| Event | When | Parameters |
| --- | --- | --- |
| `page_view` | initial load + every SPA route change | `page_path` |
| `hero_cta_click` | hero primary/secondary CTA | `cta` (`explore_work` \| `start_conversation`), `destination`, `page_path` |
| `scroll_depth` | 25 / 50 / 75 / 100 % of the page, once each | `depth_percent`, `page_path` |
| `element_visibility` | each `<section>` reaching 50 % visibility, once each | `element_id`, `visible_ratio`, `page_path` |
| `contact_funnel_step` | conversion steps toward the closing CTA | `step_name`, `step_number`, `channel?`, `destination?`, `page_path` |
| `contact_click` | any contact channel click (shared roll-up) | `channel`, `destination`, `page_path` |
| `contact_email_click` / `contact_linkedin_click` / `contact_whatsapp_click` | channel-specific click | `channel`, `destination`, `page_path` |
| `outbound_link_click` | every `mailto:`, `tel:` or cross-origin link, site-wide | `destination`, `hostname`, `link_type`, `link_text`, `outbound`, `page_path` |

## Conversion funnel (closing CTA)

| Step | `step_name` | `step_number` | Trigger |
| --- | --- | --- | --- |
| 1 | `contact_section_view` | 1 | `#contact` reaches 40 % visibility |
| 2 | `contact_channel_intent` | 2 | hover or keyboard focus on a `[data-contact-channel]` link |
| 3 | `contact_channel_click` | 3 | the channel link is clicked |

Any contact link must carry `data-contact-channel="email|linkedin|whatsapp"` so
step 2 fires. Step 3 is emitted by `trackContactClick()`.

## Implementation map

- `initAnalytics()` — loads gtag, disables auto page_view, installs the delegated
  outbound-link listener.
- `useEngagementTracking()` — scroll depth, section visibility, funnel steps 1 & 2.
  Mounted on `/`, `/about`, `/bauerp`, `/portfolio`, `/ai-business-operating-system`.
- `trackContactClick()` — funnel step 3 + roll-up + channel event.

## GA4 setup (one-time, in the GA4 UI)

1. **Custom dimensions** (Admin → Custom definitions → Create custom dimension,
   scope *Event*): `channel`, `destination`, `hostname`, `link_type`, `cta`,
   `step_name`, `depth_percent`, `element_id`, `page_path`.
   Without these, the parameters are collected but not reportable.
2. **Key events** (Admin → Events → mark as key event): `contact_click`.
3. **Audiences / segments** (Admin → Audiences → New audience → custom):
   - *Contact intenders* — event `contact_funnel_step` where `step_name` = `contact_channel_intent`.
   - *Email contacts* — event `contact_email_click`.
   - *LinkedIn contacts* — event `contact_linkedin_click`.
   - *WhatsApp contacts* — event `contact_whatsapp_click`.
   - *Deep readers* — event `scroll_depth` where `depth_percent` = `75`.
4. **Report view** (Explore → Funnel exploration), steps in order:
   `page_view` → `element_visibility` (`element_id` = `contact`) →
   `contact_funnel_step` (`step_name` = `contact_channel_intent`) → `contact_click`.
   Add `channel` as breakdown to split email / LinkedIn / WhatsApp.
5. **Outbound report** (Explore → Free form): dimension `hostname` + `link_type`,
   metric *Event count*, filtered to `outbound_link_click`.
