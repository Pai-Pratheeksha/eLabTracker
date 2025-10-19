
export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>eLabTracker - Your Virtual College Lab Record System</h1>
      </div>
      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
