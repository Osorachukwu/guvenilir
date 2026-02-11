import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';


// Import your images (adjust paths as needed)
import hero1 from "../assets/clear/images (1).jpg"
import hero2 from "../assets/clear/images (2).jpg"
import hero3 from "../assets/clear/images (3).jpg"
import { ChevronRight, ChevronLeft } from 'lucide-react';

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  // Hero slides data
  const slides = [
    { 
      id: 1, 
      image: hero1,
      title: "Hero Title 1",
      subtitle: "Optional subtitle text here"
    },
    { 
      id: 2, 
      image: hero2,
      title: "Hero Title 2",
      subtitle: "Optional subtitle text here"
    },
    { 
      id: 3, 
      image: hero3,
      title: "Hero Title 3",
      subtitle: "Optional subtitle text here"
    }
  ];

  return (
    <div className="embla relative h-[90vh] w-full overflow-hidden">
      <div className="embla__viewport h-full" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {slides.map((slide) => (
            <div 
              className="embla__slide flex-[0_0_100%] min-w-0 relative h-full" 
              key={slide.id}
            >
              {/* Image Container - CRITICAL FOR QUALITY */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={slide.image}
                  alt={`Hero slide ${slide.id}`}
                  className="w-full h-full object-cover object-center"
                  // Optimize loading
                  loading="eager"
                  decoding="async"
                />
                {/* Optional overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
              
              {/* Optional Content Overlay */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                {slide.subtitle && (
                  <p className="text-xl md:text-2xl max-w-2xl">
                    {slide.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="embla__prev btn btn-square rounded-full absolute left-4 top-1/2 transform -translate-y-1/2 z-20 black/40 backdrop-blur-sm hover:bg-black/40 text-white p-3 border-none transition-all"
        onClick={goToPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>
      
      <button
        className="embla__next btn btn-square rounded-full border-none absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 backdrop-blur-sm hover:bg-black/40 text-white p-3 transition-all"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>

      {/* Optional Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              emblaApi?.selectedScrollSnap() === index 
                ? 'bg-white' 
                : 'bg-white/50'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}