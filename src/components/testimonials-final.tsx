import Image from "next/image";

const testimonials = [
  { image: "/images/Testimonials/Luke social proof.png" },
  { image: "/images/Testimonials/Matty feels so good.jpeg" },
  { image: "/images/Testimonials/Lewis hits 168 feels great.png" },
  { image: "/images/Testimonials/Aaron - nearly 20kg down.jpg" },
  { image: "/images/Testimonials/Laurence - 10 week cut.png" },
  { image: "/images/Testimonials/Rob down 17lbs and clothes dont fit copy.PNG" },
  { image: "/images/Testimonials/Ryan social proof - 190s to 160s.png" },
  { image: "/images/Testimonials/Luis social proof.png" },
  { image: "/images/Testimonials/Geoff - best shape ever been in.jpg" },
  { image: "/images/Testimonials/Laurence social proof.png" },
  { image: "/images/Testimonials/Geoff 2 month progress abs jacked.png" },
  { image: "/images/Testimonials/Client L social proof.png" },
  { image: "/images/Testimonials/Gav social proof - 10lbs in 8 weeks.png" },
  { image: "/images/Testimonials/Gavs weight trend - 10lbs in 8 weeks.png" },
  { image: "/images/Testimonials/Matty - early win 3kg down.png" },
  { image: "/images/Testimonials/Rob feels great - Week 3.png" },
  { image: "/images/Testimonials/Gav social proof - i need to for my kids.png" },
  { image: "/images/Testimonials/Luis social proof copy.png" },
  { image: "/images/Testimonials/Aaron testimonial - great energy.png" },
  { image: "/images/Testimonials/Geoff feeling great.jpeg" },
  { image: "/images/Testimonials/Matty down 19kg.jpeg" },
  { image: "/images/Testimonials/Geoff - 3 month transformation v2.jpeg" },
  { image: "/images/Testimonials/Luis down 6kg.jpg" }
];

export default function TestimonialPlaceholder({ number, darkBg }: { number: number, darkBg?: boolean }) {
  // Get 2 testimonials per section
  const startIndex = (number - 1) * 2;
  const testimonialPair = testimonials.slice(startIndex, startIndex + 2);
  const sectionClass = darkBg ? "testimonial-dark-gradient py-16 px-4 w-full" : "py-16 px-4 w-full bg-gradient-to-br mx-auto from-gray-50 via-white to-gray-50";

  return (
    <section className={sectionClass}>
      {testimonialPair.map((testimonial, index) => (
        <div key={startIndex + index} className={`w-full mx-auto ${index === 0 ? "mb-10" : ""}`} style={{ maxWidth: "25%" }}>
          <Image
            src={testimonial.image}
            alt={`Testimonial ${startIndex + index + 1}`}
            width={1200}
            height={675}
            className="w-full h-auto object-contain"
            unoptimized={true}
          />
        </div>
      ))}
    </section>
  );
}
