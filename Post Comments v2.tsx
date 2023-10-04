import React, { useState, useEffect } from "react";

// Define types
interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  body: string;
}

interface AddPostFormProps {
  addPost: (title: string, body: string) => Promise<void>;
}

// PostList Component
const PostList: React.FC<{ selectPost: (post: Post) => void }> = ({ selectPost }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} onClick={() => selectPost(post)}>
          {post.title}
        </div>
      ))}
    </div>
  );
};

// PostDetails Component
const PostDetails: React.FC<{ post: Post }> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [post]);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
};

// AddPostForm Component
const AddPostForm: React.FC<AddPostFormProps> = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async () => {
    await addPost(title, body);
    setTitle("");
    setBody("");
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" />
      <button onClick={handleSubmit}>Add Post</button>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const addPost = async (title: string, body: string) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: 1, // Usually this would come from the application state
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log({ addPostJson: json }))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>React + TypeScript Coding Challenge</h1>
      <AddPostForm addPost={addPost} />
      <PostList selectPost={setSelectedPost} />
      {selectedPost && <PostDetails post={selectedPost} />}
    </div>
  );
};

export default App;
