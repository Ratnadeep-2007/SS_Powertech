# SSIT - Security and Energy Solutions

SSIT is a modern web application for a technology solutions provider specializing in CCTV security, Solar energy, and Network infrastructure.

## Features
- **Modern Aesthetic:** High-impact visuals with fluid cursor effects and border-glow animations.
- **Service Pages:** Dedicated sections for Security, Energy, and Network services.
- **Interactive UI:** 3D hover effects, scroll animations, and smooth scrolling.
- **Contact Form:** Integrated collaboration form for project inquiries.

## Project Structure
- `index.html`: Landing page.
- `about.html`: Company mission, values, and leadership team.
- `cctv.html`: Security services and features.
- `solar.html`: Solar energy solutions.
- `wifi.html`: Networking and WiFi infrastructure.
- `styles.css`: Core layout and styling.
- `border-glow.css` / `.js`: Custom decorative border animations.
- `splash-cursor.js`: Interactive fluid cursor effect.
- `script.js`: General UI interactions and initialization.
- `img/`: Team member photographs and assets.

## How to Run the Project Locally

This project uses **PHP** for the mail service and **Supabase** for database storage. You must use a server that supports PHP.

### Prerequisites
- **PHP 7.4+**
- **Database:** The project is configured for Supabase (see `supabase/` folder and `schema.sql`).
- **Mail:** Configured in `mail.php` using PHPMailer (Gmail SMTP).

### Option 1: XAMPP / WAMP / MAMP (Recommended)
1. Download and install [XAMPP](https://www.apachefriends.org/).
2. Move the project folder to the `htdocs` directory (e.g., `C:\xampp\htdocs\solar-project`).
3. Open the **XAMPP Control Panel** and start **Apache**.
4. Open your browser and navigate to `http://localhost/solar-project`.

### Option 2: PHP Built-in Server
If you have PHP installed globally:
1. Open your terminal in the project directory.
2. Run:
   ```bash
   php -S localhost:8000
   ```
3. Visit `http://localhost:8000`.

## Database Setup (Supabase)
The project uses Supabase for storing lead inquiries.
1. Create a new project on [Supabase](https://supabase.com/).
2. Run the SQL found in `schema.sql` in the Supabase **SQL Editor**.
3. Ensure your frontend calls (if any direct) or `mail.php` updates match your Supabase credentials if modified.

## Mail Configuration
The `mail.php` file is configured to use Gmail SMTP. 
- **Note:** You must update the `$mail->Username` and `$mail->Password` (App Password) in `mail.php` with your own credentials to send actual emails.


## Technologies Used
- HTML5 & CSS3
- JavaScript (ES6+)
- [GSAP](https://greensock.com/gsap/) (Animations)
- [AOS](https://michalsnik.github.io/aos/) (Scroll Animations)
- [Vanilla Tilt](https://micku7zu.github.io/vanilla-tilt.js/) (3D Hover)
- [Lenis](https://github.com/darkroomengineering/lenis) (Smooth Scroll)
