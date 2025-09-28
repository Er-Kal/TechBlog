import DOMPurify from 'dompurify';
import {marked} from 'marked';
import { useState,useEffect } from 'react';

type BlogProps = {
    key: number,
    content: string
};

export default function Blog(props: BlogProps){
    const [html,setHTML] = useState<string>("");
    useEffect(() => {
        async function convertStringToHTML(){
            const convertedHTML: string = await marked.parse(props.content);
            const sanitisedHTML = await DOMPurify.sanitize(convertedHTML);
            setHTML(sanitisedHTML)
        }
        convertStringToHTML()
    }, [])
    //const sanitizedHTML = DOMPurify.sanitize(convertedHTML);
    return (<li dangerouslySetInnerHTML={{ __html:html}}/>)
}