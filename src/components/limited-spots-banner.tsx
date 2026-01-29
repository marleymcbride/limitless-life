export default function LimitedSpotsBanner() {
  return (
    <div className="bg-[#940909] py-3 px-4 text-center relative z-50">
      <p className="text-white hidden md:block lg:block font-bold text-lg md:text-xl tracking-wide" style={{ fontFamily: "Neuemontreal, sans-serif", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
        ⚠️ Limited spaces available! SECURE YOURS NOW ⚠️
      </p>

      <p className="text-white md:hidden lg:hidden font-normal text-lg md:text-xl tracking-wide" style={{ fontFamily: "Neuemontreal, sans-serif", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
        ⚠️ Limited spaces available! SECURE YOURS NOW ⚠️
      </p>
    </div>

    
  );
}
