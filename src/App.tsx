import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Auth from "./pages/Auth"
import Pricing from "./pages/Pricing"
import CaptionGenerator from "./pages/CaptionGenerator"
import TopBar from "./components/TopBar"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <TopBar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/caption-generator" element={<CaptionGenerator />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App