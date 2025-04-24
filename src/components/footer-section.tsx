import Link from "next/link"

export default function FooterSection() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-gray-400">
              Copyright © {currentYear} Limitless Life. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-xs text-gray-500 text-center">
          <p>
            The Limitless Protocol is a step-by-step process designed to help high-performing men improve their energy,
            health and performance. Results may vary. All testimonials are from real clients, and results were achieved
            following the program principles outlined in the Limitless Protocol.
          </p>
        </div>
      </div>
    </footer>
  )
}
