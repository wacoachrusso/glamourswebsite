# Glamour's Beauty Salon Website

A modern, full-featured website for Glamour's Beauty Salon built with React, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Frontend Framework:** React 18.3.1 with TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **Email Service:** EmailJS
- **Build Tool:** Vite
- **Deployment:** Netlify

## 🛠️ Development Setup

1. **Clone the repository**

```bash
git clone [repository-url]
cd glamours-beauty-salon
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables**

Create a `.env` file in the root directory and add the following:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_SERVICE_ID=your_service_id
```

4. **Start development server**

```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── booking/       # Booking-related components
│   ├── dashboard/     # Admin dashboard components
│   └── home/         # Homepage components
├── contexts/          # React contexts
├── services/          # API and service functions
├── config/            # Configuration files
└── data/             # Static data and types
```

## 🔑 Key Features

- **Client-Facing Features**
  - Online booking system
  - Service showcase
  - Team member profiles
  - Contact information
  - Image gallery
  - Testimonials

- **Admin Dashboard**
  - Appointment management
  - Client management
  - Service tracking
  - Staff scheduling
  - Analytics and reporting
  - Communication tools

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## 🔒 Authentication

- Staff portal login
- Role-based access control
- Secure dashboard access

## 📧 Email Integration

- Appointment confirmations
- SMS notifications (via email-to-SMS gateways)
- Newsletter subscriptions
- Contact form submissions

## 🎨 Design System

- **Colors:**
  - Primary: Gold (#d4af37)
  - Secondary: Pink (#ffd1dc)
  - Dark: #4a1c40
  - Light: #fff5f7

- **Typography:**
  - Primary Font: Inter
  - Headings: Bold
  - Body: Regular

## 📦 Production Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🚀 Deployment

The site is configured for automatic deployment to Netlify:
- Production branch: main
- Build command: `npm run build`
- Publish directory: `dist`

## 🧪 Development Guidelines

1. **Code Style**
   - Use TypeScript for type safety
   - Follow React best practices
   - Implement proper error handling
   - Write meaningful component names
   - Use proper file structure

2. **Component Guidelines**
   - Keep components small and focused
   - Use proper prop typing
   - Implement error boundaries
   - Follow composition patterns
   - Use proper state management

3. **Performance**
   - Implement lazy loading
   - Optimize images
   - Use proper caching
   - Minimize bundle size
   - Implement code splitting

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributors

- Angie Padilla - Project Owner
- Development Team - StackBlitz

## 📞 Support

For Technical support, please contact:
- Email: info@glamoursbeauty.com
- Phone: (973) 344-5199 