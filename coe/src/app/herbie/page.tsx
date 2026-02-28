"use client";

import Image from "next/image";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function HerbiePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      <main>
        <div className="relative -top-[clamp(25px,3.618vw,55px)] left-[-1px]">
          <Image
            src="/images/herbie/herbie.svg"
            alt="Herbert Wertheim"
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
          />
          <Image
            src="/images/herbie/Vector 328.svg"
            alt=""
            width={40}
            height={211}
            className="absolute left-[27.47%] top-[7.42%] w-[2.65%] h-auto"
            aria-hidden="true"
          />
          <Image
            src="/images/herbie/Vector 329.svg"
            alt=""
            width={103}
            height={8}
            className="absolute left-[21.73%] top-[34.86%] w-[6.80%] h-auto"
            aria-hidden="true"
          />
          <Image
            src="/images/herbie/Vector 330.svg"
            alt=""
            width={134}
            height={80}
            className="absolute left-[20.17%] top-[35.78%] w-[8.85%] h-auto"
            aria-hidden="true"
          />
          <Image
            src="/images/herbie/Vector 331.svg"
            alt=""
            width={61}
            height={116}
            className="absolute left-[46.56%] top-[7.11%] w-[4.03%] h-auto"
            aria-hidden="true"
          />
          <Image
            src="/images/herbie/Vector 332.svg"
            alt=""
            width={91}
            height={45}
            className="absolute left-[51.25%] top-[15.26%] w-[6.01%] h-auto"
            aria-hidden="true"
          />
          <Image
            src="/images/herbie/Vector 333.svg"
            alt=""
            width={65}
            height={141}
            className="absolute left-[54.26%] top-[16.32%] w-[4.29%] h-auto"
            aria-hidden="true"
          />
          <Image
            src="/images/herbie/Vector 334.svg"
            alt=""
            width={291}
            height={75}
            className="absolute left-[28.73%] top-[15.39%] w-[19.22%] h-auto"
            aria-hidden="true"
          />
          <Image
            src="/images/herbie/Vector 335.svg"
            alt=""
            width={304}
            height={92}
            className="absolute left-[29.35%] top-[23.30%] w-[20.08%] h-auto"
            aria-hidden="true"
          />
          <div
            className="absolute bg-white w-full h-[0.48%] top-[94.56%] left-[-1px]"
            aria-hidden="true"
          />
          <div
            className="absolute bg-white w-[99.87%] h-[1.06%] top-[96.2%] left-1/2 -translate-x-1/2"
            aria-hidden="true"
          />
          <div
            className="absolute bg-white w-full h-[1.92%] top-[98.21%] left-[-1px]"
            aria-hidden="true"
          />
        </div>
        <section className="bg-white relative -mt-[clamp(25px,3.618vw,55px)] px-[clamp(30px,4.8vw,73px)] pt-[clamp(15px,1.842vw,28px)] pb-[clamp(40px,5.26vw,80px)]">
          <h2
            className="font-bold text-[#0021A5] uppercase leading-none max-w-[875px] mt-[clamp(10px,1.315vw,20px)] text-[clamp(24px,3.158vw,48px)]"
          >
            Herbert Werthem: The Vision. The Transformation. The Impact.
          </h2>
          <h1
            className="font-bold text-[#002657] max-w-[850px] text-[clamp(20px,1.579vw,32px)] pt-[clamp(6px,0.5vw,12px)]"
          >
            Honoring the gift, leadership and lasting impact of Dr. Herbert “Herbie” Wertheim, founding chairman of the college since Oct 1, 2015
          </h1>
          <Image 
            src="/images/subhead-underline.svg"
            alt=""
            width={169}
            height={12}
            className="h-auto mt-[clamp(10px,1.316vw,20px)] w-[clamp(42px,11.118vw,169px)]"
            aria-hidden="true"
          />
          <div className="flex flex-col lg:flex-row justify-start items-start mt-[clamp(18px,1.579vw,30px)] gap-x-[clamp(24px,3.15vw,48px)] gap-y-8">
            <div className="font-normal text-[#002657] max-w-[767px] text-[clamp(16px,1.579vw,24px)] leading-snug">
              <p>
                In October 2015, the Herbert Wertheim College of Engineering was
                named after a benefactor who was more than just generous; the $50
                million gift that Dr. Herbert Wertheim gave to the University of
                Florida launched the college into an unparalleled transformation.
                A Gator himself, Dr. Wertheim saw the potential for UF's College
                of Engineering to change the world through engineering education,
                research and development.
              </p>
              <p className="mt-[clamp(12px,1.579vw,24px)]">
                How did Dr. Wertheim’s generosity exponentially expand the
                college’s possibilities? His gift enabled the development of more
                space, more classrooms and more laboratories: exactly the kind of
                place where the top engineers in the country are formed.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="grid">
                {/* The border image, in the back, offset with transform */}
                <Image
                  src="/images/herbie/orange-border.svg"
                  alt=""
                  width={495}
                  height={330}
                  className="[grid-area:1/1] h-auto w-[clamp(248px,32.56vw,495px)] translate-x-[clamp(10px,1.25vw,19px)] -translate-y-[clamp(8px,1.05vw,16px)]"
                  aria-hidden="true"
                />
                {/* The main image, on top */}
                <Image
                  src="/images/herbie/herbie-at-uf.svg"
                  alt="Herbert Wertheim visits Herbert Wertheim College of Engineering"
                  width={495}
                  height={330}
                  className="relative z-10 [grid-area:1/1] h-auto w-[clamp(248px,32.56vw,495px)]"
                />
              </div>
              <p className="text-[#002657] max-w-[clamp(248px,32.56vw,495px)] mt-[clamp(9px,1.18vw,18px)] text-[clamp(12px,0.98vw,15px)] leading-none">
                Herbert Wertheim visits Herbert Wertheim College of Engineering
                on October 3, 2025, to celebrate 10 years of the Wertheim
                Transformation.
              </p>
            </div>
          </div>
          <p className="font-normal text-[#002657] max-w-[1310px] mt-[clamp(20px,2.697vw,41px)] text-[clamp(16px,1.579vw,24px)] leading-snug">
            Dr. Herbert Wertheim’s impact cannot be stressed enough, as his gift
            resulted in a $300 million public-private partnership that has
            forever transformed engineering at the University of Florida. The
            construction of world-class facilities like the Herbert Wertheim
            Laboratory for Engineering Excellence and the Malachowsky Hall for
            Data Science and Information Technology is just the beginning of the
            innovative changes wrought by Wertheim’s donation. His impact will
            be felt for generations to come.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}