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
- `admin.html` — the private "who said yes" log, reads the Issues on this repo.

## How responses are stored

No Google Sheet, no separate backend to deploy. Every time someone
finishes the "pick a time" flow, `index.html` creates a **GitHub Issue**
on this repo (labeled `rsvp`) with the day, time and activity in the
issue body. `admin.html` just reads those issues back through GitHub's
public REST API (`GET /repos/<owner>/<repo>/issues`), which needs no
login for a public repo.

Writing an issue does need *something* with permission to create it, so
`index.html` embeds a GitHub **fine-grained personal access token**,
scoped to **only this repo** and **only "Issues: Read and write"** — it
cannot touch code, settings, or anything else on the account. Because
the page is public, that token is technically visible to anyone who
views the page source. The accepted risk is that someone could use it
to open junk Issues on this one repo (easy to delete) — nothing more.
If that ever becomes a problem, revoke the token at
[github.com/settings/personal-access-tokens](https://github.com/settings/personal-access-tokens)
and generate a fresh one with the same scope, then update the
`GITHUB_TOKEN` constant near the top of `index.html`'s `<script>` block.

`admin.html` needs no token at all — it only reads public data.

## Push this to your own GitHub repo

You'll need a free [GitHub](https://github.com) account.

**Option A — GitHub's website (no command line):**

1. Go to [github.com/new](https://github.com/new), name the repo, leave
   it public (issues need to stay public for `admin.html` to read them
   without a login), and click **Create repository**.
2. On the new repo's page, click **uploading an existing file**.
3. Drag in `index.html`, `admin.html`, and `README.md` from this
   folder, then click **Commit changes**.
4. Update `GITHUB_REPO` near the top of both files' `<script>` blocks
   to `"<your-username>/<your-repo-name>"`.
5. Create a fine-grained token (see above) scoped to this repo only,
   with **Issues: Read and write**, and paste it into `GITHUB_TOKEN`
   near the top of `index.html`.

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
