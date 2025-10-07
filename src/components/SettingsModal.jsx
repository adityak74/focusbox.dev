import { X } from 'lucide-react'
import { useFocusBox } from '../context/FocusBoxContext'

function SettingsModal() {
  const { state, dispatch, actions } = useFocusBox()

  const handleClose = () => {
    dispatch({ type: actions.HIDE_SETTINGS_MODAL })
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleDarkModeToggle = (e) => {
    dispatch({
      type: actions.UPDATE_SETTINGS,
      payload: { darkMode: e.target.checked }
    })
  }

  const handleAutoAdvanceToggle = (e) => {
    dispatch({
      type: actions.UPDATE_SETTINGS,
      payload: { autoAdvance: e.target.checked }
    })
  }

  const handleSoundToggle = (e) => {
    dispatch({
      type: actions.UPDATE_SETTINGS,
      payload: { soundNotifications: e.target.checked }
    })
  }

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      dispatch({ type: actions.CLEAR_ALL_DATA })
      handleClose()
    }
  }

  if (!state.ui.showSettingsModal) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2>Settings</h2>
          <button
            className="close-btn"
            onClick={handleClose}
            aria-label="Close settings"
          >
            <X size={20} />
          </button>
        </div>
        <div className="modal-content">
          <div className="setting-group">
            <label className="setting-label">
              <span>Dark Mode</span>
              <input
                type="checkbox"
                checked={state.settings.darkMode}
                onChange={handleDarkModeToggle}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-group">
            <label className="setting-label">
              <span>Auto-advance to next task</span>
              <input
                type="checkbox"
                checked={state.settings.autoAdvance}
                onChange={handleAutoAdvanceToggle}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-group">
            <label className="setting-label">
              <span>Sound notifications</span>
              <input
                type="checkbox"
                checked={state.settings.soundNotifications}
                onChange={handleSoundToggle}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-group">
            <button
              className="danger-btn"
              onClick={handleClearData}
            >
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal