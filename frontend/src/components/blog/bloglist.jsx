import React, { useEffect, useState } from "react";

import BlogCard from "./blogcard.jsx";
import "./bloglist.scss";

function BlogList() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("/blogs.json")
            .then((response) => response.json())
            .then((data) => {
                // Sort blogs by date in descending order
                const sortedBlogs = data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                setBlogs(sortedBlogs);
            })
            .catch((error) => {
                console.error("Error fetching blogs:", error);
            });
    }, []);

    return (
        <div className="blog-list">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    date={blog.date}
                    excerpt={blog.excerpt}
                />
            ))}
        </div>
    );
}

export default BlogList;
