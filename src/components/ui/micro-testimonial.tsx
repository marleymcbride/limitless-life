import SmoothImage from "./smooth-image";

interface MicroTestimonialProps {
  quote: string;
  name: string;
  title: string;
  metric?: string;
  imageSrc?: string;
  isDarkBackground?: boolean; // New prop to determine text color
}

export const MicroTestimonial = ({
  quote,
  name,
  title,
  metric,
  imageSrc,
  isDarkBackground = true, // Default to dark background (light text)
}: MicroTestimonialProps) => (
  <div
    className={`${
      isDarkBackground ? "bg-white/10 text-white" : "bg-gray-50 text-gray-800"
    } backdrop-blur p-5 rounded-lg border ${
      isDarkBackground ? "border-[#940909]/20" : "border-gray-200"
    } shadow-lg my-8 transform  transition-none`}
  >
    <div className="flex items-start gap-3">
      <svg
        className="h-8 w-8 text-[#940909] flex-shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <div className="flex-1">
        <p className="text-sm italic mb-3">&ldquo;{quote}&rdquo;</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {imageSrc && (
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <SmoothImage
                  src={imageSrc}
                  alt={name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-bold text-xs">{name}</p>
              <p
                className={`text-xs ${
                  isDarkBackground ? "text-white/75" : "text-gray-600"
                }`}
              >
                {title}
              </p>
            </div>
          </div>

          {metric && (
            <div className="bg-[#940909] text-white text-xs font-bold px-2 py-1 rounded-full">
              {metric}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default MicroTestimonial;
