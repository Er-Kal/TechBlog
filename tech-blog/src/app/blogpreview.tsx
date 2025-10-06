import DOMPurify from 'dompurify';
import {marked} from 'marked';
import { useState,useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/blogpreview.module.css'

type PreviewProps = {
    blogId: number,
    previewContent: string,
    author_id: string,
};

export default function BlogPreview(props: PreviewProps){

    const [html,setHTML] = useState<string>("");
    useEffect(() => {
        async function convertStringToHTML(){
            const convertedHTML: string = await marked.parse(props.previewContent);
            const sanitisedHTML = await DOMPurify.sanitize(convertedHTML);
            setHTML(sanitisedHTML)
        }
        convertStringToHTML()
    }, [props.previewContent])
    //const sanitizedHTML = DOMPurify.sanitize(convertedHTML);
    return (<li className={styles.li}>
        <p dangerouslySetInnerHTML={{ __html:html}}></p>
        <Link href={`/blog/${props.blogId}`}>
            <button>View blog</button>
        </Link>
    </li>)
}