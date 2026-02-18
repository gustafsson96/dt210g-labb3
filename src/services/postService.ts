import type { Post } from "../interfaces/Post";

const api = "https://dt210g-labb3-backend.onrender.com";

// Get the token
const getToken = () => localStorage.getItem("token");

// GET all blog posts
export const getPosts = async () => {
    const response = await fetch(`${api}/posts`, {
        method: "GET"
    });

    if (!response.ok) {
        throw new Error("Could not fetch posts");
    }

    return response.json();
}

// GET a single post
export const getPost = async (id: number) => {
    const response = await fetch(`${api}/posts/${id}`, {
        method: "GET"
    });

    if (!response.ok) {
        throw new Error("Could not fetch post");
    }

    return response.json();
};

// POST to create a new post
export const createPost = async (post: Omit<Post, "id" | "created_at" | "updated_at">) => {
    const response = await fetch(`${api}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(post)
    });

    if (!response.ok) {
        throw new Error("Could not create blog post.");
    }

    return response.json();
};

// PUT update a post based on id
export const updatePost = async (id: number, post: Partial<Post>) => {
    const response = await fetch(`${api}/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(post)
    });

    if (!response.ok) {
        throw new Error("Could not update blog post.");
    }

    return response.json();
};

// DELETE a post based on id
export const deletePost = async (id: number) => {
    const response = await fetch(`${api}/posts/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    if (!response.ok) {
        throw new Error("Could not delete blog post.");
    }
};