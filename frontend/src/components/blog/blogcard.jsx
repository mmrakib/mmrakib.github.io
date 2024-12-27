import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import "./blogcard.scss";

function BlogCard({ id, title, date, excerpt }) {
    const publishedDate = new Date(date);
    const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

    return (
        <Link to={`/post/${id}`} className="blog-card-link fade-in">
            <div className="blog-card fade-in">
                <h3>{title}</h3>
                <p className="blog-excerpt fade-in">{excerpt}</p>
                <div className="blog-card-meta fade-in">
                    <p className="blog-card-meta-date fade-in">{publishedDate.toLocaleDateString()}</p>
                    <p className="blog-card-meta-timeago fade-in">{timeAgo}</p>
                </div>
            </div>
        </Link>
    );
}

export default BlogCard;
