import { AboutHero } from "@/components/about-hero"
import { HistorySection } from "@/components/history-section"
import { Timeline } from "@/components/timeline"
import { ValuesSection } from "@/components/values-section"
import { TeamSection } from "@/components/team-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function NosotrosPage() {
    return (
        <>
            <Navbar />
            <AboutHero />
            <HistorySection />
            <Timeline />
            <ValuesSection />
            <Footer />
        </>
    )
}
