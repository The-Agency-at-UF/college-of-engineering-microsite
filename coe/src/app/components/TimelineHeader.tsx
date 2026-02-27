import PhotoGallery from "../components/PhotoGallery";
import Image from "next/image";

export default function TimelineHeader() {
  return (
    <>
      {/* Title Section */}
      <section 
        className="grid grid-cols-[1.7fr_1fr] h-[clamp(300px,70vh,1000px)] relative"
        style={{
          backgroundImage: 'url(/images/Landing_Bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#002657'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#002657] opacity-70"></div>
        
        {/* Left side - title */}
        <div className="relative z-10 text-white flex items-center pl-[clamp(50px,12vw,220px)] py-10">
          <div>
            <div className="mb-2">
              <Image
                src="/images/LEGACY_CoE.svg"
                alt="Legacy"
                width={400}
                height={178}
                priority
                className="w-[clamp(200px,25vw,400px)] h-auto"
              />
            </div>
            <h3 className="text-[clamp(16px,3vw,48px)] max-w-lg text-orange-400 font-bold italic leading-[1]">
              Engineering the future, creating our Legacy 
            </h3>
          </div>
        </div>

        {/* Right side - sliding photo gallery */}
        <PhotoGallery />
      </section>

    {/*Border image*/}
    <div className="">
          <Image
            src="/images/header-gold-border.svg"
            alt="Header Gold Border"
            width={1512}
            height={15.5}
            priority
            className="w-full h-auto"/>
    </div>
    </>
  );
}