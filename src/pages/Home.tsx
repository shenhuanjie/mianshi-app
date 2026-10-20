import Nav from '@/sections/Nav'
import Hero from '@/sections/Hero'
import PainPoints from '@/sections/PainPoints'
import HowItWorks from '@/sections/HowItWorks'
import ReportPreview from '@/sections/ReportPreview'
import Pricing from '@/sections/Pricing'
import Faq from '@/sections/Faq'
import LeadForm from '@/sections/LeadForm'
import Footer from '@/sections/Footer'
import '../App.css'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <PainPoints />
        <HowItWorks />
        <ReportPreview />
        <Pricing />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
    </div>
  )
}
