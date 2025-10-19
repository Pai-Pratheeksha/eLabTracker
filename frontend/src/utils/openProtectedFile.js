// src/utils/openProtectedFile.js
export async function openProtectedFile(submissionId) {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`/api/submissions/file/${submissionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => null);
      throw new Error(text || `Failed to fetch file: ${res.status}`);
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');

    // release object URL after some time
    setTimeout(() => URL.revokeObjectURL(url), 60 * 1000);
  } catch (err) {
    console.error('openProtectedFile error:', err);
    alert(err.message || 'Could not open file');
  }
}
