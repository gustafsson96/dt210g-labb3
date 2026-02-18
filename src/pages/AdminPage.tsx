import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/postService";
import type { Post } from "../interfaces/Post";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import "./AdminPage.css";

function AdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch {
                setError("Could not load blog posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deletePost(id);
            setPosts(posts.filter(p => p.id !== id));
            setSuccess("Blog post deleted successfully.");
            setTimeout(() => setSuccess(null), 2000);
        } catch {
            setError("Could not delete blog post.");
        }
    }
    return (
        <>
            <Navbar />
            <div className="admin-page">
                <h1>Admin View</h1>
                <Link to="/admin/create" className="create-post-link">Create a new blog post</Link>

                {loading && (
                    <div>
                        <ClimbingBoxLoader color="#c71ac1" />
                    </div>
                )}
                {error && !loading && (
                    <p className="error-message">{error}</p>
                )}

                {success && !loading && (
                    <p className="success-message">{success}</p>
                )}

                {!loading && !error && posts.length === 0 && (
                    <p>No blog posts to show.</p>
                )}
                {!loading && !error &&
                    posts.map(post => (
                        <div key={post.id} className="admin-post">
                            <h3>{post.title}</h3>
                            <p>{post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content}</p>
                            <div className="admin-post-actions">
                                <Link to={`/admin/edit/${post.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(post.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default AdminPage;