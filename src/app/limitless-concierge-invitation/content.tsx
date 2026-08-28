import React from 'react';
import Link from 'next/link';
import {
  GammaParagraph,
  GammaMiniHeading,
  GammaOrderedList,
  GammaDivider,
} from '@/components/gamma-article';
import WaitlistInlineForm from '@/components/waitlist-inline-form';

export default function IntakeDocContent({ name = '', email = '', live = true }: { name?: string; email?: string; live?: boolean }) {
  return (


<div className="">
  <div className="-mb-4 md:-mb-4 lg:-mb-4 pt-2 font-bold text-2xl md:text-2.5xl lg:text-2.5xl">So let&apos;s get something clear...</div> <br /> 
  <div className="font-normal text-xl md:text-xl mt-4 mb-4">You wasn't born to be average. You&apos;re here to be <strong>EXCEPTIONAL</strong>.</div>
  <GammaParagraph>
        In EVERY guy&apos;s life there&apos;s a point where they decided a path to take:
  </GammaParagraph>
  <div className="font-normal text-xl md:text-xl mt-4 mb-4"><strong>Path A</strong>: You took life by the balls,  and became EVERYTHING you wanted to be.</div>
  <div className="font-normal text-xl md:text-xl mt-4 mb-4">or <strong>Path B</strong>: You did &apos;alright for yourself&apos;, had a decent life.. but deep down you know you could&apos;ve been WAY MORE.</div>
  <GammaParagraph>Be honest.. which path sounds more like YOUR life at this moment? </GammaParagraph>
  {/* <div className="mb-0 pt-0 md:mb-8 md:pt-2 lg:mb-8 lg:pt-2"> Over the next few months you&apos;ll gain an <strong>extra 3 hours of unrelenting energy</strong> every day, training only <strong>2 days</strong> per week.. (and no longer need alcohol or stimulants to get by).</div> */}

      <GammaDivider />

      <div className="text-3xl mx-0 -ml-4 -mr-4 md:text-3xl lg:text-3xl font-bold mt-10 md:mt-10 lg:mt-10 mb-6 text-gray-100 text-center leading-normal md:leading-snug lg:leading-snug" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
        WHERE YOU PROBABLY ARE RIGHT NOW
      </div>

      <GammaParagraph>
        I know exactly what it feels like to be where you are.
      </GammaParagraph>

      <GammaParagraph>
        On the surface everyone thinks you&apos;re doing well. Good career, decent life, successful by "society&apos;s standards".
      </GammaParagraph>

      <GammaParagraph>
        But secretly? You feel pretty shit. You&apos;re tired. Stressed. Like you&apos;re just stuck in a low frequency state.
      </GammaParagraph>

      <GammaParagraph>
        And despite watching what you eat, trying different diets, even getting caught up in the &quot;scam land&quot; of supplements & stimulants.. nothing seems to fix your body and energy.
      </GammaParagraph>

      <GammaParagraph className="-mr-8">
        You have high expectations for EVERYTHING you do, but your body is a miserable representation of who you see yourself as...
        and deep down you KNOW you&apos;re <strong>wasting your potential</strong>.
      </GammaParagraph>

      <GammaDivider />

      <div className="text-3xl mx-0 -ml-4 -mr-4 md:text-3xl lg:text-3xl font-bold mt-10 mb-6 text-gray-100 text-center leading-normal md:leading-snug lg:leading-snug" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
        HERE&apos;S WHY NOTHING&apos;S WORKED...
      </div>

      <GammaParagraph>
        You&apos;ve probably spent YEARS trying all these outdated "diets" and tactics the online "gurus" sold you.. but the truth is you need to <strong>HEAL your body</strong> from within.
      </GammaParagraph>

      <GammaParagraph>
      Before you can become Limitless you must fix the <b>root issues</b> caused by modern life.
      
      <div className="pt-8 pb-2 text-center text-2xl">
      There are <strong>4 key areas</strong> you must solve:
      </div>
      
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
          <div className="mt-2">The real problems are within - such as gut damage and imbalanced hormones. Until you fix your systemm, your energy will stay throttled.</div>
        </li>
      </GammaOrderedList>

      <GammaDivider />

      <div className="text-3xl mx-0 -ml-4 -mr-4 md:text-3xl lg:text-3xl font-bold mt-10 mb-6 text-gray-100 text-center leading-normal md:leading-snug lg:leading-snug" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
        WHAT YOU ACTUALLY WANT
      </div>

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
      What you ACTUALLY want is to feel like to feel like THAT GUY. The guy who walks into a room with infectious energy. A presence. An aura.. for me there is NO better feeling as a man.
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

      {/*
      <GammaMiniHeading className="mb-6">
        Why I do this
      </GammaMiniHeading>

      <GammaParagraph className="-mb-0 pb-0 md:-mb-2 md:pb-0 md:mt-6 lg:pb-0 lg:-mb-2 lg:mt-6">
       I got OBSESSED with human potential... and understanding why certain guys can build a better body, radiate an infectious energy and operate at a higher frequency than most.
      </GammaParagraph>

      <GammaParagraph className="-mb-0 pb-0 md:-mb-2 md:pb-0 md:mt-6 lg:pb-0 lg:-mb-2 lg:mt-6">
       But the situation is:
      </GammaParagraph>

      <GammaOrderedList className="-mt-4 md:-mt-0 lg:-mt-0">
        <li>Millions (if not billions) of men are secretly suffering.</li>
        <li>The doctors and &quot;professionals&quot; have no clue about male life in 2026.</li>
        <li>All the typical methods are completely broken.</li>
      </GammaOrderedList>

      <GammaParagraph className="mt-4 md:pt-2 lg:pt-2 pb-0 md:pb-2 lg:pb-2">
        I created this system out of NEED.. because there was nothing designed for men who <strong>actually HAVE a life</strong>, and don&apos;t want to spend their days eating broccoli and <strong>frying themselves</strong> in the gym every night.
      </GammaParagraph>

      <GammaParagraph className="-mb-0 pb-0 md:-mb-4 md:pb-0 md:pb-0 lg:pb-0 lg:-mb-6">
        This is my mission- to help as many guys get away from these outdated methods and become the man they KNOW they should be.
      </GammaParagraph>
      */}

      <GammaParagraph className="-mb-12">
        This same system has worked for guys in banking, entrepreneurship, finance, petroleum, pretty much every high level career you can think of..
      </GammaParagraph>

      <GammaParagraph className="mb-0 mr-4 pb-0 md:-pb-0 lg:-pb-0 md:-mb-0 lg:-mb-0 lg:pb-0 md:pt-0 lg:pt-3">
        <GammaMiniHeading className="text-2xl md:text-2.5xl lg:text-2.5xl">Real-world results this system has achieved:</GammaMiniHeading>
      </GammaParagraph>

      <GammaParagraph className="pb-2">
        Lewis often works 80 hours as an engineer. He went from 85kg to 68kg over 4 months and hasn&apos;t touched alcohol in 2 years now.
      </GammaParagraph>

      <GammaParagraph className="-mt-2 pb-0 md:-mt-4 md:-mb-4 md:pb-- lg:-mt-4 lg:-mb-4 lg:pb-0">
        Aaron was a stressed-out business exec, he said a month in: <em>&quot;I&apos;ve never had this much natural energy in my life.&quot;</em>
      </GammaParagraph>

      <GammaParagraph className="-mt-2 pb-4">
        As for me.. I&apos;m 4 years sober, training twice a week, feeling like a different human.
      </GammaParagraph>

      <GammaDivider />

      <div className="text-3xl mx-0 -ml-4 -mr-4 md:text-3xl lg:text-3xl font-bold mt-10 mb-6 text-gray-100 text-center leading-normal md:leading-snug lg:leading-snug" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
        THE PLAN
      </div>

      <GammaParagraph className="-mb-1 pb-0">
        We&apos;ll implement the <strong>Limitless Protocol</strong> in three phases:
      </GammaParagraph>

      <GammaParagraph className="pt-0 md:pt-2 lg:pt-2 -mb-5 md:-mb-0 lg:-mb-0 pb-8 md:pb-0 lg:pb-0 -mr-4 md:-mr-0 lg:-mr-0">
        <strong>Phase 1: The Foundations (Wk 1-4)</strong>
      </GammaParagraph>

      <GammaParagraph className="-mt-12 md:mt-4 lg:-mt-4 md:-mr-12 lg:-mr-12">
        Every man's situation is different so we run <strong>The Lifestyle X-Ray</strong> to identify your biggest constraint. From here you get your custom <strong>2-Day Build System</strong> and <strong>Circadian Re-alignment</strong> gameplan so <br />you can eat more while burning fat, see your gut flattening and  more energy coming in.
      </GammaParagraph>

      <GammaParagraph className="pt-2 -mb-5 pb-8 -mr-4 md:-mb-0 md:pb-0 md:-mr-0 lg:-mb-0 lg:pb-0 lg:-mr-0">
        <strong>Phase 2: Energy (Wk 5-8)</strong>
      </GammaParagraph>

      <GammaParagraph className="-mt-12 md:mt-4 lg:-mt-4">
        Now we shift focus to your lifestyle. We use Metabolic Priming to heal your body and rebuild your natural energy. You'll sleep deeper, sex drive and motivation returns, and your jawline starts coming through.
      </GammaParagraph>

      <GammaParagraph className="pt-2 -mb-5 pb-8 -mr-4 md:-mb-0 md:pb-0 md:-mr-0 lg:-mb-0 lg:pb-0 lg:-mr-0">
        <strong>Phase 3: Limitless (Wk 9-12)</strong>
      </GammaParagraph>

      <GammaParagraph className="-mt-12 md:mt-4 lg:-mt-4">
      Then we lock in your Cortisol Re-calibration. Here you'll reach a place of complete energy & flow, free from needing alcohol or supplements to feel good, and built your body to a point where you're literally looking for excuses to take your top off.
      </GammaParagraph>

      <GammaDivider />

      <div className="text-3xl mx-0 -ml-4 -mr-4 md:text-3xl lg:text-3xl font-bold mt-10 mb-6 text-gray-100 text-center leading-normal md:leading-snug lg:leading-snug" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
        IS THIS FOR YOU?
      </div>

      <GammaParagraph>
        <strong>NO:</strong> This is NOT for you if you&apos;re happy drifting through life and dying as another average guy.
      </GammaParagraph>

      <GammaParagraph className='-mt-4'>
        If you're happy with an average body, average standards and never reaching your full potential.. this system is NOT for you.
      </GammaParagraph>

      <GammaParagraph>
      <strong>YES:</strong> This IS for you if you want greatness in EVERY aspect of life.
      </GammaParagraph>


      <GammaParagraph className='-mt-4'>
      You're a non-normal person but stuck with an average physique, life & energy. You've been given gifts, all this talent.. but you KNOW you should be so much more..
      </GammaParagraph>


      <GammaParagraph className='-mt-4'>
      ...you just need the right system to unlock it.
      </GammaParagraph>


      <GammaDivider />

      <div className="text-3xl mx-0 -ml-4 -mr-4 md:text-3xl lg:text-3xl font-bold mt-10 mb-6 text-gray-100 text-center leading-normal md:leading-snug lg:leading-snug" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
        HOW TO GET IN
      </div>

      {live ? (
        <>
          <GammaParagraph>
            I&apos;m opening a small number of spots for a few select guys. There are 2 ways to get in:
          </GammaParagraph>

          <GammaParagraph>
            A) Monthly investment is £700 per month for complete 1-to-1 access. But the <strong>first 5 to be accepted </strong> will get in at 50% of this, and lock it in for as long as they stay a client.
          </GammaParagraph>

          <GammaParagraph>
            B) There is also an option to commit to 4 or 6 months up-front instead of monthly-  where you&apos;ll be rewarded with &apos;Committed Fucker&apos; special rate (see this on the enrollment page).
          </GammaParagraph> 

          <GammaParagraph className="text-center pt-2 underline">
            To get started all that&apos;s needed is <strong>£197 deposit today</strong>.
          </GammaParagraph>

          <GammaParagraph>
            If accepted you&apos;ll get started right away. If not I&apos;ll refund your complete deposit. So there&apos;s zero risk to applying.
          </GammaParagraph>
        </>
      ) : (
        <GammaParagraph>
          This programme is currently closed for new applicants. When it reopens, spots will be limited — join the waitlist to get first access.
        </GammaParagraph>
      )}
      

      <GammaDivider />

      <div className="text-4xl mx-0 -ml-4 -mr-4 md:text-3xl lg:text-3xl font-bold mt-10 mb-6 text-gray-100 text-center leading-normal md:leading-snug lg:leading-snug" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
        NEXT STEPS
      </div>

      {live && (
        <GammaParagraph>
          I respect both of our time, so let&apos;s skip the &apos;sales call&apos; and complicated BS.
        </GammaParagraph>
      )}

      {live ? (
        <GammaOrderedList>
          <p >
          <li className="">
                    <Link href={`/limitless-concierge-invitation/pricing${name || email ? `?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}` : ''}`} className="text-xl md:text-1.5xl lg:text-1.5xl text-blue-400 font-bold underline hover:text-blue-300 cursor-pointer">
            Click here to secure your place
          </Link>
          </li>
          </p>
          <li>If it&apos;s a fit we&apos;ll get you enrolled.</li>
          <li>You&apos;ll be welcomed into the Limitless family.</li>
        </GammaOrderedList>
      ) : (
        <div className="space-y-4">

          <div className="mb-0 lg:text-xl pb-0">
            This programme is currently closed for new applicants. Join the waitlist below
            to be first in line when doors re-open.
          </div>
          <WaitlistInlineForm source="concierge-offer-doc" />
        </div>
      )}

      {live && (
        <>
          <GammaParagraph>
            You in?
          </GammaParagraph>

          <GammaParagraph className="-mt-4">
          Marley
          </GammaParagraph>
        </>
      )}
    </div>
  );
}
