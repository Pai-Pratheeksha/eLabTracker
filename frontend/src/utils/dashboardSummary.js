export function getStudentSummaryItems(submissions = []) {
  const total = submissions.length;
  const approved = submissions.filter((submission) => String(submission?.status || '').toLowerCase() === 'approved').length;
  const pending = submissions.filter((submission) => {
    const status = String(submission?.status || '').toLowerCase();
    return status === 'submitted' || status === 'needs revision' || status === '';
  }).length;

  return [
    { label: 'Total submissions', value: total, description: 'Files submitted so far' },
    { label: 'Approved', value: approved, description: 'Accepted by faculty' },
    { label: 'Pending review', value: pending, description: 'Awaiting feedback' },
  ];
}

export function getFacultySummaryItems({ labs = [], experiments = [], submissions = [] }) {
  const approved = submissions.filter((submission) => String(submission?.status || '').toLowerCase() === 'approved').length;

  return [
    { label: 'Labs', value: labs.length, description: 'Active lab groups' },
    { label: 'Experiments', value: experiments.length, description: 'Posted experiments' },
    { label: 'Submissions', value: submissions.length, description: 'Student uploads received' },
    { label: 'Approved', value: approved, description: 'Approved submissions' },
  ];
}
