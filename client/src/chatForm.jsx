import { useState } from "react";

export default function ChatForm() {

    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
      
        e.preventDefault();
        setLoading(true);
        setError(null);
        setReply("");

        try {
            //Server port set to 5000
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Server error");
            }

        const data = await response.json();
        setReply(data.reply);

        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="prompt" className="form-label">Enter your text:</label>
                    <input id="prompt" type="text" className="form-control" value={prompt} onChange={(e) => setPrompt(e.target.value)} disabled={loading} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading || prompt.trim() === ""} >
                    {loading ? (
                        <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Thinking…
                        </>
                    ) : (
                    "Send"
                    )}
                </button>
            </form>

            {error && (
                <div className="alert alert-danger mt-3" role="alert">
                    Error: {error}
                </div>
            )}

            {reply && (
                <div className="card mt-4">
                    <div className="card-body">
                            <h5 className="card-title">Output:</h5>
                            <p className="card-text">{reply}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
