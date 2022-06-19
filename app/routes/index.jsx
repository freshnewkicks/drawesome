import Canvas from '../components/Canvas'
import Drawer from '../components/Drawer'
import LeftToolbox from '../components/LeftToolbox'
import Timer from '../components/Timer'
import { useEffect, useState } from 'react'
import Toolbox from '../components/Toolbox'
import {Snackbar} from "@mui/material";

export default function App() {
    const [toolboxColor, setToolboxColor] = useState()
    const [toolboxPencil, setToolboxPencil] = useState()
    const [snackbar, setSnackbar] = useState({
        size: 0,
        show: false,
        message: toolboxPencil
    })

    useEffect( () => {
        setSnackbar({
            size: toolboxPencil,
            show: true,
            message: 'Pencil size changed to ' + toolboxPencil
        })
    }, [toolboxPencil])

  return (
      <div>
          {
              snackbar.show &&
              <div>
                  <Snackbar
                      open={snackbar.show}
                      autoHideDuration={2000}
                      onClose={() => setSnackbar({...snackbar, show: false})}
                      message={snackbar.message}
                  />
              </div>
          }
          <div className="overscroll-contain overflow-y-hidden h-screen w-screen">
              <Toolbox passColor={setToolboxColor} passPencil={setToolboxPencil}/>
              <div className="flex items-center justify-center h-screen w-screen bg-slate-800 z-40">
                  <div className="position absolute">
                      <Drawer />
                      <Timer
                          ms='60'
                          seconds='20'
                          textColor='text-white'
                      />
                      <Canvas
                          passColor={toolboxColor}
                          passPencil={toolboxPencil}
                      />
                  </div>
              </div>
          </div>
      </div>

  )
}


