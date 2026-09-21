# Will You Date Me

A small "will you go on a date with me" flow: an ask (Yes/No), then a
plan-the-date screen (day, time, activity), ending on a confirmation
screen the recipient can copy and send back. A separate private admin
page lets you see every response.

Live pages (already hosted, shareable now — you still need to hit
Share → enable link on the first one for the other person to open it):

- Date invite (public, send this one): https://claude.ai/artifact/E9dmsoNaZiuwPQFK7fHY1p
- RSVP log (private, only you should open this one): https://claude.ai/artifact/5q94WyPHex9xpDxbtymEHA

This folder is the source, for anyone who wants their own copy on
GitHub / their own hosting.

## Files

- `index.html` — the date-invite page (one file, no build step, no dependencies).
- `admin.html` — the private "who said yes" log, reads the same Google Sheet.
- `apps-script.gs` — a Google Apps Script that (a) appends submissions to a
  Google Sheet, and (b) lets the admin page read them back. Optional — the
  invite page works fine without it, it just won't log anywhere.

## 1. (Optional) Collect responses in a Google Sheet

The invite page runs in the browser of whoever opens the link — it has no
server of its own — so "log to a Google Sheet" needs a small endpoint in
front of the sheet. A Google Apps Script Web App does exactly that, for
free, with no backend to run yourself. The same endpoint also feeds the
admin page.

1. Go to [sheets.google.com](https://sheets.google.com) and create a new,
   blank spreadsheet. Name it something like "Date responses".
2. In the sheet, open **Extensions → Apps Script**.
3. Delete anything in the editor and paste the contents of
   `apps-script.gs` (in this folder) instead.
4. Click **Deploy → New deployment**.
5. Click the gear icon next to "Select type" and choose **Web app**.
6. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Click **Deploy**, then **Authorize access** and approve the permissions
   (it's your own script, on your own sheet).
8. Copy the **Web app URL** it gives you — it looks like
   `https://script.google.com/macros/s/AKfycb.../exec`.
9. Paste that URL into **both** files, in the line near the top of each
   `<script>` block that currently reads:

   ```js
   var WEBHOOK_URL = "";
   ```

   → in `index.html` (so it sends responses) and in `admin.html` (so it
   can read them back):

   ```js
   var WEBHOOK_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```

10. `apps-script.gs` and `admin.html` both already have a matching
    `ADMIN_KEY` (a random string) so only your admin page can read the
    sheet — leave it as-is, or change it in both places if you want your
    own.

From then on, every time someone finishes the "pick a time" flow, a row
(timestamp, day, time, activity) is appended to your sheet, and the admin
page shows it automatically.

If you'd rather I wire this up for you, just send me the Web app URL from
step 8 and I'll update both live pages directly — no need to touch the
files yourself.

## 2. Push this to your own GitHub repo

You'll need a free [GitHub](https://github.com) account.

**Option A — GitHub's website (no command line):**

1. Go to [github.com/new](https://github.com/new), name the repo (e.g.
   `date-invite`), leave it public or private as you like, and click
   **Create repository**.
2. On the new repo's page, click **uploading an existing file**.
3. Drag in all four files from this folder (`index.html`, `admin.html`,
   `apps-script.gs`, `README.md`), then click **Commit changes**.
4. (Optional) To host the invite page live for free: go to
   **Settings → Pages**, under "Branch" pick `main` and `/ (root)`, then
   **Save**. GitHub gives you a
   `https://<your-username>.github.io/date-invite/` link after a minute.
   Don't do this for `admin.html` if the repo is public — anyone with the
   URL could open it (it's still protected by the `ADMIN_KEY`, but it's
   safer to keep the admin page private, e.g. in a private repo, or just
   use the claude.ai admin link above instead).

**Option B — command line (if you have `git` installed):**

```bash
cd date-invite-repo
git init
git add .
git commit -m "Will you date me — initial version"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

(Create the empty repo on GitHub first at github.com/new, without a
README, so the push above doesn't conflict.)
