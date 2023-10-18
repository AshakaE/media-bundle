import Image from 'next/image'
import { ImPlay3 } from 'react-icons/im'

const PlayButton = ({
    handleButtonPress,
}: {
    handleButtonPress: () => void
}) => {
    return (
        <button
            id='playButton'
            className='play-button basis-1/4'
            onClick={handleButtonPress}
        >
            <ImPlay3 className='play-button-icon text-red-700 h-14 w-14 ' />
        </button>
    )
}

export default PlayButton
