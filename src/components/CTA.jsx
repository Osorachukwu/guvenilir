import React from "react";
import instructorImage from "../assets/instructor.png";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <div className="grid md:grid-cols-2 text-white bg-secondaryColor">
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
    </div>
  );
}