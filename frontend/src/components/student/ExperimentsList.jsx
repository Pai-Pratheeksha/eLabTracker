// src/components/student/ExperimentsList.jsx
import React, { useEffect, useState } from "react";
import { getExperimentsByLab } from "../../services/studentApi";
import { filterBySearch } from "../../utils/filtering";

export default function ExperimentsList({ labId, onSelectExperiment }) {
  const [experiments, setExperiments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!labId) return;
    (async () => {
      try {
        const data = await getExperimentsByLab(labId);
        setExperiments(data);
      } catch (err) {
        console.error("Error fetching experiments", err);
      }
    })();
  }, [labId]);

  if (!labId) return null;

  const filteredExperiments = filterBySearch(experiments, searchQuery, ["title"]);

  return (
    <div>
      <h3>Experiments</h3>
      <input
        type="text"
        placeholder="Search experiments"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "100%", marginBottom: "8px" }}
      />
      <ul>
        {filteredExperiments.map((exp) => (
          <li
            key={exp._id}
            onClick={() => onSelectExperiment(exp._id)}
            style={{ cursor: "pointer" }}
          >
            {exp.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
