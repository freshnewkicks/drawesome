import { useState, useEffect } from 'react'

export default function Timer(props) {
    const [counter, setCounter] = useState(props.seconds)
    const [counterMs, setCounterMs] = useState(props.ms)

    useEffect( () => {
        if (counter > 0) {
            if (counterMs > 0) {
                setTimeout(() => {
                    setCounterMs(counterMs - 1)
                }, 10)
            } else if (counterMs === 0 && counter > 0) {
                setCounterMs(props.ms)
                setCounter(counter - 1)
            }
        }
    }, [counter, counterMs])

    return (
        <div>
            {
                counter > 0 ?
                    <div className={props.textColor}>Countdown: { counter + '.' + counterMs }</div>
                    :
                    <div className={props.textColor}>Expired</div>

            }
        </div>
    )
}