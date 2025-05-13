import { Task } from '@/types/task'
import TaskItem from './taskitem'
import Modal from './modal'
import { useAppStore } from '@/store/zustand.store'

export type TaskListProps = {
  title: string
  tasks: Task[]
  onAddTask?: (title: string, description: string) => void
  onToggleComplete: (taskId: number) => void
  onDeleteTask: (taskId: number, isCompleted: boolean) => void
  emptyMessage: string
  subEmptyMessage: string
}

const TaskList = ({
  title,
  tasks,
  onAddTask,
  emptyMessage,
  subEmptyMessage,
}: TaskListProps) => {
  const toggleComplete = useAppStore(state => state.toggleComplete)
  const deleteTask = useAppStore(state => state.deleteTask)

  return (
    <div
      className={
        'w-full rounded-2xl border p-8 flex flex-col gap-4 bg-zinc-100/40 border-zinc-200 shadow-md ' +
        (tasks.length === 0 ? 'min-h-[314px]' : 'h-min')
      }
    >
      <h3 className='flex flex-row gap-3 items-center'>
        <p
          style={{ lineHeight: '14px' }}
          className='font-bold text-sm text-zinc-500'
        >
          {title}
        </p>
        <p className='px-1 rounded bg-zinc-100 font-bold text-sm text-zinc-500'>
          {tasks.length}
        </p>
      </h3>
      {tasks.length === 0 ? (
        <div className='w-full h-full flex flex-col items-center gap-1 pt-6 xl:pt-8 xl:has-[:checked]:pt-16'>
          <input
            type='checkbox'
            className='hidden'
            defaultChecked={title !== 'TODO'}
          />
          <p className='font-bold text-2xl text-center text-zinc-900'>
            {emptyMessage}
          </p>
          <p className='font-normal text-sm text-center text-zinc-500'>
            {subEmptyMessage}
          </p>
          {title === 'TODO' && onAddTask && (
            <div className='pt-4'>
              <Modal withIcon={false} />
            </div>
          )}
        </div>
      ) : (
        <>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={() => toggleComplete(task.id)}
              onDeleteTask={() => deleteTask(task.id, task.completed)}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default TaskList
