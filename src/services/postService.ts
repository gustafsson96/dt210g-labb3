const api = "http://localhost:3000";

// GET all blog posts from api
export const getPosts = async () => {
    const response = await fetch(`${api}/posts`,{
        method: "GET"
    });

    if (!response.ok) {
        throw new Error("Gick ej att hämta inlägg.");
    }

    return response.json();
}