import { FocusBoxProvider } from './context/FocusBoxContext'
import Header from './components/Header'
import Workspace from './components/Workspace'
import TimerWidget from './components/TimerWidget'
import SettingsModal from './components/SettingsModal'
import TaskModal from './components/TaskModal'
import Footer from './components/Footer'
import Notification from './components/Notification'

function App() {
  return (
    <FocusBoxProvider>
      <div className="app">
        <Header />
        <Workspace />
        <TimerWidget />
        <SettingsModal />
        <TaskModal />
        <Footer />
        <Notification />
      </div>
    </FocusBoxProvider>
  )
}

export default App