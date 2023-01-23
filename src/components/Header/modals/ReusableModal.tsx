import React from 'react'
import { Dispatch, SetStateAction } from "react";

interface IProps {
    visible: boolean;
    setVisible: (value: boolean | ((prevVisible: boolean) => boolean)) => void;
    children: React.ReactNode,
  
    
  }

const ReusableModal = ({visible,setVisible,children}: IProps) => {

 
if (!visible) return null
    return (
        <div className='fixed inset-0 z-10   bg-opacity-30 backdrop-blur-sm flex justify-center items-center bg-gray-500' onClick={()=>setVisible(false)} >
            <div onClick={e => e.stopPropagation()} className='  rounded shadow-sm z-20    '>
                {children}
            </div>
        </div>
    )
}

export default ReusableModal