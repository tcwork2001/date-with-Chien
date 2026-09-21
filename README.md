# Will You Date Me

A small "will you go on a date with me" flow: an ask (Yes/No), then a
plan-the-date screen (day, time, activity), ending on a confirmation
screen the recipient can copy and send back. A separate private admin
page tells you where to find every response.

Live pages (hosted on GitHub Pages straight from this repo, no Claude account needed to open them):

- Date invite (public, send this one): https://tcwork2001.github.io/date-with-Chien/
- RSVP log (private, only you should open this one): https://tcwork2001.github.io/date-with-Chien/admin.html

This folder is the source, for anyone who wants their own copy on GitHub / their own hosting.

## Files

- `index.html` — the date-invite page (one file, no build step, no dependencies).
- `admin.html` — a private page pointing you to where responses land (Formspree).

## How responses are stored

Every time someone finishes the "pick a time" flow, `index.html` sends
the day, time and activity to a **Formspree** form
(`https://formspree.io/f/xrpbpylr`). Formspree emails you each response
and keeps a dashboard of all of them at
[formspree.io](https://formspree.io) (sign in with the account you used
to create the form).

Formspree's endpoint URL is safe to leave in public client-side code —
unlike a GitHub personal access token, it isn't a secret and can't be
used to do anything except submit to that one form. (An earlier version
of this project embedded a GitHub token in `index.html` to create
GitHub Issues for each RSVP — don't do that: GitHub automatically
revokes its own tokens whenever it detects them exposed in public code,
so that approach breaks itself within minutes of being committed.)

## Push this to your own GitHub repo

You'll need a free [GitHub](https://github.com) account and a free [Formspree](https://formspree.io) account.

**Option A — GitHub's website (no command line):**

1. Go to [github.com/new](https://github.com/new), name the repo, leave it public, and click **Create repository**.
2. On the new repo's page, click **uploading an existing file**.
3. Drag in `index.html`, `admin.html`, and `README.md` from this folder, then click **Commit changes**.
4. Sign up at [formspree.io](https://formspree.io), create a new form, and copy its endpoint (`https://formspree.io/f/xxxxxxxx`).
5. Paste that endpoint into the `FORMSPREE_ENDPOINT` constant near the top of `index.html`s `<script>` block, and into the submissions link in `admin.html`.

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

(Create the empty repo on GitHub first at github.com/new, without a README, so the push above doesn't conflict.)
