'use client'

import { useEffect,useState } from "react";
import { getLatestBlogs } from "../services/blogService";
import Blog from "../components/blog";

export default function HomePage(){
    const [blogs,setBlogs] = useState<any[]>([])
    useEffect(() => {
        getLatestBlogs(5).then(setBlogs)
    },[]);
    console.log(getLatestBlogs(5))
    return (<div>
        <main>
            <ul>
                {blogs.map(blog => (
                    <Blog key={blog.id} content={blog.content}></Blog>
                ))}
            </ul>
        </main>
    </div>);
}