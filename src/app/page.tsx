"use client";

import { ImagePreloader, CRITICAL_TESTIMONIAL_IMAGES } from "../components/image-preloader";
import VSLPlayer from "../components/vsl-player";
import DoesThisSoundLikeYou from "../components/does-this-sound-like-you";
import PersonalStorySection from "../components/personal-story-section";
import IntroSection from "../components/intro-section";
import CoreValueProposition from "../components/core-value-proposition";
import VideoTestimonialCTA from "../components/video-testimonial-cta";
import ResultsProof from "../components/results-proof";
// import ImagineThisDark from "../components/imaginethisdark";
import ImagineThis from "../components/imaginethis";
import ClientTransformationGallery from "../components/more-results-created";
import MoreVideoTestimonials from "../components/more-video-testimonials";
import BigIdeaSection from "../components/big-idea-section";
import IntroducingLimitless from "../components/introducing-limitless";
import WhatYoullAchieve from "../components/what-youll-achieve";
import MoreClientTestimonials from "../components/more-client-testimonials";
import HowLimitlessProtocolWorks from "../components/how-limitless-protocol-works";
import WhatHappensIfYouDontFixThis from "../components/what-happens-if-you-dont-fix-this";
import WhatMakesThisDifferent from "../components/what-makes-this-different";
import BonusStack from "../components/bonus-stack";
import WhySmallNumber from "../components/why-small-number";
import WhatItsCostingYou from "../components/what-its-costing-you";
import WhoThisIsFor from "../components/who-this-is-for";
import SecureYourSpot from "../components/secure-your-spot";
import FinalFAQs from "../components/FAQs";
import TestimonialsFinal from "../components/testimonials-final";
import The3TestimonialsBoxV2 from "../components/the-3-testimonials-box-v2";
import TestimonialSectionDark from "../components/testimonial-section-dark";
import { vignetteEffect, unifiedGradientWithSpotlightDesktop, unifiedGradientWithSpotlightMobile } from "../lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import RootCauses from "../components/why-traditional-methods-dont-work";
import DelayedCTA from "../components/delayed-cta";

// import SystemBenefitsProof from "../components/system-benefits-proof";
// import WhyThisSystemWorks from "../components/[old] why-this-system-works";
// import ProcessExplanation from "../components/process-explanation";
// import FourStepSystem from "../components/four-step-system";
// import ExclusivityPersonalAttention from "../components/exclusivity-personal-attention";
// import FAQSection from "../components/faq-section";
// import UrgencyFinalCTA from "../components/urgency-final-cta";
// import WallClientTestimonials from "../components/wall-client-testimonials";
// import FooterSection from "../components/footer-section";
// import StickyCTA from "../components/sticky-cta";


