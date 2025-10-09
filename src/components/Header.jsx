import { Settings, Moon, Sun } from 'lucide-react'
import { useFocusBox } from '../context/FocusBoxContext'

function Header() {
  const { state, dispatch, actions } = useFocusBox()

  const handleSettingsClick = () => {
    dispatch({ type: actions.SHOW_SETTINGS_MODAL })
  }

  const handleThemeToggle = () => {
    dispatch({ type: actions.TOGGLE_DARK_MODE })
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
        <div className="header-actions">
          <button
            className="theme-toggle-btn"
            onClick={handleThemeToggle}
            aria-label={state.settings.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            type="button"
          >
            {state.settings.darkMode ? (
              <Sun size={20} aria-hidden="true" />
            ) : (
              <Moon size={20} aria-hidden="true" />
            )}
          </button>
          <button
            className="settings-btn"
            onClick={handleSettingsClick}
            aria-label="Open settings"
            type="button"
          >
            <Settings size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header