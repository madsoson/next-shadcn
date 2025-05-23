'use client'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import Modal from '@/logicComponents/modal'
import TaskPanel from '@/logicComponents/taskpanel'
import { useAppStore } from '@/store/zustand.store'

export default function Home() {
  const todoTasks = useAppStore(state => state.todoTasks)
  const completedTasks = useAppStore(state => state.completedTasks)
  const loadTasks = useAppStore(state => state.loadTasks)
  const saveTasks = useAppStore(state => state.saveTasks)
 
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  useEffect(() => {
    saveTasks()
  }, [todoTasks, completedTasks])

  return (
    <div className='antialiased'>
      <div className='mt-8 px-4 xl:px-32 pb-8 w-full'>
        <div className='w-full h-full flex flex-col gap-4 xl:min-w-[487px]'>
          <div className='flex justify-between w-full'>
            <Input
              type='text'
              placeholder='Filter tasks...'
              className='w-[166px] xl:w-[250px] max-w-sm h-10 rounded-md border py-2 px-3 font-normal text-sm border-zinc-200 text-zinc-900 placeholder:text-zinc-500'
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
            />
            <Modal withIcon={true} />
          </div>

          <TaskPanel filterText={filterText} />
        </div>
      </div>
    </div>
  )
}
