import TaskList from './tasklist'
import { useAppStore } from '@/store/zustand.store'
import { Task } from '@/types/task'

export type TaskPanelProps = {
  filterText: string
}

const TaskPanel = ({ filterText }: TaskPanelProps) => {
  const todoTasks = useAppStore(state => state.todoTasks)
  const completedTasks = useAppStore(state => state.completedTasks)
  const toggleComplete = useAppStore(state => state.toggleComplete)
  const deleteTask = useAppStore(state => state.deleteTask)
  const addTask = useAppStore(state => state.addTask)

  const filterTasks = (tasks: Task[]) =>
    tasks.filter(task =>
      task.title.toLowerCase().includes(filterText.toLowerCase()),
    )

  const filteredTodoTasks = filterTasks(todoTasks)
  const filteredCompletedTasks = filterTasks(completedTasks)

  return (
    <>
      <TaskList
        title='TODO'
        tasks={filteredTodoTasks}
        onToggleComplete={toggleComplete}
        onDeleteTask={deleteTask}
        emptyMessage='You have no tasks'
        subEmptyMessage='You can add any task here."Feed the hedgehog"'
        onAddTask={addTask}
      />
      <TaskList
        title='COMPLETED'
        tasks={filteredCompletedTasks}
        onToggleComplete={toggleComplete}
        onDeleteTask={deleteTask}
        emptyMessage='Today you don’t have completed tasks'
        subEmptyMessage='Try to complete this: "Feed the hedgehog"'
      />
    </>
  )
}

export default TaskPanel
