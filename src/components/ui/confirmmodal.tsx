import { ConfirmProps } from '@/types/task'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'

const ConfirmModal = ({ onCancel, onConfirm, trigger }: ConfirmProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        align='end'
        side='bottom'
        sideOffset={8}
        className='z-50 w-[320px] p-6 rounded-lg border bg-white border-zinc-200 shadow-lg'
      >
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Label className='font-semibold text-lg text-zinc-900'>
              You want to delete task?
            </Label>
            <Label className='font-normal text-sm text-zinc-500'>
              Once deleted it will disappear forever
            </Label>
          </div>
          <div className='flex justify-end gap-2'>
            <PopoverClose>
              <Button
                size='default'
                className='border font-medium bg-white text-sm text-zinc-900'
                onClick={onCancel}
              >
                Cancel
              </Button>
            </PopoverClose>
            <Button
              size='default'
              className='border bg-zinc-900 font-medium text-sm text-zinc-50'
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ConfirmModal
