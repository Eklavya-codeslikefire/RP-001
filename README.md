# Youth Aspirations & India

An academic research survey website for the empirical study:
**"Youth Aspirations, Perceptions of India, and Migration Intentions Among Indian College Students"**

- **Principal Investigator:** Eklavya
- **Affiliation:** Manipal University Jaipur
- **Design Philosophy:** Swiss / academic minimalism, mobile-first, zero framework/bundler overhead, automatic dark mode support (`prefers-color-scheme`).

---

## Architecture & Deliverables

This study is implemented as a static, no-build-step web application hosted free on GitHub Pages with Supabase (PostgreSQL + Auth + Row Level Security) as the backend database:

1. `index.html` — The participant survey (single-page state machine: Intro, Ethics/Consent, Section A Profile, Sections B–F Instruments, Thank You).
2. `admin.html` — The researcher dashboard (authenticated access, summary stats, CSS distributions, Expectations vs. Satisfaction Gap analysis, subgroup cross-tabulations, open-ended responses, and wide CSV exports).
3. `survey.js` — The single source of truth for the instrument codebook (all constructs, stable question IDs, scales, streams, and demographic fields).
4. `style.css` — Academic typography (Georgia serif headings, system sans body, hairlines, accent blue `#1d4ed8`, `#0e0e0e` dark mode).
5. `config.js` — Configuration exporting researcher details and Supabase credentials.
6. `schema.sql` — PostgreSQL database schema, payload size checks, and strict Row Level Security (RLS) policies.
7. `README.md` — Complete deployment, ethics, and configuration instructions.

---

## 5-Step Setup Guide

### Step 1: Run `schema.sql` in Supabase
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Open `schema.sql` from this repository, replace `'ADMIN_EMAIL_HERE'` (or `'unskilled179@gmail.com'`) on the `Admin select responses` policy with your own administrative email, and execute the SQL query.
4. This creates the `public.responses` table with data integrity checks and Row Level Security (RLS) policies allowing anonymous inserts and restricted admin reads.

### Step 2: Create Admin User & Disable Public Signups
1. In your Supabase dashboard, navigate to **Authentication** > **Users**.
2. Click **Add User** > **Create User** and enter your researcher email address and a strong password.
3. In **Authentication** > **Sign In / Providers** (or **Email** settings), disable public self-registration/signups so only your pre-created admin user can authenticate into the researcher dashboard.

### Step 3: Configure `config.js`
1. Navigate to **Project Settings** > **API** in Supabase.
2. Copy your **Project URL** and your **anon / public key** (the anon key is safe to place in client-side code because database operations are governed by RLS).
3. Open `config.js` and paste your URL and key:
   ```javascript
   export const CFG = {
     url: "https://your-project-id.supabase.co",
     key: "your-anon-key-here",
     researcher: "Eklavya",
     institution: "Manipal University Jaipur",
     email: "your-email@example.com",
   };
   ```

### Step 4: Deploy on GitHub Pages
1. Push this repository to a public or private GitHub repository.
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Branch**, select `main` (or `master`) and folder `/(root)`.
4. Click **Save**. Your study will be live at `https://<username>.github.io/<repo-name>/`.
   - Participant Survey: `https://<username>.github.io/<repo-name>/`
   - Researcher Dashboard: `https://<username>.github.io/<repo-name>/admin.html`

### Step 5: Test & Validate
1. Open your live survey link on mobile and desktop.
2. Fill out a test response to verify that all validation rules, branchings, and database writes function as intended.
3. Open `admin.html`, log in with your credentials, check the real-time aggregations and CSV downloads, and remove any initial test records directly via the Supabase Table Editor before launching data collection.

---

## Important Methodological & Security Notes

- **Stable Identifiers:** Question IDs (`imp_career`, `mig_study`, etc.) and construct names are permanent. Never rename IDs once data collection has commenced.
- **Rate Limiting & Abuse Prevention:** Because the survey runs on static hosting, abuse is mitigated by:
  - Database row-level payload size constraints (`<4000` bytes for profile, `<30000` bytes for answers).
  - Explicit consent validation (`consent = true`).
  - Survey version verification (`survey_version = '1.0'`).
  - Invisible honeypot inputs to deter web crawlers and automated bots without adding UX friction.
- **Formula Injection Mitigation:** All CSV exports sanitize text cells beginning with `=`, `+`, `-`, or `@` by prefixing them with an apostrophe `'`, and include a UTF-8 Byte Order Mark (BOM) for compatibility with Microsoft Excel and statistical software (R, SPSS, Stata, Python).
- **Ethics & Participant Criteria:**
  - This survey is strictly restricted to participants aged 18 to 45 who are currently enrolled in higher education institutions in India.
  - No personally identifying information (PII) such as names, phone numbers, or IP addresses is captured.
  - Institutional Review Board (IRB) or faculty advisor clearance should be secured prior to public dissemination.
