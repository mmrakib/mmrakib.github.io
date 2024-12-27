import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";
import { FiArrowLeftCircle } from "react-icons/fi"; // Import React Icon

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "./blogpage.scss";

function BlogPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch("/blogs.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const foundBlog = data.find((b) => b.id === parseInt(id));
                if (foundBlog) {
                    setBlog(foundBlog);
                    const mdResponse = await fetch(`/posts/${foundBlog.filename}`);
                    if (!mdResponse.ok) {
                        throw new Error(`HTTP error! status: ${mdResponse.status}`);
                    }
                    const mdContent = await mdResponse.text();
                    setContent(mdContent);
                } else {
                    throw new Error("Blog post not found.");
                }
            } catch (err) {
                console.error("Error fetching blog details:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleBackClick = () => {
        navigate("/writing");
    }

    if (loading) {
        return <div className="blog-detail">Loading...</div>;
    }

    if (error) {
        return (
            <div className="blog-detail">
                <h2>Error: {error.message}</h2>
                <Link to="/writing" className="back-link">
                    ← Back to Blog List
                </Link>
            </div>
        );
    }

    const publishedDate = new Date(blog.date);
    const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

    return (
        <div className="blog-page fade-in">
            <h2>{blog.title}</h2>
            <div className="blog-meta fade-in">
                <p>{publishedDate.toLocaleDateString()}</p>
                <p>{timeAgo}</p>
            </div>
            <div className="blog-content fade-in">
                <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                >
                    {content}
                </ReactMarkdown>
            </div>

            <div className="back-icon-container">
                <Link to="/writing" className="back-icon fade-in">
                    <FiArrowLeftCircle size={24} />
                </Link>
            </div>
        </div>
    );
}

export default BlogPage;
