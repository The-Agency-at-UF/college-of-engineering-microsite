import PhotoGallery from "../components/PhotoGallery";
import Image from "next/image";

export default function TimelineHeader() {
  return (
    <>
      {/* Title Section */}
      <section className="grid grid-cols-[1.7fr_1fr] h-[clamp(300px,70vh,1000px)] bg-[#002657]">
        {/* Left side - title */}
        <div className="bg-[#002657] text-white flex items-center pl-[clamp(50px,12vw,220px)] py-10">
          <div>
            <h1 className="text-[clamp(50px,5vw,78px)] font-bold">
              LEGACY
            </h1>
            <h3 className="text-[clamp(10px,1.7vw,30px)] font-bold leading-[1]">
              ENGINEERING OUR LEGACY,<br />BUILDING THE FUTURE
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