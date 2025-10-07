import React, { createContext, useContext, useReducer, useEffect } from 'react'

const FocusBoxContext = createContext()

// Initial state
const initialState = {
  tasks: [],
  timer: {
    isRunning: false,
    timeLeft: 25 * 60, // 25 minutes in seconds
    duration: 25 * 60,
    currentTask: null,
    interval: null
  },
  settings: {
    darkMode: false,
    autoAdvance: true,
    soundNotifications: true,
    pomodoroMinutes: 25
  },
  ui: {
    showSettingsModal: false,
    showTaskModal: false,
    taskModalData: null,
    currentColumn: 'code'
  }
}

// Action types
const ACTIONS = {
  // Tasks
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  MOVE_TASK: 'MOVE_TASK',
  LOAD_TASKS: 'LOAD_TASKS',

  // Timer
  START_TIMER: 'START_TIMER',
  PAUSE_TIMER: 'PAUSE_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  TICK_TIMER: 'TICK_TIMER',
  SET_TIMER_DURATION: 'SET_TIMER_DURATION',
  SET_TIMER_TASK: 'SET_TIMER_TASK',
  CLEAR_TIMER_TASK: 'CLEAR_TIMER_TASK',
  TIMER_COMPLETE: 'TIMER_COMPLETE',

  // Settings
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',

  // UI
  SHOW_SETTINGS_MODAL: 'SHOW_SETTINGS_MODAL',
  HIDE_SETTINGS_MODAL: 'HIDE_SETTINGS_MODAL',
  SHOW_TASK_MODAL: 'SHOW_TASK_MODAL',
  HIDE_TASK_MODAL: 'HIDE_TASK_MODAL',

  // Data
  CLEAR_ALL_DATA: 'CLEAR_ALL_DATA'
}

// Reducer function
function focusBoxReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK: {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title.trim(),
        notes: action.payload.notes?.trim() || '',
        tag: action.payload.tag || 'today',
        column: action.payload.column || 'code',
        createdAt: new Date().toISOString(),
        completedAt: null
      }
      return {
        ...state,
        tasks: [...state.tasks, newTask]
      }
    }

    case ACTIONS.UPDATE_TASK: {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        )
      }
    }

    case ACTIONS.DELETE_TASK: {
      const newState = {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id)
      }

      // Clear timer if this task was active
      if (state.timer.currentTask && state.timer.currentTask.id === action.payload.id) {
        newState.timer = {
          ...state.timer,
          currentTask: null
        }
      }

      return newState
    }

    case ACTIONS.MOVE_TASK: {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, column: action.payload.newColumn }
            : task
        )
      }
    }

    case ACTIONS.START_TIMER: {
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: true
        }
      }
    }

    case ACTIONS.PAUSE_TIMER: {
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false
        }
      }
    }

    case ACTIONS.RESET_TIMER: {
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false,
          timeLeft: state.timer.duration
        }
      }
    }

    case ACTIONS.TICK_TIMER: {
      const newTimeLeft = state.timer.timeLeft - 1

      if (newTimeLeft <= 0) {
        return {
          ...state,
          timer: {
            ...state.timer,
            isRunning: false,
            timeLeft: 0
          }
        }
      }

      return {
        ...state,
        timer: {
          ...state.timer,
          timeLeft: newTimeLeft
        }
      }
    }

    case ACTIONS.SET_TIMER_DURATION: {
      const duration = action.payload.minutes * 60
      return {
        ...state,
        timer: {
          ...state.timer,
          duration,
          timeLeft: duration,
          isRunning: false
        }
      }
    }

    case ACTIONS.SET_TIMER_TASK: {
      return {
        ...state,
        timer: {
          ...state.timer,
          currentTask: action.payload.task
        }
      }
    }

    case ACTIONS.CLEAR_TIMER_TASK: {
      return {
        ...state,
        timer: {
          ...state.timer,
          currentTask: null
        }
      }
    }

    case ACTIONS.TIMER_COMPLETE: {
      let newState = { ...state }

      // Mark current task as completed if exists
      if (state.timer.currentTask) {
        newState.tasks = state.tasks.map(task =>
          task.id === state.timer.currentTask.id
            ? { ...task, completedAt: new Date().toISOString() }
            : task
        )
      }

      // Auto-advance to next task if enabled
      if (state.settings.autoAdvance && state.timer.currentTask) {
        const currentColumn = state.timer.currentTask.column
        const columnTasks = newState.tasks
          .filter(task => task.column === currentColumn && !task.completedAt)

        if (columnTasks.length > 0) {
          newState.timer = {
            ...state.timer,
            currentTask: columnTasks[0],
            isRunning: false,
            timeLeft: state.timer.duration
          }
        } else {
          newState.timer = {
            ...state.timer,
            currentTask: null,
            isRunning: false,
            timeLeft: state.timer.duration
          }
        }
      } else {
        newState.timer = {
          ...state.timer,
          currentTask: null,
          isRunning: false,
          timeLeft: state.timer.duration
        }
      }

      return newState
    }

    case ACTIONS.UPDATE_SETTINGS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      }
    }

    case ACTIONS.TOGGLE_DARK_MODE: {
      return {
        ...state,
        settings: {
          ...state.settings,
          darkMode: !state.settings.darkMode
        }
      }
    }

    case ACTIONS.SHOW_SETTINGS_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          showSettingsModal: true
        }
      }
    }

    case ACTIONS.HIDE_SETTINGS_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          showSettingsModal: false
        }
      }
    }

    case ACTIONS.SHOW_TASK_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          showTaskModal: true,
          taskModalData: action.payload || null,
          currentColumn: action.payload?.column || state.ui.currentColumn
        }
      }
    }

    case ACTIONS.HIDE_TASK_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          showTaskModal: false,
          taskModalData: null
        }
      }
    }

    case ACTIONS.CLEAR_ALL_DATA: {
      // Clear localStorage
      try {
        localStorage.removeItem('focusbox-tasks')
        localStorage.removeItem('focusbox-settings')
        localStorage.removeItem('focusbox-timer')
      } catch (error) {
        console.error('Error clearing localStorage:', error)
      }

      return {
        ...initialState,
        settings: {
          ...initialState.settings,
          darkMode: false
        }
      }
    }

    default:
      return state
  }
}

