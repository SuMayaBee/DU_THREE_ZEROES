"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutUs: React.FC = () => {
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const img1 = img1Ref.current;
      const img2 = img2Ref.current;

      if (img1 && img2) {
        // Image 1 (top image) with parallax effect
        gsap.to(img1, {
          yPercent: 30, // Move slower as the user scrolls
          ease: "none",
          scrollTrigger: {
            trigger: img1,
            scrub: true, // Allows for slower movement while scrolling
            start: "top bottom", // Starts when the image enters the viewport
            end: "bottom top", // Ends when the image leaves the viewport
          },
        });

        // Image 2 (bottom image) with parallax effect
        gsap.to(img2, {
          yPercent: 20, // Slower scroll effect
          ease: "none",
          scrollTrigger: {
            trigger: img2,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        });
      }
    }
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-left">
          <h1 className="text-xl text-[#FF5733] font-bold text-left mb-6">
            About Us
          </h1>
          <h2 className="text-4xl font-semibold mb-4 font-kanit">
            Explore All Corners of The World With Us
          </h2>
          <p className="text-sm mb-2">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean.
          </p>
          <p className="text-lg mb-4">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia. It is a paradisematic country, in which
            roasted parts of sentences fly into your mouth.
          </p>
        </div>
        <div className="flex space-y-2">
          <img
            src="https://preview.colorlib.com/theme/passport/images/about_1.jpg"
            alt="About Us Image 1"
            className="w-64 h-auto rounded shadow-lg"
            ref={img1Ref}
          />
          <img
            src="https://preview.colorlib.com/theme/passport/images/about_2.jpg"
            alt="About Us Image 2"
            className="w-64 -mt-5 ms-2 h-auto rounded shadow-lg"
            ref={img2Ref}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
