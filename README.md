# Ledgerline Financial Workspace

A professional frontend-only financial reporting and reconciliation workspace built using React and Tailwind CSS.

The project simulates a multi-tenant SaaS accounting platform using realistic business data, authentication, role-based permissions, and reusable components.

---

# Technology Stack

## Frontend

- React
- JavaScript (ES6+)
- Tailwind CSS

## State Management

- React Context API
- useReducer
- Custom Hooks

## Routing

- Custom Hash Routing
- No external routing library used

Example:

```text
/#/dashboard
/#/clients
/#/reports
```

---

# Libraries Used

Only the following technologies were used:

```text
React
Tailwind CSS
```

No additional UI frameworks were used.

---

# Libraries Not Used

The following libraries were intentionally avoided:

```text
React Router
Redux
Axios
Material UI
Ant Design
Bootstrap
Chart.js
Recharts
Formik
Yup
TanStack Query
```

The project follows the assessment restriction of avoiding unnecessary third-party libraries.

---

# Features

## Authentication

- Demo Login System
- Token Generation
- Local Storage Session Persistence
- Logout Functionality
- Protected Pages
- Route Guarding

---

## Role-Based Access Control

Three user roles are available:

### Admin

Can access:

- Dashboard
- Clients
- Statements
- Reconcile
- Reports
- Flags
- Audit

### Senior Accountant

Can access:

- Dashboard
- Statements
- Reports
- Flags
- Audit

### Junior Accountant

Can access:

- Dashboard
- Statements
- Reconcile
- Flags

Unauthorized pages and actions are automatically restricted.

---

# Modules

## Dashboard

Provides:

- Financial Summary
- Assets
- Net Income
- Open Flags
- Unmatched Transactions
- Activity Overview

## Clients

Provides:

- Client Search
- Client Switching
- Client Pinning

## Statements

Provides:

- Balance Sheet
- Income Statement
- Cash Flow Statement

## Reconcile

Provides:

- Unreconciled Transactions
- Bank Feed Matching
- Manual Override
- Flagging Workflow

## Reports

Provides:

- Report Builder
- Live Preview
- CSV Export
- Template Saving

## Flags

Provides:

- Issue Tracking
- Priority Management
- Assignment Information

## Audit

Provides:

- Activity Logs
- User Actions
- System Tracking

---

# Demo Accounts

Use the following credentials:

### Admin

```text
admin@ledgerline.com
123456
```

### Senior Accountant

```text
senior@ledgerline.com
123456
```

### Junior Accountant

```text
junior@ledgerline.com
123456
```

---

# Project Structure

```text
src
│
├── assets
│
├── components
│   ├── AppLayout.jsx
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── StatCard.jsx
│   └── common
│
├── pages
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Clients.jsx
│   ├── Statements.jsx
│   ├── Reconcile.jsx
│   ├── Reports.jsx
│   ├── Flags.jsx
│   └── Audit.jsx
│
├── hooks
│   ├── useApp.js
│   └── useRoute.js
│
├── services
│   └── authService.js
│
├── store
│   ├── AppStore.jsx
│   └── AppContext.js
│
├── constants
│   └── permissions.js
│
├── utils
│   └── helpers.js
│
├── data
│   ├── users.json
│   ├── clients.json
│   ├── statements.json
│   ├── reports.json
│   ├── flags.json
│   ├── audit.json
│   ├── transactions.json
│   └── bankFeeds.json
│
├── App.jsx
└── main.jsx
```

---

# Where Is The Data Stored?

All demo business data is stored inside:

```text
src/data/
```

Example files:

```text
users.json
clients.json
statements.json
reports.json
flags.json
audit.json
transactions.json
bankFeeds.json
```

The application currently reads data directly from these JSON files.

Example:

```js
import users from "../data/users.json";
```

---

# API Ready Design

The application is structured so that JSON files can later be replaced by APIs.

Current:

```js
import clients from "../data/clients.json";
```

Future:

```js
const { data } = await api.get("/clients");
```

No UI changes will be required.

---

# State Management

Application state is managed using:

```text
Context API
useReducer
Custom Hooks
```

Example:

```js
const { state, dispatch } = useApp();
```

---

# Authentication Flow

```text
User Login
      ↓
Generate Demo Token
      ↓
Store Token In Local Storage
      ↓
Allow Protected Pages
      ↓
Refresh Persists Session
      ↓
Logout Removes Token
```

---

# Responsive Design

The application supports:

- Mobile
- Tablet
- Laptop
- Desktop

Responsive features:

- Mobile Navigation
- Responsive Cards
- Responsive Tables
- Flexible Grid Layouts
- Adaptive Spacing

---

# Development

Install packages:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Assessment Coverage

✔ Authentication

✔ Local Storage Session Management

✔ Route Protection

✔ Role-Based Permissions

✔ Multi-Tenant Client Structure

✔ Reusable Components

✔ Custom Hooks

✔ Context API

✔ Responsive Layout

✔ Dummy Business Data

✔ Financial Statements

✔ Reconciliation Workflow

✔ Reporting Module

✔ Audit Tracking

✔ API-Ready Architecture

✔ Professional Folder Structure

✔ Clean Frontend Architecture

---

# Future Backend Integration

The frontend has been designed to support future integration with:

- FastAPI
- Node.js
- PostgreSQL
- JWT Authentication
- Real Reporting APIs
- Real Audit Services
- Multi-Tenant Databases

No major frontend refactoring will be required when a backend becomes available.
