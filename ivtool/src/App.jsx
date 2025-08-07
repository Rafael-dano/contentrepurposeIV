import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RepurposeTool from './components/RepurposeTool'
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white font-sans transition-colors duration-300">  
      <div>
      <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-10">
        <RepurposeTool />
        </div>
        <Footer />
      </div>
    </div>
  );
}
