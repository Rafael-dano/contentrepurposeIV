import { useState } from 'react';

export default function IdeaGenerator({ darkMode }) {
  const [keyword, setKeyword] = useState('');
  const [audience, setAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function copy(text) {
    navigator.clipboard?.writeText(text);
    alert('Copied to clipboard');
  }

  async function generate() {
    if (!keyword.trim()) return alert('Add a keyword or topic');
    setLoading(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 900)); // mock delay

    // Mock idea generation
    const trend = `${keyword} is seeing a surge in interest this month`;
    const titles = [
      `${keyword}: 7 Quick Wins for ${audience || 'creators'}`,
      `How ${keyword} Can Boost Your Monthly Growth`,
      `${keyword} Tips: Small Changes, Big Results`
    ];
    const outline = [
      'Hook: Frame the problem & promise the result',
      'Context: Why this matters now (1 stat)',
      '3 Actionable tips with examples',
      'Short case-study / example',
      'CTA: Try it / Share / Download'
    ];

    setResult({ trend, titles, outline });
    setLoading(false);
  }

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border'}`}>
      <h3 className="text-xl font-bold mb-3">Idea Generator</h3>

      <div className="grid gap-3 sm:grid-cols-2 mb-4">
        <input
          className={`p-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
          placeholder="Keyword / topic (e.g. productivity)"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <input
          className={`p-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
          placeholder="Audience (optional — e.g. solopreneurs)"
          value={audience}
          onChange={e => setAudience(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black rounded font-semibold"
          onClick={generate}
          disabled={loading}
        >
          {loading ? 'Generating…' : 'Generate Ideas'}
        </button>
        <button
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
          onClick={() => { setKeyword(''); setAudience(''); setResult(null); }}
        >
          Clear
        </button>
      </div>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-md border {darkMode ? 'border-gray-700' : 'border-gray-200'}">
            <div className="text-sm text-cyan-400 font-semibold">Trend</div>
            <div className="mt-1">{result.trend}</div>
          </div>

          <div className="p-4 rounded-md border {darkMode ? 'border-gray-700' : 'border-gray-200'}">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-cyan-400 font-semibold">Title ideas</div>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  {result.titles.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
              <div className="ml-4">
                <button onClick={() => copy(result.titles.join('\n'))} className="text-sm px-3 py-2 bg-green-500 rounded">Copy</button>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-md border {darkMode ? 'border-gray-700' : 'border-gray-200'}">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-cyan-400 font-semibold">Outline</div>
                <ol className="mt-2 list-decimal list-inside space-y-1">
                  {result.outline.map((o, i) => <li key={i}>{o}</li>)}
                </ol>
              </div>
              <div className="ml-4">
                <button onClick={() => copy(result.outline.join('\n'))} className="text-sm px-3 py-2 bg-green-500 rounded">Copy</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
