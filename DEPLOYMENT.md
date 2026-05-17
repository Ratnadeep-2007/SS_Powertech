# Deployment Checklist for S S PowerTech Website

## 1. Hosting Requirements
- Ensure your host supports **PHP 7.4 or 8.x**.
- Ensure **OpenSSL** is enabled in PHP (required for PHPMailer to connect to Gmail).

## 2. Security (Crucial)
- **Protect Credentials:** Your `mail.php` contains your Gmail App Password. When you upload, ensure the file permissions are set correctly (usually `644`).
- **Update From Address:** In `mail.php`, change `noreply@yourdomain.com` to a real email like `contact@yourdomain.com` once your domain is live.

## 3. Supabase Production Setup
- **Site URL:** In the Supabase Dashboard, go to **Authentication > Settings** and update the "Site URL" to your actual domain (e.g., `https://www.yourdomain.com`).
- **RLS Policies:** Verify that your `inquiries` table has the "Enable insert for everyone" policy active so the live site can save data.

## 4. Environment Variables
- Ensure your `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `script.js` are correct for your production project.

## 5. Testing on Live
- Once uploaded, perform a "Live Test" by submitting the form.
- Verify:
  1. The email arrives in your Gmail.
  2. The data appears in the Supabase Table Editor.
