import { Metadata } from "next";
import { Suspense } from 'react'
import FilloutFormPopup from "@/components/airtable-form-popup";

export const metadata: Metadata = {
  title: "Complete Your Application - Step 2",
  description: "Finish your application to The Limitless Protocol.",
};

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <Suspense
        fallback={
          <div className="text-center animate-fade-in">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Preparing your application...</p>
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in {
                animation: fadeIn 0.5s ease-out;
              }
            `}</style>
          </div>
        }
      >
        <FilloutFormPopup />
      </Suspense>
    </div>
  )
}
