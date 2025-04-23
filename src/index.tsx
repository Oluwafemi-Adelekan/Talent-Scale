import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Desktop } from "./screens/Desktop/Desktop";
import { JobsProvider } from "./context/JobsContext";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import {
  LoginPage,
  SignUpPage,
  CreateProfilePage,
  PreferencesPage,
  CulturePage,
  ResumeCVPage,
  EmailVerificationPage,
  ProcessingPage,
} from "./screens/Auth";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <JobsProvider>
      <AuthProvider> {/* Wrap with AuthProvider */}
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create-profile" element={<CreateProfilePage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/culture" element={<CulturePage />} />
          <Route path="/resume-cv" element={<ResumeCVPage />} />
          <Route path="/email-verification" element={<EmailVerificationPage />} />
          <Route path="/processing" element={<ProcessingPage />} />
            <Route path="/*" element={<Desktop />} />
          </Routes>
        </Router>
      </AuthProvider> {/* Close AuthProvider */}
    </JobsProvider>
  </StrictMode>,
);
