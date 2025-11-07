// src/pages/Dashboard.jsx
import { useState } from "react";
import { Link }      from "react-router-dom";
import UploadForm    from "../components/UploadForm.jsx";
import Suggestions   from "../components/Suggestions.jsx";
import { useAuth }   from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { logout }    = useAuth();
  const [tips, setTips] = useState([]);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* ──────── Top bar ──────── */}
      <header className="bg-white shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-blue-700">
            Resume&nbsp;Analyzer&nbsp;Dashboard
          </h1>

          <button
            onClick={logout}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ──────── Main content ──────── */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-8">
        <UploadForm onResult={setTips} />
        {tips.length > 0 && <Suggestions items={tips} />}
      </main>

      {/* ──────── Floating chat button ──────── */}
      <Link
        to="/chat"
        className="
          fixed bottom-6 right-6
          h-14 w-14 flex items-center justify-center
          rounded-full shadow-lg
          bg-blue-600 hover:bg-blue-700
          text-white transition
          focus:outline-none focus:ring-4 focus:ring-blue-400
        "
        title="Open Chatbot"
      >
        {/* simple chat‐bubble svg */}
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  className="h-7 w-7"
  fill="currentColor"
>
  <path d="M12 2C6.48 2 2 5.97 2 10.89c0 2.1.94 4.04 2.51 5.55L3 20l4.75-1.57A11.73 11.73 0 0 0 12 19.78c5.52 0 10-3.97 10-8.89S17.52 2 12 2Zm-3 10.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm3.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm3.75 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"/>
</svg>
      </Link>
    </div>
  );
}