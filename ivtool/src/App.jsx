import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RepurposeTool from './components/RepurposeTool';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div>
        <h1 className="text-4xl font-bold underline mb-8 text-center">
          RepurposeIV is alive! 🚀
        </h1>
        <RepurposeTool />
      </div>
    </div>
  );
}
