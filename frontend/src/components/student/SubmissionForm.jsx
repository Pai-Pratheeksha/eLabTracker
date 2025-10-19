// src/components/student/SubmissionForm.jsx
import React, { useState } from "react";
import { submitExperiment } from "../../services/studentApi";

export default function SubmissionForm({ experimentId, onSubmissionSuccess }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);

      await submitExperiment(experimentId, formData);
      setMessage("Submission successful!");
      setFile(null);
      if (onSubmissionSuccess) {
        onSubmissionSuccess(); // refresh submissions
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting experiment");
    }
  };

  return (
    <div>
      <h3>Submit Experiment</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
