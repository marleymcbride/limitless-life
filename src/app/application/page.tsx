import { Metadata } from "next";
import ApplicationClient from "./ApplicationClient";

export const metadata: Metadata = {
  title: "Apply for The Limitless Protocol - Application",
  description:
    "Join high-performers who are transforming their energy, body, and life with The Limitless Protocol.",
};

export default function ApplicationPage() {
  return <ApplicationClient />;
}
