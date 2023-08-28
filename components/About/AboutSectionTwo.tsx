import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <h2 className="section-title ml-16 text-5xl">
        Parents
      </h2>



      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >

              <Image
                src="/images/about/parent.jpg"
                alt="about image"
                fill
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Nurturing Future Leaders with AiPro
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  At AiProf, we understand that a child&apos;s education is a cornerstone for their future success. As parents, your role in supporting their learning journey is invaluable. Discover how AiProf can be your partner in shaping the leaders of tomorrow through personalized education, insightful progress tracking, and a collaborative approach to learning.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Elevate Your Child&apos;s Learning Experience
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  With AiProf, you can ensure that your child receives an education that adapts to their unique strengths, fosters critical thinking, and prepares them for a rapidly changing world. Join us in empowering your child&apos;s journey towards academic excellence and personal growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
