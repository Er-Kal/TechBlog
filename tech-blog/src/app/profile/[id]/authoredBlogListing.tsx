import Link from "next/link";

type BlogListing = {
    key:number,
    created_at:string,
    title:string,
    id:number,
}

export default function BlogListing(props:BlogListing){
    return (
        <li>
            <Link href={'/blog/'+props.id}>
                <p>{props.title}</p>
                <p>{new Date(props.created_at).toLocaleDateString()}</p>
            </Link>
        </li>
    )
}