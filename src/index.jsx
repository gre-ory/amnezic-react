"use client";

import React from 'react';
import ReactDOM from 'react-dom';

import { ErrorBoundary } from "react-error-boundary";

import App from './App';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}