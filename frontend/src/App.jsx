import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppShell from './components/AppShell';

// Pages
import DashboardPage from './pages/DashboardPage';
import DataIngestionPage from './pages/DataIngestionPage';
import LiveAnalysisPage from './pages/LiveAnalysisPage';
import ModelControlPage from './pages/ModelControlPage';
import OODAlertPage from './pages/OODAlertPage';
import EvaluationPage from './pages/EvaluationPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Root redirects to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Main pages */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/data-ingestion" element={<DataIngestionPage />} />
            <Route path="/live-analysis" element={<LiveAnalysisPage />} />
            <Route path="/model-control" element={<ModelControlPage />} />
            <Route path="/ood-alerts" element={<OODAlertPage />} />
            <Route path="/evaluation" element={<EvaluationPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
