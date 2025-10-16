import { FaRegThumbsUp } from 'react-icons/fa';
import styles from './blog.module.css'


type Props = {
    id:number;
}

export default function LikeCounter(props:Props){
    return (<div className={styles.likeContainer}>
        <FaRegThumbsUp/>
        <p>1</p>
        <button>Like</button>
    </div>)
}