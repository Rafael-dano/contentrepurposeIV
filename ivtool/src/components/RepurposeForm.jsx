import { useState } from 'react';

export default function RepurposeForm() {
  const [inputText, setInputText] = useState('');
  const [repurposedText, setRepurposedText] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRepurpose(type) {
    setLoading(true);
    setRepurposedText('');
    try {
      // Simulate API call - replace with your AI repurposing logic later
      await new Promise(r => setTimeout(r, 1500));
      setRepurposedText(`Repurposed (${type}):\n${inputText.toUpperCase()}`);
    } catch (err) {
      setRepurposedText('Error repurposing content.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <textarea
        className="w-full p-3 rounded-md bg-gray-700 text-white resize-y"
        rows={8}
        placeholder="Paste or write your content here..."
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />

      <div className="flex gap-4 mt-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          onClick={() => handleRepurpose('Blog Post')}
          disabled={loading || !inputText.trim()}
        >
          Blog Post
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          onClick={() => handleRepurpose('Social Post')}
          disabled={loading || !inputText.trim()}
        >
          Social Post
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
          onClick={() => handleRepurpose('Summary')}
          disabled={loading || !inputText.trim()}
        >
          Summary
        </button>
      </div>

      {loading && (<p className="mt-6 text-2xl font-bold text-yellow-400 animate-pulse text-center font-mono">Repurposing your content...</p>)}

      {repurposedText && (
        <pre className="mt-6 whitespace-pre-wrap bg-gray-700 p-4 rounded text-white">{repurposedText}</pre>
      )}
    </div>
  );
}
