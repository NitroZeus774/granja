import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FeaturedProducts } from "@/components/featured-products"
import { AboutSection } from "@/components/about-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <FeaturedProducts />
            <AboutSection />
            <NewsletterSection />
            <ContactSection />
        </>
    )
}
