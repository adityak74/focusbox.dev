import { useState } from 'react'
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react'
import { useFocusBox } from '../context/FocusBoxContext'
import TaskCard from './TaskCard'

function TaskColumn({ columnId, title, tasks, canDelete = false }) {
  const { dispatch, actions, state } = useFocusBox()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)

  const handleAddTask = () => {
    dispatch({
      type: actions.SHOW_TASK_MODAL,
      payload: { column: columnId }
    })
  }

  const handleEditStart = () => {
    setIsEditing(true)
    setEditTitle(title)
  }

  const handleEditSave = () => {
    if (editTitle.trim() && editTitle.trim() !== title) {
      dispatch({
        type: actions.UPDATE_COLUMN,
        payload: { id: columnId, title: editTitle.trim() }
      })
    }
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setEditTitle(title)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the "${title}" column? All tasks in this column will be moved to the first column.`)) {
      dispatch({
        type: actions.DELETE_COLUMN,
        payload: { id: columnId }
      })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSave()
    } else if (e.key === 'Escape') {
      handleEditCancel()
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('drag-over')
  }

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      e.currentTarget.classList.remove('drag-over')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')

    const taskId = e.dataTransfer.getData('text/plain')
    if (taskId && columnId) {
      dispatch({
        type: actions.MOVE_TASK,
        payload: { taskId, newColumn: columnId }
      })
    }
  }

  return (
    <div
      className="column"
      data-column={columnId}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <div className="column-title-container">
          {isEditing ? (
            <div className="column-title-edit">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleEditSave}
                autoFocus
                className="column-title-input"
              />
              <div className="column-title-actions">
                <button
                  className="column-action-btn save"
                  onClick={handleEditSave}
                  aria-label="Save title"
                >
                  <Check size={12} />
                </button>
                <button
                  className="column-action-btn cancel"
                  onClick={handleEditCancel}
                  aria-label="Cancel edit"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          ) : (
            <div className="column-title-display">
              <h2 className="column-title">{title}</h2>
              <div className="column-title-actions">
                <button
                  className="column-action-btn edit"
                  onClick={handleEditStart}
                  aria-label="Edit title"
                >
                  <Edit2 size={12} />
                </button>
                {canDelete && (
                  <button
                    className="column-action-btn delete"
                    onClick={handleDelete}
                    aria-label="Delete column"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <button
          className="add-task-btn"
          onClick={handleAddTask}
          aria-label={`Add task to ${title}`}
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default TaskColumn