"use client";

import { ImagePreloader, CRITICAL_TESTIMONIAL_IMAGES } from "@/components/image-preloader";
import VSLPlayer from "@/components/vsl-player";
import WaitlistEmailPopup from "@/components/waitlist-email-popup";
import WaitlistModal from "@/components/waitlist-modal";
import WaitlistBanner from "@/components/waitlist-banner";
import BetaOpportunity from "@/components/beta-opportunity";
import BetaPricing from "@/components/beta-pricing";
import BetaValueStack from "@/components/beta-value-stack";
import BetaFAQs from "@/components/FAQs-Beta-access";
import { PageProvider } from '@/contexts/PageContext';
import { COHORT_CONFIG } from '@/config/waitlist';
import {
  LazyDoesThisSoundLikeYou,
  LazyPersonalStorySection,
  LazyIntroSection,
  LazyCoreValueProposition,
  LazyVideoTestimonialCTA,
  LazyVideoTestimonialLaurenceShortVersion,
  LazyResultsProof,
  LazyImagineThis,
  LazyClientTransformationGallery,
  LazyMoreVideoTestimonials,
  LazyBigIdeaSection,
  LazyIntroducingLimitless,
  LazyWhatYoullAchieve,
  LazyMoreClientTestimonials,
  LazyHowLimitlessProtocolWorks,
  LazyWhatHappensIfYouDontFixThis,
  LazyWhatMakesThisDifferent,
  LazyBonusStack,
  LazyWhySmallNumber,
  LazyWhatItsCostingYou,
  LazyWhoThisIsFor,
  LazySecureYourSpot,
  LazyFinalFAQs,
  LazyTestimonialsFinal,
  LazyThe3TestimonialsBoxV2,
  LazyTestimonialSectionDark,
  LazyRootCauses,
  LazyDelayedCTA,
  LazySenjaTestimonials1,
} from '@/components/lazy/LazySections';
import { vignetteEffect, betaUnifiedGradientWithSpotlightDesktop, betaUnifiedGradientWithSpotlightMobile } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "@/hooks/useSession";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useRouter } from "next/navigation";
import Script from "next/script";

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
  const router = useRouter();
  // Session and analytics hooks
  const { session } = useSession();
  useScrollTracking({
    sessionId: session?.sessionId || '',
    userId: session?.userId,
    enabled: !!session?.sessionId,
  });

  // Beta Email popup state
  const [showBetaPopup, setShowBetaPopup] = useState(false);

  // Waitlist modal state
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const [hasStartedVideo, setHasStartedVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0); // Track actual time in seconds
  const [videoHasEnded, setVideoHasEnded] = useState(false);
  const [passedJoinNowTime, setPassedJoinNowTime] = useState(false); // Track if passed 11:36
  const [showPauseOverlay, setShowPauseOverlay] = useState(false); // Track if pause overlay is active
  const [showClickToUnmute, setShowClickToUnmute] = useState(true); // Track if "Click to unmute" popup is showing
  const [isDesktop, setIsDesktop] = useState(false); // Track if desktop for VSL sizing

  // Handle Apply Now button click
  const handleApplyNowClick = (e: React.MouseEvent) => {
    console.log('[BetaApplyNow] Clicked!');
    e.preventDefault();
    setShowBetaPopup(true);
    console.log('[BetaApplyNow] showBetaPopup set to true');
  };

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
    <PageProvider pageType="waitlist">
      <main className="flex flex-col min-h-screen">
        {/* Limited Spots Banner */}
        <WaitlistBanner />

      {/* Preload critical testimonial images */}
      <ImagePreloader images={CRITICAL_TESTIMONIAL_IMAGES} />
      {/* 1. Hero Section (UNTOUCHED - PRESERVED EXACTLY) */}
      <section
        id="beta-hero-section"
        className={`pt-2 md:pt-6 pb-16 px-16min-h-[100vh] sm:pb-16 flex flex-col relative w-full overflow-hidden bg-black`}
      >
        <div className="hidden md:block">{betaUnifiedGradientWithSpotlightDesktop}</div>
        <div className="block md:hidden">{betaUnifiedGradientWithSpotlightMobile}</div>
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
            <div className="hidden sm:flex flex-col items-center justify-center mb-6 mt-1 max-w-2xl mx-auto">
              <div className="font-['-apple-system'] uppercase font-bold text-2xl md:text-3xl lg:text-3xl text-center text-white py-2 my-2">
              <span className="no-underline"></span><span className="">The Lifestyle Athlete</span><span className="no-underline"> 90-Day Reset</span>
              </div>
              <p className="font-['-apple-system'] font-semibold text-lg md:text-xl lg:text-2xl text-center text-gray-200 mb-2">
              Starting {COHORT_CONFIG.DATE}, 2026
              </p>
            </div>

            {/* Mobile Eyebrow (visible only on mobile) */}
            <div className="flex rounded-lg sm:hidden flex-col items-center justify-center mb-2 mt-3 w-full px-6 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, rgba(71, 14, 14, 0.15) 0%, rgba(71, 14, 14, 0.12) 33%, rgba(71, 14, 14, 0.08) 66%, transparent 100%)' }}>
              <div className="font-['-apple-system'] font-bold text-2xl md:text-2xl text-center -ml-4 -mr-3  text-gray-100 mb-3">
                Limitless 90-Day Energy Reset
              </div>
              <div className="font-['-apple-system'] mb-4 pb-2 text-1.5xl md:text-lg text-center text-gray-200">
                Beginning {COHORT_CONFIG.DATE}, 2026
              </div>
            </div>

            {/* Mobile Headlines (visible only on mobile) */}
            <h1
              className="mobile-headline block px-1 mx-auto mt-4 mb-6 w-full font-bold text-center text-white sm:hidden capitalize -ml-0 -mr-0 text-[2.7rem] px-5"
              style={{ lineHeight: "1.125" }}
            >
              Become the most energetic man In Every Room
            </h1>
            <div className="md:hidden lg:hidden block text-white text-center mb-0 mt-0 sm:mt-0 max-w-full mx-auto px-0 pb-8">
            <div
              className="md:hidden lg:hidden font-['-apple-system'] font-bold block text-2xl md:text-4xl  lg:text-4.5xl text-white text-center mb-0 mt-0 capitalize tracking-normal leading-[1]"
            >
            (training just 2 days a week)
            </div>
            </div>

            {/* Mobile Subheadline - RIGHT AFTER HEADLINE (visible only on mobile) */}
            <p
              className="mobile-subheadline block mx-auto mb-4 font-light text-center text-gray-300 sm:hidden px-0 text-[1.33rem] leading-[1.28] w-[95%]"
            >
             A 90-day reset to lose the gut and stop feeling tired using The Lifestyle Athlete™ protocol so you can be full of life without alcohol or stimulants and become the man your family deserves.
            </p>

            {/* Spacer div to push headline down */}
            <div className="hidden h-4"></div>

            {/* Desktop Headlines (hidden on mobile) */}

            <div className="px-16">
            <div className="hidden sm:block text-white text-center mb-0 mt-0 sm:mt-0 max-w-full mx-auto px-0">
            <h1
              className="hidden font-['-apple-system'] font-bold sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-5xl text-white text-center mb-0 mt-0 sm:mt-0 capitalize tracking-normal leading-[0]"
            >
            Become the most energetic man In Every Room
            </h1>
            <div className="hidden sm:block text-white text-center mb-0 mt-0 sm:mt-0 max-w-full mx-auto px-0">
            <h1
              className="hidden font-['-apple-system'] font-bold sm:block text-5xl sm:text-5xl md:text-4xl  lg:text-4.5xl text-white text-center mb-0 mt-0 sm:mt-0 capitalize tracking-normal leading-[1]"
            >
            (training just 2 days a week)
            </h1>
            </div>
            </div>
            </div>

            {/* Spacer div to push subtitle down */}
            <div className="h-4"></div>

            {/* Desktop Subheadline (hidden on mobile) */}
            <div className="px-12">
            <p
              className="hidden mb-4 py-4 text-xl text-center text-gray-300 sm:block sm:text-xl md:text-lg lg:text-2xl max-w-full"
              >
              A 90-day reset to lose your gut, get off alcohol and stop feeling tired using The Lifestyle Athlete™ protocol so you become the man your family deserves:
            </p>
            </div>
          </div>

          {/* Video Player - Bunny.net VSL */}
          <div
            className="mx-auto mt-0 mb-0"
            id="vsl-outer-container-beta"
            style={
              isDesktop
                ? { width: '640px', maxWidth: '90%', marginLeft: 'auto', marginRight: 'auto' }
                : { width: '100%', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }
            }
          >
            <div className="relative">
              {/* TODO: videoId="a6751ee5-c1d3-4006-9776-7d1a9ced040c" */}
              <VSLPlayer
                videoId="a6751ee5-c1d3-4006-9776-7d1a9ced040c"
                libraryId="505300"
                autoplay={true}
                muted={true}
                preload={true}
                controls={true}
                pauseOverlayContainer="beta-hero-section"
                className="vsl-compact-beta"
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
                onApplyNowClick={handleApplyNowClick}
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
              /* Beta-specific inline styles now handled by globals.css -beta classes */

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
              <div className="mt-4 mb-6">

              <p className="font-['-apple-system'] font-normal text-lg md:text-xl lg:text-xl text-center text-gray-50 mb-8">

              </p>
              </div>
            {passedJoinNowTime ? (
              <LazyDelayedCTA
                delay={180000} // 3 minutes
                videoProgress={videoProgress}
                videoCurrentTime={videoCurrentTime}
                videoHasEnded={videoHasEnded}
                className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-8 px-8 sm:py-8 md:py-6 lg:mx-10 md:mx-6 lg:py-5 sm:px-12 text-xl sm:text-lg  md:text-xl lg:text-xl rounded-md inline-block relative z-[200] w-[320px] cta-btn-mob"
                href="/application"
                onApplyNowClick={handleApplyNowClick}
              >
                JOIN NOW
              </LazyDelayedCTA>
            ) : (
              <LazyDelayedCTA
                delay={180000} // 3 minutes
                videoProgress={videoProgress}
                videoCurrentTime={videoCurrentTime}
                videoHasEnded={videoHasEnded}
                className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-5 lg:py-5 px-8 sm:py-4 sm:px-12 text-base sm:text-lg md:text-xl lg:text-xl rounded-md inline-block relative z-[200] w-[280px] sm:w-[280px] lg:w-[320px] cta-btn-mob cursor-pointer"
                href="#apply-for-elite-spots"
                onApplyNowClick={handleApplyNowClick}
              >
                TELL ME MORE
              </LazyDelayedCTA>
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
        <LazyDoesThisSoundLikeYou onApplyNowClick={handleApplyNowClick} />
      </div>

      {/* 3. Personal Story Section with embedded Intro (White background) */}
      <LazyPersonalStorySection onApplyNowClick={handleApplyNowClick} />

      {/* Senja Testimonials 1 - Results Created */}
      <LazySenjaTestimonials1 onApplyNowClick={handleApplyNowClick} />

      {/* INTRO SECTION INSERTED HERE */}
      <LazyIntroSection onApplyNowClick={handleApplyNowClick} />
      
      {/* 4. Core Value Proposition (White background) */}
      <LazyCoreValueProposition onApplyNowClick={handleApplyNowClick} />

      {/* 5. Video Testimonial CTA (Black background) */}
      <div className="dark-section-with-grain">
        <LazyVideoTestimonialCTA onApplyNowClick={handleApplyNowClick} />
      </div>

      {/* INTRO SECTION 2 INSERTED HERE */}
      <LazyRootCauses onApplyNowClick={handleApplyNowClick} />

      {/* 7. Results Proof (White background) */}
      <LazyResultsProof onApplyNowClick={handleApplyNowClick} />

      {/* INTRO SECTION 2 INSERTED HERE */}
      <LazyBigIdeaSection onApplyNowClick={handleApplyNowClick} />

      {/* Laurence Short Version Video Testimonial */}
      <div className="dark-section-with-grain">
        <LazyVideoTestimonialLaurenceShortVersion onApplyNowClick={handleApplyNowClick} />
      </div>


      {/* 6. Imagine This (Light background with white box) */}
      <LazyImagineThis onApplyNowClick={handleApplyNowClick} />

      {/* 13. More Client Testimonials (Dark background)  */}
      <div className="dark-section-with-grain">
        <LazyMoreClientTestimonials onApplyNowClick={handleApplyNowClick} />
      </div>

      {/* 6.5. Client Transformation Gallery (Before/After photos)
      <LazyClientTransformationGallery /> */}


      {/* 10. Introducing Limitless (Dark background) */}
      <LazyIntroducingLimitless onApplyNowClick={handleApplyNowClick} />

      {/* 6.5. More Results Created (Before/After transformations) */}
      <LazyClientTransformationGallery onApplyNowClick={handleApplyNowClick} />

      {/* 11. What You'll Achieve (Dark with grain) */}
      <LazyWhatYoullAchieve onApplyNowClick={handleApplyNowClick} />

            {/* 10. Introducing Limitless (Dark background) 
            <div className="dark-section-with-grain">
        <IntroducingLimitless2 />
      </div> */}


      {/* NEW SECTIONS - Complete Sales Page */}


      {/* Testimonial 1 - 3 Testimonials Box */}
      <LazyThe3TestimonialsBoxV2 onApplyNowClick={handleApplyNowClick} />


      {/* How The Limitless Protocol Works (Dark background) */}
      <LazyHowLimitlessProtocolWorks onApplyNowClick={handleApplyNowClick} />

      {/* 9. More Video Testimonials (Black background)*/}
      <LazyMoreVideoTestimonials onApplyNowClick={handleApplyNowClick} />

      {/* Everything Included (Dark with grain) - wrapper inline */}
      <LazyWhatMakesThisDifferent onApplyNowClick={handleApplyNowClick} />

      {/* Testimonial section before What Happens */}
      <LazyTestimonialSectionDark onApplyNowClick={handleApplyNowClick} />

      {/* What Happens If You Don't Fix This (White background) */}
      <LazyWhatHappensIfYouDontFixThis onApplyNowClick={handleApplyNowClick} />

      {/* Bonus Stack (Dark with grain) - wrapper inline */}
      <LazyBonusStack onApplyNowClick={handleApplyNowClick} />

      {/* Testimonial 2 (White background) */}
      <LazyTestimonialsFinal onApplyNowClick={handleApplyNowClick} number={2} />

      {/* Why I Only Work With A Small Number (White background) */}
      <LazyWhySmallNumber onApplyNowClick={handleApplyNowClick} />

      {/* We Can Help If / Can't Help If (Dark with grain) - wrapper inline */}
      <LazyWhoThisIsFor onApplyNowClick={handleApplyNowClick} />

      {/* Testimonial 3 (White background) */}
      <LazyTestimonialsFinal onApplyNowClick={handleApplyNowClick} number={3} />

      {/* What NOT Fixing This Is Costing You (White background) */}
      <LazyWhatItsCostingYou onApplyNowClick={handleApplyNowClick} />

      {/* Beta FAQs */}
      <div className="bg-white">
        <BetaFAQs />
      </div>

            {/* Beta Opportunity Section */}
            <div className="bg-white">
              <BetaOpportunity ctaText="Join Now" />
            </div>

            {/* Beta Pricing Section */}
            <div className="dark-section-with-grain">
              <BetaPricing ctaText="Join Now" />
            </div>

            {/* Beta Value Stack Section */}
            <div className="bg-white">
              <BetaValueStack ctaText="Join Now" />
            </div>

      {/* Testimonial 4 (White background) */}
      <LazyTestimonialsFinal onApplyNowClick={handleApplyNowClick} number={4} />

      {/* Testimonial 5 (White background) */}
      <LazyTestimonialsFinal onApplyNowClick={handleApplyNowClick} number={5} />

      {/* Testimonial 6 (White background) */}
      <LazyTestimonialsFinal onApplyNowClick={handleApplyNowClick} number={6} />

      {/* Testimonial 7 (White background) */}
      <LazyTestimonialsFinal onApplyNowClick={handleApplyNowClick} number={7} />

      {/* Testimonial 8 (White background) */}
      <LazyTestimonialsFinal onApplyNowClick={handleApplyNowClick} number={8} />

      {/* Testimonial 9 (White background) */}
      <LazyTestimonialsFinal onApplyNowClick={handleApplyNowClick} number={9} />

      {/* Testimonial 10 (White background) */}
      <LazyTestimonialsFinal onApplyNowClick={handleApplyNowClick} number={10} />

      {/* Testimonial 11 (White background) */}
      <LazyTestimonialsFinal onApplyNowClick={handleApplyNowClick} number={11} />

      {/* Testimonial 12 (White background) */}
      <LazyTestimonialsFinal onApplyNowClick={handleApplyNowClick} number={12} />

      {/* Senja Testimonials Embed */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="senja-embed"
            data-id="f8eb0d9c-a489-4ea7-bf96-c89dd2a7c22f"
            data-mode="shadow"
            data-lazyload="false"
            style={{ display: 'block', width: '100%' }}
          ></div>
        </div>
      </section>

      {/* Senja Widget Script */}
      <Script
        src="https://widget.senja.io/widget/f8eb0d9c-a489-4ea7-bf96-c89dd2a7c22f/platform.js"
        strategy="afterInteractive"
        async
      />


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
          <button
            onClick={handleApplyNowClick}
            className="font-bold !text-white transition-none duration-0 focus:outline-none bg-[#940909] hover:bg-[#7b0707] py-4 px-12 text-lg rounded-md inline-block relative z-30"
          >
            Join Now
          </button>
        </div>
      </section>

      {/* Waitlist Email Popup */}
      <WaitlistEmailPopup
        isOpen={showBetaPopup}
        tier="undecided"
        tierName="Limitless Protocol Beta"
        onClose={() => setShowBetaPopup(false)}
      />

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
      />

      </main>
    </PageProvider>
  );
}
