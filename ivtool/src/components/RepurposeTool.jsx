import { useState, useEffect, useRef } from 'react';

export default function RepurposeTool() {
  const [inputText, setInputText] = useState('');
  const [repurposedText, setRepurposedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState('blog-post');
  const [darkMode, setDarkMode] = useState(true);
  const outputRef = useRef(null); // ✅ Step 2

  // Simulate repurpose API (to be replaced later)
  async function handleRepurpose() {
    setLoading(true);
    setRepurposedText('');

    try {
      await new Promise(r => setTimeout(r, 1500));
      let result = '';
      switch (format) {
        case 'youtube-summary':
          result = `🎥 YouTube Summary:\n${inputText.slice(0, 100)}...`;
          break;
        case 'shorts-script':
          result = `🎬 Shorts Script:\n"Hey everyone! ${inputText.slice(0, 80)}..."`;
          break;
        case 'pinterest-caption':
          result = `📌 Pinterest Caption:\n${inputText.slice(0, 100)} #repurposeIV`;
          break;
        default:
          result = `📄 Repurposed (${format}):\n${inputText.toUpperCase()}`;
        case 'blog-tldr':
          result = `🧠 TL;DR Summary:\n• ${inputText
            .split('. ')
            .slice(0, 5)
            .join('.\n• ')}.`;
          break;
        case 'thread-expander':
          result = `🧵 Expanded Thread:\n\n${inputText
            .split('.')
            .map((sentence, i) => `Paragraph ${i + 1}: ${sentence.trim()}`)
            .join('\n\n')}`;
          break;      
      }
      setRepurposedText(result);
      outputRef.current?.scrollIntoView({ behavior: 'smooth' }); // ✅ Step 3
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
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
        <span className="text-3xl">♻️</span> Repurpose<span className="text-cyan-400">IV</span>
      </h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 text-sm"
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} font-sans`}>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            Repurpose Smarter, Faster, Everywhere.
          </h2>
          <p className="text-lg opacity-80">
            Turn your content into summaries, scripts, captions and more — all in one place.
          </p>
        </section>
        <div className="flex flex-col lg:flex-row gap-6">
        <div className="mb-2 text-sm text-cyan-400 font-semibold">
              {format === 'blog-post' && '📝 Blog Post'}
              {format === 'social-post' && '💬 Social Post'}
              {format === 'summary' && '📚 Summary'}
              {format === 'tweet-to-linkedin' && '🐦→💼 Tweet to LinkedIn'}
              {format === 'blog-to-caption' && '📝→📸 Blog to Instagram Caption'}
              {format === 'video-to-email' && '📹→✉️ Video to Email'}
              {format === 'youtube-summary' && '🎥 YouTube Summary'}
              {format === 'shorts-script' && '🎬 Shorts Script'}
              {format === 'pinterest-caption' && '📌 Pinterest Caption'}
              {format === 'blog-tldr' && '🧠 Blog TL;DR'}
              {format === 'thread-expander' && '🧵 Tweet → Blog Style Expansion'}
            </div>
          {/* Input Section */}
          <div className="w-full lg:w-1/2">
            <textarea
              className={`w-full h-64 p-4 rounded-md border focus:outline-none focus:ring-2 ${
                darkMode ? 'bg-gray-800 text-white border-gray-700 focus:ring-cyan-500' : 'bg-white text-gray-900 border-gray-300 focus:ring-cyan-600'
              }`}
              placeholder="Paste or write your content here..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <select
              className="w-full mt-4 p-3 rounded-md bg-gray-700 text-white"
              value={format}
              onChange={e => setFormat(e.target.value)}
            >
              <option value="blog-post">Blog Post</option>
              <option value="social-post">Social Post</option>
              <option value="summary">Summary</option>
              <option value="tweet-to-linkedin">Tweet → LinkedIn</option>
              <option value="blog-to-caption">Blog → Instagram Caption</option>
              <option value="video-to-email">Video → Email Summary</option>
              <option value="youtube-summary">YouTube → Summary</option>
              <option value="shorts-script">YouTube → Shorts Script</option>
              <option value="pinterest-caption">Blog → Pinterest Caption</option>
              <option value="blog-tldr">Blog → TL;DR</option>
              <option value="thread-expander">Tweet → Blog Style Expansion</option>
            </select>
            <button
              className="w-full sm:w-1/2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-5 py-3 rounded-md transition-all duration-200"
              onClick={handleRepurpose}
              disabled={loading || !inputText.trim()}
            >
              Repurpose Content
            </button>
            <button
              className="w-full sm:w-1/2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-5 py-3 rounded-md transition-all duration-200"
              onClick={() => {
                setInputText('');
                setRepurposedText('');
              }}
              >
              Clear
            </button>
          </div>

          {/* Output Section */}
          <div className="w-full lg:w-1/2" ref={outputRef}> {/* ✅ Step 4 */}
            {loading && (
              <p className="text-xl font-semibold text-yellow-400 animate-pulse text-center font-mono">
                Repurposing your content...
              </p>
            )}

            {repurposedText && (
              <>
                <pre className={`whitespace-pre-wrap p-4 rounded-md h-64 overflow-auto border ${
                  darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-100 text-gray-900 border-gray-300'
                }`}>
                  {repurposedText}
                </pre>
                <div className="mt-4 flex gap-4 justify-end">
                  <button
                    className="w-full sm:w-1/2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-5 py-3 rounded-md transition-all duration-200"
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
          </div>
        </div>
        <div className="h-12" />
      </main>
    </div>
  );
}

