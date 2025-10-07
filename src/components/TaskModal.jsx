import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useFocusBox } from '../context/FocusBoxContext'

function TaskModal() {
  const { state, dispatch, actions } = useFocusBox()
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [tag, setTag] = useState('today')

  const isEditing = state.ui.taskModalData?.task
  const currentColumn = state.ui.currentColumn

  useEffect(() => {
    if (isEditing) {
      setTitle(state.ui.taskModalData.task.title)
      setNotes(state.ui.taskModalData.task.notes || '')
      setTag(state.ui.taskModalData.task.tag)
    } else {
      setTitle('')
      setNotes('')
      setTag('today')
    }
  }, [state.ui.taskModalData, isEditing])

  const handleClose = () => {
    dispatch({ type: actions.HIDE_TASK_MODAL })
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) return

    if (isEditing) {
      dispatch({
        type: actions.UPDATE_TASK,
        payload: {
          id: state.ui.taskModalData.task.id,
          updates: { title, notes, tag }
        }
      })
    } else {
      dispatch({
        type: actions.ADD_TASK,
        payload: {
          title,
          notes,
          tag,
          column: currentColumn
        }
      })
    }

    handleClose()
  }

  const handleCancel = () => {
    handleClose()
  }

  if (!state.ui.showTaskModal) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Task' : 'Add Task'}</h2>
          <button
            className="close-btn"
            onClick={handleClose}
            aria-label="Close task modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="taskTitle">Title</label>
              <input
                type="text"
                id="taskTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskNotes">Notes (optional)</label>
              <textarea
                id="taskNotes"
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskTag">Tag</label>
              <select
                id="taskTag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="backlog">Backlog</option>
              </select>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-btn"
              >
                {isEditing ? 'Update Task' : 'Save Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskModal