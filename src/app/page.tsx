"use client";
import { Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import { useState,useEffect } from 'react';
import Modal from '../components/ui/modal';
import TaskPanel from '../components/ui/taskpanel';
import icon from '@/images/plus.png';
import Image from 'next/image';
import {Task} from "@/types/task";

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [filterText, setFilterText] = useState<string>("");


  useEffect(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    const savedCompleted = localStorage.getItem("completedTasks");

    if (savedTasks) setTodoTasks(JSON.parse(savedTasks));
    if (savedCompleted) setCompletedTasks(JSON.parse(savedCompleted));
  }, []);


  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [todoTasks, completedTasks]);

  const addTask = (title: string, description: string) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    setTodoTasks(curr => [...curr, newTask]);
  };

  const toggleComplete = (taskId: number) => {
    const taskInTodo = todoTasks.find(task => task.id === taskId);
    if (taskInTodo) {
      setTodoTasks(todoTasks.filter(task => task.id !== taskId));
      setCompletedTasks([...completedTasks, { ...taskInTodo, completed: true }]);
    } else {
      const taskInCompleted = completedTasks.find(task => task.id === taskId);
      if (taskInCompleted) {
        setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
        setTodoTasks([...todoTasks, { ...taskInCompleted, completed: false }]);
    }
  };
}

  const deleteTask = (taskId: number, isCompleted: boolean) => {
    if (isCompleted) {
      setCompletedTasks(curr => curr.filter(task => task.id !== taskId));
    } else {
      setTodoTasks(curr => curr.filter(task => task.id !== taskId));
    }
  };

  const filteredTodoTasks = todoTasks.filter(task =>
    task.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const filteredCompletedTasks = completedTasks.filter(task =>
    task.title.toLowerCase().includes(filterText.toLowerCase())
  );




  
  return (

  <div className='antialiased'>
    <div className="mt-8 px-4 xl:px-32 pb-8 w-full">
      <div className='w-full h-full flex flex-col gap-4 xl:min-w-[487px]'>
        <div className='flex justify-between w-full'>
          <Input
            type="text"
            placeholder="Filter tasks..."
            className="w-[166px] xl:w-[250px] max-w-sm h-10 rounded-md border py-2 px-3 font-normal text-sm border-zinc-200 text-zinc-500"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
           <Modal
            withIcon={true}
            onClose={() => setIsModalOpen(false)}
            onAddTask={addTask} />
        </div>

        <TaskPanel
          todoTasks={filteredTodoTasks}
          onAddTask={addTask}
          completedTasks={filteredCompletedTasks}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask} />
      </div>
    </div>
  </div>
  )
}

