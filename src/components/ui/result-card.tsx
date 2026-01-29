import SmoothImage from "./smooth-image";

interface ResultCardProps {
  before: string;
  after: string;
  name: string;
  title: string;
  description: string;
  imageSrc?: string;
}

export const ResultCard = ({
  before,
  after,
  name,
  title,
  description,
  imageSrc,
}: ResultCardProps) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transform  transition-none">
    <div className="relative h-[200px]">
      <SmoothImage
        src={imageSrc || "/placeholder.svg?height=200&width=400"}
        alt={name}
        width={400}
        height={200}
        className="object-cover w-full h-full"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
        <div className="p-4 w-full">
          <div className="flex justify-between w-full">
            <div>
              <p className="text-xs text-gray-300 uppercase">BEFORE</p>
              <p className="text-lg font-bold text-white">{before}</p>
            </div>
            <div>
              <p className="text-xs text-[#940909] uppercase">AFTER</p>
              <p className="text-lg font-bold text-white">{after}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="p-5">
      <div className="mb-3">
        <h4 className="font-bold text-lg">{name}</h4>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  </div>
);

export default ResultCard;
