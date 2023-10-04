import React, { useEffect, useState } from "react";
import "./styles.css";

/*
Challenge Description

Create a React application using TypeScript that fetches data from the JSONPlaceholder API and displays it. The application should contain the following functionalities:

- List Posts: Fetch and display a list of posts.
- Post Details: On clicking a post, navigate to a details page that shows the complete post including comments.
- Add Post: Implement a form to add a new post.
*/

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments?: Comment[];
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface SelectedPost {
  type: "Post" | "Comment";
  commentId?: number;
  postId: number;
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>();
  const [selectedPost, setSelectedPost] = useState<SelectedPost>();

  const fetchPosts = async () => {
    const fetchedPostsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!fetchedPostsResponse.ok) {
      throw new Error("Error fetching posts data.");
    }
    const fetchedPosts: Post[] = await fetchedPostsResponse.json();
    setPosts(fetchedPosts);
  };

  const fetchComments = async () => {
    const fetchedCommentsResponse = await fetch("https://jsonplaceholder.typicode.com/comments");
    if (!fetchedCommentsResponse.ok) {
      throw new Error("Error fetching comments data.");
    }
    const fetchedComments: Comment[] = await fetchedCommentsResponse.json();
    setPosts((posts) =>
      posts?.map((post) => ({
        ...post,
        comments: fetchedComments.filter((comment) => comment.postId === post.id),
      }))
    );
  };

  const handlePostClick = (post: Post) => () => {
    setSelectedPost({ type: "Post", postId: post.id });
  };

  const handleCommentClick = (comment: Comment) => () => {
    setSelectedPost({
      type: "Comment",
      postId: comment.postId,
      commentId: comment.id,
    });
  };

  useEffect(() => {
    fetchPosts()
      .catch(console.error)
      .then(() => fetchComments())
      .catch(console.error);
  }, []);

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      <div className="bg-purple-300 p-4">
        {posts?.map((post) => {
          const isPostSelected = selectedPost?.type === "Post" && selectedPost.postId === post.id;
          return (
            <>
              <div
                className={`bg-red-300 mt-8 mb-2 rounded-lg p-2 shadow-lg hover:opacity-90 cursor-pointer ${
                  isPostSelected ? "bg-blue-300" : ""
                }`}
                key={post.id}
                onClick={handlePostClick(post)}
              >
                <p className="text-md font-semibold">{post.title}</p>
                <p className="text-sm">{post.body}</p>
              </div>

              {post.comments?.map((comment) => {
                if (!isPostSelected) {
                  return null;
                }
                const isCommentSelected =
                  selectedPost?.type === "Comment" &&
                  selectedPost.postId === comment.postId &&
                  selectedPost.commentId === comment.id;
                return (
                  <div
                    className={`bg-red-100 ml-8 my-2 rounded-lg p-2 shadow-lg hover:opacity-90 cursor-pointer ${
                      isCommentSelected ? "bg-blue-100" : ""
                    }`}
                    key={comment.id}
                    onClick={handleCommentClick(comment)}
                  >
                    <p className="text-sm font-semibold">{comment.name}</p>
                    <p className="text-sm">{comment.body}</p>
                  </div>
                );
              })}
            </>
          );
        })}
      </div>
    </>
  );
}