// Custom hook to use the context
export function useFocusBox() {
  const context = useContext(FocusBoxContext)
  if (!context) {
    throw new Error('useFocusBox must be used within a FocusBoxProvider')
  }
  return context
}

// Function to initialize state with localStorage data
function initializeState() {
  try {
    const savedTasks = localStorage.getItem('focusbox-tasks')
    const savedSettings = localStorage.getItem('focusbox-settings')
    const savedTimer = localStorage.getItem('focusbox-timer')

    let loadedState = { ...initialState }

    if (savedTasks) {
      loadedState.tasks = JSON.parse(savedTasks)
    }

    if (savedSettings) {
      loadedState.settings = { ...initialState.settings, ...JSON.parse(savedSettings) }
    }

    if (savedTimer) {
      const timerData = JSON.parse(savedTimer)
      const now = Date.now()
      const lastSaved = timerData.lastSaved || 0
      const elapsedSeconds = Math.floor((now - lastSaved) / 1000)

      // Check if timer was running recently (within last 10 seconds)
      const wasRecentlyRunning = timerData.isRunning && elapsedSeconds < 10

      let adjustedTimeLeft = timerData.timeLeft

      // If timer was running, subtract elapsed time
      if (wasRecentlyRunning && elapsedSeconds > 0) {
        adjustedTimeLeft = Math.max(0, timerData.timeLeft - elapsedSeconds)
      }

      loadedState.timer = {
        ...initialState.timer,
        ...timerData,
        timeLeft: adjustedTimeLeft,
        isRunning: wasRecentlyRunning && adjustedTimeLeft > 0
      }
    }

    return loadedState
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return initialState
  }
}

// Provider component
export function FocusBoxProvider({ children }) {
  const [state, dispatch] = useReducer(focusBoxReducer, null, initializeState)

  // Save data to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('focusbox-tasks', JSON.stringify(state.tasks))
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error)
    }
  }, [state.tasks])

  useEffect(() => {
    try {
      localStorage.setItem('focusbox-settings', JSON.stringify(state.settings))
    } catch (error) {
      console.error('Error saving settings to localStorage:', error)
    }
  }, [state.settings])

  useEffect(() => {
    try {
      localStorage.setItem('focusbox-timer', JSON.stringify({
        timeLeft: state.timer.timeLeft,
        duration: state.timer.duration,
        currentTask: state.timer.currentTask,
        isRunning: state.timer.isRunning,
        lastSaved: Date.now()
      }))
    } catch (error) {
      console.error('Error saving timer to localStorage:', error)
    }
  }, [state.timer.timeLeft, state.timer.duration, state.timer.currentTask, state.timer.isRunning])

  // Apply dark mode
  useEffect(() => {
    if (state.settings.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [state.settings.darkMode])

  // Timer interval management
  useEffect(() => {
    let interval = null

    if (state.timer.isRunning && state.timer.timeLeft > 0) {
      interval = setInterval(() => {
        dispatch({ type: ACTIONS.TICK_TIMER })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [state.timer.isRunning, state.timer.timeLeft])

  // Handle timer completion
  useEffect(() => {
    if (state.timer.timeLeft === 0 && state.timer.isRunning === false && state.timer.currentTask) {
      // Play sound notification
      if (state.settings.soundNotifications) {
        playNotificationSound()
      }

      // Dispatch timer complete action
      dispatch({ type: ACTIONS.TIMER_COMPLETE })
    }
  }, [state.timer.timeLeft, state.timer.isRunning, state.timer.currentTask, state.settings.soundNotifications])

  // Update page title based on timer
  useEffect(() => {
    if (state.timer.isRunning) {
      const minutes = Math.floor(state.timer.timeLeft / 60)
      const seconds = state.timer.timeLeft % 60
      const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      document.title = `${timeString} - FocusBox.dev`
    } else {
      document.title = 'FocusBox.dev — Timebox your focus. Locally. Effortlessly.'
    }
  }, [state.timer.isRunning, state.timer.timeLeft])

  const value = {
    state,
    dispatch,
    actions: ACTIONS
  }

  return (
    <FocusBoxContext.Provider value={value}>
      {children}
    </FocusBoxContext.Provider>
  )
}

// Helper function for sound notifications
function playNotificationSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  } catch (error) {
    console.log('Could not play notification sound:', error)
  }
}