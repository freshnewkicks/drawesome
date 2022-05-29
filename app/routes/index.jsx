import Canvas from '../components/Canvas'
import Drawer from '../components/Drawer'
import LeftToolbox from '../components/LeftToolbox'
import Timer from '../components/Timer'

import { useState } from 'react'

export default function App() {
    const [flagData, setFlagData] = useState(true)

    const receiveFlagData = (data) => {
        setFlagData(data)
    }

  return (
      <div className="overscroll-contain overflow-y-hidden h-screen w-screen">
          <div className="flex items-center justify-center h-screen w-screen bg-slate-800 z-40">
              <LeftToolbox />
              <div className="min-w-[320px] max-w-[640px] position absolute border border-[1rem] border-red-400 rounded-lg">
                  {
                      flagData === true ?
                          <Timer
                              seconds="10"
                              ms="100"
                              textColor="text-white"
                              passFlag={receiveFlagData}/>
                      : <h1 className="text-white">Expired! Fag!</h1>
                  }
                  <Drawer />
                  <Canvas />
                </div>
          </div>
      </div>
  )
}


