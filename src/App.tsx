import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Auth from "./pages/Auth"
import Pricing from "./pages/Pricing"
import CaptionGenerator from "./pages/CaptionGenerator"
import TopBar from "./components/TopBar"

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-background">
        <TopBar />
        <main className="w-full pt-16">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/caption-generator" element={<CaptionGenerator />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App