import { create } from 'zustand'
import { Task, AppState } from '@/types/task'

type StoreActions = {
  setIsModalOpen: (isOpen: boolean) => void
  setIsConfirmOpen: (isOpen: boolean) => void
  setFilterText: (text: string) => void
  setTitle: (title: string) => void
  setDescription: (desc: string) => void
  addTask: (title: string, description: string) => void
  deleteTask: (taskId: number, isCompleted: boolean) => void
  toggleComplete: (taskId: number) => void
  setTodoTasks: (tasks: Task[]) => void
  setCompletedTasks: (tasks: Task[]) => void
  setTaskToDelete: (task: Task | null) => void
}

export const useAppStore = create<AppState & StoreActions>(set => ({
  isModalOpen: false,
  isConfirmOpen: false,
  todoTasks: [],
  completedTasks: [],
  filterText: '',
  title: '',
  description: '',
  taskToDelete: null,

  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),
  setIsConfirmOpen: (isOpen: boolean) => set({ isConfirmOpen: isOpen }),
  setFilterText: (text: string) => set({ filterText: text }),
  setTitle: (title: string) => set({ title }),
  setDescription: (desc: string) => set({ description: desc }),
  setTodoTasks: (tasks: Task[]) => set({ todoTasks: tasks }),
  setCompletedTasks: (tasks: Task[]) => set({ completedTasks: tasks }),
  setTaskToDelete: (task: Task | null) => set({ taskToDelete: task }),

  addTask: (title: string, description: string) =>
    set(state => ({
      todoTasks: [
        ...state.todoTasks,
        {
          id: Date.now(),
          title,
          description,
          completed: false,
        },
      ],
    })),

  deleteTask: (taskId: number, isCompleted: boolean) => {
    if (isCompleted) {
      set(state => ({
        ...state,
        completedTasks: state.completedTasks.filter(task => task.id !== taskId),
      }))
    } else {
      set(state => ({
        ...state,
        todoTasks: state.todoTasks.filter(task => task.id !== taskId),
      }))
    }
  },

  toggleComplete: (taskId: number) =>
    set(state => {
      const taskInTodo = state.todoTasks.find(task => task.id === taskId)
      const taskInCompleted = state.completedTasks.find(
        task => task.id === taskId,
      )

      if (taskInTodo) {
        return {
          todoTasks: state.todoTasks.filter(task => task.id !== taskId),
          completedTasks: [
            ...state.completedTasks,
            { ...taskInTodo, completed: true },
          ],
        }
      }

      if (taskInCompleted) {
        return {
          completedTasks: state.completedTasks.filter(
            task => task.id !== taskId,
          ),
          todoTasks: [
            ...state.todoTasks,
            { ...taskInCompleted, completed: false },
          ],
        }
      }

      return state
    }),
}))
