import './DashboardSummary.css';

function DashboardSummary({ items }) {
  return (
    <div className="dashboard-summary">
      {items.map((item) => (
        <div className="summary-card" key={item.label}>
          <span className="summary-card__label">{item.label}</span>
          <strong className="summary-card__value">{item.value}</strong>
          {item.description && <span className="summary-card__description">{item.description}</span>}
        </div>
      ))}
    </div>
  );
}

export default DashboardSummary;
