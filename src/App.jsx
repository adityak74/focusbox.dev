import { FocusBoxProvider } from './context/FocusBoxContext'
import Header from './components/Header'
import Workspace from './components/Workspace'
import TimerWidget from './components/TimerWidget'
import SettingsModal from './components/SettingsModal'
import TaskModal from './components/TaskModal'
import Footer from './components/Footer'
import Notification from './components/Notification'
import Privacy from './components/Privacy'

function App() {
  // Simple routing based on current path
  const currentPath = window.location.pathname
  
  // If we're on the privacy page, show only the Privacy component
  if (currentPath === '/privacy') {
    return <Privacy />
  }
  
  // Otherwise, show the main app
  return (
    <FocusBoxProvider>
      <div className="app">
        <Header />
        <main className="main-content" role="main">
          <Workspace />
          <TimerWidget />
        </main>
        <SettingsModal />
        <TaskModal />
        <Footer />
        <Notification />
      </div>
    </FocusBoxProvider>
  )
}

export default App