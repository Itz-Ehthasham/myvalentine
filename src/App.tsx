import { motion } from 'framer-motion'
import HeroSection from './components/HeroSection'
import StorySection from './components/StorySection'
import InteractiveSection from './components/InteractiveSection'
import ProposalSection from './components/ProposalSection'
import FloatingHearts from './components/FloatingHearts'
import './index.css'

function App() {

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-valentine-50 via-valentine-100 to-valentine-200">
      <FloatingHearts />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
        <StorySection />
        <InteractiveSection />
        <ProposalSection />
      </motion.div>
    </div>
  )
}

export default App