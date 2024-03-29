import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import PostContext from "../contexts/PostContext";

function CreatePost() {
  const [item, setItem] = useState({
    title: "",
    embed: "",
    credit: "",
    caption: "",
  });

  const { addPost } = useContext(PostContext);
  const navigate = useNavigate();
  const { title, embed, credit, caption } = item;

  function handleChange(event) {
    const { id, value } = event.target;
    setItem((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    addPost(item)
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Error adding post:", error);
        alert(error.message);
      });
  }

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ paddingLeft: "200px", paddingRight: "200px" }}
    >
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="Song Title"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="Embed Code"
          as="textarea"
          rows="2"
          id="embed"
          name="embed"
          value={embed}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="Credits"
          type="text"
          id="credit"
          name="credit"
          value={credit}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">Save</Button>
    </Form>
  );
}

export default CreatePost;
