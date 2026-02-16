import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../services/postService";
import type { Post } from "../interfaces/Post";
import Navbar from "../components/Navbar"

function AdminEditPost() {
    // Get post id from url
    const { id } = useParams<{ id: string }>();

    // Use to navigate back to admin after a post has been updated
    const navigate = useNavigate();

    // States for title, content, error messages and loading
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch single post data when component loads or when id changes
    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            try {
                const post: Post = await getPost(parseInt(id));
                setTitle(post.title);
                setContent(post.content);
            } catch {
                setError("Could not load blog post.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    // Handle form submit
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!id) return;

        try {
            await updatePost(parseInt(id), { title, content, author: "Admin" });
            navigate("/admin");
        } catch {
            setError("Could not update blog post.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <>
            <Navbar />
            <h1>Edit Blog Post</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Update Post</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </>

    )
}

export default AdminEditPost;