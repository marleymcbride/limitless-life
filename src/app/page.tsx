import Image from "next/image"
import EnhancedVideoPlayer from "../components/enhanced-video-player"
import FeaturedTestimonial from "../components/featured-testimonial"
import PainPoints from "../components/pain-points"
import PersonalStorySection from "../components/personal-story-section"
import DiscoverySection from "../components/discovery-section"
import RunningEmptySection from "../components/running-empty-section"
import SuccessStoriesSection from "../components/success-stories-section"
import SolutionSection from "../components/solution-section"
import ProgramComponentsSection from "../components/program-components-section"
import ResultsSection from "../components/results-section"
import ComparisonTable from "../components/comparison-table"
import CoachSection from "../components/coach-section"
import ProgramDetails from "../components/program-details"
import WhatsIncluded from "../components/whats-included"
import FaqSection from "../components/faq-section"
import FinalCta from "../components/final-cta"
import FooterSection from "../components/footer-section"
import StickyCTA from "../components/sticky-cta"
import NattySweetSpotSection from "../components/natty-sweet-spot-section"
import TestimonialGrid from "../components/testimonial-grid"
import { Button } from "@/components/ui/button"
import { bgClasses, blackRedGradientOverlay, redAccentBottom, vignetteEffect } from "../lib/utils"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* 1. Hero Section (black with red gradient) */}
      <section className={`py-6 md:py-8 px-4 min-h-[75vh] flex flex-col relative w-full overflow-hidden ${bgClasses.blackRedGradient}`}>
        {blackRedGradientOverlay}
        {redAccentBottom}
        <div className="absolute top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-black to-transparent"></div>
        {vignetteEffect}

        <div className="container mx-auto flex flex-col relative z-10 h-full">
          {/* Mobile view - headline and subheadline optimized for mobile */}
          <div className="flex-grow flex flex-col justify-start sm:justify-center pt-5 sm:pt-0 sm:mt-6 md:mt-0">
            {/* Pill Logo */}
            <div className="hidden sm:flex justify-center mb-1 relative">
              {/* Base grey version */}
              <div className="w-auto">
                <Image
                  src="/images/THE-LIMITLESS-PILL-(ALL GREY)-FINAL.png"
                  alt="The Limitless Pill"
                  width={228}
                  height={72}
                  priority
                  className="h-auto"
                />
              </div>
              {/* Overlaid colored pill with transparency */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-auto">
                <Image
                  src="/images/THE-LIMITLESS-PILL-FINAL.png"
                  alt=""
                  width={228}
                  height={72}
                  priority
                  className="h-auto opacity-100"
                />
              </div>
            </div>
            {/* Mobile Headlines (visible only on mobile) */}
            <h1 className="block sm:hidden text-4xl font-bold text-white text-center mb-0 mt-0 max-w-[87%] mx-auto px-4">
              You don't need more coffee. You need a system that actually fixes your broken body:
            </h1>

            {/* Desktop Headlines (hidden on mobile) */}
            <h1 className="hidden sm:block text-4xl sm:text-4xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4">
              You dont need another black Americano or BS supplement. You need a real system that quite simply, stops you feeling like shit.
            </h1>

            {/* Spacer div to push subtitle down */}
            <div className="h-6"></div>

            {/* Mobile Subheadline (visible only on mobile) */}
            <p className="block sm:hidden text-xl text-gray-300 text-center max-w-3xl mx-auto mb-0 px-1">
              The proven system for high performers to build a top 1% physique, get their sex drive back, and quite simply stop feeling like shit... without extreme diets or training more than 2 days a week
            </p>

            {/* Desktop Subheadline (hidden on mobile) */}
            <p className="hidden sm:block text-xl sm:text-xl md:text-lg text-gray-300 text-center max-w-3xl mx-auto mb-0 px-1">
              Learn the proven system high performers are using to build a top 1% physique, get their sex drive back and wake up feeling electric every day — without eating less, taking a bunch of crazy pills or spending more than 2 days a week in the gym:
            </p>
          </div>

          {/* Video container positioned in the bottom portion of the screen */}
          <div className="mt-1 mb-0 mx-auto w-full max-w-2xl">
            <div
              className="relative w-full sm:w-auto sm:mx-auto max-w-[50%] mx-auto max-w-500px"
            >
              {/* Red play button overlay for mobile */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#940909] flex items-center justify-center md:hidden z-30">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              {/* Sound indicator for mobile */}
              <div className="absolute bottom-3 right-3 bg-black/70 rounded-full px-2 py-0.5 text-white text-xs md:hidden z-30">
                Click to play
              </div>
              <EnhancedVideoPlayer />
            </div>
          </div>
        </div>
      </section>

      {/* === SOPHISTICATED ED LAWRENCE STRUCTURE === */}

      {/* 2. PROBLEM AGITATION - The 4% Trap (Executive Level) */}
      <section className={`w-full py-24 px-0 bg-black relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#940909]/20 via-transparent to-transparent"></div>
        {vignetteEffect}

        <div className="container mx-auto relative z-10 max-w-5xl px-4">
          {/* Neanderthal Hook - Immediate Impact */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              You're Not Broken.<br />
              You're Just Trapped in the <span className="text-[#940909]">4% Zone</span>.
            </h2>
            <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Most high-performers think they're doing well because they hit the gym and eat "clean." But here's the brutal truth: you're stuck in no man's land—too advanced for the typical 95%, but missing the systems that unlock the top 1%.
            </p>
          </div>

          {/* The Three Tiers - Logical Framework */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* 95% Typical */}
            <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-red-500 rounded-full opacity-60"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">The 95% (Typical)</h3>
              <p className="text-gray-300 mb-6">Western diet, regular drinking, barely exercising</p>
              <div className="text-3xl font-bold text-red-400 mb-2">20%</div>
              <p className="text-gray-400">Potential Accessed</p>
            </div>

            {/* 4% Health Conscious */}
            <div className="bg-yellow-600/10 border-2 border-yellow-600/40 rounded-lg p-8 text-center transform scale-105">
              <div className="w-16 h-16 bg-yellow-600/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">The 4% (You Right Now)</h3>
              <p className="text-gray-300 mb-6">Gym-going, "clean" eating, but no real systems</p>
              <div className="text-3xl font-bold text-yellow-400 mb-2">50-60%</div>
              <p className="text-yellow-300">Potential Accessed</p>
              <div className="mt-4 px-4 py-2 bg-yellow-600/20 rounded-full">
                <p className="text-yellow-200 text-sm font-semibold">STUCK IN THE TRAP</p>
              </div>
            </div>

            {/* 1% Limitless */}
            <div className="bg-[#940909]/10 border-2 border-[#940909] rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-[#940909]/30 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-[#940909] rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">The 1% (Limitless)</h3>
              <p className="text-gray-300 mb-6">Intentional systems, effortless execution</p>
              <div className="text-3xl font-bold text-[#940909] mb-2">95-100%</div>
              <p className="text-gray-400">Potential Accessed</p>
            </div>
          </div>

          {/* Drag vs Glide Energy - Emotional + Logical */}
          <div className="bg-zinc-900/30 border border-zinc-700 rounded-2xl p-12 mb-16">
            <h3 className="text-4xl font-bold text-white mb-12 text-center">
              The Real Problem: You're Living in <span className="text-red-400">Drag Energy</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Drag Energy */}
              <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-8">
                <h4 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  Drag Energy (Your Current Reality)
                </h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-red-400 font-bold mr-3 text-lg">•</span>
                    Wake up groggy, hit snooze 5 times
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 font-bold mr-3 text-lg">•</span>
                    Need 3-4 coffees just to function
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 font-bold mr-3 text-lg">•</span>
                    2pm crash hits like clockwork
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 font-bold mr-3 text-lg">•</span>
                    Need alcohol to "unwind"
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 font-bold mr-3 text-lg">•</span>
                    Fighting your body every single day
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 font-bold mr-3 text-lg">•</span>
                    Energy feels like pushing a boulder uphill
                  </li>
                </ul>
              </div>

              {/* Glide Energy */}
              <div className="bg-[#940909]/10 border border-[#940909]/30 rounded-xl p-8">
                <h4 className="text-2xl font-bold text-[#940909] mb-6 flex items-center">
                  <div className="w-3 h-3 bg-[#940909] rounded-full mr-3"></div>
                  Glide Energy (What's Possible)
                </h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3 text-lg">•</span>
                    Wake up naturally energized
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3 text-lg">•</span>
                    Sustained focus without stimulants
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3 text-lg">•</span>
                    Energy that lasts all day
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3 text-lg">•</span>
                    Natural relaxation and recovery
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3 text-lg">•</span>
                    Your body working with you
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3 text-lg">•</span>
                    Energy flows like water downstream
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Transition - Emotional Hook */}
          <div className="text-center">
            <p className="text-3xl text-white mb-6 leading-relaxed">
              The gap between where you are and where you want to be isn't willpower.
            </p>
            <p className="text-4xl font-bold text-[#940909] mb-8">
              It's the right system.
            </p>
            <p className="text-xl text-gray-300">
              I know because I was trapped in the exact same place...
            </p>
          </div>
        </div>
      </section>

      {/* 3. PERSONAL STORY + DISCOVERY - Emotional Buyer */}
      <section className="w-full py-24 px-4 bg-white relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight">
              1000 Days Ago, I Was Living in Complete <span className="text-[#940909]">Drag Energy</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Out-of-shape, burned-out, completely dependent on caffeine and alcohol just to get through each day. Sound familiar?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-black mb-8">My Rock Bottom Reality:</h3>
              <ul className="space-y-5 text-gray-700 text-lg">
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-4 text-xl">•</span>
                  Waking up exhausted despite 8 hours sleep
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-4 text-xl">•</span>
                  Drinking 6+ coffees daily just to function
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-4 text-xl">•</span>
                  Needing alcohol every night to "switch off"
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-4 text-xl">•</span>
                  Training 6 days a week but looking worse
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-4 text-xl">•</span>
                  Completely burnt out and aging rapidly
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-10 rounded-xl">
              <h4 className="text-2xl font-bold text-black mb-6">The Breaking Point:</h4>
              <blockquote className="text-xl text-gray-700 italic leading-relaxed">
                "I was doing everything the fitness industry told me to do. More training, more supplements, more restriction. But I felt worse than ever. That's when I realized the entire approach was wrong."
              </blockquote>
            </div>
          </div>

          {/* The Discovery - Logical Framework */}
          <div className="bg-[#940909]/5 border-2 border-[#940909]/20 rounded-2xl p-12 mb-16">
            <h3 className="text-4xl font-bold text-black mb-8 text-center">
              Then I Made the <span className="text-[#940909]">Anti-Stack Discovery</span>
            </h3>
            <p className="text-2xl text-gray-700 mb-12 text-center max-w-4xl mx-auto leading-relaxed">
              Instead of adding more supplements, more workouts, more complexity... I started removing the things that were destroying my natural energy systems.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white border border-gray-200 rounded-xl p-8">
                <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full relative">
                    <div className="absolute inset-0 bg-white rounded-full transform rotate-45" style={{clipPath: 'polygon(0 45%, 55% 45%, 55% 0, 100% 0, 100% 100%, 55% 100%, 55% 55%, 0 55%)'}}></div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-black mb-3">Eliminated Caffeine</h4>
                <p className="text-gray-600">Broke the stimulant-crash cycle</p>
              </div>
              <div className="text-center bg-white border border-gray-200 rounded-xl p-8">
                <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full relative">
                    <div className="absolute inset-0 bg-white rounded-full transform rotate-45" style={{clipPath: 'polygon(0 45%, 55% 45%, 55% 0, 100% 0, 100% 100%, 55% 100%, 55% 55%, 0 55%)'}}></div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-black mb-3">Eliminated Alcohol</h4>
                <p className="text-gray-600">Restored natural recovery</p>
              </div>
              <div className="text-center bg-white border border-gray-200 rounded-xl p-8">
                <div className="w-20 h-20 bg-[#940909]/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 bg-[#940909] rounded"></div>
                </div>
                <h4 className="text-2xl font-bold text-black mb-3">Minimalist Training</h4>
                <p className="text-gray-600">2-3 days maximum</p>
              </div>
            </div>
          </div>

          {/* Results - Nerd Data */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-black mb-12">The Results Were Incredible:</h3>
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl">
                <div className="text-5xl font-bold text-[#940909] mb-3">1000+</div>
                <p className="text-gray-700 font-semibold">Days Alcohol-Free</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl">
                <div className="text-5xl font-bold text-[#940909] mb-3">365+</div>
                <p className="text-gray-700 font-semibold">Days Caffeine-Free</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl">
                <div className="text-5xl font-bold text-[#940909] mb-3">Best</div>
                <p className="text-gray-700 font-semibold">Physique Ever</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl">
                <div className="text-5xl font-bold text-[#940909] mb-3">10x</div>
                <p className="text-gray-700 font-semibold">Energy Levels</p>
              </div>
            </div>
            <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
              But here's the thing—this wasn't about willpower or superhuman discipline.
            </p>
            <p className="text-3xl font-bold text-black">
              It was about having the right <span className="text-[#940909]">system</span>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF GALLERY - Skeptic Buyer */}
      <section className={`w-full py-24 px-0 bg-black relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#940909]/10 via-transparent to-transparent"></div>
        {vignetteEffect}

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Hundreds of High-Performers Are Already <span className="text-[#940909]">Living Limitless</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Real transformations from executives, entrepreneurs, and professionals who escaped the 4% trap.
            </p>
          </div>

          {/* Feature testimonial */}
          <div className="bg-white rounded-2xl p-12 mb-16 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-black">Client L - Investment Banker</h3>
              <div className="text-yellow-500 text-2xl mt-2">★★★★★</div>
            </div>
            <blockquote className="text-2xl text-gray-700 text-center italic mb-8 leading-relaxed">
              "Started drinking heavily, looked rough, high-stakes job tanking, split with girlfriend, hormones shot. After Limitless—off alcohol and caffeine for 15+ months, down 35lbs, crushing work, new relationship, over a year sober. This program literally saved my life."
            </blockquote>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
                <div className="text-4xl font-bold text-[#940909] mb-2">35lbs</div>
                <p className="text-gray-600 font-semibold">Weight Lost</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
                <div className="text-4xl font-bold text-[#940909] mb-2">15+</div>
                <p className="text-gray-600 font-semibold">Months Sober</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
                <div className="text-4xl font-bold text-[#940909] mb-2">Career</div>
                <p className="text-gray-600 font-semibold">Back on Track</p>
              </div>
            </div>
          </div>

          {/* Grid of testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/50 border border-zinc-700 p-8 rounded-xl">
              <div className="text-yellow-500 mb-4 text-xl">★★★★★</div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">"6 months in - best shape of my life, zero caffeine, sleeping like a baby. Energy is through the roof."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
                <div>
                  <p className="text-white font-bold">Mark T.</p>
                  <p className="text-gray-400">Tech Executive</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-700 p-8 rounded-xl">
              <div className="text-yellow-500 mb-4 text-xl">★★★★★</div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">"Finally broke the alcohol-caffeine cycle. Down 28lbs, highest energy in years. Wife says I'm a different person."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
                <div>
                  <p className="text-white font-bold">James R.</p>
                  <p className="text-gray-400">Sales Director</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-700 p-8 rounded-xl">
              <div className="text-yellow-500 mb-4 text-xl">★★★★★</div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">"Thought I'd need supplements forever. Now I wake up naturally energized. Game changer."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
                <div>
                  <p className="text-white font-bold">David K.</p>
                  <p className="text-gray-400">Finance Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE LIMITLESS PROTOCOL - Nerd + Logical Buyers */}
      <section className="w-full py-24 px-4 bg-white relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight">
              Introducing <span className="text-[#940909]">The Limitless Protocol™</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              The proven 12-week system that breaks the caffeine-alcohol cycle and unlocks your natural energy systems.
            </p>
            <div className="bg-[#940909]/5 border-2 border-[#940909]/20 rounded-xl p-8 max-w-3xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed">
                <strong>The Anti-Stack Approach:</strong> Instead of adding more supplements and complexity, we systematically remove what's blocking your natural systems.
              </p>
            </div>
          </div>

          {/* The 3 Core Systems */}
          <div className="grid md:grid-cols-3 gap-10 mb-20">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
              </div>
              <h3 className="text-3xl font-bold text-black mb-6">The Anti-Stack™</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">Your caffeine-free morning energy system that delivers sustained focus without crashes.</p>
              <ul className="text-left text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">•</span>
                  Hydration protocols
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">•</span>
                  Light exposure timing
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">•</span>
                  Nutrient optimization
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">•</span>
                  Natural energy activation
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
              </div>
              <h3 className="text-3xl font-bold text-black mb-6">Power Presence Method™</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">Build the "Natty Sweet Spot" physique training just 2-3 days per week maximum.</p>
              <ul className="text-left text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">•</span>
                  Minimalist training systems
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">•</span>
                  Elite physique protocols
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">•</span>
                  CNS preservation
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">•</span>
                  Recovery optimization
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
              </div>
              <h3 className="text-3xl font-bold text-black mb-6">Limitless Flow™</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">Break free from alcohol dependency and restore your natural stress response systems.</p>
              <ul className="text-left text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">•</span>
                  Alcohol elimination protocols
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">•</span>
                  Natural relaxation systems
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">•</span>
                  Stress optimization
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">•</span>
                  Recovery restoration
                </li>
              </ul>
            </div>
          </div>

          {/* What You Get - Nerd Details */}
          <div className="bg-black rounded-2xl p-12 text-white">
            <h3 className="text-4xl font-bold text-center mb-12">Everything You Need to Go <span className="text-[#940909]">Limitless</span></h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-2xl font-bold text-[#940909] mb-6">Core Program:</h4>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3">✓</span>
                    12-Week Complete System
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3">✓</span>
                    Anti-Stack Morning Protocols
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3">✓</span>
                    Minimalist Training Plans
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3">✓</span>
                    Alcohol Elimination System
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3">✓</span>
                    Energy Tracking Dashboard
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3">✓</span>
                    Supplement Protocols
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#940909] mb-6">Support & Community:</h4>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3">✓</span>
                    Private Community Access
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3">✓</span>
                    Weekly Group Coaching Calls
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3">✓</span>
                    24/7 Support Portal
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3">✓</span>
                    Accountability Partners
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3">✓</span>
                    Success Tracking Tools
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#940909] font-bold mr-3">✓</span>
                    Lifetime Updates
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING & OFFER - All Buyer Types */}
      <section className={`w-full py-24 px-0 bg-black relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#940909]/20 via-transparent to-transparent"></div>
        {vignetteEffect}

        <div className="container mx-auto max-w-6xl relative z-10 px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Choose Your <span className="text-[#940909]">Limitless</span> Path
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Investment in your transformation. Every tier includes the complete system—choose the level of support that fits your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Core Program */}
            <div className="bg-zinc-900/50 border-2 border-zinc-700 rounded-2xl p-10">
              <h3 className="text-3xl font-bold text-white mb-6">Core Protocol</h3>
              <div className="text-6xl font-bold text-white mb-8">$1,997</div>
              <ul className="space-y-4 text-gray-300 mb-10 text-lg">
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">✓</span>
                  Complete 12-Week System
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">✓</span>
                  All Training & Nutrition Protocols
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">✓</span>
                  Anti-Stack Implementation
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">✓</span>
                  Community Access
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">✓</span>
                  Email Support
                </li>
              </ul>
              <Button className="w-full bg-[#940909] hover:bg-[#7e0808] text-white font-bold py-6 text-lg rounded-xl">
                START YOUR TRANSFORMATION
              </Button>
            </div>

            {/* Accelerator - Most Popular */}
            <div className="bg-[#940909] border-4 border-[#940909] rounded-2xl p-10 transform scale-110 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full text-lg font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Accelerator</h3>
              <div className="text-6xl font-bold text-white mb-8">$2,997</div>
              <ul className="space-y-4 text-white mb-10 text-lg">
                <li className="flex items-start">
                  <span className="text-white font-bold mr-3">✓</span>
                  Everything in Core
                </li>
                <li className="flex items-start">
                  <span className="text-white font-bold mr-3">✓</span>
                  Weekly Group Coaching
                </li>
                <li className="flex items-start">
                  <span className="text-white font-bold mr-3">✓</span>
                  Direct Access to Marley
                </li>
                <li className="flex items-start">
                  <span className="text-white font-bold mr-3">✓</span>
                  Accountability Partner
                </li>
                <li className="flex items-start">
                  <span className="text-white font-bold mr-3">✓</span>
                  Priority Support
                </li>
                <li className="flex items-start">
                  <span className="text-white font-bold mr-3">✓</span>
                  Advanced Protocols
                </li>
              </ul>
              <Button className="w-full bg-white text-[#940909] hover:bg-gray-100 font-bold py-6 text-lg rounded-xl">
                ACCELERATE YOUR RESULTS
              </Button>
            </div>

            {/* VIP Elite */}
            <div className="bg-zinc-900/50 border-2 border-zinc-700 rounded-2xl p-10">
              <h3 className="text-3xl font-bold text-white mb-6">VIP Elite</h3>
              <div className="text-6xl font-bold text-white mb-8">$4,997</div>
              <ul className="space-y-4 text-gray-300 mb-10 text-lg">
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">✓</span>
                  Everything in Accelerator
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">✓</span>
                  1-on-1 Monthly Calls
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">✓</span>
                  Custom Protocol Design
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">✓</span>
                  Lab Review & Analysis
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">✓</span>
                  24/7 Direct Line
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] font-bold mr-3">✓</span>
                  VIP Community
                </li>
              </ul>
              <Button className="w-full bg-[#940909] hover:bg-[#7e0808] text-white font-bold py-6 text-lg rounded-xl">
                GO VIP ELITE
              </Button>
            </div>
          </div>

          {/* Guarantee - Skeptic Buyer */}
          <div className="text-center">
            <div className="bg-white/5 border-2 border-white/20 rounded-2xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-6">100% Risk-Free Guarantee</h3>
              <p className="text-gray-300 text-xl leading-relaxed">
                Follow the system for 90 days. If you don't see a dramatic improvement in your energy, physique, and overall performance, get a full refund. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ + GUARANTEE */}
      <FaqSection />

      {/* 8. FINAL CTA */}
      <FinalCta />

      {/* Minimal Footer */}
      <FooterSection />

      {/* Sticky CTA that appears on significant scroll */}
      <StickyCTA />
    </main>
  )
}
