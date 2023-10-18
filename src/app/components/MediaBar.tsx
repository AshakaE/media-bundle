import PlayButton from './PlayButton'
import PlayerBody from './PlayerBody'

export default function MediaBar() {
    return (
        <div className='bg-white h-20 absolute bottom-0 min-w-full flex justify-center'>
            <PlayerBody />
        </div>
    )
}
