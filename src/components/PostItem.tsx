import type { Post } from "../interfaces/Post";

// Post prop
interface Props {
    post: Post;
}

function PostItem({ post }: Props) {
    return (
        <div>
            <h2>{post.title}</h2>
            <p>Av {post.author}</p>
            <p>{post.content}</p>
        </div>
    );
}

export default PostItem;
