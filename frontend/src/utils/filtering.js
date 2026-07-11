export function filterBySearch(items = [], query = '', fields = []) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return items;
  }

  return items.filter((item) =>
    fields.some((field) => {
      const value = item?.[field];
      return typeof value === 'string' && value.toLowerCase().includes(normalizedQuery);
    }),
  );
}

export function filterLabsBySemester(labs = [], semesterFilter = '') {
  if (!semesterFilter) {
    return labs;
  }

  return labs.filter((lab) => String(lab?.semester) === String(semesterFilter));
}
