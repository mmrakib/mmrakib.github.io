import React, { useEffect, useState } from "react";

import BlogCard from "../blog/blogcard.jsx";

import "./writingpage.scss";

function WritingPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/blogs.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const sortedBlogs = data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                setBlogs(sortedBlogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div className="writing-page">Loading...</div>;
    }

    if (error) {
        return <div className="writing-page">Error: {error.message}</div>;
    }

    return (
        <div className="writing-page">
            <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input fade-in"
            />

            {blogs
                .filter((blog) =>
                    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((blog) => (
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

export default WritingPage;
