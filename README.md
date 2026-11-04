# Le Marble Gallery – Enquiry Form

A guided, mobile-friendly enquiry form for Le Marble Gallery. Customers answer 8 quick questions, one at a time, in English or Malayalam. On submit, every answer is sent to a Make (make.com) webhook. Opening a pre-filled WhatsApp chat is optional.

It's a plain static site (HTML/CSS/JS, no build step) and runs on GitHub Pages for free.

## Questions

| Step | Question | Response type |
|---|---|---|
| 1 | Name | Free text |
| 2 | Preferred language | Single choice (switches the form to Malayalam) |
| 3 | What are you looking for? | Multi-select |
| 4 | Application area | Single choice |
| 5 | Approximate area (sq. ft.) | Single choice |
| 6 | Colour preference | Single choice |
| 7 | Contact number | Free text (validated) |
| 8 | Project type | Single choice |

Answers are always sent in English, so the team gets the same summary whichever language the customer chose.

## Configure

Edit `config.js`:

```js
window.LMG_CONFIG = {
  webhookUrl: "https://hook.eu2.make.com/...", // Make Custom Webhook URL
  whatsappNumber: ""                                // optional, e.g. "919876543210"
};
```

## Publish on GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then pick `main` and `/ (root)`.
4. After about a minute the form is live at `https://<username>.github.io/<repo>/`.

## Connect the Make webhook

1. In Make, create a scenario that starts with **Webhooks → Custom webhook**, add a webhook, and copy its URL.
2. Paste the URL into `webhookUrl` in `config.js`, then commit and push.
3. In Make, click **Run once**, then submit one test enquiry from the live form so Make learns the fields.
4. Add the steps you need after the webhook (Google Sheets, CRM, email, WhatsApp and so on), then turn the scenario on.

Each submission sends these fields (form-encoded):

| Field | Example |
|---|---|
| `submittedAt` | `2026-11-04T10:15:00.000Z` |
| `name` | `Arun` |
| `language` | `Malayalam` |
| `products` | `Italian Marble, Granite` |
| `application` | `Flooring` |
| `area` | `1,500–2,500` |
| `colour` | `Beige` |
| `phone` | `+91 98765 43210` |
| `projectType` | `Residential` |
| `summary` | The full enquiry as readable text |
