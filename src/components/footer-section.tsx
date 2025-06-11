import Link from "next/link";
import { bgClasses } from "@/lib/utils";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-4 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            © {currentYear} Limitless Life
          </p>
          <div className="flex space-x-4">
            <Link
              href="/privacy"
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
