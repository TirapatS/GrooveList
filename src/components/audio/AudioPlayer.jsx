import { useEffect, useState, useRef } from 'react'
import AudioControls from './AudioControls'

const AudioPlayer = ({ tracks }) => {

    const [trackIndex, setTrackIndex] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(30)

    const { name, artist, image, src } = tracks[trackIndex]

    // Refs
    const audioRef = useRef(new Audio(src))
    const intervalRef = useRef()
    const isReady = useRef(false)
    const { duration } = audioRef.current

    const prevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1)
        } else {
            setTrackIndex(trackIndex - 1)
        }
    }

    const nextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1)
        } else {
            setTrackIndex(0)
        }
    }

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() =>{
            if (audioRef.current.ended) {
                nextTrack()
            } else {
                setTrackProgress(audioRef.current.currentTime)
            }
        }, [1000])
    }

    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current)
        audioRef.current.currentTime = value
        setTrackProgress(audioRef.current.currentTime)
    }

    const onScrubEnd = () => {
        // If not already playing, start track
        if(!isPlaying) {
            setIsPlaying(true)
        }
        startTimer()
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play()
            startTimer()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        return () => {
            audioRef.current.pause()
            clearInterval(intervalRef.current)
        }
    }, [])

    useEffect(() => {
        audioRef.current.pause()

        audioRef.current = new Audio(src)
        setTrackProgress(audioRef.current.currentTime)

        if (isReady.current) {
            audioRef.current.play()
            setIsPlaying(true)
            startTimer()
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true
        }
    }, [trackIndex])

    const changeVolume = (e) => {
        setVolume(e.target.value)

        // change the volume
        audioRef.current.volume = volume / 100
    }


    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%'
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100%, 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`

    return (
        <div className="fixed rounded-lg inset-x-0 bottom-0 font-extrabold bg-gray-600 bg-opacity-80">
            <div className="pb-[70px]">
                <div className="flex p-2 items-center justify-around px-[50px] tablet:px-[200px] laptop:px-[400px]">
                    <img
                        className="spinImg w-[120px] laptop:w-[120px] inline-block p-2 rounded-full"
                        src={image}
                        alt={`song image for ${name} by ${artist}`}
                        style= { (isPlaying) ? { animationPlayState: "running"} : { animationPlayState: "paused"} }
                    />
                    <div>
                        <h2 className="text-xl">{name}</h2>
                        <h4 className="text-m mt-2">{artist}</h4>
                    </div>
                </div>
                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={prevTrack}
                    onNextClick={nextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
                <div className="mt-4 px-[80px] tablet:px-[180px] laptop:px-[380px]">
                    <input
                        type="range"
                        value={trackProgress}
                        step="1"
                        min="0"
                        max={duration ? duration : `${duration}`}
                        className="w-full"
                        onChange={(e) => onScrub(e.target.value)}
                        onMouseUp={onScrubEnd}
                        onKeyUp={onScrubEnd}
                        style={{background: trackStyling}}
                    />
                </div>
                <div className="flex items-center mt-4 px-[100px] tablet:px-[200px] laptop:px-[400px] desktop:px-[600px]">
                    
                    {
                        (volume >= 1) ? 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                        : 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                      </svg>
                      
                    }

                    <input
                        type="range"
                        value={volume}
                        min={0}
                        max={100}
                        className="w-full ml-3"
                        onChange={(e) => changeVolume(e)}
                        style={{background: trackStyling}}
                    />
                </div>
            </div>
        </div>
    )
}

export default AudioPlayer