"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { asset } from "@/lib/format";

export function VideoHero({
  title,
  description,
  buttonText,
  thumbnailUrl,
  videoUrl,
  bgColor = "bg-[#FFF7E4]",
}: {
  title: string;
  description: string;
  buttonText: string;
  thumbnailUrl: string;
  videoUrl: string;
  bgColor?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className={`${bgColor} py-12 md:py-20 px-4 text-center`}>
      <div className="mx-auto max-w-4xl">
        <h1 className="font-nexa text-2xl md:text-4xl font-black italic text-[#1B50C1] mb-4 md:mb-6">
          {title}
        </h1>
        <p className="font-nexa text-sm md:text-lg text-black max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
          {description}
        </p>
        
        <button className="w-full max-w-[600px] mx-auto py-3.5 md:py-5 rounded-xl bg-gradient-to-br from-[#FFBE00] to-[#FFD95B] text-black font-nexa font-bold text-base md:text-2xl shadow-cta transition hover:-translate-y-1 hover:shadow-cta-hover active:translate-y-0 mb-10 md:mb-14">
          {buttonText}
        </button>

        <div className="relative mx-auto w-full max-w-[1000px] rounded-[20px] overflow-hidden bg-black/10">
          {!isPlaying ? (
            <>
              <img src={asset(thumbnailUrl)} alt={title} className="w-full object-cover aspect-video" />
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 m-auto flex h-20 w-20 md:h-28 md:w-28 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition hover:scale-110 hover:bg-black/40"
              >
                <Play size={40} className="text-white ml-1 md:w-14 md:h-14" fill="white" />
              </button>
            </>
          ) : (
            <video controls autoPlay className="w-full object-cover aspect-video bg-black">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </section>
  );
}