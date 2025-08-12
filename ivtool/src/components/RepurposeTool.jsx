import { useState, useEffect, useRef } from 'react';

export default function RepurposeTool() {
  const [inputText, setInputText] = useState('');
  const [repurposedText, setRepurposedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState('blog-post');
  const [darkMode, setDarkMode] = useState(true);
  const outputRef = useRef(null); // ✅ Step 2

  // ⭐ NEW — Store array for carousel mode
  const [isCarousel, setIsCarousel] = useState(false);

  // Formats that can run instantly without input
  const NO_INPUT_REQUIRED = ['carousel'];    // const NO_INPUT_REQUIRED = ['carousel', 'idea-generator', 'mock-feature-name'];
  // later i can make it look like the second one ^^^^


  // Simulate repurpose API (to be replaced later)
  async function handleRepurpose() {
    setLoading(true);
    setRepurposedText('');
    setIsCarousel(false); // reset

    try {
      await new Promise(r => setTimeout(r, 1500));

      // ⭐ NEW — Carousel mock case
      if (format === 'carousel-generator') {
        const mockSlides = [
          { title: "Slide 1", content: "Hook — Capture attention with a bold statement or surprising fact." },
          { title: "Slide 2", content: "Problem — Clearly define the problem your audience faces." },
          { title: "Slide 3", content: "Value — Show why solving this matters." },
          { title: "Slide 4", content: "Solution — Present your solution in a simple, clear way." },
          { title: "Slide 5", content: "Call to Action — Invite them to engage, comment, or click." },
        ];
        setRepurposedText(mockSlides);
        setIsCarousel(true);
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
        setLoading(false);
        return;
      }

      if (format === 'blog-to-email') {
        if (!inputText.trim()) {
          setRepurposedText('⚠️ Please paste your blog content before generating.');
          setLoading(false);
          return;
        }
      
        const mockEmail = {
          subject: "Your Weekly Update — Fresh from the Blog!",
          greeting: "Hi there,",
          intro: "We thought you’d enjoy this week’s highlights from our latest post:",
          snippet: `${inputText.substring(0, 200)}...`,
          highlights: [
            "Key takeaway #1",
            "Interesting stat or fact #2",
            "Actionable tip #3"
          ],
          closing: "Thanks for reading and see you next week!",
          signature: "— The RepurposeIV Team"
        };
      
        setRepurposedText(mockEmail);
        setIsCarousel(false);
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
        setLoading(false);
        return;
      }
      
      if (format === 'pinterest-caption') {
        const mockPinterestCaption =
          "✨ 10 Ways to Style Your Workspace ✨\n\n" +
          "Transform your home office into a productivity haven!\n" +
          "💡 Tip 1: Add plants for a fresh vibe.\n" +
          "💡 Tip 2: Choose a comfy chair.\n" +
          "💡 Tip 3: Organize with stylish storage.\n\n" +
          "#HomeOffice #WorkspaceGoals #ProductivityHacks";
      
        setRepurposedText(mockPinterestCaption);
        setIsCarousel(false);
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
        setLoading(false);
        return;
      }          

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
        default:
          result = `📄 Repurposed (${format}):\n${inputText.toUpperCase()}`;
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
        <span className="text-3xl">♻️</span> IV <span className="text-cyan-400">Content</span>
      </h1>
      
      <section>
        <a class="price-box" href="/beta.html" target="_blank">Join Beta Till September 30th</a> 
      </section>
    </header>
  );
// ^^^^^change the beta link section to the Index.html but change the name so it doesnt get confused with other index.html ^^^^^^
  
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
          {/* Input format label */}
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
            {format === 'carousel-generator' && '🖼️ Carousel Generator'}
            {format === 'Text' && '🧠Idea Generator'}
            {format === 'content' && '📅 Content Calendar'}
            {format === 'Script' && '🎤AI Vocals'}
          </div>

          {/* Input Section */}
          <div className="w-full lg:w-1/2">
            <textarea
              className={`w-full h-64 p-4 rounded-md border focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-800 text-white border-gray-700 focus:ring-cyan-500'
                  : 'bg-white text-gray-900 border-gray-300 focus:ring-cyan-600'
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
              <option value="pinterest-caption">Pinterest Caption</option>
              <option value="blog-tldr">Blog → TL;DR</option>
              <option value="thread-expander">Tweet → Blog Style Expansion</option>
              <option value="carousel-generator">Carousel Generator</option>
              <option value="blog-to-email">Blog → Email Expander</option>
              <option value="idea-generator">Idea Generator</option>
              <option value="calendar-generator">Content Calendar</option>
              <option value="script-to-vocal">AI Vocals</option>
            </select>
            <button
              className="w-full sm:w-1/2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-5 py-3 rounded-md transition-all duration-200"
              onClick={handleRepurpose}
              disabled={loading || (!inputText.trim() && format !== 'carousel')}
            >
              Repurpose Content
            </button>
            <button
              className="w-full sm:w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-3 rounded-md transition-all duration-200"
              onClick={() => {
                setInputText('');
                setRepurposedText('');
                setIsCarousel(false);
              }}
            >
              Clear
            </button>
          </div>

          {/* Output Section */}
          <div className="w-full lg:w-1/2" ref={outputRef}>
            {loading && (
              <p className="text-xl font-semibold text-yellow-400 animate-pulse text-center font-mono">
                Repurposing your content...
              </p>
            )}
        
            {!loading && repurposedText && (
              <>
                {isCarousel ? (
                  <>
                    {/* ⭐ Carousel Card Layout */}
                    <div className="flex overflow-x-auto gap-4 pb-4">
                      {repurposedText.map((slide, index) => (
                        <div
                          key={index}
                          className="min-w-[250px] flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
                        >
                          <h3 className="font-bold text-lg mb-2">{slide.title}</h3>
                          <p className="text-gray-700 dark:text-gray-300">{slide.content}</p>
                        </div>
                      ))}
                    </div>

                    {/* ⭐ Mock download button */}
                    <div className="mt-4 flex gap-4 justify-end">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-black font-semibold px-5 py-3 rounded-md transition-all duration-200"
                        onClick={() => alert('Mock download started — images would be generated here!')}
                      >
                        📥 Download Carousel as Images
                      </button>
                    </div>
                  </>
                ) : format === 'blog-to-email' && typeof repurposedText === 'object' ? (
                  <>
                    {/* ⭐ Fancy Email Preview */}
                    <div className={`p-6 rounded-lg shadow-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                      <h3 className="text-xl font-bold mb-4">📧 {repurposedText.subject}</h3>
                      <p className="mb-4">{repurposedText.greeting}</p>
                      <p className="mb-4">{repurposedText.intro}</p>
                      <blockquote className="italic border-l-4 pl-4 mb-4">
                        {repurposedText.snippet}
                      </blockquote>
                      <ul className="list-disc list-inside mb-4">
                        {repurposedText.highlights.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                      <p className="mb-2">{repurposedText.closing}</p>
                      <p className="font-semibold">{repurposedText.signature}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <pre
                      className={`whitespace-pre-wrap p-4 rounded-md h-64 overflow-auto border ${
                        darkMode
                          ? 'bg-gray-800 text-white border-gray-700'
                          : 'bg-gray-100 text-gray-900 border-gray-300'
                      }`}
                    >
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
              </>
            )}
          </div>
        </div>
        <div className="h-12" />
      </main>
    </div>
  );
}

