# Ctrl + Data + Grow (CDG) • Supabase PostgreSQL Backend Guide

This document outlines the complete backend architecture, database schema, Row Level Security (RLS) policies, and administrative setup for **Speaker Registrations** and **Campus Ambassador Applications**.

---

## 1. Architecture Overview

```
                      +------------------------------------------+
                      |         Ctrl + Data + Grow Web App       |
                      |          (React + TypeScript + Vite)     |
                      +------------------------------------------+
                                    |              |
           [Public Visitor Submit]  |              |  [Admin Auth & Query]
           Insert-Only Policy       |              |  Full RLS Access
                                    v              v
                      +------------------------------------------+
                      |             Supabase Platform            |
                      |   - Supabase Auth (Admin sessions)       |
                      |   - PostgREST API (Direct client)        |
                      |   - Storage (resumes & docs)             |
                      +------------------------------------------+
                                    |
                                    v
                      +------------------------------------------+
                      |          Supabase PostgreSQL DB          |
                      |   - speakers table                       |
                      |   - campus_ambassadors table             |
                      |   - admin_users table                    |
                      |   - RLS Policies & Atomic Triggers       |
                      +------------------------------------------+
                                    ^
                                    | (Optional Privileged Operations)
                      +------------------------------------------+
                      |        Express REST API Backend          |
                      |        `node server/index.mjs`           |
                      |   (Uses SUPABASE_SERVICE_ROLE_KEY)       |
                      +------------------------------------------+
```

---

## 2. Database Schema & Field Mappings

### A. Corporate Speakers (`speakers` table)

| Frontend Form Field (`formData`) | PostgreSQL Column | Data Type | Constraint / Description |
| :--- | :--- | :--- | :--- |
| *(auto-generated)* | `id` | `UUID` | Primary Key (`gen_random_uuid()`) |
| *(auto-generated)* | `registration_id` | `TEXT` | Unique (`SPK-YYYYMMDD-XXXXXX`) |
| Full Name * | `full_name` | `TEXT` | `NOT NULL` |
| Email Address * | `email` | `TEXT` | `NOT NULL`, lowercased index |
| Phone / WhatsApp * | `phone` | `TEXT` | `NOT NULL` |
| Current Designation / Role * | `designation` | `TEXT` | `NOT NULL` |
| Company / Organization * | `company` | `TEXT` | `NOT NULL` |
| Preferred Session Mode * | `preferred_mode` | `TEXT` | Default: `'Both Online & Offline (Weekends)'` |
| LinkedIn Profile URL * | `linkedin_url` | `TEXT` | `NOT NULL` (Mandatory verification) |
| Portfolio / GitHub / YouTube | `portfolio_url` | `TEXT` | Nullable optional URL |
| Topics / Domains of Expertise * | `topics` | `TEXT` | `NOT NULL` |
| Past Speaking Experience | `speaking_experience` | `TEXT` | Nullable |
| Expected Honorarium (₹) | `fee_range` | `TEXT` | Nullable |
| LinkedIn Verification Notice | `agree_verify` | `BOOLEAN` | `DEFAULT true` |
| Resume / Portfolio Upload | `resume_url` | `TEXT` | Nullable Supabase Storage path |
| Application Status | `status` | `TEXT` | `DEFAULT 'pending'` (`pending`, `under_review`, `approved`, `rejected`) |
| Internal Notes | `internal_notes` | `TEXT` | Editable by admins |
| Reviewed By & At | `reviewed_by`, `reviewed_at` | `UUID`, `TIMESTAMPTZ` | References `auth.users(id)` |
| Timestamps | `created_at`, `updated_at` | `TIMESTAMPTZ` | Auto-maintained with trigger |

---

### B. Campus Ambassadors (`campus_ambassadors` table)

