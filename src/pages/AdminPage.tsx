import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/postService";
import type { Post } from "../interfaces/Post";
import { Link } from "react-router-dom";

function AdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
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
        } catch {
            setError("Could not delete blog post.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>Admin</h1>
            <Link to="/admin/create">Create a new blog post.</Link>

            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <Link to={`/admin/edit/${post.id}`}>Edit</Link>
                    <button onClick={() => handleDelete(post.id)}>
                        Ta bort
                    </button>
                </div>
            ))}
        </>
    );
}

export default AdminPage;