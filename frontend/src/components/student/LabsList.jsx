import React, { useEffect, useState } from "react";
import { getLabs } from "../../services/studentApi";

export default function LabsList({ onSelectLab }) {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getLabs();
        setLabs(data);
      } catch (err) {
        console.error("Error fetching labs", err);
      }
    })();
  }, []);

  return (
    <div>
      <h3>My Labs</h3>
      <ul>
        {labs.map((lab) => (
          <li
            key={lab._id}
            onClick={() => onSelectLab(lab._id)}
            style={{ cursor: "pointer" }}
          >
            {lab.subject} (Semester {lab.semester})
          </li>
        ))}
      </ul>
    </div>
  );
}
