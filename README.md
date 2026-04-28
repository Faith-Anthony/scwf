# Sunday Conversations with Fainoch - Landing Page

A premium, modern, fully responsive landing page built with React, TypeScript, and Tailwind CSS for the "Sunday Conversations with Fainoch" community.

## ✨ Features

### 🎨 Design
- **Premium Black & Gold Theme**: Minimal, elegant, and energetic
- **Smooth Animations**: Fade-in, slide-up, and hover effects
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode**: Premium dark-themed UI
- **Lazy Loading**: Sections load on scroll for optimal performance

### 🔧 Functionality
- **Form Validation**: Email and name validation
- **Google Sheets Integration**: Submissions saved to your sheet
- **WhatsApp Integration**: Join link revealed after form submission
- **Scroll Progress**: Visual indicator of page scroll position
- **Smooth Scrolling**: Enhanced UX with smooth transitions

### 📦 Sections
1. **Hero** - Eye-catching introduction
2. **About** - Community values
3. **Host** - Meet Fainoch
4. **Why Join** - Benefits showcase
5. **How It Works** - Three-step journey
6. **Topics** - Discussion topics
7. **Registration** - Form with Google Sheets sync

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Set Up Google Sheets Integration

1. Create a Google Sheet
2. Go to Extensions > Apps Script
3. Copy code from `GOOGLE_APPS_SCRIPT_SETUP.js`
4. Replace `YOUR_SHEET_ID_HERE` with your sheet ID
5. Deploy as Web App (Anyone access)
6. Copy the deployment URL
7. Update `src/components/Registration.tsx` with the URL

### 3. Add WhatsApp Link
1. Create your WhatsApp group
2. Get the invite link
3. Update `src/components/Registration.tsx` with the link

### 4. Start Development
```bash
npm run dev
```
Visit `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

## 📁 File Structure

```
src/
├── components/
│   ├── Hero.tsx              # Hero section
│   ├── About.tsx             # Community values
│   ├── Host.tsx              # Host intro
│   ├── WhyJoin.tsx           # Benefits
│   ├── HowItWorks.tsx        # Process
│   ├── Topics.tsx            # Topics
│   ├── Registration.tsx      # Form
│   └── ScrollProgress.tsx    # Progress bar
├── App.tsx                   # Main app
├── App.css                   # Global styles
├── index.css                 # Tailwind + custom
├── main.tsx                  # Entry point
└── index.html                # HTML template
```

## 🎯 Customization

### Colors
Edit `tailwind.config.js`:
```js
colors: {
  gold: '#D4AF37',  // Primary accent
}
```

### Fonts
Already configured with Inter and Poppins. Update in `tailwind.config.js` if needed.

### Content
- Edit component files directly
- Update text, emojis, and descriptions
- Modify animations in components

## 📱 Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔐 Configuration Required

Create a `.env.local` file (optional):
```
VITE_GOOGLE_SHEET_ENDPOINT=YOUR_URL
VITE_WHATSAPP_GROUP_LINK=YOUR_LINK
```

## 🌐 Deployment Options

### Netlify
1. Build: `npm run build`
2. Deploy the `dist` folder

### Vercel
```bash
vercel
```

### GitHub Pages
Update `vite.config.ts` with your repo name as `base`

## 📊 Form Submissions

All form submissions are stored in your Google Sheet with:
- Timestamp
- Full Name
- Email
- Phone (optional)
- Interest Message (optional)

## ✅ Browser Support
- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile browsers: Latest

## 🎨 Premium Design Features
- Gradient backgrounds with blur effects
- Smooth hover animations
- Elastic button interactions
- Progressive section reveals
- Loading states and feedback
- Error handling with messages
- Success confirmation screen

## 🔄 Performance
- Lazy loading components with React.lazy
- Intersection Observer for scroll animations
- Optimized CSS and transitions
- Efficient re-renders

## 📝 Configuration Files

- **SETUP_GUIDE.md** - Detailed setup instructions
- **GOOGLE_APPS_SCRIPT_SETUP.js** - Backend script template
- **.env.example** - Environment variables template
- **tailwind.config.js** - Tailwind CSS configuration
- **postcss.config.js** - PostCSS configuration

## 🤝 Getting Help

1. **Google Apps Script Issues**: Check Google Cloud Console logs
2. **Styling Issues**: Review Tailwind CSS docs
3. **Form Issues**: Check browser console for errors

## 🚀 Next Steps

1. Replace placeholder URLs with your actual endpoints
2. Customize content and colors
3. Deploy to your preferred platform
4. Share with your community!

---

**Built with ⚛️ React • 🎨 Tailwind CSS • ⚡ Vite**

Created for Sunday Conversations with Fainoch
