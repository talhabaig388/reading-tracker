import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-dark text-white flex flex-col shadow-xl">

        <div className="p-6 text-xl font-bold border-b border-gray-700">
          📊 Reading Tracker
        </div>

        <nav className="flex flex-col p-4 gap-2">
          <Link to="/" className="p-3 rounded-lg hover:bg-gray-700 transition">
            🏠 Dashboard
          </Link>

          <Link to="/leaderboard" className="p-3 rounded-lg hover:bg-gray-700 transition">
            🏆 Leaderboard
          </Link>

          <Link to="/admin" className="p-3 rounded-lg hover:bg-gray-700 transition">
            ⚙️ Admin
          </Link>
        </nav>

        <div className="mt-auto p-4">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="w-full bg-red-500 hover:bg-red-600 transition py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <span className="text-gray-500">Welcome 👋</span>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default Layout;