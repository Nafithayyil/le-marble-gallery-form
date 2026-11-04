# Le Marble Gallery – Enquiry Form

A guided, mobile-friendly enquiry form for Le Marble Gallery. Customers answer 8 quick questions, one at a time, in English or Malayalam. Then they send the enquiry straight to the gallery's WhatsApp, and it can also be logged in a Google Sheet.

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
  whatsappNumber: "919876543210", // country code + number, digits only
  sheetEndpoint: ""               // optional Google Apps Script URL
};
```

## Publish on GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then pick `main` and `/ (root)`.
4. After about a minute the form is live at `https://<username>.github.io/<repo>/`.

## Optional: log enquiries to Google Sheets

1. Create a new Google Sheet, then go to **Extensions → Apps Script**.
2. Paste in the contents of `google-apps-script.gs` and save.
3. Click **Deploy → New deployment**, choose **Web app**, set *Execute as* to **Me** and *Who has access* to **Anyone**, then deploy.
4. Copy the web app URL into `sheetEndpoint` in `config.js`, then commit and push.

The header row is added automatically on the first submission.
