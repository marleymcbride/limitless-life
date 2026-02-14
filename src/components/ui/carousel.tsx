"use client"
import { useRef } from "react"
import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"

type CarouselApi = ReturnType<typeof useEmblaCarousel>[1]

type CarouselProps = {
  setApi?: (api: CarouselApi) => void
  className?: string
  opts?: {
    align?: 'start' | 'center' | 'end'
    dragFree?: boolean
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
    const carouselRef = useRef<HTMLDivElement>(null)
    const api = useRef<ReturnType<typeof useEmblaCarousel>[1] | undefined>(undefined)

    React.useEffect(() => {
      if (api.current && setApi) setApi(api.current)
    }, [api.current, setApi])

    React.useImperativeHandle(ref, () => api.current)

    return (
      <CarouselContext.Provider value={{ carouselApi: api.current }}>
        <div
          ref={carouselRef}
          className={`${className || ""} scrollbar-hide`}
          style={{ overflowX: 'auto', scrollSnapType: opts?.align || 'mandatory' }}
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
      className={`flex overflow-x-auto snap-x mandatory snap-always scrollbar-hide ${className || ""}`}
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
      className={`flex-shrink-0 ${className || ""}`}
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
