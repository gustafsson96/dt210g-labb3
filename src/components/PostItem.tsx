import type { Post } from "../interfaces/Post";
import { Link } from "react-router-dom";
 
// Post prop
interface Props {
    post: Post;
}

function PostItem({ post }: Props) {
    // Excerpt to show only a part of a blog post
    const excerpt = post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content;
    return (
        <div>
            <h2>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{excerpt}</p>
            <p>Av {post.author}</p>
        </div>
    );
}

export default PostItem;
