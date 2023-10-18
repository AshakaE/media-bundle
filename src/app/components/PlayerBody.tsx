'use client'
import { ImVolumeHigh } from 'react-icons/im'
import Waveform from '../client/Waveform'
import { useEffect, useState } from 'react'
import PlayButton from './PlayButton'
const a =
    'https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3'

const PlayerBody = () => {
    const [volumeValue, setVolumeValue] = useState(0.1)
    const [sliderValue, setSliderValue] = useState(30)
    const [isChildActive, setChildActive] = useState(false)
    const [duration, setDuration] = useState(false)
    const [currenTime, setCurrentTime] = useState(false)

    const handleButtonPress = () => {
        setChildActive(!isChildActive)
    }
    const handleVolume = (e: any) => {
        const volume = e.target.value / 100

        setVolumeValue(volume)
        localStorage.setItem('audio-player-volume', `${volume}`)
    }

    const pull_data = (data: any) => {
        setDuration(data)
        console.log(data) // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
    }
    const handleCurrentTime = (data: any) => {
        setCurrentTime(data)
        console.log(data) // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
    }


    useEffect(() => {
        const v = Number(localStorage.getItem('audio-player-volume')) * 100
        if (v) {
            setSliderValue(v)
            handleVolume({ target: { value: v } })
        }
    }, [])

    return (
        <>
            <div className='basis-1/4'>
                <PlayButton handleButtonPress={handleButtonPress} />
            </div>
            <div className='player-body basis-1/2'>
                <p className='title'>Artist - Track Title</p>
                <div id='waveform' className='waveform'>
                    <Waveform
                        audioFile={a}
                        playPause={isChildActive}
                        volume={volumeValue}
                        data={pull_data}
                        currentTime={handleCurrentTime}
                    />
                </div>

                <div className='controls flex flex-row items-center'>
                    <div className='volume flex'>
                        <ImVolumeHigh className=' text-red-700 h-7 w-7 ' />
                        <input
                            id='volumeSlider'
                            className='volume-slider'
                            type='range'
                            name='volume-slider'
                            min='0'
                            max='100'
                            defaultValue={String(sliderValue)}
                            onChange={handleVolume}
                        />
                    </div>

                    <div className='timecode'>
                        <span id='currentTime'>{currenTime}</span>
                        <span>/</span>
                        <span id='totalDuration'>{duration}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlayerBody
