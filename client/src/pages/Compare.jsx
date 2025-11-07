import { useState } from 'react';

export default function Compare() {
  const [resume, setResume] = useState('');
  const [jd, setJd]         = useState('');
  const [result, setResult] = useState(null);

  async function run() {
    const r = await fetch('/ai/compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume_text: resume, job_description: jd }),
    });
    setResult(await r.json());
  }

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow space-y-6">
        <h2 className="text-2xl font-semibold text-blue-700">JD Skill Matcher</h2>

        <div className="space-y-4">
          <textarea
            className="w-full border border-blue-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste resume text here..."
          />

          <textarea
            className="w-full border border-blue-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste job description here..."
          />

          <button
            onClick={run}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Compare Resume & JD
          </button>
        </div>

        {result && (
          <div className="bg-slate-100 text-sm p-4 rounded-lg whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </div>
        )}
      </div>
    </div>
  );
}