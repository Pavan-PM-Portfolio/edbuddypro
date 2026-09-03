# edBuddy Pro — legal pages

Eight policy pages, plus the shared components they need to render.

    privacy-policy.html
    terms-of-service.html
    cookie-policy.html
    refund-policy.html
    acceptable-use.html
    accessibility.html
    security.html
    do-not-sell-my-info.html

    components/   nav · footer · bottom-bar   (copies of the live ones)
    js/site.js    injects the components

## Running it

`fetch()` is blocked on `file://`, so serve the folder:

    python3 -m http.server 8000
    # http://localhost:8000/privacy-policy.html

## Before publishing

These are DRAFTS. They have not been reviewed by a lawyer and must be.

Every open decision is marked in the page with a note beginning **Open:**.
Search the files for `lg-note` to find all of them — there are 24.

The three that block publication:

1. **Refund window.** Course pages advertise seven days; that has never
   been confirmed. It is a contractual promise and must match here, on
   every course page, and at checkout.
2. **Do Not Sell My Info.** A Californian right. If edBuddy Pro does not
   meet the CCPA thresholds, linking this page implies a compliance
   programme that does not exist. Remove it or build the process.
3. **Accessibility.** Do not claim WCAG 2.2 AA conformance until an audit
   has been done, and list the known gaps when it has.

Also still to fill in: registered entity name and CIN, the grievance
officer, the sub-processor list, retention periods, and the cookie table.
