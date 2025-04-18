"use client";

import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from './App';
import { config } from './config';
import './index.css';

function RenderRoot() {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

// load dynamic config before rendering root

config.load(() => {
  // on config load
  RenderRoot()
})

if (module.hot) {
  module.hot.accept();
}