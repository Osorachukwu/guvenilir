import { ArrowRightLeft, Users } from "lucide-react";
import bannerIng from "../../assets/trust-us.png"

export default function Banner({ title, desc }) {
  return (
    <section className="relative overflow-hidden">
      <img src={bannerIng} alt="Banner" className='absolute w-full h-full object-cover' />
      {/* <div className='absolute h-full w-full bg-base-200/50'></div> */}
      <div className="relative pt-28 pb-16 px-10 sm:px-6" >
        {/* style={{ background: "#0a1628" }} */}


        {/* Glow orbs */}
        <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 w-60 h-60 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)" }} />

        {/* Subtle chart lines */}
        <svg className="pointer-events-none absolute bottom-0 left-0 right-0 opacity-[0.07] w-full"
          viewBox="0 0 900 200" preserveAspectRatio="none" height="200" xmlns="http://www.w3.org/2000/svg">
          <polyline points="0,160 80,140 160,145 240,110 320,120 400,80 480,90 560,55 640,65 720,30 800,40 900,10"
            fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          <polyline points="0,180 80,170 160,175 240,155 320,160 400,130 480,140 560,110 640,120 720,90 800,95 900,70"
            fill="none" stroke="#10b981" strokeWidth="1.5" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-10">

          {/* LEFT SIDE */}
          <div className="lg:text-left">
            <h1 className="text-4xl text-white md:text-5xl font-bold">{title}</h1>
            {/* <p className="text-white/55 mt-4 text-lg">{desc}</p> */}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6 w-full sm:w-auto">

            {/* CARD 1 */}
            <div className="flex items-center gap-4 rounded-2xl px-5 py-4 w-full sm:w-auto"
              style={{ background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)" }}>
              <div className="bg-primary text-white p-4 rounded-2xl flex-shrink-0">
                <ArrowRightLeft size={24} />
              </div>
              <div>
                <h3 className="text-4xl font-semibold text-white">
                  $91 <span className="text-amber-400 text-xl">Million+</span>
                </h3>
                <span className="inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: "rgba(96,165,250,0.18)", color: "#93c5fd", border: "0.5px solid rgba(96,165,250,0.3)" }}>
                  Total Transactions
                </span>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="flex items-center gap-4 rounded-2xl px-5 py-4 w-full sm:w-auto"
              style={{ background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)" }}>
              <div className="bg-emerald-500 text-white p-4 rounded-2xl flex-shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-4xl font-semibold text-white">
                  49.6 <span className="text-amber-400 text-xl">Thousand+</span>
                </h3>
                <span className="inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: "rgba(52,211,153,0.15)", color: "#6ee7b7", border: "0.5px solid rgba(52,211,153,0.3)" }}>
                  Active Investors
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}





// import React from 'react'
// import bannerIng from "../../assets/trust-us.png"

// export default function Banner({ title, desc }) {
//   return (
//     <div className='relative h-[45vh] w-full flex justify-center items-center z-'>
//       <p className='text-6xl font-semibold z-10'>
//         {title}
//       </p>
//       <img src={bannerIng} alt="Banner" className='absolute w-full h-full object-cover' />
//       <div className='absolute h-full w-full bg-base-200/50'></div>

//     </div>
//   )
// }
