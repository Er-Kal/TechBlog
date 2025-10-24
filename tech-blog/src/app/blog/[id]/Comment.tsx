
type Props = {
    content: string,
    created_at: string,
    author: string,
    authorId: string,
}

export default function Comment(props: Props) {
    return (<div className="comment">
        <p>{props.content}</p>
    </div>)
}