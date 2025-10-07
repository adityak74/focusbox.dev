import { Settings } from 'lucide-react'
import { useFocusBox } from '../context/FocusBoxContext'

function Header() {
  const { dispatch, actions } = useFocusBox()

  const handleSettingsClick = () => {
    dispatch({ type: actions.SHOW_SETTINGS_MODAL })
  }

  return (
    <header className="header" role="banner">
      <div className="header-content">
        <h1 className="logo">
          <a href="/" aria-label="FocusBox.dev - Home">
            <img src="/logo.png" alt="FocusBox" className="logo-image" />
            <span className="logo-text">FocusBox.dev</span>
          </a>
        </h1>
        <p className="tagline">Timebox your focus. Locally. Effortlessly.</p>
        <button
          className="settings-btn"
          onClick={handleSettingsClick}
          aria-label="Open settings"
          type="button"
        >
          <Settings size={20} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}

export default Header