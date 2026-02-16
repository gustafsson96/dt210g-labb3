import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";
import type { Post } from "../interfaces/Post";
import PostItem from "./PostItem";
import "./PostList.css";

function PostList() {
    // States to store posts, loading status and error messages
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data when component loads via postService
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPosts();
                // Set state with fetched posts
                setPosts(data);
            } catch (err) {
                // Error message
                setError("Could not load blog posts.");
            } finally {
                // Set loading to false
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Show loading or error message if needed
    // Replace with animation
    if (loading) return <p>Loading posts...</p>
    if (error) return <p>Error</p>

    return (
            <main className="postlist-container">
                <h1>Julia's Blog</h1>
                {posts.length === 0 && <p>No blog posts to show.</p>}
                {posts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </main>
    );
}

export default PostList;