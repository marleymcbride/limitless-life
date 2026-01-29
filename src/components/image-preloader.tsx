/**
 * ImagePreloader - Adds preload hints for critical images
 * Place this component in pages to preload important images early
 */
export function ImagePreloader({ images }: { images: string[] }) {
  return (
    <>
      {images.map((src) => (
        <link
          key={src}
          rel="preload"
          as="image"
          href={src}
          type={src.endsWith('.png') ? 'image/png' : src.endsWith('.jpg') || src.endsWith('.jpeg') ? 'image/jpeg' : 'image/webp'}
        />
      ))}
    </>
  );
}

/**
 * List of critical testimonial images to preload
 * Add images that appear early on the page
 */
export const CRITICAL_TESTIMONIAL_IMAGES = [
  // Early testimonials - preload these
  "/images/Testimonials/Geoff - 3 month transformation.jpeg",
  "/images/Testimonials/Before vs afters/Laurence before vs after.png",
  "/images/Testimonials/Gav social proof - 10lbs in 8 weeks.png",
  "/images/Testimonials/Matty down 19kg.jpeg",
  "/images/Testimonials/Luis social proof.png",
  "/images/Testimonials/Lewis hits 168 feels great.png",
  "/images/Testimonials/Aaron testimonial - great energy.png",
  "/images/Testimonials/Geoff - best shape ever been in.jpg",
];
