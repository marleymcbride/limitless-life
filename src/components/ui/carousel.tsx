"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"

type CarouselApi = ReturnType<typeof useEmblaCarousel>[1]

type CarouselProps = {
  setApi?: (api: CarouselApi) => void
  className?: string
  opts?: {
    align?: 'start' | 'center' | 'end'
    dragFree?: boolean
    containScroll?: boolean
  }
  children: React.ReactNode
}

type CarouselContextProps = {
  carouselApi: CarouselApi | undefined
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ setApi, className, opts, children }, ref) => {
    // ✅ FIX: Call the hook at the top level, not inside useEffect
    const [emblaRef, emblaApi] = useEmblaCarousel(opts)

    // Sync the API with the parent component if setApi is provided
    React.useEffect(() => {
      if (!emblaApi || !setApi) return
      setApi(emblaApi)
    }, [emblaApi, setApi])

    return (
      <CarouselContext.Provider value={{ carouselApi: emblaApi }}>
        <div
          ref={emblaRef}
          className={`${className || ""} overflow-x-scroll scrollbar-hide`}
          style={{ scrollPaddingLeft: '0%' }}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex ${className || ""}`}
      {...props}
    />
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={`min-w-0 shrink-0 grow-0 basis-full ${className || ""}`}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
}