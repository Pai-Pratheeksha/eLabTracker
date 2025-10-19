import { useState, useEffect } from 'react';
import { FaFlask, FaPlusCircle } from "react-icons/fa";
import { getLabs, createLab } from '../../services/facultyApi';

function LabList({ onSelectLab }) {
  const [labs, setLabs] = useState([]);
  const [form, setForm] = useState({ subject: '', semester: '' });

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    const data = await getLabs();
    setLabs(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLab(form);
    setForm({ subject: '', semester: '' });
    fetchLabs();
  };

  return (
    <div className='lab-list card'>
      <h2 className="section-heading"><FaPlusCircle /> Create new Lab</h2>
      <form className='form' onSubmit={handleSubmit}>
        <input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
        <input placeholder="Semester" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} required />
        <button type="submit">Create Lab</button>
      </form>

      <h2 className="section-heading"><FaFlask />Labs</h2>
      <ul className='item-list'>
        {labs && labs.map((lab) => (
          <li className='item clickable' key={lab._id} onClick={() => onSelectLab(lab)}>
            {lab.subject} - Semester {lab.semester}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LabList;
