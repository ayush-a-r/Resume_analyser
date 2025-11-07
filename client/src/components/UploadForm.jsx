import { useState } from "react";

export default function UploadForm({ onResult }) {
  const [file, setFile] = useState(null);

  async function submit(e) {
    e.preventDefault();
    if (!file) return alert("Select a PDF first");

    const form = new FormData();
    form.append("file", file);

    const API  = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const res  = await fetch(`${API}/resume/analyze`, { method: "POST", body: form });

    if (!res.ok) {
      alert(`Server ${res.status}`); return;
    }
    const { suggestions = "" } = await res.json();

    const bullets = suggestions
      .split("\n")
      .map(l => l.replace(/^\s*[*\-•]\s*/, "").trim())
      .filter(Boolean);

    onResult(bullets);
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col items-center gap-4 bg-white border border-blue-200 rounded-lg p-6 shadow-md max-w-xl mx-auto mt-6"
    >
      <h3 className="text-lg font-semibold text-blue-800">Upload Resume (PDF)</h3>

      <input
        type="file"
        accept="application/pdf"
        onChange={e => setFile(e.target.files[0])}
        className="file-input file-input-bordered w-full max-w-sm"
      />

      <button
        type="submit"
        disabled={!file}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Analyze
      </button>
    </form>
  );
}