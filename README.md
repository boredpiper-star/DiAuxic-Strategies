# DiAuxic-Strategies: KPI Management Platform

**A comprehensive KPI management platform for management consultancy firms**

## Overview

DiAuxic-Strategies is an enterprise-grade KPI (Key Performance Indicator) management platform designed specifically for management consultancy firms working with Small and Medium Businesses (SMBs), particularly in the IT and software services sector.

The platform enables:
- **Automated KPI calculation** from financial and operational reports
- **Industry-specific KPI templates** for IT, SaaS, and professional services
- **Ad-hoc KPI creation** by consultants with custom formulas
- **Role-based access control** for Admins, Consultants, and Customers
- **File upload and parsing** for financial statements (PDF, Excel, CSV)
- **Beautiful, lightweight UI** optimized for ease of use

## Key Features

### 1. **Unified Login System**
- Single login page with role selection (Admin, Consultant, Customer)
- Create new user accounts with role-based permissions
- JWT-based authentication

### 2. **Role-Based Dashboards**

**Admin Dashboard:**
- Manage all users and their roles
- View all companies and KPIs
- Manage industry KPI templates
- System analytics and audit logs

**Consultant Dashboard:**
- Manage assigned customers
- Create custom KPIs using formulas
- Upload financial reports
- Generate insights and recommendations

**Customer Dashboard:**
- View assigned KPIs
- Track KPI performance trends
- Upload financial reports
- View consultant recommendations

### 3. **KPI Templates**
Pre-built KPI templates for IT/SaaS SMBs:
- Revenue Growth Rate
- Profit Margin
- Client Acquisition Cost (CAC)
- Customer Lifetime Value (CLV)
- Project Delivery On-Time Rate
- Resource Utilization Rate
- Employee Productivity
- EBITDA Margin
- Attrition Rate

### 4. **Ad-Hoc KPI Builder**
Consultants can create custom KPIs by defining:
- KPI name and category
- Formula (using financial data fields)
- Target values
- Review frequency

### 5. **Financial Report Processing**
- Upload PDF, Excel, or CSV financial statements
- Automatic data extraction
- Manual field mapping for non-standard formats

## Tech Stack

- **Frontend:** Next.js 14 + React 18 + Tailwind CSS
- **Backend:** Next.js API Routes + Node.js
- **Database:** PostgreSQL (configure in .env)
- **Authentication:** JWT + bcryptjs
- **File Processing:** pdf-parse, xlsx, csv-parse
- **Styling:** Tailwind CSS with custom soft color palette

## Project Structure

```
kpi-management-platform/
├── public/                    # Static assets
│   ├── assets/               # Images and icons
│   └── uploads/              # User uploaded reports
├── src/
│   ├── pages/
│   │   ├── login.jsx        # Login page
│   │   ├── register.jsx     # Registration page
│   │   ├── dashboard/       # Dashboard pages (by role)
│   │   ├── kpi-builder.jsx  # KPI creation interface
│   │   └── api/
│   │       ├── auth/        # Authentication routes
│   │       ├── kpi/         # KPI CRUD routes
│   │       ├── reports/     # Report upload routes
│   │       └── users/       # User management routes
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utility functions
│   ├── context/             # React context (auth, KPI)
│   └── styles/              # Global styles
├── db/
│   ├── migrations/          # Database migration scripts
│   └── seeds/               # Sample data
├── docs/                    # Documentation
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/boredpiper-star/DiAuxic-Strategies.git
   cd DiAuxic-Strategies
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your database and JWT configuration:
   ```
   DATABASE_URL=postgresql://user:password@localhost/kpi_db
   JWT_SECRET=your-secret-key-here
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Initialize database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Demo Credentials

After seeding, use these test accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | demo123 |
| Consultant | consultant@example.com | demo123 |
| Customer | customer@example.com | demo123 |

## Database Schema

### Tables
- `users` - User accounts with roles
- `companies` - Client companies
- `kpi_templates` - Pre-built KPI templates
- `kpis` - Instance KPIs for companies
- `reports` - Uploaded financial reports
- `kpi_history` - Historical KPI values for trend analysis

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Create new account
- `POST /api/auth/logout` - User logout

### KPIs
- `GET /api/kpi` - List KPIs
- `POST /api/kpi/create` - Create new KPI
- `GET /api/kpi/:id` - Get KPI details
- `PUT /api/kpi/:id` - Update KPI
- `DELETE /api/kpi/:id` - Delete KPI
- `GET /api/kpi/templates` - List KPI templates

### Reports
- `POST /api/reports/upload` - Upload financial report
- `GET /api/reports` - List reports
- `POST /api/reports/parse` - Extract data from report

## UI/UX Design

The platform features:
- **Soft color palette:** Slate grays, soft blues, and emerald accents
- **Lightweight design:** Minimal visual clutter, focus on content
- **Easy on the eyes:** High contrast, readable fonts, plenty of whitespace
- **Responsive layout:** Works on desktop, tablet, and mobile
- **Smooth interactions:** Subtle transitions and hover effects

## Development

### Running tests
```bash
npm run test
```

### Build for production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Deployment

### Vercel (Recommended for Next.js)
```bash
npm i -g vercel
vercel
```

### Docker
```bash
docker build -t kpi-platform .
docker run -p 3000:3000 kpi-platform
```

## Documentation

Detailed documentation available in `/docs`:
- `API_DOCUMENTATION.md` - API reference
- `DATABASE_SCHEMA.md` - Database structure
- `USER_ROLES.md` - Role-based access details
- `KPI_TEMPLATES.md` - Template library

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Contact

For questions or support, please contact: boredpiper-star@example.com

---

**Built with ❤️ for management consultants**


## Deployment

This project is deployed on Vercel for testing and demonstration purposes.
