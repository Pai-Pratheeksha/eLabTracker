// src/api/studentApi.js
import { API, getAuthHeaders } from './api';

// Get all labs for a student
export const getLabs = async () => {
  const res = await API.get('/labs/student');
  return res.data;
};

// Get experiments for a specific lab
export const getExperimentsByLab = async (labId) => {
  const res = await API.get(`/experiments/${labId}`);
  return res.data;
};

// Submit experiment file
export const submitExperiment = async (experimentId, formData) => {
  const res = await API.post(
    `/submissions/${experimentId}`,
    formData,
    {
      headers: getAuthHeaders('multipart/form-data'),
    },
  );
  return res.data;
};

// Get all submissions for logged-in student
export const getMySubmissions = async () => {
  const res = await API.get('/submissions/my');
  return res.data;
};
