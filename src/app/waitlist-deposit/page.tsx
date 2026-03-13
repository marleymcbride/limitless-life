import { Metadata } from "next";
import { Suspense } from 'react'
import DepositClient from "./DepositClient";

export const metadata: Metadata = {
  title: "Confirm Your Spot - Limitless Protocol Beta Waitlist",
  description: "Secure your spot in the Limitless Protocol beta cohort with a special waitlist discount.",
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DepositClient />
    </Suspense>
  )
}
