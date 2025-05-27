import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { FAQ } from "@/components/faq"

export default function ContactoPage() {
    return (
        <>
            <ContactHero />
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <ContactInfo />
                        <ContactForm />
                    </div>
                </div>
            </section>
            <FAQ />
        </>
    )
}
