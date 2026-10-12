# Youth Aspirations & India: survey site (GitHub Pages + Supabase, both free)

1. **Supabase:** create a free project at supabase.com. In *SQL Editor* paste `schema.sql` (change `ADMIN_EMAIL_HERE` to your email) and run.
2. *Authentication → Users → Add user*: your admin email + a strong password (tick auto-confirm). Then *Authentication → Sign In / Providers* and **turn off "Allow new users to sign up"**.
3. *Project Settings → API*: copy the Project URL and the `anon` key into `config.js`. Also edit researcher/institution/email (shown on the consent page).
4. **GitHub:** push this folder to a repo, then *Settings → Pages → Deploy from branch → main / root*. Survey: `https://USER.github.io/REPO/`, dashboard: `.../admin.html`.
5. **Test** with a few fake responses of your own, check the dashboard and CSV, then delete the test rows in Supabase (*Table Editor*) before real collection.

Notes
- Question IDs in `survey.js` are stable: never rename them after launch; add new ones instead. `codebook.csv` (dashboard export) documents every variable.
- Static hosting can't do real rate limiting. DB size/consent checks and a honeypot limit abuse; for more, add Cloudflare Turnstile later.
- Get ethics/IRB or supervisor approval and finalise the consent wording before collecting data. The survey is 18+ only.
