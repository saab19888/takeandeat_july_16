import React from 'react';
import { HelpCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FAQ() {
  const faqs = [
    {
      question: "How does Take & Eat work?",
      answer: "Take & Eat is a platform that connects food donors with people in need. Donors can list available food, and those in need can browse and arrange pickup. We facilitate safe food sharing within communities."
    },
    {
      question: "Is it safe to share food through Take & Eat?",
      answer: "Yes, we have strict food safety guidelines that all users must follow. We recommend checking our Food Safety Guidelines for detailed information on safe food handling and sharing practices."
    },
    {
      question: "How do I know if I'm eligible to receive food?",
      answer: "Take & Eat is open to anyone in need. There are no specific eligibility requirements, but we operate on a trust-based system and ask users to only take what they truly need."
    },
    {
      question: "Can I share any type of food?",
      answer: "While most foods can be shared, they must meet our safety guidelines. Perishable items must be properly stored and handled. Check our Food Safety Guidelines for specific requirements."
    },
    {
      question: "How do I arrange a food pickup?",
      answer: "Once you find food you'd like to receive, you can contact the donor through our platform to arrange a pickup time and location. We recommend meeting in safe, public places."
    },
    {
      question: "What if I can't make a scheduled pickup?",
      answer: "Please notify the donor as soon as possible if you can't make a scheduled pickup. This allows them to make the food available to others who might need it."
    },
    {
      question: "Is there a cost to use Take & Eat?",
      answer: "No, Take & Eat is completely free to use. We do not charge any fees for listing or receiving food. Commercial use is not permitted."
    },
    {
      question: "How can I ensure my safety when meeting for food pickup?",
      answer: "Always meet in public places, bring a friend if possible, and trust your instincts. If something doesn't feel right, don't proceed with the exchange."
    },
    {
      question: "What should I do if I have a complaint?",
      answer: "If you experience any issues, please contact our support team immediately. We take all complaints seriously and will investigate thoroughly."
    },
    {
      question: "Can I donate money instead of food?",
      answer: "Currently, Take & Eat focuses on food sharing only. If you'd like to make monetary donations, we recommend connecting with local food banks and charities."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Find answers to common questions about using Take & Eat
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-700">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}