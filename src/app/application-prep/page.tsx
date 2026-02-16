import { Metadata } from "next";
import { Suspense } from 'react'
import AirtableFormPopup from "@/components/airtable-form-popup";

export const metadata: Metadata = {
  title: "Complete Your Application - Step 2",
  description: "Finish your application to The Limitless Protocol.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AirtableFormPopup />
    </Suspense>
  )
}
