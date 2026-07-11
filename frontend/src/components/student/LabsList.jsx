import React, { useEffect, useState } from "react";
import { getLabs } from "../../services/studentApi";
import { filterBySearch } from "../../utils/filtering";

export default function LabsList({ onSelectLab }) {
  const [labs, setLabs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredLabs = filterBySearch(labs, searchQuery, ["subject"]);

  return (
    <div>
      <h3>My Labs</h3>
      <input
        type="text"
        placeholder="Search labs"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "100%", marginBottom: "8px" }}
      />
      <ul>
        {filteredLabs.map((lab) => (
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
