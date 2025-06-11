"use client";

import {
  Coffee,
  BatteryLow,
  Brain,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import { Button } from "./ui/button";
import { bgClasses, vignetteEffect } from "@/lib/utils";

export default function ProblemAgitationSection() {
  return (
    <section className="w-full py-20 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black"></div>
      {vignetteEffect}

      <div className="container mx-auto relative z-10 max-w-4xl text-center">
        {/* Hook with 4% Trap concept */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            You're Not Broken. You're Just Trapped in the{" "}
            <span className="text-[#940909]">4% Zone</span>.
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Most guys think they're doing well because they hit the gym and eat
            "clean." But here's the brutal truth: you're stuck in no man's
            land—too advanced for the typical 95%, but missing the systems that
            unlock the top 1%.
          </p>
        </div>

        {/* The Three Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* 95% Typical */}
          <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-6">
            <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              The 95% (Typical)
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Western diet, regular drinking, barely exercising
            </p>
            <div className="text-red-400 font-bold">
              Accessing 20% potential
            </div>
          </div>

          {/* 4% Health Conscious */}
          <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-6 transform scale-105">
            <div className="w-12 h-12 bg-yellow-600/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              The 4% (You Right Now)
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Gym-going, "clean" eating, but no real systems
            </p>
            <div className="text-yellow-400 font-bold">
              Accessing 50-60% potential
            </div>
            <p className="text-xs text-yellow-300 mt-2">
              ↑ Stuck in the trap ↑
            </p>
          </div>

          {/* 1% Limitless */}
          <div className="bg-[#940909]/20 border border-[#940909] rounded-lg p-6">
            <div className="w-12 h-12 bg-[#940909]/30 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Brain className="w-6 h-6 text-[#940909]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              The 1% (Limitless)
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Intentional systems, effortless execution
            </p>
            <div className="text-[#940909] font-bold">
              Accessing 95-100% potential
            </div>
          </div>
        </div>

        {/* Drag vs Glide Energy */}
        <div className="bg-zinc-900/30 border border-zinc-700 rounded-xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-white mb-8">
            The Real Problem: You're Living in{" "}
            <span className="text-red-400">Drag Energy</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Drag Energy */}
            <div className="text-left">
              <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center">
                <Coffee className="w-5 h-5 mr-2" />
                Drag Energy (Your Current Reality)
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Wake up groggy, hit snooze 5 times
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Need 3-4 coffees just to function
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  2pm crash hits like clockwork
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Need alcohol to "unwind"
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Fighting your body every day
                </li>
              </ul>
            </div>

            {/* Glide Energy */}
            <div className="text-left">
              <h4 className="text-xl font-bold text-[#940909] mb-4 flex items-center">
                <BatteryLow className="w-5 h-5 mr-2" />
                Glide Energy (What's Possible)
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#940909] mr-2">•</span>
                  Wake up naturally energized
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] mr-2">•</span>
                  Sustained focus without stimulants
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] mr-2">•</span>
                  Energy that lasts all day
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] mr-2">•</span>
                  Natural relaxation and recovery
                </li>
                <li className="flex items-start">
                  <span className="text-[#940909] mr-2">•</span>
                  Your body working with you
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Transition */}
        <div className="text-center">
          <p className="text-2xl text-white mb-8">
            The gap between where you are and where you want to be isn't
            motivation.
          </p>
          <p className="text-3xl font-bold text-[#940909] mb-8">
            It's the right system.
          </p>
          <p className="text-lg text-gray-300 mb-8">
            I know because I was trapped in the exact same place...
          </p>
        </div>
      </div>
    </section>
  );
}
