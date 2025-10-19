import React, { useEffect, useState } from "react";
import "./studentDashboard.css";
import LabsList from "../components/student/LabsList";
import ExperimentsList from "../components/student/ExperimentsList";
import SubmissionForm from "../components/student/SubmissionForm";
import MySubmissions from "../components/student/MySubmissions";
import Navbar from "../components/Navbar";
import { getMySubmissions } from "../services/studentApi";

export default function StudentDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const fetchSubmissions = async () => {
    try {
      const data = await getMySubmissions();
      setSubmissions(data);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="student-dashboard">
        <h1>Student Dashboard</h1>
        <div className="dashboard-container">
          
          {/* Sidebar: Labs + Experiments */}
          <div className="sidebar">
            <LabsList onSelectLab={(labId) => {
              setSelectedLab(labId);
              setSelectedExperiment(null); // Reset experiment selection
            }} />
            
            {selectedLab && (
              <ExperimentsList 
                labId={selectedLab}
                onSelectExperiment={(expId) => setSelectedExperiment(expId)}
              />
            )}
          </div>

          {/* Main Content */}
          <div className="main-content">
            {/* Submission Form for selected experiment */}
            {selectedExperiment && (
              <SubmissionForm experimentId={selectedExperiment} />
            )}

            {/* My Submissions Section */}
            <MySubmissions />
          </div>
        </div>
      </div>
    </>
  );
}
