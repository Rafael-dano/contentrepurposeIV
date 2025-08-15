import { useState } from "react";

export default function ScriptToVocal() {
  const [script, setScript] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    // In the real version, this is where API call will happen
    setTimeout(() => {
      setGenerated(true);
    }, 500); // Small delay to feel like it's "processing"
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🎙 Script to Vocal Output</h2>
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Paste or type your script here..."
        className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-blue-500 resize-none"
        rows="6"
      />
      <div className="mt-4 flex items-center gap-3">
        <label htmlFor="voice" className="text-sm text-gray-300">Voice Style:</label>
        <select
          id="voice"
          className="bg-gray-900 border border-gray-700 text-white p-2 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option>Warm & Friendly</option>
          <option>Professional</option>
          <option>Energetic</option>
          <option>Calm Narrator</option>
        </select>
      </div>
      <button
        onClick={handleGenerate}
        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded-lg font-semibold"
      >
        Generate Vocal Output
      </button>

      {generated && (
        <div className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <p className="text-sm mb-3 text-gray-300">Preview:</p>
          <audio controls className="w-full">
            <source src="/public/audio/sample-voice.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <a
            href="/public/audio/sample-voice.mp3"
            download
            className="block mt-3 text-center text-blue-400 hover:underline"
          >
            ⬇ Download Audio
          </a>
        </div>
      )}
    </div>
  );
}
