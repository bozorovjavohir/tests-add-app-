import HomePage from "./pages/HomePage";
import TestsPage from "./pages/TestsPage";
import CreateTestPage from "./pages/CreateTestPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TestPage from "./pages/TestPage";
import SectionsPage from "./pages/SectionsPage";
import SectionPage from "./pages/SectionPage";
import ArchivePage from "./pages/ArchivePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sections" element={<SectionsPage />} />
        <Route path="/tests" element={<TestsPage />} />

        <Route path="/create-test" element={<CreateTestPage />} />
        <Route path="/create-test/:sectionId" element={<CreateTestPage />} />

        <Route path="/test/:id" element={<TestPage />} />
        <Route path="/section/:id" element={<SectionPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
