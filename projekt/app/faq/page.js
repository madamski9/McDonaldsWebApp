"use client"
import { useState } from "react"

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="faq">
            <h2 className="text-2xl font-bold mb-4">FAQ</h2>

            <div className="faq-item">
                <button 
                    className="font-semibold text-lg" 
                    onClick={() => toggleFaq(0)}
                >
                    How can I open a McDonald's franchise?
                </button>
                {openIndex === 0 && (
                    <p className="mt-2">McDonald's provides franchise opportunities worldwide. Visit our franchise page for requirements and application details.</p>
                )}
            </div>

            <div className="faq-item mt-4">
                <button 
                    className="font-semibold text-lg" 
                    onClick={() => toggleFaq(1)}
                >
                    How do I contact McDonald's corporate office?
                </button>
                {openIndex === 1 && (
                    <p className="mt-2">You can reach out to our corporate office via the contact form on our website or call our customer service line.</p>
                )}
            </div>

            <div className="faq-item mt-4">
                <button 
                    className="font-semibold text-lg" 
                    onClick={() => toggleFaq(2)}
                >
                    Where can I find financial information about McDonald's?
                </button>
                {openIndex === 2 && (
                    <p className="mt-2">McDonald's financial reports and investor relations information are available on our corporate website under the 'Investors' section.</p>
                )}
            </div>

            <div className="faq-item mt-4">
                <button 
                    className="font-semibold text-lg" 
                    onClick={() => toggleFaq(3)}
                >
                    How does McDonald's support local businesses?
                </button>
                {openIndex === 3 && (
                    <p className="mt-2">We collaborate with local suppliers and business owners to ensure high-quality products and community support.</p>
                )}
            </div>
        </div>
    )
}

export default Faq
