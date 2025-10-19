import { useEffect, useState } from 'react';
import { getExperiments, createExperiment } from '../../services/facultyApi';

function ExperimentList({ lab, onSelectExperiment }) {
  const [experiments, setExperiments] = useState([]);
  const [form, setForm] = useState({ title: '', aim: '', procedure: '' });

  useEffect(() => {
    if (lab) fetchExperiments();
  }, [lab]);

  const fetchExperiments = async () => {
    const data = await getExperiments(lab._id);
    setExperiments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createExperiment(lab._id, form);
    setForm({ title: '', aim: '', procedure: '' });
    fetchExperiments();
  };

  return (
    <div className='experiment-list card'>
      <h2 className="section-heading">Post new experiment</h2>
      <form className='form' onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea placeholder="Aim" value={form.aim} onChange={(e) => setForm({ ...form, aim: e.target.value })} />
        <textarea placeholder="Procedure" value={form.procedure} onChange={(e) => setForm({ ...form, procedure: e.target.value })} />
        <button type="submit">Add Experiment</button>
      </form>

      <h2 className="section-heading">Experiments in {lab.subject}</h2>
      <ul className='item-list'>
        {experiments && experiments.map((exp) => (
          <li className='item clickable' key={exp._id} onClick={() => onSelectExperiment(exp)}>
            {exp.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperimentList;