export default function Home() {
  const [hasStartedVideo, setHasStartedVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0); // Track actual time in seconds
  const [videoHasEnded, setVideoHasEnded] = useState(false);
  const [passedJoinNowTime, setPassedJoinNowTime] = useState(false); // Track if passed 11:36
  const [showPauseOverlay, setShowPauseOverlay] = useState(false); // Track if pause overlay is active
  const [showClickToUnmute, setShowClickToUnmute] = useState(true); // Track if "Click to unmute" popup is showing
  const [isDesktop, setIsDesktop] = useState(false); // Track if desktop for VSL sizing

  // Smooth scroll function with "soft close" easing
  const smoothScrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const start = window.pageYOffset;
    const target = element.getBoundingClientRect().top + start - 20; // 20px offset
    const distance = target - start;
    const duration = 2500; // 2.5 seconds for smooth, luxurious scroll
    let startTime: number | null = null;

    // Ease-in-out cubic function for "soft close" effect
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const easedProgress = easeInOutCubic(progress);
      window.scrollTo(0, start + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // Detect desktop/mobile for VSL sizing
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 769);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <main className="flex flex-col">
      {/* Preload critical testimonial images */}
      <ImagePreloader images={CRITICAL_TESTIMONIAL_IMAGES} />
      {/* 1. Hero Section (UNTOUCHED - PRESERVED EXACTLY) */}
      <section
        id="hero-section"
        className={`pt-2 md:pt-6 pb-16 px-16min-h-[100vh] sm:pb-16 flex flex-col relative w-full overflow-hidden bg-black`}
      >
        <div className="hidden md:block">{unifiedGradientWithSpotlightDesktop}</div>
        <div className="block md:hidden">{unifiedGradientWithSpotlightMobile}</div>
        <div className="hero-grain-overlay"></div>
        <div className="hero-darkening-overlay"></div>
        {/* {redAccentBottom} */}
        {/* <div className="absolute top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-black to-transparent"></div> */}
        {vignetteEffect}

        <div className="hero-container flex relative z-30 flex-col mx-auto h-full">
          {/* Mobile view - headline and subheadline optimized for mobile */}
          <div className="flex flex-col flex-grow justify-start pt-5 sm:justify-center sm:pt-0 sm:mt-6 md:mt-0">
            {/* Pill Logo */}
            {/*
            <div className="hidden relative justify-center mb-1 sm:flex">
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
              <div className="absolute top-0 left-1/2 w-auto transform -translate-x-1/2">
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
            */}

            {/* Desktop Eyebrow (hidden on mobile) */}
            <p
              className="hidden sm:block px-0 mx-auto mb-4 mt-1 text-xl text-center text-gray-300 md:text-lg lg:text-xl max-w-2xl"
            >
              For the man who has EVERYTHING in life, except the energy to enjoy it... here&apos;s how to:
            </p>

            {/* Mobile Eyebrow (visible only on mobile) */}
            <p
              className="block sm:hidden px-2 text-center text-gray-300 mobile-eyebrow w-full"
              style={{ marginTop: "3.6px", marginBottom: "14.4px" }}
            >
              For the man who has EVERYTHING in life, except the energy to enjoy it... here&apos;s how to:
            </p>
            
            {/* Mobile Headlines (visible only on mobile) */}
            <h1
              className="mobile-headline block px-1 mx-auto mt-2 mb-6 w-full font-bold text-center text-white sm:hidden capitalize text-[2.5rem] px-5"
              style={{ lineHeight: "1.125" }}
            >
              Lose Your Gut, Stop Feeling Exhausted & Reverse Years Of Health Decline (In 2 Days Per Week)
            </h1>

            {/* Mobile Subheadline - RIGHT AFTER HEADLINE (visible only on mobile) */}
            <p
              className="mobile-subheadline block mx-auto mb-4 font-light text-center text-gray-300 sm:hidden px-0 text-[1.33rem] leading-[1.28] w-[95%]"
            >
             You don&apos;t need to down 4 coffees, train 6 days a week, or cut out your favorite foods to feel LIMITLESS.
             Restore your energy, build the body you&apos;ve always wanted, and get back YEARS of life (with only 2 days/week in the gym):
            </p>

            {/* Spacer div to push headline down */}
            <div className="hidden h-4"></div>

            {/* Desktop Headlines (hidden on mobile) */}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            How To Look And Feel Better Than You Did At 25 (While Training 2 days a Week)
            </h1>*/}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            Wake Up With More Energy Than You Had At 25 (Training Just 2 Days a Week)
            </h1>*/}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            Discover How To Look And Feel Better Than You Did At 25 (Without Obsessing Over Your Health)"
            </h1>*/}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            How I Got My Energy Back, Dropped 30 Pounds, And Got Off Alcohol—Without Willpower Or Restrictive Diets
            </h1>*/}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            How I Went From Addicted to Caffine and 20lbs Overweight to Naturally Energized, and in the Shape of My Life (Training 2 Days A Week)
            </h1>*/}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            How I Stopped Feeling Like Shit Every Morning And Built An Elite
              Body (Training Only 2 Days Per Week)
            </h1>*/}
            {/*<h1 className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-4 capitalize" style={{ fontFamily: 'Neuemontreal, Arial, sans-serif', lineHeight: "1.17" }}>
            Stop Waking Up Feeling Like Shit and Build [X Body desired result] (Training Only 2 Days Per Week)
            </h1>*/}
            <h1
              className="hidden sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl font-bold text-white text-center mb-0 mt-0 sm:mt-0 max-w-[87%] mx-auto px-6 capitalize leading-[1.2]"
            >
            Lose Your Gut, Stop Waking Up Exhausted & Reverse Years of Health Decline (In Just 2 Days Per Week)
            </h1>

            {/* Spacer div to push subtitle down */}
            <div className="h-4"></div>

            {/* Desktop Subheadline (hidden on mobile) */}
            <p
              className="hidden mb-4 py-4 text-xl text-center text-gray-300 sm:block sm:text-xl md:text-lg lg:text-xl max-w-[925px]"
              >
              You don&apos;t need to down 4 coffees a day, train 6 days a week,
              or cut out your favorite foods to feel LIMITLESS. Here&apos;s the
              proven system to restore your energy, lose your gut and build the body you&apos;ve always wanted
              and get back YEARS of life
              (training only 2 days):
            </p>
          </div>

          {/* Video Player - Bunny.net VSL */}
          <div
            className="mx-auto mt-0 mb-0 vsl-container transition-all duration-700 ease-out"
            id="vsl-outer-container"
            style={
              isDesktop
                ? { width: showClickToUnmute ? '896px' : '90%', maxWidth: showClickToUnmute ? '896px' : '90%', marginLeft: 'auto', marginRight: 'auto' }
                : { width: '100%', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }
            }
          >
            <div className="relative vsl-border-wrapper">
              <div
                className={`absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.018984375),0_0_40px_rgba(255,255,255,0.0094921875),0_0_65px_rgba(255,255,255,0.0050625),0_0_120px_rgba(255,255,255,0.002),0_0_20px_rgba(148,9,9,0.0825),0_0_40px_rgba(148,9,9,0.04125),0_0_65px_rgba(148,9,9,0.022),0_0_120px_rgba(148,9,9,0.008)] pointer-events-none vsl-border-glow transition-opacity duration-300 ${showPauseOverlay ? 'opacity-0' : 'opacity-100'}`}
              ></div>
              {/* TODO: videoId="a6751ee5-c1d3-4006-9776-7d1a9ced040c" */}
              <VSLPlayer
                videoId="a6751ee5-c1d3-4006-9776-7d1a9ced040c"
                libraryId="505300"
                autoplay={true}
                muted={true}
                preload={true}
                controls={true}
                pauseOverlayContainer="hero-section"
                onUserStartedPlaying={() => {
                  console.log('🎬 Video started playing! Expanding container...');
                  setHasStartedVideo(true);
                  setShowClickToUnmute(false);
                }}
                onPauseOverlayChange={(isActive) => setShowPauseOverlay(isActive)}
                onShowClickToUnmuteChange={(showing) => {
                  console.log('📺 Click to unmute overlay showing:', showing);
                  setShowClickToUnmute(showing);
                }}
                onProgress={(progress) => {
                  // progress is the percentage (0-100)
                  setVideoProgress(progress.percentage || 0);
                  const currentTime = progress.currentTime || 0;
                  setVideoCurrentTime(currentTime); // Track actual time in seconds

                  // Check if passed 11:36 (696 seconds)
                  if (currentTime >= 696 && !passedJoinNowTime) {
                    console.log("🎯 Passed 11:36 mark! Switching to JOIN NOW");
                    setPassedJoinNowTime(true);
                  }
                }}
                onComplete={() => setVideoHasEnded(true)}
                passedJoinNowTime={passedJoinNowTime}
              />
            </div>
          </div>

          {/* Mobile portrait hint to turn for fullscreen */}
          {hasStartedVideo && (
            <div className="block sm:hidden text-center font-bold mt-3 px-4">
              <div
                className={`inline-block px-0 py-6 rounded-lg ${showPauseOverlay ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  background: "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 50%, transparent 70%)",
                }}
              >
                <p className="text-sm text-gray-000 whitespace-nowrap">
                  Turn to the side for fullscreen 📲
                </p>
              </div>
            </div>
          )}

          {/* Spacer div to maintain testimonial positioning */}
          <div className="h-5"></div>

          {/* CTA Button - positioned directly below VSL in dark section */}
          <div className="text-center relative my-5 cta-button-container">
            <style>{`
              @media (max-width: 640px) and (orientation: portrait) {
                .cta-btn-mob {
                  width: 181px !important;
                  padding-top: 12px !important;
                  padding-bottom: 12px !important;
                  padding-left: 24px !important;
                  padding-right: 24px !important;
                  font-size: 18px !important;
                }
                blockquote[data-testimonial="original-size"] {
                  font-size: 19px !important;
                  line-height: 1.2 !important;
                }
                .vsl-border-glow {
                  -webkit-mask-image: linear-gradient(to bottom,
                    rgba(0,0,0,1) 0%,
                    rgba(0,0,0,1) 55%,
                    rgba(0,0,0,0.7) 60%,
                    rgba(0,0,0,0.3) 65%,
                    rgba(0,0,0,0) 70%
                  );
                  mask-image: linear-gradient(to bottom,
                    rgba(0,0,0,1) 0%,
                    rgba(0,0,0,1) 55%,
                    rgba(0,0,0,0.7) 60%,
                    rgba(0,0,0,0.3) 65%,
                    rgba(0,0,0,0) 70%
                  );
                }
              }
              @media (max-width: 640px) and (orientation: landscape) {
                .cta-btn-mob {
                  width: 220px !important;
                  padding-top: 20px !important;
                  padding-bottom: 20px !important;
                  padding-left: 40px !important;
                  padding-right: 40px !important;
                  font-size: 20px !important;
                }
              }
              @media (max-height: 640px) and (orientation: landscape) {
                .cta-btn-mob {
                  width: 220px !important;
                  padding-top: 20px !important;
                  padding-bottom: 20px !important;
                  padding-left: 40px !important;
                  padding-right: 40px !important;
                  font-size: 20px !important;
                }
                .cta-button-container {
                  margin-top: 0px !important;
                }
                .mobile-eyebrow {
                  margin-top: 0px !important;
                  margin-bottom: 0px !important;
                  padding-left: 0px !important;
                  padding-right: 0px !important;
                }
                .mobile-headline {
                  margin-top: 0px !important;
                  margin-bottom: 0px !important;
                  padding-left: 0px !important;
                  padding-right: 0px !important;
                }
                .mobile-subheadline {
                  margin-top: 0px !important;
                  margin-bottom: 0px !important;
                  padding-left: 0px !important;
                  padding-right: 0px !important;
                }
                #hero-section {
                  padding-left: 0 !important;
                  padding-right: 0 !important;
                }
                #hero-section .container {
                  max-width: 100% !important;
                  padding-left: 0 !important;
                  padding-right: 0 !important;
                }
                #vsl-outer-container {
                  padding-left: 0 !important;
                  padding-right: 0 !important;
                }
                .vsl-border-glow {
                  -webkit-mask-image: linear-gradient(to bottom,
                    rgba(0,0,0,1) 0%,
                    rgba(0,0,0,1) 65%,
                    rgba(0,0,0,0.8) 70%,
                    rgba(0,0,0,0.5) 75%,
                    rgba(0,0,0,0.2) 80%,
                    rgba(0,0,0,0) 85%
                  );
                  mask-image: linear-gradient(to bottom,
                    rgba(0,0,0,1) 0%,
                    rgba(0,0,0,1) 65%,
                    rgba(0,0,0,0.8) 70%,
                    rgba(0,0,0,0.5) 75%,
                    rgba(0,0,0,0.2) 80%,
                    rgba(0,0,0,0) 85%
                  );
                }
              }
            `}</style>
            {passedJoinNowTime ? (
              <DelayedCTA
                delay={180000} // 3 minutes
                videoProgress={videoProgress}
                videoCurrentTime={videoCurrentTime}
                videoHasEnded={videoHasEnded}
                className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-8 px-8 sm:py-8 md:py-6 lg:mx-10 md:mx-6 lg:py-5 sm:px-12 text-xl sm:text-lg  md:text-xl lg:text-xl rounded-md inline-block relative z-[200] w-[320px] cta-btn-mob"
                href="/application"
              >
                JOIN NOW
              </DelayedCTA>
            ) : (
              <DelayedCTA
                delay={180000} // 3 minutes
                videoProgress={videoProgress}
                videoCurrentTime={videoCurrentTime}
                videoHasEnded={videoHasEnded}
                className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-5 lg:py-5 px-8 sm:py-4 sm:px-12 text-base sm:text-lg md:text-xl lg:text-xl rounded-md inline-block relative z-[200] w-[280px] sm:w-[280px] lg:w-[320px] cta-btn-mob cursor-pointer"
                href="#apply-for-elite-spots"
                onClick={(e: { preventDefault: () => void }) => {
                  e.preventDefault();
                  smoothScrollToElement("apply-for-elite-spots");
                }}
              >
                TELL ME MORE
              </DelayedCTA>
            )}
          </div>

          {/* Spacer div to maintain testimonial positioning */}
          <div className="h-8"></div>

          {/* Testimonial - Simple thin text at bottom of hero */}
          <div className="text-center mt-0 mb-0 max-w-4xl mx-auto">
            <div className="bg-transparent bg-opacity-10 p-0">
              <blockquote className="text-xl mx-4 text-white mb-0" data-testimonial="original-size">
                &ldquo;I&apos;m in the best shape I&apos;ve ever been,
                haven&apos;t touched booze in over a year and feel
                incredible.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 mt-6 rounded-full overflow-hidden">
                  <Image
                    src="/images/lewis-allan-avatar.png"
                    alt="Lewis Allan"
                    width={64}
                    height={64}
                    priority
                    className="w-full h-full object-cover"
                    unoptimized={true}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-lg font-bold mt-4 text-white">
                    Lewis Allan
                  </div>
                  <div className="text-sm mt-0 text-center">
                  <div className="font-normal mt-0 mb-2 text-gray-200">
                    Energy Sector
                  </div>
                  <div className="text-lg mt-0 text-center"></div>
                    ⭐️⭐️⭐️⭐️⭐️
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Does This Sound Like You?" - Problem Agitation (Black background) */}
      <div className="dark-section-with-grain">
        <DoesThisSoundLikeYou />
      </div>

      {/* 3. Personal Story Section with embedded Intro (White background) */}
      <PersonalStorySection />

      {/* INTRO SECTION INSERTED HERE */}
      <IntroSection />
      
      {/* 4. Core Value Proposition (White background) */}
      <CoreValueProposition />

      {/* 5. Video Testimonial CTA (Black background) */}
      <div className="dark-section-with-grain">
        <VideoTestimonialCTA />
      </div>

      {/* INTRO SECTION 2 INSERTED HERE */}
      <RootCauses />

      {/* 7. Results Proof (White background) */}
      <ResultsProof />

      {/* INTRO SECTION 2 INSERTED HERE */}
      <BigIdeaSection />


      {/* 13. More Client Testimonials (Dark background)  */}
      <div className="dark-section-with-grain">
        <MoreClientTestimonials />
      </div>

      {/* 6. Imagine This (Light background with white box) */}
      <ImagineThis />

      {/* 6.5. Client Transformation Gallery (Before/After photos) */}
      <ClientTransformationGallery />


      {/* 10. Introducing Limitless (Dark background) */}
      <IntroducingLimitless />

            {/* 9. More Video Testimonials (Black background) */}
            
        <MoreVideoTestimonials />



      {/* 11. What You'll Achieve (Dark with grain) */}
      <WhatYoullAchieve />

            {/* 10. Introducing Limitless (Dark background) 
            <div className="dark-section-with-grain">
        <IntroducingLimitless2 />
      </div> */}


      {/* NEW SECTIONS - Complete Sales Page */}


      {/* Testimonial 1 - 3 Testimonials Box */}
      <The3TestimonialsBoxV2 />      


      {/* How The Limitless Protocol Works (Dark background) */}
      <HowLimitlessProtocolWorks />

      {/* Everything Included (Dark with grain) - wrapper inline */}
      <WhatMakesThisDifferent />

      {/* Testimonial section before What Happens */}
      <TestimonialSectionDark />

      {/* What Happens If You Don't Fix This (White background) */}
      <WhatHappensIfYouDontFixThis />

      {/* Bonus Stack (Dark with grain) - wrapper inline */}
      <BonusStack />

      {/* Testimonial 2 (White background) */}
      <TestimonialsFinal number={2} />

      {/* Why I Only Work With A Small Number (White background) */}
      <WhySmallNumber />

      {/* We Can Help If / Can't Help If (Dark with grain) - wrapper inline */}
      <WhoThisIsFor />

      {/* Testimonial 3 (White background) */}
      <TestimonialsFinal number={3} />

      {/* What NOT Fixing This Is Costing You (White background) */}
      <WhatItsCostingYou />

      {/* FAQs */}
      <FinalFAQs />

            {/* Secure Your Spot (White background) */}
            <SecureYourSpot />

      {/* Testimonial 4 (White background) */}
      <TestimonialsFinal number={4} />

      {/* Testimonial 5 (White background) */}
      <TestimonialsFinal number={5} />

      {/* Testimonial 6 (White background) */}
      <TestimonialsFinal number={6} />

      {/* Testimonial 7 (White background) */}
      <TestimonialsFinal number={7} />

      {/* Testimonial 8 (White background) */}
      <TestimonialsFinal number={8} />

      {/* Testimonial 9 (White background) */}
      <TestimonialsFinal number={9} />

      {/* Testimonial 10 (White background) */}
      <TestimonialsFinal number={10} />

      {/* Testimonial 11 (White background) */}
      <TestimonialsFinal number={11} />

      {/* Testimonial 12 (White background) */}
      <TestimonialsFinal number={12} />


      {/* 8. Process Explanation (Black background) */}
      {/*
      <div className="dark-section-with-grain">
        <ProcessExplanation />
      </div>
      */}
      {/* 11. The 4-Step System (White background) */}
      {/*
      <FourStepSystem />
      */}




      {/* 14. Exclusivity & Personal Attention (Dark background) */}
      {/*
      <div className="dark-section-with-grain">
        <ExclusivityPersonalAttention />
      </div>
      */}

      {/* 15. FAQ Section (Dark background) */}
      {/*
      <div className="dark-section-with-grain">
        <FAQSection />
      </div>
      */}

      {/* 16. Urgency & Final CTA (White background) */}
      {/*
      <UrgencyFinalCTA />
      */}

      {/* 17. Wall of Client Testimonials (Dark background) */}
      {/*
      <div className="dark-section-with-grain">
        <WallClientTestimonials />
      </div>
      */}

      {/* Minimal Footer (Black) */}
      {/*
      <div className="dark-section-with-grain">
        <FooterSection />
      </div>
      */}

      {/* Sticky CTA that appears on significant scroll */}
      {/* <StickyCTA /> */}
    

      {/* Final CTA - White background with just button */}
      <section className="bg-white pt-0 pb-24">
        <div className="text-center">
          <a
            href="/application"
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-4 px-12 text-lg rounded-md inline-block relative z-30"
          >
            Apply Now
          </a>
        </div>
      </section>

    
    </main>
  );
}
