import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './facultyDashboard.css'
import LabList from '../components/faculty/LabList';
import ExperimentList from '../components/faculty/ExperimentList';
import SubmissionReview from '../components/faculty/SubmissionReview';
import Navbar from '../components/Navbar';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('role');
  //   navigate('/login');
  // };

  return (
    <>
      <Navbar />
      <div className='faculty-dashboard'>
        <h1 className='dashboard-title'>Faculty Dashboard</h1>
        <LabList onSelectLab={(lab) => {
          setSelectedLab(lab);
          setSelectedExperiment(null);
        }} />

        {selectedLab && (
          <ExperimentList lab={selectedLab} onSelectExperiment={(exp) => setSelectedExperiment(exp)} />
        )}

        {selectedExperiment && <SubmissionReview experiment={selectedExperiment} />}

        {/* <button className='logout-btn' onClick={handleLogout} style={{ marginTop: '20px', padding: '10px' }}>
          Logout
        </button> */}
      </div>
      </>
  );
};

export default FacultyDashboard;
