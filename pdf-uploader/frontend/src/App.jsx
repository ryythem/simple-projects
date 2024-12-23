import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select pdf file");
      return;
    }
    const formData = new FormData();
    formData.append("pdfFile", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Upload failed");
    }
  };
  return (
    <>
      <h1>Upload pdf</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}

export default App;
