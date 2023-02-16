import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/App';
import { LanguageProvider } from './context/LanguageProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SubscriptionProvider } from './context/SubscriptionProvider';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <LanguageProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </QueryClientProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </LanguageProvider>
  </BrowserRouter>
);
