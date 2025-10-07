import { useState } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { useFocusBox } from '../context/FocusBoxContext'

function TimerWidget() {
  const { state, dispatch, actions } = useFocusBox()
  const [customMinutes, setCustomMinutes] = useState(25)
  const [selectedMode, setSelectedMode] = useState('25')

  const { timer } = state

  const handleStartPause = () => {
    if (timer.isRunning) {
      dispatch({ type: actions.PAUSE_TIMER })
    } else {
      dispatch({ type: actions.START_TIMER })
    }
  }

  const handleReset = () => {
    dispatch({ type: actions.RESET_TIMER })
  }

  const handleModeSelect = (mode) => {
    setSelectedMode(mode)
    if (mode !== 'custom') {
      dispatch({
        type: actions.SET_TIMER_DURATION,
        payload: { minutes: parseInt(mode) }
      })
    }
  }

  const handleCustomSet = () => {
    if (customMinutes && customMinutes > 0) {
      dispatch({
        type: actions.SET_TIMER_DURATION,
        payload: { minutes: customMinutes }
      })
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.style.background = 'rgba(5, 150, 105, 0.1)'
  }

  const handleDragLeave = () => {
    document.querySelector('.timer-widget').style.background = ''
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.style.background = ''

    const taskId = e.dataTransfer.getData('text/plain')
    if (taskId) {
      const task = state.tasks.find(t => t.id === taskId)
      if (task) {
        dispatch({
          type: actions.SET_TIMER_TASK,
          payload: { task }
        })
      }
    }
  }

  // Format time display
  const minutes = Math.floor(timer.timeLeft / 60)
  const seconds = timer.timeLeft % 60
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  // Calculate progress
  const progress = ((timer.duration - timer.timeLeft) / timer.duration) * 100

  return (
    <div
      className={`timer-widget ${timer.isRunning ? 'active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="timer-header">
        <h3 className="timer-title">Focus Timer</h3>
        <div className="timer-task">
          {timer.currentTask ? timer.currentTask.title : ''}
        </div>
      </div>

      <div className="timer-display">
        <div className="time-display">{timeString}</div>
        <div className="timer-progress">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="timer-controls">
        <button
          className="timer-btn primary"
          onClick={handleStartPause}
        >
          {timer.isRunning ? (
            <>
              <Pause size={16} />
              Pause
            </>
          ) : (
            <>
              <Play size={16} />
              Start
            </>
          )}
        </button>
        <button
          className="timer-btn secondary"
          onClick={handleReset}
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="timer-options">
        <button
          className={`timer-option ${selectedMode === '25' ? 'active' : ''}`}
          onClick={() => handleModeSelect('25')}
        >
          Pomodoro (25m)
        </button>
        <button
          className={`timer-option ${selectedMode === 'custom' ? 'active' : ''}`}
          onClick={() => handleModeSelect('custom')}
        >
          Custom
        </button>
      </div>

      {selectedMode === 'custom' && (
        <div className="custom-duration">
          <input
            type="number"
            min="1"
            max="120"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(parseInt(e.target.value))}
            placeholder="Minutes"
          />
          <button onClick={handleCustomSet}>Set</button>
        </div>
      )}
    </div>
  )
}

export default TimerWidget