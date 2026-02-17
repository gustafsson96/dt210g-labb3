import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPost } from "../services/postService";
import { PulseLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./AdminCreatePost.css";

function AdminCreatePost() {
    // States for title, content and error message
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);

    // Use to navigate back to admin after a post has been created
    const navigate = useNavigate();

    // Get user to display as author
    const { user } = useAuth();

    // Handle form submit 
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Reset errors
        setTitleError("");
        setContentError("");
        setGeneralError("");

        let hasError = false;

        // Title validation
        if (!title.trim()) {
            setTitleError("Title is required.");
            hasError = true;
        } else if (title.trim().length < 3) {
            setTitleError("Title must be at least 3 characters.");
            hasError = true;
        }

        // Content validation
        if (!content.trim()) {
            setContentError("Content is required.");
            hasError = true;
        } else if (content.trim().length < 10) {
            setContentError("Content must be at least 10 characters.");
            hasError = true;
        }

        if (hasError) return;

        try {
            setLoading(true);
            await createPost({ title, content, author: user?.username || "Admin" });
            navigate("/admin");
        } catch {
            setGeneralError("Could not create blog post. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Navbar />
            <div className="admin-create-page">
                <h1>Create new blog post</h1>
                {generalError && (
                    <p className="error-message">{generalError}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Titel:</label>
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
                            "Create Post"
                        )}
                    </button>
                </form>
                <Link to="/admin">
                    <button className="back-button">← Back to Admin</button>
                </Link>
            </div>
        </>
    );
}

export default AdminCreatePost;