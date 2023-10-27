import React, { useRef, useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'

interface WaveformProps {
    audioFile: string
    playPause: boolean
    volume: number

    data: any
    currentTime: any
    blob: any
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
    blob,
}: WaveformProps) => {
    const waveformRef = useRef(null)
    let wavesurfer = useRef<WaveSurfer | null>(null)

    // I N I T I A L I Z E  A U D I O  A P P
    useEffect(() => {
        wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current as unknown as HTMLElement,
            waveColor: 'violet',
            progressColor: 'purple',
            fillParent: true,
            height: 30,
            minPxPerSec: 1,
        })

        if (blob) {
            wavesurfer.current.loadBlob(blob)
            wavesurfer.current?.play()
        } else {
            wavesurfer.current.load(audioFile)
        }
        return () => {
            wavesurfer.current?.unAll()
            wavesurfer.current?.destroy()
        }
    }, [audioFile, blob])

    // P L A Y  A U D I O
    useEffect(() => {
        const isPlaying = wavesurfer.current?.isPlaying()
        console.log('playing audio', isPlaying)
        if (playPause) {
            wavesurfer.current?.play()
        } else {
            wavesurfer.current?.pause()
        }
    }, [playPause])


    // S E T  V O L U M E
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

    // S C R U B  A U D I O
    useEffect(() => {
        wavesurfer.current?.on('audioprocess', () => {
            const time = wavesurfer.current?.getCurrentTime()
            if (time) {
                currentTime(formatTimecode(time))
            }
        })
    }, [currentTime])

    return (
        <div ref={waveformRef}></div>
    )
}

export default Waveform
