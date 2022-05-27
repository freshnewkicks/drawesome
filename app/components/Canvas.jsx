import React, {useCallback, useEffect, useRef, useState} from "react"

export default function Canvas() {
    const ART = useRef();
    let prevMouse = useRef({x:0, y:0});
    let pencil = false;
    let first = false;
    const SIZE = 5;
    const COLOR = 'black';
    const OFFSET = 0.1;

    const draw = (e) => {
        let ctx = ART.current.getContext('2d');
        let canvas = ART.current.getBoundingClientRect();

        if (!pencil) {
            return;
        }

        ctx.beginPath();
        ctx.lineWidth = SIZE;

        let x = e.clientX - canvas.left;
        let y = e.clientY - canvas.top;
        x = x * ART.current.width / ART.current.clientWidth;
        y = y * ART.current.height / ART.current.clientHeight;
        if( first ) {
            prevMouse.current = {x: x, y: y}
            first = false;
        }
        const LOWER_X = prevMouse.current.x - OFFSET;
        const UPPER_X = prevMouse.current.x + OFFSET;
        const LOWER_Y = prevMouse.current.y - OFFSET;
        const UPPER_Y = prevMouse.current.y + OFFSET;
        if ((x > UPPER_X || x < LOWER_X || y > UPPER_Y || y < LOWER_Y)) {
            ctx.moveTo(prevMouse.current.x, prevMouse.current.y);
            ctx.lineTo(x, y);
            ctx.stroke();
        } else {
            ctx.arc(x, y, 1, 0, 2 * Math.PI, false);
            ctx.fillStyle = COLOR;
            ctx.fill();
        }
        prevMouse.current = {x: x, y: y}
    }

    const handleMouseMove = (e) => {
        draw(e)
    }
    const handleMouseDown = () =>{
        pencil = true
        first = true;
    }

    const handleMouseLeave = () => {
        pencil = false
    }

    const handleMouseUp = () => {
        pencil = false
    }

    const handleCanvasLeave = () => {
        pencil = false
    }



    return (
        <div
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            className="w-screen h-screen bg-slate-800 flex flex-row items-center justify-center">

            <canvas
                ref={ART}
                height="640"
                width="640"
                className="min-w-[320px] max-w-[640px] min-h-[320px] h-[640px] border border-8 border-red-400 bg-white rounded-lg p-0 m-0"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleCanvasLeave}
                onMouseMove={handleMouseMove}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}></canvas>
        </div>
    );

}