import React, { useRef, useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'

interface WaveformProps {
    audioFile: string
    playPause: boolean
    volume: number

    data: any
    currentTime: any
}
const formatTimecode = (seconds: number) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
}

const Waveform = ({
    audioFile,
    playPause,
    volume,
    data,
    currentTime,
}: WaveformProps) => {
    const waveformRef = useRef(null)
    let wavesurfer = useRef<WaveSurfer | null>(null)

    useEffect(() => {
        wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current as unknown as HTMLElement,
            waveColor: 'violet',
            progressColor: 'purple',
            height: 30,
            minPxPerSec: 10,
        })
        wavesurfer.current.load(audioFile)
        return () => {
            wavesurfer.current?.unAll()
            wavesurfer.current?.destroy()
        }
    }, [audioFile])

    useEffect(() => {
        const isPlaying = wavesurfer.current?.isPlaying()
        console.log('playing audio', isPlaying)
        if (playPause) {
            wavesurfer.current?.play()
        } else {
            wavesurfer.current?.pause()
        }
    }, [playPause])

    useEffect(() => {
        wavesurfer.current?.setVolume(volume)

        wavesurfer.current?.on('ready', () => {
            const duration = wavesurfer.current?.getDuration()
            if (duration) {
                console.log('duation', formatTimecode(duration))
                data(formatTimecode(duration))
            }
        })
    }, [volume, data])

    useEffect(() => {
        wavesurfer.current?.on('audioprocess', () => {
            const time = wavesurfer.current?.getCurrentTime()
            if (time) {
                currentTime(formatTimecode(time))
            }
        })
    }, [currentTime])

    return <div ref={waveformRef}></div>
}

export default Waveform
