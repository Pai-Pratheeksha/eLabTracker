import React, { useEffect, useState } from "react";
import "./studentDashboard.css";
import LabsList from "../components/student/LabsList";
import ExperimentsList from "../components/student/ExperimentsList";
import SubmissionForm from "../components/student/SubmissionForm";
import MySubmissions from "../components/student/MySubmissions";
import Navbar from "../components/Navbar";
import DashboardSummary from "../components/DashboardSummary";
import { getMySubmissions } from "../services/studentApi";
import { getStudentSummaryItems } from "../utils/dashboardSummary";

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

  const summaryItems = getStudentSummaryItems(submissions);

  return (
    <>
      <Navbar />
      <div className="student-dashboard">
        <h1>Student Dashboard</h1>
        <DashboardSummary items={summaryItems} />
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
  <SubmissionForm
    experimentId={selectedExperiment}
    onSubmissionSuccess={fetchSubmissions}
  />
)}

            {/* My Submissions Section */}
            <MySubmissions submissions={submissions} />
          </div>
        </div>
      </div>
    </>
  );
}
