import Canvas from '../components/Canvas'
import Drawer from '../components/Drawer'
import LeftToolbox from '../components/LeftToolbox'
import Timer from '../components/Timer'
import { useEffect, useState } from 'react'
import Toolbox from '../components/Toolbox'

export default function App() {
    const [flagData, setFlagData] = useState(true)
    const [toolboxColor, setToolboxColor] = useState()

    const receiveFlagData = (data) => {
        setFlagData(data)
    }

    const receiveColorData = (data) => {
        setToolboxColor(data)
    }

  return (
      <div className="overscroll-contain overflow-y-hidden h-screen w-screen">
          <Toolbox passColor={setToolboxColor}/>
          <div className="flex items-center justify-center h-screen w-screen bg-slate-800 z-40">
              <div className="position absolute">
                  <Drawer />
                  <Timer
                      ms='60'
                      seconds='20'
                      textColor='text-white'
                      passFlag={receiveFlagData} />
                  <Canvas
                    passColor={toolboxColor}
                  />
                </div>
          </div>
      </div>
  )
}


