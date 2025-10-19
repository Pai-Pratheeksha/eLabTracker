// src/components/student/MySubmissions.jsx
import React, { useEffect, useState } from "react";
import { getMySubmissions } from "../../services/studentApi";

export default function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMySubmissions();
        setSubmissions(data);
      } catch (err) {
        console.error("Error fetching submissions", err);
      }
    })();
  }, []);

  return (
    <div>
      <h3>My Submissions</h3>
      <table>
        <thead>
          <tr>
            <th>Experiment</th>
            <th>Status</th>
            <th>Grade</th>
            <th>Comments</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub._id}>
              <td>{sub.experiment?.title}</td>
              <td>{sub.status}</td>
              <td>{sub.grade || "N/A"}</td>
              <td>{sub.comments || "No comments"}</td>
              <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
