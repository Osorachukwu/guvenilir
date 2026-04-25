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
      title: `Take A Bold Step`,
      subtitle: `To Change Your World`,
      desc: `You have dreams. We have a culturally diverse, forward thinking team ready to help you achieve your dreams`
    },
    { 
      id: 2, 
      image: hero2,
      title: "Secure Cryptocurrency Investment",
      subtitle: "Trade With Confidence",
      desc: `Invest in digital assets with industry-leading security and transparent trading practices. Your wealth, your future.`
    },
    { 
      id: 3, 
      image: hero3,
      title: "Grow Your Portfolio",
      subtitle: "Smart Investment Strategies",
      desc: `Diversify your investments across multiple cryptocurrency opportunities and maximize your returns with our expert guidance.`
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
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
              
              {/* Content Overlay */}
              <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full text-center">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 opacity-95">
                    {slide.subtitle}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto">
                    {slide.desc}
                  </p>
                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button className='btn btn-primary'>Get Started</button>
                    <button className='btn btn-outline btn-white'>Know More</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="embla__prev btn btn-square rounded-full absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 backdrop-blur-sm hover:bg-black/40 text-white p-3 border-none transition-all"
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