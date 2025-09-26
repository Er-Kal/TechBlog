import DOMPurify from 'dompurify';
import {marked} from 'marked';

type BlogProps = {
    key: number,
    content: string
};

export default function Blog(props: BlogProps){
    const convertedHTML = marked.parse(props.content);
    //const sanitizedHTML = DOMPurify.sanitize(convertedHTML);
    return (<li dangerouslySetInnerHTML={{__html:convertedHTML}}></li>)
}