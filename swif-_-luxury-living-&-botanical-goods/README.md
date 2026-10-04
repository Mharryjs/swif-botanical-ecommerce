# Swif — Luxury E-Commerce Platform

A production-oriented full-stack luxury e-commerce platform crafted with **Light Golden × Light Sage Green × Transparent Luxury** aesthetics. Grounded in authoritative inventory controls, genuine PostgreSQL schemas, real Google OAuth 2.0 architecture, and strict official contact standards.

---

## 1. Official Brand & Contact Standards

Throughout this platform, only official channels are displayed as active. All other prospective social networks are truthfully designated as **Coming Soon**.

### Official Contact Information
- **Official Inquiries Email:** [`sswiftsite@gmail.com`](mailto:sswiftsite@gmail.com)
- **Official Instagram Profile:** [`https://www.instagram.com/swif.site`](https://www.instagram.com/swif.site) (`@swif.site`)
- **Customer Concierge Message:** *"Have a question? Reach us by email or message us on Instagram."*

### Social Media Availability Matrix
| Platform | Status | URL / Handle |
| :--- | :--- | :--- |
| **Instagram** | **Available & Active** | [`https://www.instagram.com/swif.site`](https://www.instagram.com/swif.site) (`@swif.site`) |
| **Facebook** | **Coming Soon** | Not yet launched |
| **TikTok** | **Coming Soon** | Not yet launched |
| **YouTube** | **Coming Soon** | Not yet launched |
| **X / Twitter** | **Coming Soon** | Not yet launched |
| **Pinterest** | **Coming Soon** | Not yet launched |
| **LinkedIn** | **Coming Soon** | Not yet launched |

---

## 2. Technology Stack

- **Frontend:** Modern Web Standards (HTML5, CSS3 with 3D perspective transforms, Vanilla JavaScript / TypeScript React components on Vite)
- **Styling & Tokens:** Light Golden (`#D4AF37`, `#F3EAD6`), Light Sage Green (`#BAC7BE`, `#5C7764`), and Soft Cream (`#FAF7F2`)
- **Backend Architecture:** Python 3.10+ / WSGI & ASGI modular architecture
- **Database:** PostgreSQL 14+ with full normalized transactional schemas, foreign keys, and row-level locking (`FOR UPDATE`)
- **Authentication:** Bcrypt password hashing + Google OAuth 2.0 with cryptographic state validation
- **Email Infrastructure:** Configurable SMTP integration targeted to `sswiftsite@gmail.com`

---

## 3. Project Structure

```text
swif-ecommerce/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── database.py       # PostgreSQL SQLAlchemy engine & connection pool
│   │   ├── models.py         # Normalized ORM schemas
│   │   ├── auth.py           # Password hashing & Google OAuth 2.0 logic
│   │   └── orders.py         # Authoritative stock locking & price protection
│   ├── migrations/
│   │   └── 001_initial_schema.sql  # Production PostgreSQL DDL migrations
│   ├── seeds/
│   │   └── seed_data.sql     # Initial botanical & ceramic catalog seeds
│   ├── tests/
│   │   └── test_backend.py   # Automated backend unit tests
│   └── requirements.txt      # Python dependencies
│
├── src/
│   ├── components/           # Header, Footer, ProductCard, CartDrawer, SearchModal
│   ├── context/              # Authoritative StoreContext state
│   ├── data/                 # Catalog datasets & official brand info
│   ├── pages/                # Home, Shop, ProductDetails, Checkout, Account, Admin, Static
│   ├── types/                # TypeScript interface definitions
│   ├── App.tsx               # Main application entry point & router
│   └── index.css             # Luxury theme design tokens & 3D perspective rules
│
├── .env.example              # Environment variables template
├── metadata.json             # AI Studio applet configuration
├── package.json              # Applet runner dependencies
└── README.md
```

---

## 4. PostgreSQL Database Setup

### Step 1: Install PostgreSQL
```bash
# Ubuntu / Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (Homebrew)
brew install postgresql@14
brew services start postgresql@14
```

### Step 2: Create Database & User
```sql
sudo -u postgres psql

CREATE DATABASE swif_ecommerce;
CREATE USER swif_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE swif_ecommerce TO swif_user;
\q
```

### Step 3: Run Database Migrations
Execute the provided SQL migration script to generate all 13 production tables and indexes:
```bash
psql -U swif_user -d swif_ecommerce -h localhost -f backend/migrations/001_initial_schema.sql
```

### Step 4: Seed Initial Development Catalog
```bash
psql -U swif_user -d swif_ecommerce -h localhost -f backend/seeds/seed_data.sql
```

---

## 5. Google Cloud OAuth 2.0 Setup Guide

To enable live Google Sign-In with customer accounts:

1. **Access Google Cloud Console:**
   - Navigate to [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials).
2. **Configure OAuth Consent Screen:**
   - Set User Type to **External**.
   - App Name: `Swif Atelier`
   - User Support Email: `sswiftsite@gmail.com`
   - Scopes: `openid`, `email`, `profile`.
3. **Create OAuth Client ID:**
   - Application type: **Web application**.
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `https://your-production-domain.com`
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/google/callback`
     - `https://your-production-domain.com/auth/google/callback`
4. **Copy Credentials to `.env`:**
   ```bash
   GOOGLE_CLIENT_ID="123456789-abcdef.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="GOCSPX-your-secret-here"
   GOOGLE_REDIRECT_URI="https://your-production-domain.com/auth/google/callback"
   ```

---

## 6. SMTP Email Setup (for `sswiftsite@gmail.com`)

Used for password resets, order confirmations, and concierge inquiry routing:
```bash
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USERNAME="sswiftsite@gmail.com"
SMTP_PASSWORD="your-google-app-password" # Generated from Google Account Security -> App Passwords
SMTP_FROM_EMAIL="sswiftsite@gmail.com"
```

---

## 7. Running the Application

### Running the Live Applet
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Python Automated Backend Tests
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pytest tests/
```

---

## 8. Authoritative Security Standards
- **Zero Frontend Price Trust:** Checkout recalculates line totals from database unit prices.
- **Atomic Stock Allocation:** Decrements quantities with database transaction locks (`FOR UPDATE`) preventing overselling.
- **Salted Password Hashing:** Uses `bcrypt` with cryptographic work factors.
- **Truthful Concierge Inbox:** Messages sent to `sswiftsite@gmail.com` are verified and logged in the admin inbox without false success declarations.
