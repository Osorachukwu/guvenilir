import React, { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const [counters, setCounters] = useState({ investors: 0, transactions: 0, partners: 0 });
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters({
        investors: Math.floor(49666 * easeOut),
        transactions: Math.floor(7.2 * easeOut * 10) / 10,
        partners: Math.floor(32 * easeOut),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  const stats = [
    { value: `${counters.investors.toLocaleString()}+`, label: 'Investors' },
    { value: `${counters.transactions} M+`, label: 'Transactions' },
    { value: `${counters.partners}+`, label: 'Partners' },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              About us
            </span>
            
            <h2 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              We have been known to give investors the{' '}
              <span className="text-primary">better choice</span>.
            </h2>
            
            <p className="mb-8 text-base leading-relaxed sm:text-lg text-base-content/70">
              With over 153,000 investments under our management, $5 billion+ in assets under our administration, 
              over 11 industry awards, we have made Emerald Holdings Limited the safe haven for investors who want 
              to trust their financial partner to be capable of helping them reach their financial goals, and in due time, 
              without the fear of disappointments.
            </p>

            {/* Stats Grid */}
            <div className="mb-10 grid grid-cols-3 gap-4 sm:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-base-content/60 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="group inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/25 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-95 sm:text-base"
            >
              Read More
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          {/* Right Images */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Large Image - Office Workers */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                  alt="Corporate professionals collaborating at a modern office desk"
                  className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-80 lg:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Overlapping Small Image - Handshake */}
              <div className="relative -mt-16 ml-4 mr-4 sm:ml-8 sm:mr-0 sm:-mt-20 sm:max-w-xs lg:-mt-24 lg:ml-auto lg:mr-8">
                <div className="overflow-hidden rounded-xl border-4 border-gray-300 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&h=350&fit=crop"
                    alt="Business professionals shaking hands over signed documents"
                    className="h-40 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-48"
                  />
                </div>
                
                {/* Decorative accent */}
                <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-xl bg-emerald-600/20" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -left-4 -top-4 -z-10 h-24 w-24 rounded-full bg-secondary/50" />
              <div className="absolute -bottom-8 -right-4 -z-10 h-32 w-32 rounded-full bg-primary/50" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;