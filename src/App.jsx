
import React from "react";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          {/* <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
            <defs />
            <rect x="1" y="1" width="22" height="22" rx="6" fill="url(#g)" />
            <path d="M6 14l3-3 2 2 5-5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#4FC3F7" />
                <stop offset="1" stopColor="#9575CD" />
              </linearGradient>
            </defs>
          </svg> */}

          <div className="brand-text">
            <h1>Spendora</h1>
            <span className="tagline">Smart spending</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="search">
            <input placeholder="Search expenses..." />
          </div>
          {/* <button className="btn avatar" title="Profile">
            MA
          </button> */}
        </div>
      </header>

      <main className="container">
        <Dashboard />
      </main> 

      <footer className="app-footer">
        <small>Built by Manasa • @2026 • All Rights Reserved</small>
      </footer>
    </div>
  );
}
