'use client'

import styles from './submit-blog.module.css'
import { useState } from 'react'
import BlogContent from '@/components/BlogContent';

export default function SubmitBlogPage(){
    const [title, setTitle] = useState<string>('');
    const [blogShort, setBlogShort] = useState<string>('');
    const [blogContent, setBlogContent] = useState<string>('');

    const titleChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTitle(event.target.value)
    }

    const blogShortChanged = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setBlogShort(event.target.value)
    }

    const blogContentChanged = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setBlogContent(event.target.value)
    }

    return (
        <main>
            <h1>Submit a blog</h1>
            <form className={styles.form}>
                <label htmlFor="title">Title of blog</label>
                <input onChange={titleChanged} id="title" name="title" type="text" required></input>

                <label htmlFor="blog-short">Blog Short</label>
                <textarea onChange={blogShortChanged} className={styles.textarea} id="blog-preview" name="blog-preview" required></textarea>

                <label htmlFor="blog-content">Blog Content</label>
                <textarea onChange={blogContentChanged} className={styles.textarea} id="blog-content" name="blog-content" required></textarea>
            </form>
            <div className={styles.preview}>
                <h2>Previews</h2>
                <h3>Title of blog</h3>
                <p>{title}</p>
                <h3>Blog Short</h3>
                <BlogContent blogText={blogShort}/>
                <h3>Blog Content</h3>
                <BlogContent blogText={blogContent}/>
            </div>
        </main>
    )
}