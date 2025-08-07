import { useState, useEffect } from 'react';

export default function RepurposeTool() {
  const [inputText, setInputText] = useState('');
  const [repurposedText, setRepurposedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState('blog-post');
  const [darkMode, setDarkMode] = useState(true);

  // Simulate repurpose API (to be replaced later)
  async function handleRepurpose() {
    setLoading(true);
    setRepurposedText('');

    try {
      await new Promise(r => setTimeout(r, 1500));
      setRepurposedText(`Mock Repurposed (${format}):\n${inputText.toUpperCase()}`);
    } catch (err) {
      setRepurposedText('Error repurposing content.');
    } finally {
      setLoading(false);
    }
  }

  // Load localStorage on mount
  useEffect(() => {
    setInputText(localStorage.getItem('repurpose-input') || '');
    setRepurposedText(localStorage.getItem('repurpose-output') || '');
    setFormat(localStorage.getItem('repurpose-format') || 'blog-post');
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('repurpose-input', inputText);
  }, [inputText]);

  useEffect(() => {
    localStorage.setItem('repurpose-output', repurposedText);
  }, [repurposedText]);

  useEffect(() => {
    localStorage.setItem('repurpose-format', format);
  }, [format]);

  // Header component
  const Header = () => (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-gray-800 text-white shadow-md">
      <h1 className="text-xl font-bold tracking-wide">RepurposeIV</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 text-sm"
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  );

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-gray-900 min-h-screen'}>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <textarea
          className={`w-full p-3 rounded-md resize-y ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'
          }`}
          rows={8}
          placeholder="Paste or write your content here..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <select
            className={`w-full sm:w-1/2 p-3 rounded-md ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'
            }`}
            value={format}
            onChange={e => setFormat(e.target.value)}
          >
            <option value="blog-post">Blog Post</option>
            <option value="social-post">Social Post</option>
            <option value="summary">Summary</option>
            <option value="tweet-to-linkedin">Tweet → LinkedIn</option>
            <option value="blog-to-caption">Blog → Instagram Caption</option>
            <option value="video-to-email">Video → Email Summary</option>
          </select>

          <button
            className="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
            onClick={handleRepurpose}
            disabled={loading || !inputText.trim()}
          >
            Repurpose Content
          </button>
        </div>

        {loading && (
          <p className="mt-6 text-2xl font-bold text-yellow-400 animate-pulse text-center font-mono">
            Repurposing your content...
          </p>
        )}

        {repurposedText && (
          <>
            <pre className="mt-6 whitespace-pre-wrap bg-gray-700 p-4 rounded text-white">
              {repurposedText}
            </pre>

            <div className="mt-4 flex gap-4 justify-end">
              <button
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                onClick={() => {
                  setInputText('');
                  setRepurposedText('');
                }}
              >
                Clear
              </button>

              <button
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                onClick={() => {
                  const blob = new Blob([repurposedText], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'repurposed.txt';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Download .txt
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

