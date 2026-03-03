import MobileList from "./mobile-list";

export default function ProgramSteps() {
  const steps = [
    "Identify the tasks that get results",
    "Focus all your energy on those tasks",
    "Ignore everything else.",
  ];

  const paragraphs = [
    "The secret to cutting down your workload while continuing to grow your channel is simple.",
    "The best way to do that is to spend years of trial and error figuring out what works and what doesn't.",
  ];

  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto">
        <MobileList items={steps} />

        {/* Desktop version remains invisible on mobile */}
        <div className="hidden sm:block space-y-4">
          <p className="mb-6">{paragraphs[0]}</p>
          <ol className="list-decimal ml-6 space-y-2">
            {steps.map((step, index) => (
              <li key={index} className="mb-2">
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-6">{paragraphs[1]}</p>
        </div>

        {/* Mobile version of paragraphs */}
        <div className="block sm:hidden space-y-6 mt-8">
          <p className="text-xl">{paragraphs[0]}</p>
          <p className="text-xl">{paragraphs[1]}</p>
        </div>
      </div>
    </section>
  );
}
