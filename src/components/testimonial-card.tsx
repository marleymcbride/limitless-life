import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  name: string
  title: string
  results: string
  imageSrc: string
}

export default function TestimonialCard({ quote, name, title, results, imageSrc }: TestimonialCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-zinc-800 shadow-lg">
      <div className="p-6">
        <p className="mb-4 text-lg italic text-white">{quote}</p>
        <div className="flex items-center">
          <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-white">{name}</p>
            <p className="text-sm text-zinc-400">{title}</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-zinc-700 p-2">
          <p className="text-sm font-medium text-zinc-300">Results: {results}</p>
        </div>
      </div>
    </div>
  )
}
