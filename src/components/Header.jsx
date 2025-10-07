import { Settings } from 'lucide-react'
import { useFocusBox } from '../context/FocusBoxContext'

function Header() {
  const { dispatch, actions } = useFocusBox()

  const handleSettingsClick = () => {
    dispatch({ type: actions.SHOW_SETTINGS_MODAL })
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">FocusBox.dev</h1>
        <p className="tagline">Timebox your focus. Locally. Effortlessly.</p>
        <button
          className="settings-btn"
          onClick={handleSettingsClick}
          aria-label="Open settings"
        >
          <Settings size={20} />
        </button>
      </div>
    </header>
  )
}

export default Header