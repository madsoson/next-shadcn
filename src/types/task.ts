export type Task = {
  id: number
  title: string
  description: string
  completed: boolean
}

export type ModalProps = {
  withIcon?: boolean
}

export type ConfirmProps = {
  trigger: React.ReactNode
  onCancel: () => void
  onConfirm: () => void
}

export type TaskItemProps = {
  task: Task
  onToggleComplete: (taskId: number) => void
  onDeleteTask: (taskId: number, isCompleted: boolean) => void
}

export type TaskListProps = {
  title: string
  tasks: Task[]
  onAddTask?: (title: string, description: string) => void
  onToggleComplete: (taskId: number) => void
  onDeleteTask: (taskId: number, isCompleted: boolean) => void
  emptyMessage: string
  subEmptyMessage: string
}

export type TaskPanelProps = {
  todoTasks: Task[]
  completedTasks: Task[]
  onAddTask: (title: string, description: string) => void
  onToggleComplete: (taskId: number) => void
  onDeleteTask: (taskId: number, isCompleted: boolean) => void
}

export type AppState = {
  isModalOpen: boolean
  isConfirmOpen: boolean
  todoTasks: Task[]
  completedTasks: Task[]
  filterText: string
  title: string
  description: string
  taskToDelete: Task | null
}
