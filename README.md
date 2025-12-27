# Portfolio Website 🚀

A modern, responsive portfolio website built with Next.js, featuring smooth animations, Firebase integration, and a clean design aesthetic.

**Live Site:** [abhijith-j-nair.vercel.app](https://abhijith-j-nair.vercel.app)

---

## ✨ Features

- **Smooth Animations** - GSAP-powered transitions and scroll effects
- **Responsive Design** - Optimized for all screen sizes
- **Contact Form** - Firebase-integrated contact system
- **Modern UI** - Clean white/beige theme with black accents
- **Fast Performance** - Next.js optimizations and lazy loading
- **SEO Ready** - Meta tags and structured data

---

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 14** - React framework with SSR
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **GSAP** - Professional-grade animations
- **Firebase** - Backend and database

### Key Libraries
- `gsap` - Animation library with ScrollTrigger
- `firebase` - Backend services and Firestore
- `react-icons` - Icon components
- `next/image` - Optimized images

---

## 📂 Project Structure

```
Portfolio_Site/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── firebase.js
│   └── fonts/
├── public/
├── FIREBASE_SETUP.md
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- Firebase account (for contact form)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ACE-Z666/Portfolio_Site.git
cd Portfolio_Site
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase**
- Create a Firebase project
- Copy your Firebase config
- Add to `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed instructions.

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
```
http://localhost:3000
```

---

## 🎨 Customization

### Update Personal Information

**Hero Section** (`src/components/Hero.tsx`)
```typescript
const name = "Your Name";
const designation = "Your Title";
```

**About Section** (`src/components/About.tsx`)
```typescript
const bio = "Your bio here...";
```

**Projects** (`src/components/Projects.tsx`)
```typescript
const projects = [
  {
    title: "Project Name",
    description: "Description...",
    technologies: ["React", "Node.js"],
    liveUrl: "https://...",
    githubUrl: "https://github.com/..."
  }
];
```

**Skills** (`src/components/Skills.tsx`)
```typescript
const skills = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 }
];
```

### Theme Customization

**Colors** (`tailwind.config.js`)
```javascript
colors: {
  primary: {
    50: '#fefefe',
    900: '#111111'
  }
}
```

**Fonts** (`src/app/globals.css`)
```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/CustomFont.woff2');
}
```

---

## 📱 Sections

1. **Hero** - Introduction with animated text and CTA buttons
2. **About** - Personal bio and professional overview
3. **Projects** - Portfolio showcase with links
4. **Skills** - Technical skills with proficiency levels
5. **Testimonials** - Client reviews carousel
6. **Contact** - Working form with Firebase storage
7. **Footer** - Quick links and social media

---

## 🎭 Animations

GSAP animations include:
- Smooth scroll effects with ScrollTrigger
- Stagger animations on element entrance
- Magnetic button hover effects
- Loading screen transitions
- Card hover 3D transforms
- Progress bar animations

---

## 🔧 Firebase Integration

### Contact Form
- Stores submissions in Firestore
- Real-time validation
- Success/error notifications
- Email and message storage

### Database Structure
```javascript
{
  name: string,
  email: string,
  subject: string,
  message: string,
  timestamp: serverTimestamp(),
  status: "unread"
}
```

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
npm run build
firebase deploy
```

### Other Options
- Netlify
- Render
- Railway
- AWS Amplify

---

## ⚡ Performance

- Next.js automatic optimizations
- Image optimization with next/image
- Code splitting and lazy loading
- Tailwind CSS purging
- GSAP performance best practices

---

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS 12+, Android 8+)

---

## 🐛 Troubleshooting

**Issue: Animations not working**
```bash
# Solution: Check GSAP installation
npm install gsap
```

**Issue: Firebase errors**
```bash
# Solution: Verify environment variables
# Check .env.local file exists and has correct values
```

**Issue: Build errors**
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Abhijith J Nair**

- GitHub: [@ACE-Z666](https://github.com/ACE-Z666)
- Portfolio: [abhijith-j-nair.vercel.app](https://abhijith-j-nair.vercel.app)
- Email: abhijithjnair4321@gmail.com

---

## 🙏 Acknowledgments

- GSAP for smooth animations
- Firebase for backend services
- Next.js for the powerful framework
- Tailwind CSS for styling
- Vercel for hosting

---

<div align="center">

**Built with ❤️ using Next.js and TypeScript**

</div>
