import React from 'react'

const AudioControls = ({ isPlaying, onPrevClick, onNextClick, onPlayPauseClick }) => {
  return (
    <div className="flex justify-around px-[50px] tablet:px-[200px] laptop:px-[400px] items-center">
        <button type="button" className="bg-gray-800 bg-opacity-30 p-3 rounded-full mx-5" aria-label="Previous" onClick={onPrevClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="tablet:w-8 tablet:h-8 w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
            </svg>
        </button>
        {
            (isPlaying) ? 
            <button type="button" className="bg-gray-800 bg-opacity-30 p-3 rounded-full mx-5" onClick={() => onPlayPauseClick(false)} aria-label="Pause">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="tablet:w-8 tablet:h-8 w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
            </button> 
            : 
            <button type="button" className="bg-gray-800 bg-opacity-30 p-3 rounded-full mx-5" onClick={() => onPlayPauseClick(true)} aria-label="Play">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="tablet:w-8 tablet:h-8 w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
            </button>
        }
        <button type="button" className="bg-gray-800 bg-opacity-30 p-3 rounded-full mx-5" aria-label="Next" onClick={onNextClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="tablet:w-8 tablet:h-8 w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
            </svg>
        </button>
    </div>
  )
}

export default AudioControls