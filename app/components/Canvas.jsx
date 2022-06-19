import React, {useCallback, useEffect, useRef, useState} from "react"

import useScrollBlock from 'app/hooks/useScrollBlock.jsx'

export default function Canvas(props) {
    const [pencil, setPencil] = useState(false)
    const [firstDraw, setFirstDraw] = useState(false)
    const [size, setSize] = useState()
    const [color, setColor] = useState(props.passColor)
    const [offset, setOffset] = useState(0.1)
    const [blockScroll, allowScroll] = useScrollBlock();

    const ART = useRef();
    let prevMouse = useRef({x:0, y:0});

    blockScroll()

    useEffect(() => {
        setColor(props.passColor)
        setSize(props.passPencil)
    }, [props.passColor, props.passPencil])

    const drawTouch = (e) => {
        let ctx = ART.current.getContext('2d');
        let canvas = ART.current.getBoundingClientRect();

        if (!pencil) {
            return;
        }

        ctx.beginPath();
        ctx.lineWidth = size;
        ctx.lineCap = 'round'


        let x = e.touches[0].clientX - canvas.left;
        let y = e.touches[0].clientY - canvas.top;
        x = x * ART.current.width / ART.current.clientWidth;
        y = y * ART.current.height / ART.current.clientHeight;
        if( firstDraw ) {
            prevMouse.current = {x: x, y: y}
            setFirstDraw(false)
        }
        const LOWER_X = prevMouse.current.x - offset;
        const UPPER_X = prevMouse.current.x + offset;
        const LOWER_Y = prevMouse.current.y - offset;
        const UPPER_Y = prevMouse.current.y + offset;
        if ((x > UPPER_X || x < LOWER_X || y > UPPER_Y || y < LOWER_Y)) {
            ctx.moveTo(prevMouse.current.x, prevMouse.current.y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = color;
            ctx.stroke();
        } else {
            ctx.arc(x, y, 1, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
        }
        prevMouse.current = {x: x, y: y}
    }

    const draw = (e) => {
        let ctx = ART.current.getContext('2d');
        let canvas = ART.current.getBoundingClientRect();

        if (!pencil) {
            return;
        }

        ctx.beginPath();
        ctx.lineWidth = size;
        ctx.lineCap = 'round'

        let x = e.clientX - canvas.left;
        let y = e.clientY - canvas.top;
        x = x * ART.current.width / ART.current.clientWidth;
        y = y * ART.current.height / ART.current.clientHeight;
        if( firstDraw ) {
            prevMouse.current = {x: x, y: y}
            setFirstDraw(false)
        }
        const LOWER_X = prevMouse.current.x - offset;
        const UPPER_X = prevMouse.current.x + offset;
        const LOWER_Y = prevMouse.current.y - offset;
        const UPPER_Y = prevMouse.current.y + offset;
        if ((x > UPPER_X || x < LOWER_X || y > UPPER_Y || y < LOWER_Y)) {
            ctx.moveTo(prevMouse.current.x, prevMouse.current.y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = color;
            ctx.stroke();
        } else {
            ctx.arc(x, y, 1, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
        }
        prevMouse.current = {x: x, y: y}
    }

    const handleClearCanvas = (e) => {
        let ctx = ART.current.getContext('2d');
        ctx.clearRect(0, 0, 640, 480);
    }

    const handleMouseMove = (e) => {
        draw(e)
    }

    const handleTouchMove = (e) => {
        drawTouch(e)
    }

    const handleMouseDown = () =>{
        setPencil(true)
        setFirstDraw(true)
    }

    const handleMouseLeave = () => {
        setPencil(false)
    }

    const handleMouseUp = () => {
        setPencil(false)

    }

    const handleCanvasLeave = () => {
        setPencil(false)
    }

    return (
        <div
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            className="w-full bg-transparent flex flex-col items-center justify-center overscroll-contain overflow-y-hidden">
            <button
                onClick={handleClearCanvas}
                className="w-[9%] position absolute right-0 -top-0.5 text-white bg-none flex justify-center items-start">Clear</button>
                <canvas
                    ref={ART}
                    width="640px"
                    height="480px"
                    className="md:w-[640px] md:h-[550px] w-[400px] h-[390px] bg-white rounded-lg p-0 m-0 border border-8 border-red-800"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleCanvasLeave}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleTouchMove}></canvas>
        </div>
    );

}