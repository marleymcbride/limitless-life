import { Metadata } from "next";
import { Suspense } from 'react'
import ApplicationClient from "./ApplicationClient";

export const metadata: Metadata = {
  title: "Apply for The Limitless Protocol - Application",
  description:
    "Join high-performers who are transforming their energy, body, and life with The Limitless Protocol.",
};

export default function Page() {
  return (
    // Wrap the component using useSearchParams in Suspense
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicationClient />
    </Suspense>
  )
}