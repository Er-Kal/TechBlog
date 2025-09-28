import DOMPurify from 'dompurify';
import {marked} from 'marked';
import { useState,useEffect } from 'react';

type PreviewProps = {
    key: number,
    preview_content: string,
    author: string,
};

export default function BlogPreview(props: PreviewProps){
    const [html,setHTML] = useState<string>("");
    useEffect(() => {
        async function convertStringToHTML(){
            const convertedHTML: string = await marked.parse(props.preview_content);
            const sanitisedHTML = await DOMPurify.sanitize(convertedHTML);
            setHTML(sanitisedHTML)
        }
        convertStringToHTML()
    }, [])
    //const sanitizedHTML = DOMPurify.sanitize(convertedHTML);
    return (<li dangerouslySetInnerHTML={{ __html:html}}/>)
}