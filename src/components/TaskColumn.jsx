import { Plus } from 'lucide-react'
import { useFocusBox } from '../context/FocusBoxContext'
import TaskCard from './TaskCard'

function TaskColumn({ columnId, title, tasks }) {
  const { dispatch, actions } = useFocusBox()

  const handleAddTask = () => {
    dispatch({
      type: actions.SHOW_TASK_MODAL,
      payload: { column: columnId }
    })
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
        <h2 className="column-title">{title}</h2>
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