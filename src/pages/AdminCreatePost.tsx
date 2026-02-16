import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPost } from "../services/postService";
import Navbar from "../components/Navbar";
import "./AdminCreatePost.css";

function AdminCreatePost() {
    // States for title, content and error message
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Use to navigate back to admin after a post has been created
    const navigate = useNavigate();

    // Handle form submit 
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        // Create post via service
        try {
            await createPost({ title, content, author: "Admin" });
            navigate("/admin");
        } catch (err) {
            setError("Could not create blog post.")
        }
    }
    return (
        <>
            <Navbar />
            <div className="admin-create-page">
                <h1>Create new blog post</h1>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Titel:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Content:</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Create Post</button>
                </form>
                <Link to="/admin">
                    <button className="back-button">← Back to Admin</button>
                </Link>
            </div>
        </>
    );
}

export default AdminCreatePost;