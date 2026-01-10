# RocketClients Base Snapshot Specification

> **Purpose:** This document specifies everything included in the base GHL snapshot for "Build Your Own CRM" customers. All values use GHL Custom Values for 100% personalization.

---

## Quick Start

After loading this snapshot, customers only need to fill in their **Custom Values** and they'll have a fully functional CRM with:
- Pre-configured calendar with appointment types
- Lead capture form (embeddable anywhere)
- Welcome email automation
- Lead pipeline with stages
- Organized tag structure
- Dashboard with key metrics

---

## Custom Values (Fill in the Blanks)

These are the variables that personalize everything. Set once, used everywhere.

| Custom Value Key | Example | Used In |
|------------------|---------|---------|
| `{{business.name}}` | Acme Marketing | Emails, Forms, Website |
| `{{business.phone}}` | (555) 123-4567 | Emails, SMS, Forms |
| `{{business.email}}` | hello@acme.com | Reply-to, Forms |
| `{{business.website}}` | https://acme.com | Emails, Links |
| `{{business.address}}` | 123 Main St, City, ST 12345 | Emails, Footer |
| `{{business.logo_url}}` | https://... | Emails, Forms |
| `{{owner.name}}` | John Smith | Emails, Signatures |
| `{{owner.title}}` | CEO / Founder | Signatures |
| `{{owner.email}}` | john@acme.com | Direct contact |
| `{{owner.phone}}` | (555) 123-4568 | Direct contact |
| `{{owner.calendar_link}}` | https://... | Booking links |
| `{{social.facebook}}` | https://facebook.com/acme | Emails |
| `{{social.instagram}}` | https://instagram.com/acme | Emails |
| `{{social.linkedin}}` | https://linkedin.com/company/acme | Emails |
| `{{booking.default_duration}}` | 30 | Calendar default |
| `{{booking.timezone}}` | America/New_York | Calendar |

---

## Calendar Configuration

### Calendar: "Main Calendar"
**Settings:**
- Name: `{{business.name}} Appointments`
- Timezone: `{{booking.timezone}}`
- Notification: 24hr + 1hr reminders (email + SMS)

### Appointment Types

#### 1. Discovery Call (Free)
```
Name: Free Discovery Call
Duration: 30 minutes
Description: Let's chat about your goals and see how we can help.
Buffer: 15 minutes after
Availability: Mon-Fri 9am-5pm
Confirmation Email: discovery-call-confirmation
Reminder: 24hr + 1hr before
```

#### 2. Strategy Session
```
Name: Strategy Session
Duration: 60 minutes
Description: Deep dive into your business strategy and create an action plan.
Buffer: 15 minutes before and after
Availability: Mon-Thu 10am-4pm
Confirmation Email: strategy-session-confirmation
Reminder: 24hr + 1hr before
```

#### 3. Quick Check-in
```
Name: Quick Check-in
Duration: 15 minutes
Description: Brief call to answer questions or provide updates.
Buffer: 5 minutes after
Availability: Mon-Fri 9am-5pm
Confirmation Email: quick-checkin-confirmation
```

---

## Pipeline: "Lead Pipeline"

### Stages
| Stage | Probability | Action |
|-------|-------------|--------|
| 1. New Lead | 10% | Auto-assign, send welcome |
| 2. Contacted | 20% | Mark after first contact |
| 3. Qualified | 40% | After discovery call |
| 4. Proposal Sent | 60% | After sending quote |
| 5. Negotiation | 80% | In discussions |
| 6. Won | 100% | Deal closed |
| 7. Lost | 0% | Deal lost (with reason) |

### Automations
- **New Lead → Stage 1:** Auto-create opportunity
- **Stage change:** Notify team via Slack/Email
- **Won:** Trigger onboarding workflow
- **Lost:** Trigger follow-up in 90 days

---

## Tag Structure

### Lead Source Tags
```
source:website
source:referral
source:social
source:paid-ads
source:cold-outreach
source:event
source:rocket-form
```

### Lead Status Tags
```
status:new
status:hot
status:warm
status:cold
status:nurture
status:do-not-contact
```

### Interest Tags
```
interest:service-a
interest:service-b
interest:service-c
```

### Form Tags (Auto-applied)
```
form:contact
form:quote
form:newsletter
form:consultation
form:download
```

### UTM Tags (Auto-captured)
```
utm_source:{value}
utm_medium:{value}
utm_campaign:{value}
```

---

## Custom Fields

### Contact Fields
| Field Name | Type | Options |
|------------|------|---------|
| Lead Score | Number | 0-100 |
| Lead Source | Dropdown | Website, Referral, Social, Paid, Event, Other |
| Industry | Dropdown | (customize per business) |
| Company Size | Dropdown | 1-10, 11-50, 51-200, 200+ |
| Budget Range | Dropdown | <$1k, $1k-$5k, $5k-$10k, $10k+ |
| How Did You Hear | Text | - |
| Notes | Text Area | - |
| First Touch Date | Date | Auto-set |
| Last Activity Date | Date | Auto-update |

