import React from 'react';
import { X, BookOpen, FileText, Network, Key } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Kairo Documentation</h3>
              <p className="text-xs text-slate-400">Quick Start Guide & Technical Specifications</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-8 text-slate-700 text-sm leading-relaxed">
          
          {/* Section 1: Overview */}
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              1. Getting Started
            </h4>
            <p className="text-slate-600 mb-3">
              Kairo is a desktop application built on top of <a href="https://v2.tauri.app" target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium hover:opacity-80">Tauri</a> (<a href="https://www.rust-lang.org" target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium hover:opacity-80">Rust</a>) and <a href="https://react.dev" target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium hover:opacity-80">React</a>. Differentiating itself from traditional cloud notes, Kairo stores all your files as plain Markdown & <a href="https://www.sqlite.org" target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium hover:opacity-80">SQLite</a> database files on your local drive.
            </p>
            <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
              Default Directory: C:\Users\&lt;username&gt;\AppData\Roaming\kairo\notes
            </div>
          </div>

          {/* Section 2: Knowledge Graph */}
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Network className="w-4 h-4 text-emerald-700" />
              2. Linking Notes & Knowledge Graph
            </h4>
            <p className="text-slate-600 mb-2">
              To create an automatic link between two notes in Kairo, use double square brackets:
            </p>
            <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
              - [[Project Roadmap]] for linking to project notes<br />
              - [[Meeting Notes 2026]] for referencing logs
            </div>
          </div>

          {/* Section 3: Keyboard Shortcuts */}
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-600" />
              3. Keyboard Shortcuts Cheatsheet
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <span className="text-slate-600">Quick Search</span>
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-800 font-bold font-mono">Ctrl + K</kbd>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <span className="text-slate-600">Toggle Split View</span>
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-800 font-bold font-mono">Ctrl + \</kbd>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <span className="text-slate-600">Toggle Graph View</span>
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-800 font-bold font-mono">Ctrl + G</kbd>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <span className="text-slate-600">New Note</span>
                <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-800 font-bold font-mono">Ctrl + N</kbd>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Documentation
          </button>
        </div>

      </div>
    </div>
  );
};
