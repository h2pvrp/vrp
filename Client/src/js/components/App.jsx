import React from "react";
import List from "./List";
import Form from "./Form";
import Post from "./Posts";
import Controls from "./Controls";
import MessagesList from "./MessagesList";

const App = () => (
  <>
    <div>
      <h2>Articles</h2>
      <List />
    </div>
    <div>
      <h2>Add a new article</h2>
      <Form />
    </div>
    <div>
      <h2>API posts</h2>
      <Post />
    </div>
    <div>
      <h2>WebSocket</h2>
      <Controls />
      <h3>Messages</h3>
      <MessagesList />
    </div>
  </>
);

export default App;
