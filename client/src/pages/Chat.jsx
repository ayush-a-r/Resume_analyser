import { useEffect, useRef, useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    const id = crypto.randomUUID();
    const url = `${import.meta.env.VITE_WS_URL || 'ws://localhost:8000'}` + `/chat/${id}`;
    ws.current = new WebSocket(url);
    ws.current.onmessage = e => setMsgs(m => [...m, { role: 'MyBot', text: e.data }]);
    return () => ws.current?.close();
  }, []);

  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { role: 'user', text: input }]);
    ws.current.send(input);
    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Chat area */}
      <div className="prose max-w-2xl mx-auto flex-1 overflow-y-auto p-6 space-y-4">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${
              m.role === 'user' ? 'bg-blue-100 self-end' : 'bg-white'
            }`}
          >
            <p className="text-sm text-gray-700">
              <span className="font-semibold capitalize text-blue-700">{m.role}:</span> {m.text}
            </p>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="w-full border-t border-blue-200 bg-white p-4 flex gap-2">
        <input
          className="flex-1 border border-blue-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type and hit Enter..."
        />
        <button
          onClick={send}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}