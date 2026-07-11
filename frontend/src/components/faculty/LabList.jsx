import { useState, useEffect } from 'react';
import { FaFlask, FaPlusCircle } from "react-icons/fa";
import { getLabs, createLab } from '../../services/facultyApi';
import { filterBySearch, filterLabsBySemester } from '../../utils/filtering';

function LabList({ onSelectLab, onLabsLoaded }) {
  const [labs, setLabs] = useState([]);
  const [form, setForm] = useState({ subject: '', semester: '' });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    const data = await getLabs();
    setLabs(data);
    if (onLabsLoaded) {
      onLabsLoaded(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createLab(form);
    setForm({ subject: '', semester: '' });
    fetchLabs();
    setLoading(false);
  };

  const filteredLabs = filterLabsBySemester(
    filterBySearch(labs, searchQuery, ['subject']),
    semesterFilter,
  );

  const groupedLabs = filteredLabs.reduce((acc, lab) => {
    const sem = lab.semester;

    if (!acc[sem]) {
      acc[sem] = [];
    }

    acc[sem].push(lab);
    return acc;
  }, {});

  return (
    <div className='lab-list card'>
      <h2 className="section-heading"><FaPlusCircle /> Create new Lab</h2>
      <form className='form' onSubmit={handleSubmit}>
        <input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
        <input placeholder="Semester" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Lab...' : 'Create Lab'}
        </button>
      </form>

      <h2 className="section-heading"><FaFlask />Labs</h2>
      <div className='form'>
        <input
          placeholder="Search labs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          placeholder="Filter by semester"
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
        />
      </div>
      {Object.keys(groupedLabs)
  .sort((a, b) => Number(a) - Number(b))
  .map((semester) => (
    <div key={semester} className="semester-group">

      <h3 className="semester-title">
        Semester {semester}
      </h3>

      <ul className="item-list">
        {groupedLabs[semester].map((lab) => (
          <li
            className="item clickable"
            key={lab._id}
            onClick={() => onSelectLab(lab)}
          >
            {lab.subject}
          </li>
        ))}
      </ul>

    </div>
))}
    </div>
  );
}

export default LabList;
