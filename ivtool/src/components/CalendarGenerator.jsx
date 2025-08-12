import { useState } from 'react';

const AVAILABLE_PLATFORMS = ['Instagram', 'Twitter', 'LinkedIn', 'Pinterest', 'YouTube'];

export default function CalendarGenerator({ darkMode }) {
  const [duration, setDuration] = useState(7);
  const [selected, setSelected] = useState(['Instagram','Twitter']);
  const [inputTopic, setInputTopic] = useState('');
  const [generated, setGenerated] = useState(null);

  function togglePlatform(p) {
    setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  function downloadCsv(rows) {
    const csv = ['Day,Platform,Post'].concat(rows.map(r => `${r.day},"${r.platform}","${r.post.replace(/"/g,'""')}"`)).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'repurposeiv-calendar.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function generate() {
    if (!inputTopic.trim()) return alert('Add your topic or piece of content');
    const rows = [];
    for (let d = 1; d <= duration; d++) {
      const platform = selected[(d-1) % selected.length] || selected[0];
      rows.push({
        day: d,
        platform,
        post: `${platform} Post #${d}: Short hook about "${inputTopic}" — CTA (share/save).`
      });
    }
    setGenerated(rows);
  }

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border'}`}>
      <h3 className="text-xl font-bold mb-3">Content Calendar Generator</h3>

      <input
        className={`w-full p-3 rounded-md mb-3 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
        placeholder="Main topic or content (e.g. 'Productivity for Creators')"
        value={inputTopic}
        onChange={e => setInputTopic(e.target.value)}
      />

      <div className="flex gap-3 mb-3">
        <label className="flex items-center gap-2">
          <input type="radio" checked={duration===7} onChange={() => setDuration(7)} /> 7 days
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" checked={duration===30} onChange={() => setDuration(30)} /> 30 days
        </label>
      </div>

      <div className="mb-3">
        <div className="text-sm text-cyan-400 mb-2">Platforms</div>
        <div className="flex gap-2 flex-wrap">
          {AVAILABLE_PLATFORMS.map(p => (
            <button
              key={p}
              onClick={() => togglePlatform(p)}
              className={`px-3 py-1 rounded ${selected.includes(p) ? 'bg-cyan-500 text-black' : 'bg-gray-600 text-white'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={generate} className="px-4 py-2 bg-cyan-500 rounded font-semibold">Generate Calendar</button>
        <button onClick={() => { setGenerated(null); setInputTopic(''); }} className="px-4 py-2 bg-gray-500 rounded text-white">Clear</button>
        {generated && <button onClick={() => downloadCsv(generated)} className="px-4 py-2 bg-green-500 rounded">Download CSV</button>}
      </div>

      {generated && (
        <div className="mt-5 space-y-2">
          {generated.map((r) => (
            <div key={r.day} className={`p-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-sm text-cyan-400">Day {r.day} · {r.platform}</div>
              <div className="font-medium">{r.post}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
