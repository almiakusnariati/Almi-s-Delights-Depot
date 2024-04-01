import ReactPlayer from 'react-player';
import video from "../assets/sepatu.mp4"

export default function VideoBackground() {
    return(
        <div className="w-full h-full">
            <ReactPlayer url={video} playing loop muted width="100%" height="100%" className="object-cover" />
        </div>
    );
}