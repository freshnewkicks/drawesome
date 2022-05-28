import Canvas from '../components/Canvas'

export default function App() {
  return (
      <div className="overscroll-contain overflow-y-hidden h-screen w-screen">
          <div className="flex items-center justify-center h-screen w-screen bg-slate-800 z-40">
              <div className="min-w-[320px] max-w-[640px] position absolute border border-[1rem] border-red-400 rounded-lg">
                  <div className="flex justify-center items-center w-[97.5%] h-32 position absolute bottom-2 left-2 bg-black">
                      <div className="flex justify-center items-center w-1/2 h-full position absolute bottom-4 bg-blue-700 border border-4 border-green-400 rounded-lg">
                          <h1 className="text-7xl">Prompt</h1>
                      </div>
                  </div>
                  <Canvas />
                </div>
          </div>
      </div>
  )
}


