import { useState, useEffect } from 'react'
import { useFocusBox } from '../context/FocusBoxContext'

function Notification() {
  const { state } = useFocusBox()
  const [notifications, setNotifications] = useState([])

  // Check for previous day tasks on mount
  useEffect(() => {
    const today = new Date().toDateString()
    const hasOldTasks = state.tasks.some(task => {
      const createdDate = new Date(task.createdAt).toDateString()
      return createdDate !== today && !task.completedAt
    })

    if (hasOldTasks) {
      setTimeout(() => {
        showNotification('You have tasks from previous days 📅')
      }, 1000)
    }
  }, [state.tasks])

  // Listen for timer completion
  useEffect(() => {
    if (state.timer.timeLeft === 0 && !state.timer.isRunning) {
      showNotification('Timer completed! 🎉')
    }
  }, [state.timer.timeLeft, state.timer.isRunning])

  const showNotification = (message) => {
    const id = Date.now()
    const notification = { id, message }

    setNotifications(prev => [...prev, notification])

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className="notifications-container">
      {notifications.map(notification => (
        <div key={notification.id} className="notification">
          {notification.message}
        </div>
      ))}
    </div>
  )
}

export default Notification