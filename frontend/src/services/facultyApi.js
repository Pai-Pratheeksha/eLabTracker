import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Lab APIs
export async function createLab (labData) {
    await API.post('/labs', labData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
}
export async function getLabs() {
    const {data} = await API.get('/labs', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return data;
}

// Experiment APIs
export async function getExperiments(labId) {
    const {data} = await API.get(`/experiments/${labId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return data;
}

export async function createExperiment (labId, experimentData){
    await API.post(`/experiments/${labId}`, experimentData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
}

// Submission APIs
export async function getSubmissions (experimentId) {
  const { data } = await API.get(`/submissions/experiment/${experimentId}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
}

export async function updateSubmission (submissionId, updateData) {
  await API.put(`/submissions/${submissionId}`, updateData, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
