// src/components/student/ExperimentsList.jsx
import React, { useEffect, useState } from "react";
import { getExperimentsByLab } from "../../services/studentApi";

export default function ExperimentsList({ labId, onSelectExperiment }) {
  const [experiments, setExperiments] = useState([]);

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

  return (
    <div>
      <h3>Experiments</h3>
      <ul>
        {experiments.map((exp) => (
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
