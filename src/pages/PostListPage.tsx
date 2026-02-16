import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";
import type { Post } from "../interfaces/Post";
import PostItem from "../components/PostItem";

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
        <>
            <h1>Alla poster</h1>
            {posts.length === 0 && <p>No blog posts to show.</p>}
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </>
    );
}

export default PostList;