import { cn } from '@/lib/utils';
import React from 'react'

interface CustomButtonProps {
  color: string;
  text: string;
  isActive?: boolean;
  onAction?: () => void;
}
export const CustomButton = ({color='#DE6860', text, onAction=()=>{}, isActive=false}:CustomButtonProps) => {
    console.log("here is the color recieved",color)
  return (
    <div role='button' onClick={onAction} className=' rounded-full text-sm px-3 pr-6 flex py-3 bg-[#282B2D] gap-x-2 items-center'>
        <div className={cn(`h-8 w-8 bg-[#DE6860] rounded-full inline-block`, !isActive && "bg-green-500")}></div>
        {text}
    </div>
  )
}
