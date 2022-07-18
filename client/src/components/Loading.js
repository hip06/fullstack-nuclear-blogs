import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Loading = ({ top }) => {
    return (
        <div className={`fixed bottom-0 left-0 right-0 flex justify-center items-center bg-blackOverlay ${top}`}>
            <ThreeCircles
                color="#D47C6A"
                outerCircleColor="#98C261"
                innerCircleColor="#457385"
            />
        </div>
    )
}

export default Loading