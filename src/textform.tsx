import { useState, type SetStateAction, } from "react";

type TextformProps = {
  heading: string;
};

console.log("Textform component rendered");

export default function Textform(props: TextformProps) {

  const [text, setText] = useState(" m amar hu");   // ✅ initialize text

  const handleUpClick = () => {
    console.log("uppercase was clicked");
    let newText = text.toUpperCase();
    setText(newText);
  };

  const handleloClick = () => {
    console.log("lowercase was clicked");
    let newText = text.toLowerCase();
    setText(newText);
  };


  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="container mt-5">
        <h1>{props.heading}</h1>

        <textarea
          className="form-control"
          value={text}
          onChange={handleChange}
          rows={8}
        ></textarea>

        <button className="btn btn-primary mx-3" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-3" onClick={handleloClick}>
          Convert to lowercase
        </button>
      </div>
      <div className="container my-3">
        <h1> Summary lele re baba</h1>
        <p>{text.split(" ").length} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").length} Minutes</p>


      </div>

    </>
  );
}