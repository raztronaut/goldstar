# 🌟 Gold Star Tracker

A beautiful and intuitive application to track and celebrate achievements with a gold star system. Perfect for teams, families, classrooms, or any group where you want to recognize and motivate positive behavior.

## ✨ Features

- **⭐ Star Management** - Add and remove gold stars with optional reasons
- **👥 People Management** - Add and remove people from your tracking list
- **📊 Interactive Dashboard** - View stats, top performers, and recent activity
- **📋 Kanban-Style Table** - Sortable table with intuitive controls
- **💾 Auto-Save** - Data automatically saved to browser local storage
- **🌙 Dark Mode** - Built-in dark mode support
- **📱 Responsive Design** - Works perfectly on all devices
- **🚀 Real-time Updates** - Instant feedback and updates

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Geist Font](https://vercel.com/font) - Typography
- [ESLint](https://eslint.org/) - Code linting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd stickerapp
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser (or whatever port is shown in your terminal)

## 🎯 How to Use

1. **Add People**: Use the "Add New Person" form to add someone to your tracking list
2. **Give Stars**: Click the "+ Star" button next to anyone's name to give them a gold star
3. **Remove Stars**: Click the "- Star" button to remove a star (with optional reason)
4. **Sort & Filter**: Click column headers to sort by name, stars, date added, or last star date
5. **View Stats**: See overview statistics and top performers at the top of the dashboard
6. **Remove People**: Use the "Remove" button to completely remove someone from the list

## 💾 Data Storage

All data is automatically saved to your browser's local storage, so your star tracking persists between sessions. No account or server required!

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## 📁 Project Structure

```
src/
├── app/                      # App Router pages
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/              # React components
│   ├── add-person-form.tsx  # Form to add new people
│   ├── navigation.tsx       # Top navigation bar
│   ├── star-stats.tsx       # Statistics dashboard
│   └── star-table.tsx       # Main kanban-style table
├── hooks/                   # Custom React hooks
│   └── useStarData.ts       # Data management hook
├── types/                   # TypeScript type definitions
│   └── index.ts             # Star tracker interfaces
public/                      # Static assets
```

## 🎨 Customization

### Colors
The project uses Tailwind CSS with a custom color palette. You can modify colors in `tailwind.config.ts`.

### Typography
The project uses Geist fonts. You can change fonts in `src/app/layout.tsx`.

### Components
All components are in the `src/components` directory and are fully typed with TypeScript.

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms
The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Heroku
- AWS
- Google Cloud

## 📊 Performance

This template is optimized for Core Web Vitals:
- **LCP** - Optimized images and fonts
- **FID** - Minimal JavaScript bundle
- **CLS** - Proper layout shift prevention

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility classes
- [Vercel](https://vercel.com/) for the font and deployment platform
