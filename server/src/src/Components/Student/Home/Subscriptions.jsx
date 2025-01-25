import React from "react";

function Subscriptions() {
  const subscriptions = [
    {
      price: "Rs 299",
      duration: "1 Month",
      description:
        "Ideal for short-term learners seeking quick access to our resources and tutorials.",
      features: [
        "Access to all course materials for 30 days",
        "Weekly live doubt-clearing sessions",
        "Basic progress tracking and assessments",
        "Community support for month",
      ],
    },
    {
      price: "Rs 899",
      duration: "3 Months",
      description:
        "Perfect for dedicated learners aiming to complete specific skillsets or courses.",
      features: [
        "Full access to all courses for 90 days",
        "Priority live sessions with mentors",
        "Certification for completed courses",
        "Access to exclusive webinars",
      ],
    },
    {
      price: "Rs 1499",
      duration: "Half-Yearly",
      description:
        "Designed for focused learners looking to explore a variety of topics in-depth.",
      features: [
        "6 months of access to all course materials",
        "Bi-weekly live mentoring sessions",
        "Comprehensive assessments & feedbacks",
        "Advanced progress analytics",
      ],
    },
    {
      price: "Rs 2999",
      duration: "Yearly",
      description:
        "Best value for committed learners seeking long-term growth and expertise.",
      features: [
        "1 year of access to all courses and resources",
        "monthly 1-on-1 mentoring sessions",
        "Premium certifications for completed tracks",
        "Access to career-oriented workshops",
      ],
    },
  ];

  return (
    <div className="w-[90%] m-auto flex flex-col gap-5 mb-10 md:gap-14 md:mt-20 md:mb-20 ">
      <h1 className="text-2xl font-semibold md:text-[28px] md:text-3xl relative z-10">
       Plan Details
      </h1>
      <div className="flex flex-col md:flex-row flex-wrap mx-auto items-center justify-evenly gap-5 w-full">
        {subscriptions.length >= 1 ? (
          subscriptions.map((value, index) => (
            <div
              key={index}
              className="md:w-[290px] w-[250px] rounded-lg shadow-md md:shadow-lg p-6 hover:scale-105 transition-all duration-400 "
            >
              <p className="md:text-3xl font-bold md:my-4">
                {value.price}
                <span className="md:text-lg text-Primary font-normal">
                  {" "}
                  / {value.duration}
                </span>
              </p>
              <p className="text-xs hidden mb-3 md:text-base md:mb-6">
                {value.description}
              </p>
              <div className="hidden md:block md:border-t md: border-gray-700 md:pt-4">
                <h3 className="text-lg font-semibold">What's included:</h3>
                <ol className="md:mt-4 text-gray-500 mx-3 list-disc ">
                  {value.features.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ol>
              </div>
              <div className="text-center">
                <button className="w-20 h-7 font-semibold text-sm md:text-md md:h-10 shadow-lg md:mt-6 md:w-full bg-Primary hover:bg-gray-600 text-white md:py-1 rounded-lg">
                  Subscribe
                </button>
              </div>
            </div>
          ))
        ) : (
          <>
            <h1>data not found</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default Subscriptions;
