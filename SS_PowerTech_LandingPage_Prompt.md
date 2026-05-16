# SS PowerTech — Landing Page Design & Development Prompt for Gemini

---

## 🎯 Project Overview

Build a **stunning, high-converting single-page landing website** for **SS PowerTech**, a modern tech-services company offering:

- 📷 **Camera Installation** (CCTV & Security Surveillance)
- ☀️ **Solar Installation** (Residential & Commercial)
- 📶 **Interior Wi-Fi Setup** (Smart Home & Office Networking)

The goal: make visitors feel like they've landed on the most professional, trustworthy, and forward-thinking tech company in their region. The site should feel like a fusion of **Apple's precision** and **Tesla's boldness** — dark, sleek, electric.

---

## 🎨 Visual Identity & Aesthetic Direction

### Theme
- **Dark mode first** — deep charcoal/near-black backgrounds (#0A0A0F, #111118)
- **Electric accent color** — neon electric blue (#00C8FF) or volt green (#39FF14) — pick ONE and commit
- **White/off-white** for primary text (#F0F0F5)
- **Subtle gradients** — deep navy to black, with glowing orbs in the background

### Typography
- **Display/Headings**: `Syne` or `Space Grotesk` (bold, geometric, futuristic)
  - Import from Google Fonts: `https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap`
- **Body text**: `DM Sans` (clean, readable)
- **Accent/labels**: All-caps letter-spaced tags

### Logo Treatment
- "SS" monogram in a bold geometric badge/shield
- "PowerTech" in tracking-wide uppercase
- Glow effect on hover

---

## 🏗️ Page Structure & Sections

Build the page in this exact order:

---

### 1. 🔝 Navigation Bar (Sticky)

- Logo left: **SS PowerTech** with a lightning bolt icon ⚡
- Nav links center: Home | Services | Why Us | Testimonials | Contact
- CTA button right: **"Get Free Quote"** — glowing outlined button
- Background: fully transparent, becomes dark blur (`backdrop-filter: blur`) on scroll
- Mobile: hamburger menu with smooth slide-in drawer

---

### 2. 🌟 Hero Section — "Power Your World"

**Full-viewport height**, cinematic and dramatic.

**Headline** (large, split-line):
```
SECURE.
POWERED.
CONNECTED.
```
Each word on its own line. Each word animates in with staggered fade+slide from bottom (0.2s delay each).

**Sub-headline**:
> "SS PowerTech brings cutting-edge security cameras, solar energy systems, and seamless Wi-Fi networks to homes and businesses across the region."

**Two CTAs**:
- Primary: `Explore Services` → scrolls to services section (filled, glowing button)
- Secondary: `Watch How It Works` → opens a modal/lightbox (outlined button with play icon ▶)

**Background**:
- Dark gradient base
- Animated glowing orbs (CSS keyframe radial gradients) in the background — blue/teal
- A subtle **grid mesh pattern** overlay (CSS background-image: linear-gradient grid lines, very faint)
- Optional: a high-quality hero image of a modern smart home (right side, with a soft gradient fade to black on left)

**Floating stat cards** (appear after 0.5s, floating animation):
```
✅ 500+ Installations Done
⭐ 4.9/5 Customer Rating
🔧 5-Year Warranty
```

---

### 3. ⚡ Services Section — "What We Do"

Section label: `OUR SERVICES` (small caps, letter-spaced, accent-colored)
Section heading: **"Everything Your Space Needs"**

**Three large cards** in a grid (1 row on desktop, stacked on mobile):

---

#### Card 1 — 📷 Camera Installation
- Icon: stylized camera SVG with glow
- Headline: **"Eyes That Never Sleep"**
- Description: "HD CCTV & IP camera systems for homes, offices, warehouses, and gated societies. 24/7 monitoring, night vision, remote access from your phone."
- Features list:
  - ✔ HD & 4K Camera Options
  - ✔ Night Vision & Motion Detection
  - ✔ Mobile App Remote Viewing
  - ✔ Cloud & Local Storage
  - ✔ Professional Installation & Cabling
- CTA: `Learn More →`
- Card hover: lifts with a blue glow box-shadow

---

#### Card 2 — ☀️ Solar Installation *(Featured / Highlighted)*
- Badge: `🌟 Most Popular`
- Icon: animated sun SVG (slow spin or pulse)
- Headline: **"Harness the Sun. Cut Your Bills."**
- Description: "On-grid, off-grid, and hybrid solar systems for residential and commercial properties. Government subsidy assistance included."
- Features list:
  - ✔ Tier-1 Solar Panels
  - ✔ Net Metering & Grid Tie-Up
  - ✔ Battery Backup Systems
  - ✔ Govt. Subsidy Guidance
  - ✔ 25-Year Panel Warranty
- ROI Calculator teaser: `💡 Save up to ₹8,000/month`
- CTA: `Get Solar Quote →`
- Card style: slightly larger, accent border glow

---

#### Card 3 — 📶 Interior Wi-Fi Setup
- Icon: Wi-Fi waves SVG with signal animation
- Headline: **"Zero Dead Zones. Everywhere."**
- Description: "Enterprise-grade mesh Wi-Fi systems designed for homes, offices, hotels, and warehouses. Every corner, every floor — blazing fast."
- Features list:
  - ✔ Mesh Network Design
  - ✔ Coverage Mapping & Survey
  - ✔ Router, Switch & Access Point Setup
  - ✔ Bandwidth Optimization
  - ✔ Ongoing Support Plans
- CTA: `Learn More →`

---

### 4. 📊 Stats / Numbers Section

Full-width dark band with glowing numbers. Counter animation (count up from 0 when scrolled into view using Intersection Observer).

```
[ 500+ ]         [ 98% ]          [ 5 Yrs ]       [ 3 ]
Installations   Satisfaction     Warranty        Services
```

Background: subtle animated gradient sweep (left to right shimmer).

---

### 5. 💡 Why Choose SS PowerTech — "The SS Advantage"

Section heading: **"Why Hundreds Trust Us"**

**Six feature cards** in a 3×2 grid (icon + title + short text):

| Icon | Title | Description |
|------|-------|-------------|
| 🛡️ | Certified Technicians | Trained, background-verified professionals on every job |
| ⚡ | Fast Turnaround | Most installations completed within 24–48 hours |
| 💰 | Transparent Pricing | No hidden charges. Free site survey before every project |
| 🔧 | 5-Year Warranty | We stand by our work — parts and labor guaranteed |
| 📱 | Smart Monitoring | Remote access and control through mobile apps |
| 🌿 | Eco-Friendly Focus | Solar-first mindset — reducing your carbon footprint |

Card style: minimal bordered cards, icon in accent color, hover lifts slightly.

---

### 6. 🔄 How It Works — "3 Simple Steps"

Section heading: **"From Call to Installation in 3 Steps"**

Horizontal step-flow with connecting animated line:

```
[1] Book a Free Survey  →→→  [2] Get Custom Plan & Quote  →→→  [3] We Install & You Relax
```

Each step has:
- Step number (large, faded background number)
- Icon
- Title
- 1-line description

On mobile: vertical stacked steps.

---

### 7. ☀️ Solar ROI Calculator *(Interactive Feature)*

Section heading: **"See Your Solar Savings"**

A dark-styled interactive calculator card:

**Inputs:**
- Monthly electricity bill (slider: ₹500 – ₹20,000)
- Roof area available (sq. ft.) (slider: 100–2000)
- Location type: Residential / Commercial (toggle)

**Outputs (auto-calculate):**
- Recommended system size (kW)
- Estimated monthly savings (₹)
- Payback period (years)
- 25-year total savings (₹)

Display results in glowing stat boxes that update in real-time.

Add: `"Ready to go solar? Get your free quote →"` CTA below.

*Formula hints:*
- System size (kW) ≈ Monthly Bill / 1000
- Monthly savings ≈ System size × 120 (units/kW/month) × ₹8/unit
- Payback ≈ System Cost / (Monthly savings × 12) [assume ₹65,000/kW system cost]

---

### 8. 🗣️ Testimonials — "What Our Clients Say"

Section heading: **"Real People. Real Results."**

**Auto-scrolling testimonial carousel** (3 cards visible on desktop, 1 on mobile):

Sample testimonials to include:
```
"SS PowerTech installed 16 cameras in our factory. Clean work, perfect setup. 
No issues in 2 years!" — Ramesh K., Factory Owner

"Our solar panels saved us ₹6,000 last month itself. Installation was 
done in one day!" — Priya M., Homeowner

"Best Wi-Fi setup we ever had. Even the basement has full signal now. 
Highly recommend!" — Anil D., Restaurant Owner

"They helped us get the government solar subsidy too. Saved extra ₹40,000!" 
— Sunita V., Housing Society

"Professional team, on time, no mess left behind. Exactly what I wanted." 
— Suresh P., Office Manager
```

Card style: dark card, quote marks in accent color, star rating (⭐⭐⭐⭐⭐), client name + role.

Auto-play carousel with pause on hover. Dot navigation indicators.

---

### 9. 🖼️ Project Gallery / Portfolio Strip

Section heading: **"Our Work Speaks"**

A horizontal scrolling or masonry grid of project thumbnails with category labels:
- `Security Cameras` | `Solar Panels` | `Wi-Fi Setup`

Filter tabs at top: All | Cameras | Solar | Wi-Fi

Each image card: dark overlay on hover with project name + location.

*(Use placeholder images from Unsplash or pexels for: solar panels on rooftop, security cameras on wall, Wi-Fi router setups, modern homes)*

---

### 10. 📞 Contact / CTA Section

Full-width dramatic CTA band:

**Heading**: **"Ready to Power Up Your Space?"**
**Sub**: "Get a free consultation and custom quote — no obligation."

Two-column layout:
- Left: Contact form (Name, Phone, Email, Service needed [dropdown], Message, Submit button)
- Right: Contact details
  - 📞 Phone: [Your Number]
  - 📧 Email: info@sspowertech.com
  - 📍 Address: [Your City, State]
  - 🕐 Working Hours: Mon–Sat, 9AM–7PM

Form submit button: `"Send My Request →"` (full-width, accent color, glowing)

Add: WhatsApp floating button (bottom-right corner) with pulse animation — `Chat on WhatsApp 💬`

---

### 11. 🔻 Footer

Dark footer, three columns:

**Column 1 — Brand**
- SS PowerTech logo + tagline: *"Secure. Powered. Connected."*
- One-liner company description
- Social icons: Facebook | Instagram | YouTube | LinkedIn (circle icon buttons)

**Column 2 — Quick Links**
- Home, Services, Why Us, Calculator, Contact, Privacy Policy

**Column 3 — Services**
- Camera Installation
- Solar Installation
- Wi-Fi Setup
- Free Site Survey
- Support & Maintenance

**Bottom bar**: `© 2025 SS PowerTech. All rights reserved.` | `Made with ⚡ for a smarter future`

---

## ✨ Special Effects & Animations To Include

| Effect | Where |
|--------|--------|
| Staggered text reveal (fade + slide up) | Hero headline |
| Glowing neon box-shadow on hover | All service cards, buttons |
| Counter animation (0 → final number) | Stats section |
| Scroll-triggered fade-in | Every section |
| Parallax depth effect | Hero background orbs |
| Auto-scrolling carousel | Testimonials |
| Real-time calculation | Solar ROI calculator |
| Pulse animation | WhatsApp button |
| Smooth scroll | All nav links |
| Sticky nav blur transition | On page scroll |
| Card tilt on hover | Service cards (subtle 3D tilt effect) |

---

## 📱 Responsive Breakpoints

- **Desktop**: 1280px+ — full layouts
- **Tablet**: 768–1279px — 2-column grids
- **Mobile**: <768px — single column, larger tap targets, hamburger menu

---

## 🛠️ Tech Stack Recommendation

```
HTML5 + CSS3 + Vanilla JavaScript
```

Or if using a framework:
```
React + Tailwind CSS + Framer Motion
```

### External Libraries Allowed:
- `AOS.js` — scroll animations
- `CountUp.js` — number counter
- `Swiper.js` — testimonial carousel
- `VanillaTilt.js` — card tilt effect
- Google Fonts — typography
- Font Awesome or Heroicons — icons

---

## 🎯 Conversion Goals

Every section should push toward one of these actions:
1. **Book a free site survey** (primary CTA)
2. **Get a solar quote** (secondary CTA)
3. **Call / WhatsApp us** (instant conversion)

Place CTA buttons in: Hero, Services section (each card), Solar Calculator, and Contact section.

---

## 📝 Final Notes for Gemini

- Write **all code in a single HTML file** (inline CSS + JS) for easy delivery, OR separate into `index.html`, `style.css`, `script.js`
- Make the page **pixel-perfect on mobile** — this audience will mostly view on phones
- Use **₹ (Indian Rupee)** for all pricing references
- Ensure **fast loading** — minimize heavy assets
- Add **meta tags** for SEO: title, description, OG tags
- Page title: `SS PowerTech | Security Cameras, Solar & Wi-Fi Solutions`
- Meta description: `SS PowerTech offers professional camera installation, solar panel setup, and interior Wi-Fi solutions. Get your free site survey today!`

---

*Prompt crafted for SS PowerTech — Built to Impress, Designed to Convert.*
