"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EnrollPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /application with enroll flag
    router.replace("/application?enroll=true");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>
  );
}
