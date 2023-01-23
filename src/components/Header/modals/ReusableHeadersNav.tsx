import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'



interface IProps {
    show: boolean;
    setShow: (value: boolean | ((prevVisible: boolean) => boolean)) => void;
    children: React.ReactNode,
    modalWidth: number;
    setModalWidth: Dispatch<SetStateAction<number>>;

}



const style = {
    transition: "all 0.8s 0s",
   
}

const ReusableHeadersNav = ({ show, setShow, children,modalWidth,setModalWidth }: IProps) => {
   
    useEffect(()=>{
        setTimeout(()=>{
            setModalWidth(20)
        },0)
      
    },[show])
       

      
    console.log(show)
        
    
 

    

    if (!show) return null

    return (
        <div className=' sm:fixed hidden inset-10 z-10  sm:flex justify-center items-center b  bg-opacity-0   ' onClick={() => setShow(false)} >

            <div style={style} className={`sm:h-[100vh]  border-r-[1px] border-l-[1px] b  fixed left-16  bg-white shd rounded-r-2xl    ${modalWidth === 0 ? 'w-[20px]' : 'w-[20%]'}`} 
            onClick={e => e.stopPropagation()}>
                <div className='flex  py-4 items-center 0'>
                    {children}
                </div>

            </div>
        </div>
    )
}

export default ReusableHeadersNav