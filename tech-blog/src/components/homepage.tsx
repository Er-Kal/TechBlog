'use client'

import { useEffect,useState } from "react";
import { getLatestBlogs } from "../services/blogService";
import BlogPreview from "./blogpreview";

export default function HomePage(){
    const [blogs,setBlogs] = useState<any[]>([])
    useEffect(() => {
        getLatestBlogs(5).then(setBlogs)
    },[]);
    console.log(getLatestBlogs(5))
    return (<div>
            <ul>
                {blogs.map(blog => (
                    <BlogPreview key={blog.id} preview_content={blog.preview_content} author={blog.author}></BlogPreview>
                ))}
            </ul>
    </div>);
}