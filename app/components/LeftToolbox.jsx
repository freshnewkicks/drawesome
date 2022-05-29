import { useState, useEffect, useRef } from 'react'

export default function LeftToolbox() {
    const [isOut, setIsOut] = useState(true)
    const toolboxRef = useRef()

    useEffect( () => {

    },  [])
    return (
        <div ref={toolboxRef} className="h-full w-14 hover:animate-toolboxSlideOut position absolute bg-red-800 left-0 z-40"></div>
    )
}