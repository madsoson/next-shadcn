import { create } from 'zustand'
import { Task } from '@/types/task'

type AppState = {
  filterText: string
  todoTasks: Task[]
  completedTasks: Task[]

}

type StoreActions = {
  setFilterText: (text: string) => void
  addTask: (title: string, description?: string) => void
  deleteTask: (taskId: number, isCompleted: boolean) => void
  toggleComplete: (taskId: number) => void
  loadTasks: () => void
  saveTasks: () => void
}

export const useAppStore = create<AppState & StoreActions>((set, get) => ({
  todoTasks: [],
  completedTasks: [],
  filterText: '',

  setFilterText: text => set({ filterText: text }),

  addTask: (title, description = '') =>
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

  deleteTask: (taskId, isCompleted) => {
    if (isCompleted) {
      set(state => ({
        completedTasks: state.completedTasks.filter(task => task.id !== taskId),
      }))
    } else {
      set(state => ({
        todoTasks: state.todoTasks.filter(task => task.id !== taskId),
      }))
    }
  },

  toggleComplete: taskId => {
    const { todoTasks, completedTasks } = get()
    const taskInTodo = todoTasks.find(task => task.id === taskId)
    const taskInCompleted = completedTasks.find(task => task.id === taskId)

    if (taskInTodo) {
      set({
        todoTasks: todoTasks.filter(t => t.id !== taskId),
        completedTasks: [...completedTasks, { ...taskInTodo, completed: true }],
      })
    } else if (taskInCompleted) {
      set({
        completedTasks: completedTasks.filter(t => t.id !== taskId),
        todoTasks: [...todoTasks, { ...taskInCompleted, completed: false }],
      })
    }
  },

  loadTasks: () => {
    const savedTasks = localStorage.getItem('todoTasks')
    const savedCompleted = localStorage.getItem('completedTasks')
    set({
      todoTasks: savedTasks ? JSON.parse(savedTasks) : [],
      completedTasks: savedCompleted ? JSON.parse(savedCompleted) : [],
    })
  },

  saveTasks: () => {
    const { todoTasks, completedTasks } = get()
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks))
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
  },
}))
