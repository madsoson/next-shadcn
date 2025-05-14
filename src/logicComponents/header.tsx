import Image from "next/image";
import avatar from "@/images/ava.jpg";

const Header = () => {
    return (
     
      <header className="w-full p-4 xl:px-8 border-b border-zinc-200 flex flex-row items-center justify-between gap-4 xl:gap-1.5">
      <div className="w-full">
        <h1 style={{ letterSpacing: "0%" }} className="font-semibold text-2xl text-zinc-950">My tasks</h1>
        <p className="font-normal text-base text-zinc-500">Here’s a list of your task for the day!</p>
      </div>
      <Image
        src={avatar}
        alt="Avatar"
        width={36}
        height={36}
        className="min-w-9 w-9 h-9 rounded-full"
      />
    </header>
      
    );
  };
  
  export default Header;