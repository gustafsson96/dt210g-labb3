import type { Post } from "../interfaces/Post";
import { Link } from "react-router-dom";
import "./PostItem.css";

// Post prop
interface Props {
    post: Post;
}

function PostItem({ post }: Props) {
    // Excerpt to show only a part of a blog post
    const excerpt = post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content;
    return (
        <Link className="post-item-link" to={`/posts/${post.id}`}>
            <div className="post-item">
                <h2>
                    {post.title}
                </h2>
                <p className="post-meta">
                    <span>Av {post.author} |</span>
                    <span>
                        {new Date(post.created_at).toLocaleString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </span>
                </p>
                <p className="post-excerpt">{excerpt}</p>
            </div></Link >
    );
}

export default PostItem;
