import Canvas from '../components/Canvas'
import Drawer from '../components/Drawer'

export default function App() {
  return (
      <div className="overscroll-contain overflow-y-hidden h-screen w-screen">
          <div className="flex items-center justify-center h-screen w-screen bg-slate-800 z-40">
              <div className="min-w-[320px] max-w-[640px] position absolute border border-[1rem] border-red-400 rounded-lg">
                  <Drawer />
                  <Canvas />
                </div>
          </div>
      </div>
  )
}