| Frontend Form Field (`formData`) | PostgreSQL Column | Data Type | Constraint / Description |
| :--- | :--- | :--- | :--- |
| *(auto-generated)* | `id` | `UUID` | Primary Key (`gen_random_uuid()`) |
| *(auto-generated)* | `application_id` | `TEXT` | Unique (`AMB-YYYYMMDD-XXXXXX`) |
| Full Name * | `full_name` | `TEXT` | `NOT NULL` |
| Email Address * | `email` | `TEXT` | `NOT NULL`, lowercased index |
| WhatsApp Phone Number * | `phone` | `TEXT` | `NOT NULL` |
| College / University Name * | `college_name` | `TEXT` | `NOT NULL` (Multiple students supported) |
| City & State * | `city_state` | `TEXT` | `NOT NULL` |
| Branch / Department * | `branch` | `TEXT` | `NOT NULL` |
| Year of Study * | `year_of_study` | `TEXT` | Default: `'3rd Year'` |
| LinkedIn Profile URL * | `linkedin_url` | `TEXT` | `NOT NULL` |
| Club / Leadership Positions | `club_involvement` | `TEXT` | Nullable |
| Campus Outreach Plan * | `outreach_plan` | `TEXT` | `NOT NULL` |
| Resume / Student ID | `resume_url` | `TEXT` | Nullable Supabase Storage path |
| Application Status | `status` | `TEXT` | `DEFAULT 'pending'` (`pending`, `under_review`, `approved`, `rejected`) |
| Internal Notes | `internal_notes` | `TEXT` | Editable by admins |
| Reviewed By & At | `reviewed_by`, `reviewed_at` | `UUID`, `TIMESTAMPTZ` | References `auth.users(id)` |
| Timestamps | `created_at`, `updated_at` | `TIMESTAMPTZ` | Auto-maintained with trigger |

---

## 3. Row Level Security (RLS) & Access Model

Strict RLS policies are applied on all tables:

1. **Public Visitors (`anon` role)**:
   * **Can ONLY perform `INSERT`** with `status = 'pending'`.
   * **CANNOT perform `SELECT`**: Public visitors cannot query, read, or list applicant data.
   * **CANNOT perform `UPDATE` or `DELETE`**: Status cannot be tampered with or modified.

2. **Authorized Administrators (`authenticated` role)**:
   * Verified by matching `auth.uid()` or user email against the `admin_users` table, or having service role access.
   * Full access to `SELECT`, `UPDATE` (status, internal notes), and export data.

3. **Concurrency & High Volume (~50+ Corporate Speakers)**:
   * Unique references are guaranteed by PostgreSQL constraints and automated triggers (`generate_speaker_reg_id()` and `generate_ambassador_app_id()`).
   * No sequential locking or check-then-insert race conditions.
   * Client-side exponential backoff retry handles transient network disconnects without losing user form inputs.

---

## 4. Setup Instructions

### Step 1: Create Supabase Project
1. Log in to [Supabase](https://supabase.com).
2. Click **New Project**, choose your organization, and select your preferred region (e.g. Mumbai / `ap-south-1` for Indian traffic).

### Step 2: Apply the SQL Migration
1. Go to your Supabase Dashboard $\rightarrow$ **SQL Editor**.
2. Click **New Query**.
3. Copy the entire contents of [`supabase/migrations/20261027_init_speakers_and_ambassadors.sql`](./migrations/20261027_init_speakers_and_ambassadors.sql).
4. Click **Run**. This will create the tables, indexes, triggers, and RLS policies.

### Step 3: Configure Environment Variables
1. Go to Supabase Dashboard $\rightarrow$ **Project Settings** $\rightarrow$ **API**.
2. Copy:
   * **Project URL**
   * **Project API Keys** $\rightarrow$ `anon` / `public`
   * **Project API Keys** $\rightarrow$ `service_role` (keep secret!)
3. Update your `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_publishable_key
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret_key
   PORT=5000
   ```

### Step 4: Create an Administrator Account
1. In the Supabase Dashboard $\rightarrow$ **Authentication** $\rightarrow$ **Users**.
2. Click **Add User** $\rightarrow$ **Create User** (enter an email and password, e.g. `admin@ctrldatagrow.com`).
3. In **SQL Editor**, run:
   ```sql
   INSERT INTO admin_users (email, role, full_name)
   VALUES ('admin@ctrldatagrow.com', 'super_admin', 'Jagadeesh Pondara');
   ```

---

## 5. Running the Application

### Start Frontend (Vite)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Access the Admin Portal
* Click the **Admin Desk** link in the footer, or
* Navigate to `http://localhost:3000/#admin`
* Log in with your Supabase administrator email and password.

### (Optional) Start the REST API Backend
```bash
npm run server
```
Server runs on `http://localhost:5000`. Endpoints:
* `POST /api/speakers/register`
* `GET  /api/admin/speakers` (requires `Authorization: Bearer <token>`)
* `PATCH /api/admin/speakers/:id/status`
* `POST /api/campus-ambassadors/register`
* `GET  /api/admin/campus-ambassadors`
* `PATCH /api/admin/campus-ambassadors/:id/status`
* `GET  /api/health`
