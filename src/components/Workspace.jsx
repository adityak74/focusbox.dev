import { useFocusBox } from '../context/FocusBoxContext'
import TaskColumn from './TaskColumn'

function Workspace() {
  const { state } = useFocusBox()

  const columns = [
    { id: 'code', title: 'Code' },
    { id: 'review', title: 'Review' },
    { id: 'comment', title: 'Comment' }
  ]

  return (
    <main className="workspace">
      <div className="columns-container">
        {columns.map((column) => (
          <TaskColumn
            key={column.id}
            columnId={column.id}
            title={column.title}
            tasks={state.tasks.filter(task =>
              task.column === column.id && !task.completedAt
            )}
          />
        ))}
      </div>
    </main>
  )
}

export default Workspace