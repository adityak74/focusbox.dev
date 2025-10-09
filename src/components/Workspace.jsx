import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useFocusBox } from '../context/FocusBoxContext'
import TaskColumn from './TaskColumn'

function Workspace() {
  const { state, dispatch, actions } = useFocusBox()
  const [showAddColumn, setShowAddColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      dispatch({
        type: actions.ADD_COLUMN,
        payload: {
          id: `column-${Date.now()}`,
          title: newColumnTitle.trim()
        }
      })
      setNewColumnTitle('')
      setShowAddColumn(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddColumn()
    } else if (e.key === 'Escape') {
      setShowAddColumn(false)
      setNewColumnTitle('')
    }
  }

  return (
    <main className="workspace">
      <div className="columns-container">
        {state.columns.map((column) => (
          <TaskColumn
            key={column.id}
            columnId={column.id}
            title={column.title}
            tasks={state.tasks.filter(task =>
              task.column === column.id && !task.completedAt
            )}
            canDelete={state.columns.length > 3}
          />
        ))}
        
        {showAddColumn ? (
          <div className="column add-column-form">
            <div className="column-header">
              <div className="column-title-container">
                <input
                  type="text"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={() => {
                    if (!newColumnTitle.trim()) {
                      setShowAddColumn(false)
                    }
                  }}
                  placeholder="Column title"
                  autoFocus
                  className="column-title-input"
                />
                <div className="column-title-actions">
                  <button
                    className="column-action-btn save"
                    onClick={handleAddColumn}
                    aria-label="Add column"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="column add-column">
            <button
              className="add-column-btn"
              onClick={() => setShowAddColumn(true)}
              aria-label="Add new column"
            >
              <Plus size={20} />
              <span>Add Column</span>
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default Workspace