---

## Email Templates

### 1. Welcome Email
**Trigger:** New contact created with tag `rocket-form`
**Subject:** `Welcome to {{business.name}}!`

```html
Hi {{contact.first_name}},

Thank you for reaching out to {{business.name}}!

We received your information and a member of our team will be in touch within 24 hours.

In the meantime, feel free to:
- Book a call directly: {{owner.calendar_link}}
- Visit our website: {{business.website}}
- Reply to this email with any questions

Looking forward to connecting!

Best,
{{owner.name}}
{{owner.title}}
{{business.name}}

{{business.phone}}
{{business.email}}
```

### 2. Discovery Call Confirmation
**Trigger:** Appointment booked (Discovery Call)
**Subject:** `Your Discovery Call is Confirmed!`

```html
Hi {{contact.first_name}},

Great news! Your Discovery Call with {{business.name}} is confirmed.

📅 Date: {{appointment.date}}
⏰ Time: {{appointment.time}} ({{booking.timezone}})
📍 Location: {{appointment.location}}

What to Expect:
- We'll learn about your goals
- Discuss how we can help
- Answer any questions you have

To reschedule or cancel, click here: {{appointment.reschedule_link}}

See you soon!

{{owner.name}}
{{business.name}}
```

### 3. 24-Hour Reminder
**Trigger:** 24 hours before appointment
**Subject:** `Reminder: Your call with {{business.name}} is tomorrow!`

```html
Hi {{contact.first_name}},

Just a friendly reminder that we're meeting tomorrow!

📅 {{appointment.date}} at {{appointment.time}}

If you need to reschedule: {{appointment.reschedule_link}}

See you then!
{{owner.name}}
```

### 4. 1-Hour Reminder (SMS)
**Trigger:** 1 hour before appointment
**Channel:** SMS

```
Hi {{contact.first_name}}! Reminder: Your call with {{business.name}} starts in 1 hour. Join here: {{appointment.location}}
```

### 5. No-Show Follow-up
**Trigger:** Appointment marked as no-show
**Subject:** `We missed you!`

```html
Hi {{contact.first_name}},

We noticed you weren't able to make your appointment today. No worries — we know things come up!

Would you like to reschedule? Pick a new time here:
{{owner.calendar_link}}

If you're no longer interested, just let us know and we'll update our records.

Best,
{{owner.name}}
{{business.name}}
```

### 6. Follow-up After Call
**Trigger:** Appointment completed
**Subject:** `Great chatting with you, {{contact.first_name}}!`

```html
Hi {{contact.first_name}},

Thank you for taking the time to speak with us today!

As discussed, here are the next steps:
1. [Action item 1]
2. [Action item 2]
3. [Action item 3]

If you have any questions, just reply to this email.

Talk soon!

{{owner.name}}
{{owner.title}}
{{business.name}}
```

---

## Workflows

### 1. New Lead Welcome Sequence
**Trigger:** Contact created with tag `rocket-form`

```
[Immediately]
├── Send Email: Welcome Email
├── Add Tag: status:new
├── Create Opportunity (Pipeline: Lead Pipeline, Stage: New Lead)
├── Internal Notification: "New lead: {{contact.name}}"

[Wait 24 hours]
├── If: No appointment booked
│   └── Send Email: "Still interested? Book a call"

[Wait 3 days]
├── If: Still no appointment
│   └── Send SMS: Quick follow-up

[Wait 7 days]
├── If: No response
│   └── Add Tag: status:nurture
│   └── Remove from workflow
```

### 2. Appointment Reminder Sequence
**Trigger:** Appointment booked

```
[Immediately]
├── Send Email: Confirmation

[24 hours before]
├── Send Email: 24-hour reminder

[1 hour before]
├── Send SMS: 1-hour reminder

[After appointment time]
├── Wait 30 minutes
├── If: Appointment status = completed
│   └── Send Email: Follow-up after call
├── If: Appointment status = no-show
│   └── Send Email: No-show follow-up
```

### 3. Quote Follow-up Sequence
**Trigger:** Pipeline stage changed to "Proposal Sent"

```
[Wait 2 days]
├── Send Email: "Any questions about the proposal?"

[Wait 5 days]
├── If: Stage still "Proposal Sent"
│   └── Send Email: "Following up on your proposal"
│   └── Task: Call contact

[Wait 10 days]
├── If: No response
│   └── Move to "Lost" stage
│   └── Add Tag: lost:no-response
```

### 4. Re-engagement Sequence
**Trigger:** Tag added: `status:nurture`

