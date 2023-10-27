import Image from 'next/image'
import { GrPlayFill, GrPauseFill } from 'react-icons/gr'

interface PlayButtonProps {
    play: boolean
    handleButtonPress: () => void
}

const PlayButton = ({ handleButtonPress, play }: PlayButtonProps) => {
    return (
        <button
            id='playButton'
            className='play-button basis-1/4'
            onClick={handleButtonPress}
        >
            {play ? (
                <GrPauseFill className='play-button-icon text-red-700 h-14 w-14 ' />
            ) : (
                <GrPlayFill className='play-button-icon text-red-700 h-14 w-14 ' />
            )}
        </button>
    )
}

export default PlayButton
