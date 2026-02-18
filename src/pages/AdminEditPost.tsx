import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getPost, updatePost } from "../services/postService";
import type { Post } from "../interfaces/Post";
import { PulseLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar"
import "./AdminEditPost.css";

function AdminEditPost() {
    // Get post id from url
    const { id } = useParams<{ id: string }>();

    // Use to navigate back to admin after a post has been updated
    const navigate = useNavigate();

    // Get user to display as author
    const { user } = useAuth();

    // States for title and content
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // States for user feedback and loading
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch single post data when component loads or when id changes
    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            try {
                const post: Post = await getPost(parseInt(id));
                setTitle(post.title);
                setContent(post.content);
            } catch {
                setGeneralError("Could not load blog post");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    // Handle form submit
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        setGeneralError("");
        setTitleError("");
        setContentError("");

        if (!id) return;

        let hasError = false;

        if (!title.trim()) {
            setTitleError("Title is required");
            hasError = true;
        }

        if (!content.trim()) {
            setContentError("Content is required");
            hasError = true;
        }

        if (hasError) return;

        setLoading(true);

        try {
            await updatePost(parseInt(id), { title, content, author: user?.username || "Admin" });
            setSuccessMessage("Blog post updated successfully!");
            setTimeout(() => navigate("/admin"), 1500);
        } catch {
            setGeneralError("Could not update blog post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="admin-edit-page">
                <h1>Edit Blog Post</h1>
                {generalError && (
                    <p className="error-message">{generalError}</p>
                )}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setTitleError("");
                            }}
                        />
                        {titleError && (
                            <span className="error-message">{titleError}</span>
                        )}
                    </div>

                    <div>
                        <label>Content:</label>
                        <textarea
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                setContentError("");
                            }}
                        />
                        {contentError && (
                            <span className="error-message">{contentError}</span>
                        )}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? (
                            <PulseLoader size={8} color="#ffffff" />
                        ) : (
                            "Update Post"
                        )}
                    </button>
                </form>
                <Link to="/admin">
                    <button className="back-button">← Back to Admin</button>
                </Link>
            </div>
        </>

    )
}

export default AdminEditPost;