```
[Weekly for 4 weeks]
├── Send Email: Value content (rotate templates)

[After 4 weeks]
├── Send Email: "Are you still interested?"
├── If: Opens email
│   └── Add Tag: status:warm
│   └── Notify team
├── Else
│   └── Add Tag: status:cold
```

---

## Forms

### 1. Contact Form (Embeddable)
**Code to paste anywhere:**

```html
<div id="rocket-form"
     data-form-id="contact"
     data-business-name="{{business.name}}"
     data-heading="Contact Us"
     data-subheading="We'd love to hear from you."
     data-button-text="Send Message"
     data-success-message="Thanks! We'll be in touch within 24 hours."
     data-show-phone="true"
     data-show-message="true"
     data-theme="light">
</div>
<script src="https://rocketclients.com/embed/rocket-form.js"></script>
```

### 2. Quote Request Form
```html
<div id="rocket-form"
     data-form-id="quote"
     data-business-name="{{business.name}}"
     data-heading="Get Your Free Quote"
     data-button-text="Request Quote"
     data-show-phone="true"
     data-phone-required="true"
     data-show-message="true"
     data-theme="rocket">
</div>
<script src="https://rocketclients.com/embed/rocket-form.js"></script>
```

### 3. Newsletter Signup
```html
<div id="rocket-form"
     data-form-id="newsletter"
     data-heading="Join Our Newsletter"
     data-subheading="Get weekly tips delivered to your inbox."
     data-button-text="Subscribe"
     data-show-name="false"
     data-show-phone="false"
     data-theme="dark">
</div>
<script src="https://rocketclients.com/embed/rocket-form.js"></script>
```

### 4. Free Consultation Booking
```html
<div id="rocket-form"
     data-form-id="consultation"
     data-business-name="{{business.name}}"
     data-heading="Book Your Free Consultation"
     data-button-text="Book Now"
     data-success-message="Thanks {{first_name}}! Check your email for booking confirmation."
     data-workflow-id="CONSULTATION_WORKFLOW_ID"
     data-show-phone="true"
     data-phone-required="true"
     data-theme="rocket">
</div>
<script src="https://rocketclients.com/embed/rocket-form.js"></script>
```

---

## Dashboard Widgets

### Row 1: Overview
| Widget | Type | Data |
|--------|------|------|
| Total Leads (30d) | Number | Contacts created this month |
| Appointments (7d) | Number | Upcoming appointments |
| Conversion Rate | Percentage | Won / Total opportunities |
| Revenue (MTD) | Currency | Won opportunity values |

### Row 2: Pipeline
| Widget | Type | Data |
|--------|------|------|
| Pipeline Overview | Funnel | Leads by stage |
| Leads by Source | Pie Chart | Tag breakdown |

### Row 3: Activity
| Widget | Type | Data |
|--------|------|------|
| Recent Leads | List | Last 10 contacts |
| Upcoming Appointments | List | Next 5 appointments |
| Tasks Due | List | Overdue + Today |

---

## Snapshot Checklist

Before creating the snapshot, verify:

- [ ] All Custom Values are set to placeholder text (not actual values)
- [ ] Calendar is configured with appointment types
- [ ] Pipeline stages are created
- [ ] Tags are created with proper structure
- [ ] Custom fields are added to contacts
- [ ] Email templates use Custom Value variables
- [ ] Workflows are active and tested
- [ ] Forms are connected to workflows
- [ ] Dashboard widgets are configured
- [ ] Test submission creates contact correctly
- [ ] Test booking sends confirmations

---

## Feature-Specific Snapshots (Add-ons)

These are loaded in ADDITION to the base snapshot when customers purchase specific features.

### snapshot-funnels
- 3 landing page templates (lead gen, webinar, thank you)
- Funnel for lead magnet delivery
- Exit popup template

### snapshot-email-marketing
- 10 email templates (promotional, educational, transactional)
- Newsletter workflow
- Broadcast templates
- Re-engagement sequence

### snapshot-sms-marketing
- SMS templates (appointment, follow-up, promotional)
- Two-way chat setup
- Opt-in workflow
- SMS-specific compliance settings

### snapshot-workflows
- 15 pre-built workflow templates
- Lead scoring automation
- Internal notifications
- Multi-channel sequences

### snapshot-pipeline
- Sales pipeline with 7 stages
- Opportunity automation
- Revenue tracking
- Lost reason capture

### snapshot-ecommerce
- Product templates
- Order confirmations
- Abandoned cart workflow
- Review request sequence

---

## Implementation Notes

1. **Snapshot Order:** Always apply base snapshot first, then feature snapshots
2. **Custom Values:** Must be set before workflows will function properly
3. **Form Widget:** Replace `WORKFLOW_ID` placeholders with actual IDs after import
4. **Testing:** Send test submissions before going live
5. **Timezone:** Ensure `{{booking.timezone}}` is set correctly for appointments

---

*Last Updated: January 2026*
*RocketClients - Build Your Own CRM*
