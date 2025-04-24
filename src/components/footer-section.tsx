import Link from "next/link"

export default function FooterSection() {
  return (
    <section className="w-full bg-black py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              Copyright © {new Date().getFullYear()} Limitless Life. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>
            Disclaimer: Results may vary. This program is not intended to diagnose, treat, cure, or prevent any disease.
            Always consult with your physician before beginning any diet or exercise program.
          </p>
        </div>
      </div>
    </section>
  )
}
