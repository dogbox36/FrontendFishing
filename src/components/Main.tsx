import React, { useState, useContext } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

const Main: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleAddPost = () => {
    const newPost: Post = {
      id: posts.length + 1,
      title: `Post ${posts.length + 1}`,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
    };
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <h1>Forum</h1>
      <button onClick={handleAddPost}>Add post</button>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Main;