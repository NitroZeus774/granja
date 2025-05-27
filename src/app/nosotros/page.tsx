import { AboutHero } from "@/components/about-hero"
import { HistorySection } from "@/components/history-section"
import { Timeline } from "@/components/timeline"
import { ValuesSection } from "@/components/values-section"
import { TeamSection } from "@/components/team-section"

export default function NosotrosPage() {
    return (
        <>
            <AboutHero />
            <HistorySection />
            <Timeline />
            <ValuesSection />
            <TeamSection />
        </>
    )
}
