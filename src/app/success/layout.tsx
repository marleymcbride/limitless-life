import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to The Limitless Protocol - Payment Successful",
  description:
    "Thank you for joining The Limitless Protocol. Your transformation begins now.",
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
