import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";
import type { Post } from "../interfaces/Post";
import { ClimbingBoxLoader } from "react-spinners";
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
    return (
        <main className="postlist-container">
            <h1>Julia's Blog</h1>
            {loading && (
                <div>
                    <ClimbingBoxLoader color="#c71ac1" />
                </div>
            )}
            {error && !loading && (
                <p className="error-message">{error}</p>
            )}

            {!loading && !error && posts.length === 0 && (
                <p>No blog posts to show.</p>
            )}
            {!loading && !error &&
                posts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
        </main>
    );
}

export default PostList;