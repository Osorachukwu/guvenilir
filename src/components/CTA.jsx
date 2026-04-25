import React from "react";
import instructorImage from "../assets/instructor.png";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <div className="section-wrapper">
      {/* max-w-screen-lg */}
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-14 min-h-72 px-8 md:px-16 py-12 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-800 rounded-lg overflow-hidden" data-aos="zoom-in">
        <div className="md:max-w-md flex flex-col justify-center" data-aos="fade-right">
          <h2 className="text-3xl font-semibold text-white leading-tight">Elevate Your Experience with Modern Elegance</h2>
          <p className="text-base text-gray-200 leading-relaxed mt-4">Laboris qui Lorem ad tempor ut reprehenderit. Nostrud anim nulla officia ea sit deserunt.</p>
          <button type="button" className="btn w-max mt-6">
            Get started
          </button>
        </div>
        <div className="relative h-full" data-aos="fade-left">
          <div>
            <img src="https://readymadeui.com/images/payment-img.webp" alt="Banner Image"
              className="w-full aspect-[6/4] md:right-0 md:top-0 max-lg:bottom-0 m-auto md:absolute object-contain object-center rounded-lg" />
          </div>
        </div>
      </div>
    </div>
    
  );
}

{/* <div className="grid md:grid-cols-2 text-white bg-secondaryColor py-8">
      <div className="py-10 md:py-20 px-4 md:pl-48">
        <p className="text-3xl font-semibold">Easy setup. Optimal profit.</p>
        <p className="mt-4 mb-10 text-base">
          We are ultimately aiming to build the largest global distributed
          platform for <br /> good. Providing access to disruptive technologies.
        </p>
        <Link to="/support" className="btn btn-lg btn-primary rounded-full">
            Open Account
            <ArrowRight />
        </Link>
      </div>

      <div className="hidden md:block">
        <img src={instructorImage} alt="Instructor icon" width="600" />
      </div>
    </div> */}