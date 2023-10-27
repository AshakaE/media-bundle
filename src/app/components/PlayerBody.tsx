'use client'
import {
    IoVolumeHighSharp,
    IoVolumeLowSharp,
    IoVolumeMediumSharp,
    IoVolumeMuteSharp,
} from 'react-icons/io5'
import Waveform from '../client/Waveform'
import { useEffect, useState } from 'react'
import PlayButton from './PlayButton'
import styles from './WaveSurferStyles.module.css'
const a =
    'https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3'

const PlayerBody = () => {
    const storedVolume =
        localStorage && localStorage.getItem('audio-player-volume')
    const initialSliderValue =
        storedVolume !== null ? Number(storedVolume) * 100 : 30

    const [volumeValue, setVolumeValue] = useState(0.1)
    const [sliderValue, setSliderValue] = useState(initialSliderValue)
    const [isPlayActive, setPlayActive] = useState(false)
    const [duration, setDuration] = useState(false)
    const [currenTime, setCurrentTime] = useState(false)

    const [audioBlob, setAudioBlob] = useState()
    const initialVolumeLevel =
        initialSliderValue > 0 && initialSliderValue <= 30
            ? 'low'
            : initialSliderValue > 30 && initialSliderValue < 60
            ? 'medium'
            : initialSliderValue >= 60
            ? 'high'
            : 'mute'
    const [volumeLevel, setVolumeLevel] = useState(initialVolumeLevel)

    const handleButtonPress = () => {
        setPlayActive(!isPlayActive)
    }

    const handleVolume = (e: any) => {
        const volum = e.target.value !== null ? e.target.value : 30
        let volumeState
        if (volum > 0 && volum <= 30) {
            volumeState = 'low'
        } else if (volum > 30 && volum < 60) {
            volumeState = 'medium'
        } else if (volum >= 60) {
            volumeState = 'high'
        } else {
            volumeState = 'mute'
        }

        const volume = e.target.value / 100
        setVolumeValue(volume)
        setVolumeLevel(volumeState)
        localStorage.setItem('audio-player-volume', `${volume}`)
    }

    const pull_data = (data: any) => {
        setDuration(data)
    }

    const handleCurrentTime = (data: any) => {
        setCurrentTime(data)
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files[0]
        if (file) {
            setAudioBlob(file)
            setPlayActive(true)
        }
    }

    const toggleMute = () => {
        volumeLevel !== 'mute' ? setVolumeLevel('mute') : setVolumeLevel(volumeLevel)
    }

    useEffect(() => {
        const storedVolume = localStorage.getItem('audio-player-volume')

        if (storedVolume !== null) {
            const v = Number(storedVolume) * 100

            setSliderValue(v)
            handleVolume({ target: { value: v } })
        }
    }, [])

    return (
        <>
            {/* <div>
                    <input
                        type='file'
                        accept='audio/*'
                        onChange={handleFileChange}
                    />
                </div> */}
            <div className='basis-1/4'>
                <PlayButton
                    handleButtonPress={handleButtonPress}
                    play={isPlayActive}
                />
            </div>
            <div className='player-body basis-1/2'>
                <p className='title'>Artist - Track Title</p>
                <div className='flex w-full justify-between items-center'>
                    <div>
                        <span id='currentTime'>{currenTime || '0:00'}</span>
                    </div>
                    <div id='waveform' className='w-full mx-2'>
                        <Waveform
                            audioFile={a}
                            playPause={isPlayActive}
                            volume={volumeValue}
                            data={pull_data}
                            currentTime={handleCurrentTime}
                            blob={audioBlob}
                        />
                    </div>
                    <div>
                        <span id='totalDuration'>{duration}</span>
                    </div>
                </div>
                <div className='controls flex flex-row items-center'>
                    <div className='volume flex'>
                        <button onClick={toggleMute}>
                            {volumeLevel === 'low' && (
                                <IoVolumeLowSharp className='text-red-700 h-7 w-7' />
                            )}
                            {volumeLevel === 'medium' && (
                                <IoVolumeMediumSharp className='text-red-700 h-7 w-7' />
                            )}
                            {volumeLevel === 'high' && (
                                <IoVolumeHighSharp className='text-red-700 h-7 w-7' />
                            )}
                            {volumeLevel === 'mute' && (
                                <IoVolumeMuteSharp className='text-red-700 h-7 w-7' />
                            )}
                        </button>
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
                </div>
            </div>
        </>
    )
}

export default PlayerBody
