# Glamour's Beauty Salon Website

A modern, responsive website for Glamour's Beauty Salon built with React, TypeScript, and Tailwind CSS.

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Replace the placeholder values with your actual EmailJS credentials
   - For production deployment, set these environment variables in your hosting platform

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

The following environment variables are required for EmailJS integration:

- `VITE_EMAILJS_PUBLIC_KEY`: Your EmailJS public key
- `VITE_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
- `VITE_EMAILJS_SERVICE_ID`: Your EmailJS service ID

For production deployment, make sure to set these environment variables in your hosting platform's configuration.

## Deployment

When deploying to production:

1. Set the required environment variables in your hosting platform
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy the contents of the `dist` directory

## Features

- Online appointment booking
- Service showcase
- Team member profiles
- Admin dashboard
- Email notifications
- Responsive design

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- EmailJS