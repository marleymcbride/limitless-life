"use client";

export default function NumberedList() {
  const steps = [
    "Identify the tasks that get results",
    "Focus all your energy on those tasks",
    "Ignore everything else.",
  ];

  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="container mx-auto">
        <p className="text-xl mb-8">
          The secret to cutting down your workload while continuing to grow your
          channel is simple.
        </p>

        <ol className="space-y-6 mb-10">
          {steps.map((step, index) => (
            <li key={index} className="flex">
              <div className="mr-4 font-bold text-xl">{index + 1}.</div>
              <div className="text-xl">{step}</div>
            </li>
          ))}
        </ol>

        <p className="text-xl mb-6">
          The best way to do that is to spend years of trial and error figuring
          out what works and what doesn't.
        </p>
      </div>
    </section>
  );
}
