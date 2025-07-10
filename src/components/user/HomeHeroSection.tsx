"use client"

import React, { useEffect, useRef, useState } from 'react'
import {AnimatePresence, motion} from 'framer-motion';
import { engineImage } from '@/lib/staticImages';

// const engine = 

const HomeHeroSection = () => {
     const [engineImageIndex,setEngineImageIndex]=useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(()=>{
        intervalRef.current = setInterval(()=>{
            setEngineImageIndex((prev)=>prev===2?0:prev+1)
        },5000)

        return ()=>{
            if(intervalRef.current) clearInterval(intervalRef.current)
        }
    },[])
  return (
     <AnimatePresence mode='wait'>
        {
          engineImageIndex===0
          ?<motion.div key={engineImageIndex} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.6,ease:'easeInOut'}}><img  src={engineImage.engine1} alt="engine" className=" absolute right-8 top-1/2 -translate-y-1/2" /></motion.div>
          :engineImageIndex===1
          ?<motion.div key={engineImageIndex} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.6,ease:'easeInOut'}}><img  src={engineImage.engine2} alt="engine" className=" absolute right-8 top-1/2 -translate-y-1/2" /></motion.div>
          :<motion.div key={engineImageIndex} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.6,ease:'easeInOut'}}><img  src={engineImage.engine3} alt="engine" className=" absolute right-8 top-1/2 -translate-y-1/2" /></motion.div>
        }
    </AnimatePresence> 
  )
}

export default HomeHeroSection
