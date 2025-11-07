export default function Suggestions({ items }) {
  if (!items?.length) return null;

  return (
    <div className="mt-6 max-w-2xl mx-auto bg-blue-50 border border-blue-200 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">AI Suggestions</h2>
      <ul className="list-disc list-inside space-y-2 text-blue-900">
        {items.map((txt, idx) => (
          <li key={idx}>{txt}</li>
        ))}
      </ul>
    </div>
  );
}