import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Black Friday Offer - Limitless Protocol",
  description: "Special Black Friday offer for The Limitless Protocol",
};

export default function BlackFridayOfferPage() {
  return (
    <main className="min-h-screen bg-white text-black px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Black Friday Offer
        </h1>

        <div className="prose max-w-none">
          <p className="text-lg text-center mb-12">
            Basic offer page content...
          </p>
        </div>
      </div>
    </main>
  );
}