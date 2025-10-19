// src/api/studentApi.js
import axios from "axios";

const API = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Get all labs for a student
export const getLabs = async () => {
  const res = await API.get('/labs', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
  return res.data;
};

// Get experiments for a specific lab
export const getExperimentsByLab = async (labId) => {
  const res = await API.get(`/experiments/${labId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
  return res.data;
};

// Submit experiment file
export const submitExperiment = async (experimentId, formData) => {
  const res = await API.post(
    `/submissions/${experimentId}`,
    formData,
    {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};

// Get all submissions for logged-in student
export const getMySubmissions = async () => {
  const res = await API.get('/submissions/my', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
  return res.data;
};
