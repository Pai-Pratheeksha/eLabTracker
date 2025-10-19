import { useEffect, useState } from 'react';
import { getSubmissions, updateSubmission } from '../../services/facultyApi';
import { openProtectedFile } from '../../utils/openProtectedFile';

function SubmissionReview({ experiment }) {
  const [submissions, setSubmissions] = useState([]);
  const [editedSubmissions, setEditedSubmissions] = useState({});

  useEffect(() => {
    if (experiment) fetchSubmissions();
  }, [experiment]);

  const fetchSubmissions = async () => {
    const data = await getSubmissions(experiment._id);
    setSubmissions(data);

    // Initialize edited state
    const edited = {};
    data.forEach((s) => {
      edited[s._id] = {
        grade: s.grade || '',
        status: s.status || 'submitted',
        comments: s.comments || '',
      };
    });
    setEditedSubmissions(edited);
  };

  const handleChange = (id, field, value) => {
    setEditedSubmissions((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (id) => {
    try{
        await updateSubmission(id, editedSubmissions[id]);
        fetchSubmissions(); // Refresh to reflect saved data
        alert("Reviews submitted successfully!")
    } catch (error) {
        alert("error submitting reviews")
    }
  };

  return (
    <div className='submission-review'>
      <h2 className="section-heading">Submissions for {experiment.title}</h2>
      {submissions.length === 0 ? (
        <p className='no-submissions'>No submissions yet.</p>
      ) : (
        <div className="table-container">
        <table className='submissions-table'>
          <thead>
            <tr>
              <th>Student</th>
              <th>File</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => {
               return (
              <tr key={s._id}>
                <td>{s.student?.name || 'Unknown'}</td>
                <td>
                  <button className='view-btn' onClick={() => openProtectedFile(s._id)}>View File</button>
                </td>
                <td>
                  <input
                    className='input-small'
                    value={editedSubmissions[s._id]?.grade || ''}
                    onChange={(e) => handleChange(s._id, 'grade', e.target.value)}
                  />
                </td>
                <td>
                  <select
                    className='select'
                    value={editedSubmissions[s._id]?.status}
                    onChange={(e) => handleChange(s._id, 'status', e.target.value)}
                  >
                    <option value="submitted">Submitted</option>
                    <option value="approved">Approved</option>
                    <option value="needs revision">Needs Revision</option>
                  </select>
                </td>
                <td>
                  <input
                    className='input-large'
                    value={editedSubmissions[s._id]?.comments || ''}
                    onChange={(e) => handleChange(s._id, 'comments', e.target.value)}
                  />
                </td>
                <td>
                  <button className='submit-btn' onClick={() => handleSubmit(s._id)}>Submit</button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default SubmissionReview;
