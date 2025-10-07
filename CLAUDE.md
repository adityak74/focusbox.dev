# FocusBox.dev — Development Documentation

## Project Overview
FocusBox.dev is a minimal, elegant, single-page web app for local-first productivity. It combines visual task organization with timeboxing/Pomodoro techniques.

## Core Features
- **Visual Task Management**: Organize tasks in customizable columns (Code, Review, Comment, etc.)
- **Built-in Timer**: Pomodoro (25min) and custom timebox sessions
- **Local-First**: All data stored in browser localStorage, no server required
- **Task Persistence**: Resume unfinished tasks from previous days
- **Offline Ready**: PWA with service worker for full offline functionality

## Design Principles
- **Minimalist**: Clean, whitespace-heavy interface inspired by Notion/Linear
- **Typography**: Modern sans-serif (Inter, Poppins, or Space Grotesk)
- **Colors**: Neutral light mode (whites, light grays) with accent color (teal/violet)
- **Responsive**: Works on desktop and tablet
- **Subtle Animations**: Smooth drag-and-drop and timer transitions

## Technical Architecture
- **Frontend**: Vanilla JS for lightweight performance
- **Storage**: Browser localStorage for data persistence
- **Styling**: Modern CSS with grid/flexbox
- **PWA**: Service worker for offline functionality
- **Drag & Drop**: Native HTML5 drag and drop API

## Page Structure

### 1. Header/Navbar
- Title: "FocusBox.dev"
- Settings icon (⚙️) for theme and timer preferences
- Tagline: "Timebox your focus. Locally. Effortlessly."

### 2. Main Workspace (3 Columns)
- Default columns: Code, Review, Comment (user customizable)
- Draggable task cards with:
  - Title
  - Optional notes
  - Status tags (Today, Tomorrow, Backlog)
  - Timestamp for previous-day tasks

### 3. Timer Component
- Countdown display (mm:ss)
- Start/Pause/Reset controls
- Pomodoro vs Custom duration toggle
- Task association (drag task to timer)
- Audio notification on completion
- Auto-advance to next task option

### 4. Footer
- Branding: "FocusBox.dev — Local, Minimal, and Yours."
- Data management: Clear all data option

## Key Functionality
- **Task Management**: Create, edit, move, and delete tasks
- **Timer Integration**: Associate tasks with timer sessions
- **Data Persistence**: Auto-save to localStorage
- **State Recovery**: Resume timer and tasks after refresh
- **Dark Mode**: Toggle between light/dark themes
- **Settings**: Customize Pomodoro duration and preferences

## Development Commands
- Development server: Use Live Server or similar for local development
- No build process required (vanilla JS/HTML/CSS)
- PWA testing: Test service worker and offline functionality

## File Structure
```
focusbox.dev/
├── index.html          # Main application page
├── styles.css          # All styling
├── script.js           # Core application logic
├── sw.js              # Service worker for PWA
├── manifest.json      # PWA manifest
├── assets/            # Icons and audio files
└── CLAUDE.md          # This documentation
```

## Priority Features for MVP
1. Basic task board with 3 columns
2. Task creation and drag-and-drop
3. Timer with Pomodoro preset
4. localStorage persistence
5. Responsive design
6. Dark mode toggle

## Future Enhancements
- Custom column creation
- Task templates
- Time tracking analytics
- Export/import functionality
- Keyboard shortcuts
- Advanced timer options