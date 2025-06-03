import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FeaturedProducts } from "@/components/featured-products"
import { AboutSection } from "@/components/about-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <FeaturedProducts />
            <AboutSection />
            <NewsletterSection />
            <ContactSection />
            <Footer />
        </>
    )
}
