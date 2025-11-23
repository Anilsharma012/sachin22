import 'dotenv/config';
import { connectDB, disconnectDB } from '../config/database';
import { AdminUser } from '../models/AdminUser';
import { Project } from '../models/Project';
import { ContentSection } from '../models/ContentSection';
import { hashPassword } from '../utils/password';

const seed = async () => {
  try {
    await connectDB();
    console.log('Seeding database...');

    await AdminUser.deleteMany({});
    const adminPassword = await hashPassword(
      process.env.ADMIN_DEFAULT_PASSWORD || 'Sachin@123'
    );
    const admin = new AdminUser({
      email: process.env.ADMIN_DEFAULT_EMAIL || 'sachintakoria2204@gmail.com',
      passwordHash: adminPassword,
      role: 'owner',
    });
    await admin.save();
    console.log('Admin user created');

    await Project.deleteMany({});
    const projects = [
      {
        title: 'E-Commerce Platform',
        slug: 'e-commerce-platform',
        short_description: 'A full-featured e-commerce platform with payment integration',
        detailed_description:
          'Built with React, Node.js, and MongoDB. Features include product catalog, shopping cart, payment processing with Stripe, and admin dashboard.',
        tech_stack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'E-Commerce',
        cover_image_url: 'https://via.placeholder.com/400x300?text=E-Commerce',
        github_url: 'https://github.com/example/ecommerce',
        live_url: 'https://ecommerce.example.com',
        is_featured: true,
        display_order: 1,
        readme_content: `# E-Commerce Platform

## Features
- Product catalog with search and filtering
- Shopping cart management
- Payment integration with Stripe
- User authentication
- Admin dashboard

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Payment: Stripe

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`
`,
      },
      {
        title: 'Real Estate Management System',
        slug: 'real-estate-management',
        short_description: 'A property management and listing platform',
        detailed_description:
          'Complete solution for real estate agents and brokers with property listings, client management, and document handling.',
        tech_stack: ['React', 'TypeScript', 'Firebase', 'Google Maps API'],
        category: 'Real Estate',
        cover_image_url: 'https://via.placeholder.com/400x300?text=Real+Estate',
        github_url: 'https://github.com/example/realestate',
        live_url: 'https://realestate.example.com',
        is_featured: true,
        display_order: 2,
        readme_content: `# Real Estate Management System

## Features
- Property listings with detailed information
- Virtual tours integration
- Client management system
- Document upload and management
- Advanced search filters

## Technology
- React with TypeScript
- Firebase for authentication and database
- Google Maps API integration
- Tailwind CSS for styling
`,
      },
      {
        title: 'Task Management App',
        slug: 'task-management-app',
        short_description: 'A collaborative task and project management application',
        detailed_description:
          'Team collaboration tool for task tracking, project management, and team communication.',
        tech_stack: ['Vue.js', 'Node.js', 'PostgreSQL', 'WebSocket'],
        category: 'Web Apps',
        cover_image_url: 'https://via.placeholder.com/400x300?text=Task+Manager',
        github_url: 'https://github.com/example/taskmanager',
        is_featured: false,
        display_order: 3,
        readme_content: `# Task Management App

## Overview
A modern task management application for teams to collaborate effectively.

## Key Features
- Real-time task updates
- Team collaboration
- Sprint planning
- Progress tracking
- Notifications
`,
      },
    ];

    await Project.insertMany(projects);
    console.log('Projects seeded');

    await ContentSection.deleteMany({});
    const contentSections = [
      {
        key: 'hero',
        content: {
          title: 'Hi, I\'m Sachin Takoria',
          subtitle: 'Full Stack Developer | MERN Specialist',
          ctas: [
            { text: 'View My Work', href: '/projects' },
            { text: 'Get in Touch', href: '/contact' },
          ],
        },
      },
      {
        key: 'about',
        content: {
          summary:
            'I\'m a passionate full-stack developer with expertise in modern web technologies.',
          highlights: [
            'Built 20+ web applications',
            'Expert in MERN stack',
            'AWS certified',
            'Open source contributor',
          ],
        },
      },
      {
        key: 'skills',
        content: {
          frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
          devops: ['Docker', 'AWS', 'GitHub Actions', 'Nginx'],
        },
      },
      {
        key: 'contact',
        content: {
          email: 'sachintakoria2204@gmail.com',
          phone: '+91 7015242844',
          address: 'India',
          whatsapp_number: '7015242844',
        },
      },
      {
        key: 'social',
        content: {
          github: 'https://github.com/sachintakoria',
          linkedin: 'https://linkedin.com/in/sachintakoria',
          twitter: 'https://twitter.com/sachintakoria',
          instagram: 'https://instagram.com/sachintakoria',
        },
      },
      {
        key: 'banners',
        content: {
          items: [
            {
              image_url: 'https://via.placeholder.com/1200x400?text=Banner+1',
              alt: 'Portfolio Banner 1',
              link_url: '/projects',
              order: 1,
            },
            {
              image_url: 'https://via.placeholder.com/1200x400?text=Banner+2',
              alt: 'Portfolio Banner 2',
              link_url: '/about',
              order: 2,
            },
          ],
        },
      },
    ];

    await ContentSection.insertMany(contentSections);
    console.log('Content sections seeded');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await disconnectDB();
  }
};

seed();
