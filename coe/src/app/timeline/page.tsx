import PhotoGallery from "../components/PhotoGallery";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-[#0021A5]">
        <div className="flex px-10 py-6 border-b border-[#F2A900]"> 
        </div>
      </header>

      {/* Title Section */}
      <section className="grid grid-cols-[1.7fr_1fr] h-[70vh] bg-black">
        {/* Left side - title */}
        <div className="bg-[#0B2A57] text-white flex items-center px-10 py-10">
          <div>
            <h1 className="text-6xl font-bold">
              LEGACY<br />115
            </h1>
          </div>
        </div>

        {/* Right side - sliding photo gallery */}
        <PhotoGallery />
      </section>

      {/* Main Content Section */}
      <section className="bg-white py-25 px-8">
        
      </section>
    </div>
  );
}