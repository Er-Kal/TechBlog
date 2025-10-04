'use client'

import { useState,useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

type Props = {
    author:string,
    content:string,
    date_created:string,

}

export default function Blog(props:Props){
    const [html,setHTML] = useState<string>("");
    useEffect(() => {
        async function convertStringToHTML(){
            const convertedHTML: string = await marked.parse(props.content);
            const sanitisedHTML = await DOMPurify.sanitize(convertedHTML);
            setHTML(sanitisedHTML)
        }
        convertStringToHTML()
    }, [props.content])
    return (
        <p dangerouslySetInnerHTML={{ __html:html}}></p>
    )
}