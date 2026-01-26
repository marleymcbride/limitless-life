import { bgClasses } from "@/lib/utils";
import { PersonalStoryContent2 } from "./personal-story-content-2";

export default function PersonalStorySection2() {
  return (
    <section className={`w-full ${bgClasses.white} pt-12 text-black relative`}>
      {/* Simple, premium white background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

      <div className="container mx-auto px-4 relative z-10 hero-full-width">
        <div className="max-w-5xl mx-auto" style={{ maxWidth: "1200px" }}>
          {/* THE ACTUAL STORY - Natural flow, casual tone */}
          <div className="prose prose-lg max-w-none mobile-text-large body-copy">
            <PersonalStoryContent2 />
          </div>
        </div>
      </div>
    </section>
  );
}
