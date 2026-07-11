import { useState } from 'react';
import './facultyDashboard.css'
import LabList from '../components/faculty/LabList';
import ExperimentList from '../components/faculty/ExperimentList';
import SubmissionReview from '../components/faculty/SubmissionReview';
import Navbar from '../components/Navbar';
import DashboardSummary from '../components/DashboardSummary';
import { getFacultySummaryItems } from '../utils/dashboardSummary';

const FacultyDashboard = () => {
  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [labs, setLabs] = useState([]);
  const [experiments, setExperiments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const handleExperimentsLoaded = (loadedExperiments) => {
    setExperiments((prevExperiments) => {
      const merged = new Map(prevExperiments.map((experiment) => [experiment._id, experiment]));
      loadedExperiments.forEach((experiment) => merged.set(experiment._id, experiment));
      return Array.from(merged.values());
    });
  };

  const handleSubmissionsLoaded = (loadedSubmissions) => {
    setSubmissions((prevSubmissions) => {
      const merged = new Map(prevSubmissions.map((submission) => [submission._id, submission]));
      loadedSubmissions.forEach((submission) => merged.set(submission._id, submission));
      return Array.from(merged.values());
    });
  };

  const summaryItems = getFacultySummaryItems({ labs, experiments, submissions });

  return (
    <>
      <Navbar />
      <div className='faculty-dashboard'>
        <h1 className='dashboard-title'>Faculty Dashboard</h1>
        <div className="dashboard-banner">
  <h2>Welcome Faculty 👋</h2>
  <p>Manage subjects, experiments and student submissions efficiently.</p>
</div>
        <DashboardSummary items={summaryItems} />
        <LabList
          onSelectLab={(lab) => {
            setSelectedLab(lab);
            setSelectedExperiment(null);
          }}
          onLabsLoaded={setLabs}
        />

        {selectedLab && (
          <ExperimentList
            lab={selectedLab}
            onSelectExperiment={(exp) => setSelectedExperiment(exp)}
            onExperimentsLoaded={handleExperimentsLoaded}
          />
        )}

        {selectedExperiment && <SubmissionReview experiment={selectedExperiment} onSubmissionsLoaded={handleSubmissionsLoaded} />}
      </div>
      </>
  );
};

export default FacultyDashboard;
