'use client'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import Modal from '../components/ui/modal'
import TaskPanel from '../components/ui/taskpanel'
import { useAppStore } from '@/store/zustand.store'

export default function Home() {
  const todoTasks = useAppStore(state => state.todoTasks)
  const completedTasks = useAppStore(state => state.completedTasks)
  const loadTasks = useAppStore(state => state.loadTasks)
  const saveTasks = useAppStore(state => state.saveTasks)
  const filterText = useAppStore(state => state.filterText)
  const setFilterText = useAppStore(state => state.setFilterText) 


  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  useEffect(() => {
    saveTasks()
  }, [todoTasks, completedTasks, saveTasks])

  return (
    <div className='antialiased'>
      <div className='mt-8 px-4 xl:px-32 pb-8 w-full'>
        <div className='w-full h-full flex flex-col gap-4 xl:min-w-[487px]'>
          <div className='flex justify-between w-full'>
            <Input
              type='text'
              placeholder='Filter tasks...'
              className='w-[166px] xl:w-[250px] max-w-sm h-10 rounded-md border py-2 px-3 font-normal text-sm border-zinc-200 text-zinc-500'
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
            />
            <Modal withIcon={true} />
          </div>

          <TaskPanel />
        </div>
      </div>
    </div>
  )
}
