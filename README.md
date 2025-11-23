# MERN Portfolio Application

A full-featured portfolio application built with MERN stack (MongoDB, Express, React, Node.js) with admin panel for content management.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Database Seeding](#database-seeding)
- [API Documentation](#api-documentation)
- [Admin Panel](#admin-panel)
- [WhatsApp Integration](#whatsapp-integration)

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Framer Motion** for animations
- **React Router** for navigation
- **React Query** for data fetching
- **React Hook Form** for form handling
- **Zod** for schema validation

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** for database
- **Mongoose** for ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Zod** for request validation
- **CORS** for cross-origin requests
- **Morgan** for logging
- **Express Rate Limit** for rate limiting

## Project Structure

```
.
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── App.tsx        # Main app component
│   └── package.json
├── server/                 # Backend application
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── services/      # Business logic
│   │   ├── validation/    # Zod schemas
│   │   ├── utils/         # Utility functions
│   │   ├── seeds/         # Database seeds
│   │   └── index.ts       # Server entry point
│   └── package.json
└── README.md
```

## Features

### Public Features
- **Home Page**: Hero section, featured projects, tech stack showcase
- **Projects Showcase**: Filterable grid by category, detailed project views
- **Project Details**: Full Markdown support with images, GIFs, code blocks, YouTube links
- **About Section**: Professional summary and highlights
- **Skills Section**: Organized by frontend, backend, and DevOps
- **Contact Form**: Message submission with WhatsApp notification (optional)
- **Responsive Design**: Mobile-first, works on all devices
- **Animations**: Smooth Framer Motion transitions

### Admin Panel
- **Authentication**: Secure login with JWT tokens
- **Dashboard**: Statistics overview (projects, featured, messages)
- **Projects Management**: CRUD operations with slug auto-generation
- **Content Management**: CMS-style editing for all sections (Hero, About, Skills, Banners, Contact, Social)
- **Message Management**: View contact form enquiries with quick WhatsApp reply option
- **Markdown Editor**: Full support for READMEs with images and code blocks

## Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **MongoDB Atlas** account (free tier available)
- **Git**

## Environment Setup

### MongoDB Atlas Setup
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with a strong password
4. Get your connection string (replace `<user>`, `<password>`, `<cluster>`)

### WhatsApp Cloud API (Optional)
To enable WhatsApp notifications for contact form submissions:
1. Get access to [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api)
2. Create a phone number ID
3. Generate an access token
4. Add environment variables (see below)

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd portfolio-app
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Setup Backend Environment
Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/portfolio
JWT_SECRET=your-super-secret-jwt-key
ADMIN_DEFAULT_EMAIL=sachintakoria2204@gmail.com
ADMIN_DEFAULT_PASSWORD=Sachin@123
WHATSAPP_TO_NUMBER=7015242844
WHATSAPP_API_KEY=your-whatsapp-api-key
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Important**: Never commit `.env` files with secrets.

### 4. Install Frontend Dependencies
```bash
cd ../client
npm install
```

### 5. Setup Frontend Environment
Create a `.env.local` file in the `client` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Running the Application

### Development Mode

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend App:**
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd server
npm run build
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## Database Seeding

Seed the database with sample data:

```bash
cd server
npm run seed
```

This will:
- Create a default admin user with credentials from env variables
- Insert 3 sample projects
- Setup 6 content sections (hero, about, skills, contact, social, banners)

### Default Admin Credentials
- **Email**: `sachintakoria2204@gmail.com`
- **Password**: `Sachin@123`

Change these immediately in the admin panel after first login.

## API Documentation

### Authentication
All admin endpoints require JWT token in `Authorization` header:
```
Authorization: Bearer <token>
```

### Public Endpoints

#### Projects
- `GET /api/projects` - List all projects (sorted by display_order)
- `GET /api/projects/:slug` - Get project details

#### Content
- `GET /api/content/:key` - Get content section (hero, about, skills, banners, contact, social)

#### Messages
- `POST /api/contact` - Submit contact form (rate-limited to 5 per minute per IP)

### Admin Endpoints

#### Authentication
- `POST /api/admin/auth/login` - Login with email/password

#### Projects
- `POST /api/admin/projects` - Create new project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

#### Content
- `PUT /api/admin/content/:key` - Update content section

#### Messages
- `GET /api/admin/messages` - List all enquiries (paginated, latest first)

## Admin Panel

Access the admin panel at `http://localhost:5173/admin/login`

### Admin Pages

1. **Dashboard** (`/admin`)
   - Overview statistics
   - Quick access to main features

2. **Projects** (`/admin/projects`)
   - List all projects with filters and search
   - Create/Edit/Delete projects
   - Auto-generate unique slugs

3. **Content** (`/admin/content`)
   - 6 editable sections (tabs)
   - Hero: title, subtitle, CTAs
   - About: summary, highlights
   - Skills: frontend, backend, DevOps
   - Banners: carousel items with order
   - Contact: email, phone, address, WhatsApp number
   - Social: links to social profiles

4. **Messages** (`/admin/messages`)
   - View all contact form submissions
   - Quick copy email
   - Direct WhatsApp reply button

## WhatsApp Integration

### Setup WhatsApp Cloud API

1. **Get WhatsApp Business Account**
   - Visit [Facebook Business Suite](https://business.facebook.com)
   - Create a WhatsApp Business Account

2. **Create Phone Number ID**
   - Register a phone number in WhatsApp Manager
   - Note the Phone Number ID

3. **Generate Access Token**
   - Go to [App Dashboard](https://developers.facebook.com)
   - Create a new app or use existing one
   - Create an access token with `whatsapp_business_messaging` permission
   - Note: Token expires, set up token refresh process

4. **Add to Environment**
   ```env
   WHATSAPP_API_KEY=your-access-token
   WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
   WHATSAPP_TO_NUMBER=recipient-phone-number (with country code)
   ```

### Message Format
When a contact form is submitted, WhatsApp message includes:
- Sender name
- Sender email
- Subject
- First 200 characters of message

If WhatsApp credentials are missing, messages are still saved but no notification is sent.

## Features Deep Dive

### Project Slug Generation
- Automatic slug generation from title (kebab-case)
- Unique slug enforcement with numeric suffixes
- Example: "My Awesome Project" → "my-awesome-project"

### Markdown Support in Project README
- Headings (H1-H6)
- Lists (ordered, unordered)
- Code blocks with syntax highlighting
- Links and images
- YouTube embeds (via links)
- GIFs (via image URLs)
- Tables
- Bold, italic, strikethrough

Example:
```markdown
# Project Title

## Description
This is an awesome project.

### Tech Stack
- React
- TypeScript
- MongoDB

[Live Demo](https://example.com)
[GitHub](https://github.com/example)

![Screenshot](https://example.com/image.jpg)
```

### Rate Limiting
Contact form endpoint is rate-limited to prevent spam:
- **Limit**: 5 requests per minute per IP
- **Response**: 429 Too Many Requests

### Authentication Flow
1. User submits credentials to `/api/admin/auth/login`
2. Server validates credentials and returns JWT token
3. Token stored in localStorage (client-side)
4. Token sent with every admin request in Authorization header
5. Server verifies token on protected routes
6. Invalid/expired tokens return 401 Unauthorized

## Troubleshooting

### MongoDB Connection Error
- Verify connection string in `.env`
- Check IP whitelist in MongoDB Atlas (add your IP)
- Ensure username and password are URL-encoded

### Port Already in Use
- Backend default: 5000
- Frontend default: 5173
- Change via environment variables or command flags

### CORS Errors
- Ensure `CORS_ORIGIN` matches your frontend URL
- Default: `http://localhost:5173`

### Admin Login Fails
- Verify credentials in `.env`
- Check if database is seeded (`npm run seed`)
- Check server logs for errors

## Building and Deployment

### Frontend Deployment
1. Build: `npm run build`
2. Output in `dist/` directory
3. Deploy to Netlify, Vercel, or any static host

### Backend Deployment
1. Build: `npm run build`
2. Set environment variables on hosting platform
3. Deploy to Heroku, Railway, AWS, or similar

Example with Netlify (frontend) and Railway (backend):
```
VITE_API_BASE_URL=https://api.example.com
```

## License

MIT

## Support

For issues or questions:
1. Check error logs
2. Review API documentation
3. Verify environment variables
4. Check MongoDB Atlas connection

## Future Enhancements

- [ ] Resume PDF parsing and auto-population
- [ ] Email notifications for contact forms
- [ ] Analytics dashboard
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] SEO optimization
- [ ] Performance monitoring
