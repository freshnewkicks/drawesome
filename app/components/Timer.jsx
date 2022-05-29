import { useState, useEffect } from 'react'

export default function Timer(props) {
    const [counter, setCounter] = useState(props.seconds)
    const [counterMs, setCounterMs] = useState(props.ms)
    const [flag, setFlag] = useState(true)

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
        } else if (counter <= 0) {
            setFlag(false)
        }
    }, [counter, counterMs])

    return (
        <div>
            {
                counter > 0 ?
                    <div className={props.textColor}>Countdown: { counter + '.' + counterMs }</div>
                    :
                    props.passFlag(flag)
            }
        </div>
    )
}