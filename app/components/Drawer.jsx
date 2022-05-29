import { useEffect, useState } from 'react'

export default function Drawer() {
    const [currentPrompt, setCurrentPrompt] = useState(null)
    const PROMPTS = [
        'Cat',
        'Dog',
        'Elephant',
        'Lollipop',
        'Flower',
        'Pokemon'
    ]

    const turnTimer = 90;

    return (
        <>
            <div className="overscroll-contain flex justify-center items-center w-[97.5%] h-32 position absolute bottom-2 left-2 bg-black">

                <div className="flex justify-center items-center w-1/2 h-full position absolute bottom-4 bg-blue-700 border border-4 border-green-400 rounded-lg hover:animate-slideUp">
                    <h1 className="text-7xl"> { currentPrompt } </h1>
                </div>
            </div>
        </>


    )
}