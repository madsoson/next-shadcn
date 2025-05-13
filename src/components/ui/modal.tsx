import { useAppStore } from '@/store/zustand.store'
import { useState } from 'react'
import * as React from 'react'
import Image from 'next/image'
import icon from '@/images/plus.png'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type ModalProps = {
  withIcon?: boolean
}

function Modal({ withIcon }: ModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const addTask = useAppStore(state => state.addTask)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title.trim() === '') return
    addTask(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {withIcon ? (
          <Button
            size='default'
            className='inline-flex gap-2 bg-neutral-900 items-center'
          >
            <Image src={icon} alt='Add Task' width={16} height={16} />
            <p
              style={{ letterSpacing: '0%' }}
              className='text-sm font-medium text-center text-zinc-50'
            >
              Add Task
            </p>
          </Button>
        ) : (
          <Button size='default' className=' bg-zinc-900'>
            <p
              style={{ letterSpacing: '0%' }}
              className='font-medium text-sm text-center text-zinc-50'
            >
              Add Task
            </p>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='w-[369px] rounded-lg border p-6 flex flex-col gap-6 bg-white border-zinc-100 shadow-sm'>
        <DialogHeader>
          <DialogTitle style={{ lineHeight: '100%' }}>Create task</DialogTitle>
          <DialogDescription>
            Deploy your new task in one-click.
          </DialogDescription>
        </DialogHeader>

        <form className='w-full' onSubmit={handleSubmit}>
          <div className='w-full flex flex-col gap-4'>
            <div className='w-full flex flex-col gap-2'>
              <Label
                htmlFor='title'
                style={{ lineHeight: '100%' }}
                className=' text-zinc-900'
              >
                Task*
              </Label>
              <Input
                className='w-full h-10 rounded-md border py-2 px-3 font-normal text-sm text-zinc-500'
                placeholder='Name of your task'
                id='title'
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className='w-full flex flex-col gap-2'>
              <Label
                htmlFor='description'
                style={{ lineHeight: '100%' }}
                className='font-medium text-sm text-zinc-900'
              >
                Description
              </Label>
              <Input
                className='w-full h-10 rounded-md border py-2 px-3 font-normal text-sm text-zinc-500'
                placeholder='Optional'
                id='description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <DialogFooter className='justify-between flex w-full'>
              <DialogClose asChild>
                <Button className='h-10 rounded-md border py-2 font-sans px-4 bg-white border-zinc-200 text-zinc-900'>
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  size='default'
                  type='submit'
                  className=' bg-zinc-900 text-zinc-50'
                >
                  Deploy
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
