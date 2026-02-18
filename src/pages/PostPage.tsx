import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../services/postService";
import type { Post } from "../interfaces/Post";
import { ClimbingBoxLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import "./PostPage.css";

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

    return (
        <>
            <Navbar />
            <main>
                <div className="post-page-container">
                    {loading ? (
                        <div>
                            <ClimbingBoxLoader color="#c71ac1" />
                        </div>
                    ) : error ? (
                        <div>
                            <p>{error}</p>
                            <button onClick={() => navigate("/")}>← Back to blog</button>
                        </div>
                    ) : post ? (
                        <>
                            <h1>{post.title}</h1>
                            <p className="post-meta">
                                <span>Av {post.author} |</span>
                                <span>
                                    {new Date(post.created_at).toLocaleString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </span>
                            </p>
                            <p className="post-content">{post.content}</p>
                            <button className="back-button" onClick={() => navigate("/")}>
                                ← Back to blog
                            </button>
                        </>
                    ) : null}
                </div>
            </main >
        </>
    );
}

export default PostPage;