import { Edit, Timer, Trash2 } from 'lucide-react'
import { useFocusBox } from '../context/FocusBoxContext'

function TaskCard({ task }) {
  const { dispatch, actions } = useFocusBox()

  // Check if task is from previous day
  const createdDate = new Date(task.createdAt).toDateString()
  const today = new Date().toDateString()
  const isPreviousDay = createdDate !== today

  const displayTag = isPreviousDay ? 'yesterday' : task.tag

  const handleDragStart = (e) => {
    e.currentTarget.classList.add('dragging')
    e.dataTransfer.setData('text/plain', task.id)
  }

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging')
  }

  const handleEdit = () => {
    dispatch({
      type: actions.SHOW_TASK_MODAL,
      payload: { task, column: task.column }
    })
  }

  const handleAddToTimer = () => {
    dispatch({
      type: actions.SET_TIMER_TASK,
      payload: { task }
    })
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({
        type: actions.DELETE_TASK,
        payload: { id: task.id }
      })
    }
  }

  return (
    <div
      className={`task-card ${isPreviousDay ? 'previous-day' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="task-title">{task.title}</div>
      {task.notes && (
        <div className="task-notes">{task.notes}</div>
      )}
      <div className="task-meta">
        <span className={`task-tag ${displayTag}`}>
          {displayTag}
        </span>
        <div className="task-actions">
          <button
            className="task-action-btn edit"
            onClick={handleEdit}
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit size={12} />
          </button>
          <button
            className="task-action-btn timer"
            onClick={handleAddToTimer}
            title="Add to timer"
            aria-label="Add to timer"
          >
            <Timer size={12} />
          </button>
          <button
            className="task-action-btn delete"
            onClick={handleDelete}
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard