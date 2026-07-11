import { API } from './api';

// Lab APIs
export async function createLab(labData) {
  await API.post('/labs', labData);
}

export async function getLabs() {
  const { data } = await API.get('/labs');
  return data;
}

// Experiment APIs
export async function getExperiments(labId) {
  const { data } = await API.get(`/experiments/${labId}`);
  return data;
}

export async function createExperiment(labId, experimentData) {
  await API.post(`/experiments/${labId}`, experimentData);
}

// Submission APIs
export async function getSubmissions(experimentId) {
  const { data } = await API.get(`/submissions/experiment/${experimentId}`);
  return data;
}

export async function updateSubmission(submissionId, updateData) {
  await API.put(`/submissions/${submissionId}`, updateData);
}
