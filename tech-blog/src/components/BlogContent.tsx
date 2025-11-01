import styles from '@/app/blog/[id]/blog.module.css'
import { useEffect,useState } from 'react';
import { marked } from "marked";
import DOMPurify from "dompurify";

type Props = {
    blogText: string;
}

export default function BlogContent(props:Props){
    const [html, setHTML] = useState<string>("");
    useEffect(() =>{
        async function convertStringToHTML() {
			const convertedHTML: string = await marked.parse(props.blogText);
			const sanitisedHTML = await DOMPurify.sanitize(convertedHTML);
			setHTML(sanitisedHTML);
		}
		convertStringToHTML();
    },[props.blogText])

    return (<div className={styles.blogContent} dangerouslySetInnerHTML={{ __html: html }}></div>)
}