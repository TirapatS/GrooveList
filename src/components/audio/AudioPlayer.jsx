import { useEffect, useState, useRef } from 'react'
import AudioControls from './AudioControls'


const AudioPlayer = ({ tracks }) => {

    const [trackIndex, setTrackIndex] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const { name, artist, image, src } = tracks[trackIndex]

    // Refs
    const audioRef = useRef(new Audio(src))
    const intervalRef = useRef()
    const isReady = useRef(false)

    const { duration } = audioRef.current

    const prevTrack = () => {
        console.log('TODO prev track')
    }

    const nextTrack = () => {
        console.log('TODO next track')
    }

    return (
        <div className="fixed rounded-lg inset-x-0 bottom-20 laptop:bottom-0 font-extrabold bg-gray-600 bg-opacity-80 pb-5">
            <div className="">
                <div className="flex p-5 laptop:px-[600px] items-center justify-around">
                    <img
                        className="w-[100px] laptop:w-[120px] inline-block p-2 rounded-full shadow-lg"
                        src={image}
                        alt={`track image for ${name} by ${artist}`}
                    />
                    <div>
                        <h2>{name}</h2>
                        <h4 className="text-sm mt-2">{artist}</h4>
                    </div>
                </div>
                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={prevTrack}
                    onNextClick={nextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
            </div>
        </div>
    )
}

export default AudioPlayer