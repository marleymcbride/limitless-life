import React from 'react';
import {
  GammaParagraph,
  GammaMiniHeading,
  GammaOrderedList,
  GammaSectionHeading,
  GammaDivider,
} from '@/components/gamma-article';
import { COHORT_CONFIG } from '@/config/waitlist';
import BetaOpenCTA from './BetaOpenCTA';
import WaitlistInlineForm from '@/components/waitlist-inline-form';

export default function IntakeDocContent({ live = true }: { live?: boolean }) {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>

      {!live && (
        <div className="text-center mb-8">
          <button
            onClick={scrollToWaitlist}
            className="bg-[#940909] hover:bg-[#7b0707] text-white font-bold px-8 py-4 rounded-md text-lg transition-all cursor-pointer"
          >
            Join the waitlist
          </button>
        </div>
      )}

      <GammaParagraph className="-mr-2">
  <GammaMiniHeading className="-mb-4 pt-2">The mission is simple:</GammaMiniHeading> <br /> <div className="mb-0 pt-0 md:mb-8 md:pt-2 lg:mb-8 lg:pt-2"> Gain an <strong>extra 3 hours of unrelenting energy</strong> every day , training only 2 days per week (without relying on alcohol or stimulants to get by).</div>
</GammaParagraph>

      <GammaDivider />

      <GammaSectionHeading>
        WHERE YOU PROBABLY ARE RIGHT NOW
      </GammaSectionHeading>

      <GammaParagraph>
        On the surface everyone thinks you&apos;re doing well. Good career, decent life, successful by &quot;society&apos;s standards&quot;.
      </GammaParagraph>

      <GammaParagraph>
        But secretly? You feel pretty shit. You&apos;re tired. Stressed. Like you&apos;re just stuck in a low frequency state.
      </GammaParagraph>

      <GammaParagraph className="-mr-8">
        You have high expectations for EVERYTHING you do, but your body is a miserable representation of who you see yourself as...
        and deep down you KNOW you&apos;re <strong>wasting your potential</strong>.
      </GammaParagraph>

      <GammaDivider />

      <GammaSectionHeading>
        THE REAL ROOT CAUSE
      </GammaSectionHeading>

      <GammaParagraph>
        Before you can become Limitless you must fix the <b>root issues</b> caused by modern life.
      </GammaParagraph>
      <GammaParagraph className="">
        There are <strong>4 key areas</strong> you must solve:
      </GammaParagraph>
      <GammaOrderedList>
        <li className="-mb-1 pb-3">
          <strong>You&apos;ve Been Eating Wrong:</strong>
          <div className="mt-2">Restrictive diets like fasting and carnivore slow your metabolism. The way to fuelling energy and fat loss is to eat MORE.</div>
        </li>
        <li className="-mb-1 pb-3">
          <strong>You&apos;re Training Too Much:</strong>
          <div className="mt-2">Growth happens during recovery, not in the gym. A minimal approach of just 2 days a week is the best overall balance to fit around a high-value lifestyle.</div>
        </li>
        <li className="-mb-1 pb-3 -mr-2">
          <strong>You&apos;ve Tried Using &apos;Willpower&apos;:</strong>
          <div className="mt-2">You&apos;ve been told hard discipline and willpower is the way to success, but this is a straight path to long-term disaster.</div>
        </li>
        <li className="-mb-1 pb-2">
          <strong>You Can&apos;t Outwork A Broken System:</strong>
          <div className="mt-2">The real problems are within - such as gut damage and imbalanced hormones. Until you fix your system, your energy will stay throttled.</div>
        </li>
      </GammaOrderedList>

      <GammaDivider />

      <GammaSectionHeading>
        WHAT YOU ACTUALLY WANT
      </GammaSectionHeading>

      <GammaParagraph>
        Do you actually care about &quot;hitting the gym every night&quot; and boasting about your bench press?
      </GammaParagraph>
      <GammaParagraph>
        OR do you simply want to <strong>look and FEEL your best</strong> every day, with the LEAST time spent possible.. so you have energy for the things and people that matter most?
      </GammaParagraph>
      <GammaParagraph>
        When you realise this it becomes DICK-PUNCHINGLY obvious the dinosaur approaches of starving the body and training 4+ days will <b>NEVER</b> work.
      </GammaParagraph>
      <GammaParagraph>
        What you ACTUALLY want is to feel like THAT GUY. The guy who walks into a room with infectious energy. A presence. An aura.. for me there is NO better feeling as a man.
      </GammaParagraph>

      <GammaDivider />

      <div className="text-3xl mx-0 -ml-4 -mr-4 md:text-3xl lg:text-3xl font-bold mt-10 mb-6 text-gray-100 text-center leading-normal md:leading-snug lg:leading-snug" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
      HERE'S HOW WE DO IT
      </div>

      <GammaParagraph className="mt-0 mb-4">
        This system is my life's work i&apos;ve crafted over the past 12 years.. and completely contradicts EVERY other online guru.
      </GammaParagraph>

      <GammaMiniHeading className="">
        What makes this different?
      </GammaMiniHeading>

      <GammaOrderedList className="mt-6">
        <li>We spend 5 days RESTING, and only 2 days in the gym.</li>
        <li>You create an Energy Flywheel, not destroy your energy with starvation approaches.</li>
        <li>There is no &apos;cookie-cutter fitness regime&apos;, we create a LIFESTYLE.</li>
      </GammaOrderedList>

      <GammaParagraph className="-mb-12">
        This same system has worked for guys in banking, entrepreneurship, finance, petroleum, pretty much every high level career you can think of..
      </GammaParagraph>

      <GammaParagraph className="mb-0 mr-4 pb-0 md:-pb-0 lg:-pb-0 md:-mb-0 lg:-mb-0 lg:pb-0 md:pt-3 lg:pt-3">
        <GammaMiniHeading className="text-3xl">Real-world results this system has achieved:</GammaMiniHeading>
      </GammaParagraph>

      <GammaParagraph>
        Lewis often works 80 hours as an engineer. He went from 85kg to 68kg over 4 months and hasn&apos;t touched alcohol in 2 years now.
      </GammaParagraph>

      <GammaParagraph className="-mt-2 pb-0 md:-mt-4 md:-mb-4 md:pb-- lg:-mt-2 lg:-mb-2 lg:pb-0">
        Aaron was a stressed-out business exec, he said a month in: <em>&quot;I&apos;ve never had this much natural energy in my life.&quot;</em>
      </GammaParagraph>

      <GammaParagraph className="-mt-2 pb-4">
        As for me.. I&apos;m coming up 4 years sober now, training twice a week, and feeling like a different human. Life is sweet.
      </GammaParagraph>

      <GammaDivider />

      <GammaSectionHeading>
        THE PLAN
      </GammaSectionHeading>

      <GammaParagraph className="-mb-1 pb-0">
        We&apos;ll implement the <strong>Limitless Protocol</strong> in three phases:
      </GammaParagraph>

      <GammaParagraph className="pt-0 md:pt-2 lg:pt-2 -mb-5 md:-mb-0 lg:-mb-0 pb-8 md:pb-0 lg:pb-0 -mr-4 md:-mr-0 lg:-mr-0">
        <strong>Phase 1: The Foundations (Wk 1-4)</strong>
      </GammaParagraph>

      <GammaParagraph className="-mt-12 md:mt-4 lg:-mt-4">
        Every man's situation is different, so we run <strong>The Lifestyle X-Ray</strong> to identify your single biggest constraint. From here, you get your custom <strong>2-Day Build System</strong> and <strong>Metabolic Priming</strong> gameplan, so you can eat more while burning fat, see your gut flattening, and sleep improving.
      </GammaParagraph>

      <GammaParagraph className="pt-2 -mb-5 pb-8 -mr-4 md:-mb-0 md:pb-0 md:-mr-0 lg:-mb-0 lg:pb-0 lg:-mr-0">
        <strong>Phase 2: Energy (Wk 5-8)</strong>
      </GammaParagraph>

      <GammaParagraph className="-mt-12 md:mt-4 lg:-mt-4">
        Now we shift focus to your lifestyle. We bring in <strong>Circadian Re-alignment</strong> and <strong>Metabolic Priming Protocol</strong>, to heal your body and rebuild your natural energy. Your energy is rising every day, visible muscle is developing, and less stress means you stop feeling the tie to booze.
      </GammaParagraph>

      <GammaParagraph className="pt-2 -mb-5 pb-8 -mr-4 md:-mb-0 md:pb-0 md:-mr-0 lg:-mb-0 lg:pb-0 lg:-mr-0">
        <strong>Phase 3: Limitless (Wk 9-12)</strong>
      </GammaParagraph>

      <GammaParagraph className="-mt-12 md:mt-4 lg:-mt-4">
        Finally, with Cortisol Re-calibration fully embedded, you reach REAL energy without caffeine, alcohol or supplements. Drive. Aura. The spark you&apos;ve been watching other men have and wondering why you don&apos;t.
      </GammaParagraph>

      <GammaDivider />

      <GammaSectionHeading>
        IS THIS FOR YOU?
      </GammaSectionHeading>

      <GammaParagraph>
        <strong>NO:</strong> This is NOT for you if you&apos;re happy drifting through life and dying as another average guy.
      </GammaParagraph>
      <GammaParagraph className="-mt-4">
        If you're happy with an average body, average standards and never reaching your full potential.. this system is NOT for you.
      </GammaParagraph>
      <GammaParagraph>
        <strong>YES:</strong> This IS for you if you want greatness in EVERY aspect of life.
      </GammaParagraph>
      <GammaParagraph className="-mt-4">
        You're a non-normal person but stuck with an average physique, life & energy. You've been given gifts, all this talent.. but you KNOW you should be so much more.
      </GammaParagraph>
      <GammaParagraph className="-mt-4">
        ...you just need the right system to unlock it.
      </GammaParagraph>

      <GammaDivider />

      <GammaSectionHeading>
        THE BETA COHORT
      </GammaSectionHeading>

      <GammaParagraph>
        Doors are currently <strong>OPEN</strong> for The Lifestyle Athelete beta cohort. We'll be kicking off {COHORT_CONFIG.DATE}. There are just <strong>10 spots available</strong>.
      </GammaParagraph>

      <GammaParagraph>
        Once spots are filled, doors will be closed til the next cohort.
      </GammaParagraph>

      <GammaDivider />

      <GammaSectionHeading>
        INVESTMENT
      </GammaSectionHeading>

      <GammaParagraph>
       This is a premium experience which will be sold at £3,997.
      </GammaParagraph>

      <GammaParagraph>
      But enrollment for this first round of beta testers <strong>is just £997.</strong>
      </GammaParagraph>

      <GammaParagraph>
      That&apos;s a £3,000 discount if you join today.
      </GammaParagraph>
      
      <GammaParagraph>
      I want to make this the best experience on the market, so i'm ok letting in a few selected people for an asolute steal to make this an even better product in the future.
      </GammaParagraph>


      <GammaSectionHeading>
        NEXT STEPS
      </GammaSectionHeading>

      {live ? (
        <GammaOrderedList>
          <p >
          <li className="">
            <BetaOpenCTA/>
            </li>
          </p>
          <li>Your place will be confirmed.</li>
          <li>We&apos;ll get you welcomed inside The Lifestyle Athlete squad.</li>
        </GammaOrderedList>
      ) : (
        <div id="waitlist-form" className="space-y-4">
          <div className="text-gray-300 lg:text-xl pb-4 text-center underline">
            **The programme is currently closed for new applicants. Join the waitlist below
            and you&apos;ll be first in line when doors re-open.**
          </div>
          <WaitlistInlineForm source="beta-offer-doc" />
        </div>
      )}

    </>
  );
}
