import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../services/postService";
import type { Post } from "../interfaces/Post";
import Navbar from "../components/Navbar";

function PostPage() {
    // Get post id from url
    const { id } = useParams<{ id: string }>();
    // For navigation back to post list
    const navigate = useNavigate();

    // States to store post, error messages and loading status
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch post with a specific id when component loads
    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            try {
                const data = await getPost(parseInt(id));
                setPost(data);
            } catch {
                setError("Could not load post.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <>
            <Navbar />
            <h1>{post.title}</h1>
            <p>Av {post.author}</p>
            <p>{post.content}</p>

            <button onClick={() => navigate("/")} style={{ marginTop: "1em" }}>
                Back to blog
            </button>
        </>
    );
}

export default PostPage;