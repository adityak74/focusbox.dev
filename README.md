# FocusBox.dev

> Timebox your focus. Locally. Effortlessly.

A minimal, elegant, single-page web app built with React and Vite for local-first productivity that combines visual task organization with timeboxing/Pomodoro techniques.

## ✨ Features

- **Visual Task Management**: Organize tasks in customizable columns (Code, Review, Comment)
- **Built-in Timer**: Pomodoro (25min) and custom timebox sessions
- **Local-First**: All data stored in browser localStorage, no server required
- **Task Persistence**: Resume unfinished tasks from previous days
- **Drag & Drop**: Smooth task movement between columns and to timer
- **Dark Mode**: Toggle between light and dark themes
- **PWA Ready**: Install as a desktop/mobile app, works offline
- **Responsive**: Works beautifully on desktop and tablet
- **Modern Stack**: Built with React 18 + Vite for optimal performance

## 🚀 Quick Start

### Development

1. **Clone** this repository
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start development server**:
   ```bash
   npm run dev
   ```
4. **Open** http://localhost:3000 in your browser

### Production Build

```bash
npm run build
npm run preview
```

## 📱 Install as PWA

1. Open FocusBox.dev in Chrome/Edge/Safari
2. Click the install icon in the address bar
3. Choose "Install" to add to your desktop/home screen
4. Launch like any other app!

## 🎯 How to Use

### Task Management
- **Add Tasks**: Click the `+` button in any column
- **Edit Tasks**: Click the edit icon (✏️) on any task
- **Move Tasks**: Drag tasks between columns
- **Delete Tasks**: Click the delete icon (🗑️)

### Timer Sessions
- **Start Timer**: Click "Start" on the timer widget
- **Add Task to Timer**:
  - Drag a task onto the timer widget, or
  - Click the timer icon (⏱️) on any task
- **Custom Duration**: Select "Custom" and set your preferred minutes
- **Auto-advance**: Automatically moves to next task when timer completes

### Settings
- **Dark Mode**: Toggle in settings (⚙️)
- **Auto-advance**: Automatically start next task after completion
- **Sound Notifications**: Audio alert when timer finishes
- **Clear Data**: Reset all tasks and settings

## 🚀 Deploy to Cloudflare Pages

1. **Connect your repository** to Cloudflare Pages
2. **Set build settings**:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: 18 or higher
3. **Deploy**: Cloudflare Pages will automatically build and deploy your app

### Environment Variables
No environment variables required - the app runs entirely client-side!

## 🏗️ Technical Details

- **Frontend**: React 18 with Vite
- **State Management**: React Context + useReducer
- **Storage**: Browser localStorage
- **Styling**: Modern CSS with CSS Grid/Flexbox
- **PWA**: Vite PWA plugin with Workbox
- **Build Tool**: Vite for fast development and optimized builds
- **Icons**: Lucide React for consistent iconography
- **Responsive**: Mobile-first design
- **Accessibility**: Keyboard navigation and screen reader support

## 📁 Project Structure

```
focusbox.dev/
├── public/             # Static assets
│   ├── favicon.svg     # App icon
├── src/
│   ├── components/     # React components
│   │   ├── Header.jsx
│   │   ├── Workspace.jsx
│   │   ├── TaskColumn.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TimerWidget.jsx
│   │   ├── SettingsModal.jsx
│   │   ├── TaskModal.jsx
│   │   ├── Footer.jsx
│   │   └── Notification.jsx
│   ├── context/        # React Context for state management
│   │   └── FocusBoxContext.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # React entry point
│   └── index.css       # Global styles
├── _headers            # Cloudflare Pages headers
├── _redirects          # Cloudflare Pages redirects
├── wrangler.toml       # Cloudflare configuration
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies and scripts
├── CLAUDE.md           # Development documentation
└── README.md           # This file
```

## 🔧 Development

The app is built with modern React and Vite:

1. **Hot Module Replacement**: Instant updates during development
2. **Fast Builds**: Optimized production builds with code splitting
3. **PWA**: Automatic service worker generation
4. **Modern JavaScript**: ES modules and latest syntax support

## 🌟 Key Features Explained

### Local-First Design
- No internet required after first load
- All data stays on your device
- Privacy-focused - no tracking or data collection
- Works completely offline

### Intelligent Task Management
- Tasks from previous days appear with subtle visual cues
- Automatic task persistence across sessions
- Smart timer integration with drag-and-drop

### Focus-Oriented Timer
- Classic Pomodoro (25min) preset
- Custom duration support
- Visual progress indicator
- Audio notifications
- Task association and auto-advance

## 🎨 Customization

The app is designed to be easily customizable:

- **Colors**: Modify CSS custom properties in `styles.css`
- **Columns**: Add/modify column names in JavaScript
- **Timer Durations**: Adjust default Pomodoro length
- **Styling**: All styles contained in single CSS file

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! This is a minimal project focused on simplicity and local-first functionality.

---

**FocusBox.dev** — Local, Minimal, and Yours.