

export default function ExcellenceSection() {
    return( 
        <section className = "flex flex-col items-center justify-center gap-8 pt-[clamp(15px,3vw,50px)]">
            {/* Blue Banner area */}
            <div className="bg-[#0021A5] text-white text-center font-bold rounded-full px-16 py-4 text-[clamp(13px,3vw,40px)] w-[min(83%,1200px)]" >
                Defining Excellence Since XXXX
            </div>

        {/* Department buttons */}
            <div className="flex flex-wrap justify-center ml-[-5vw] gap-3 text-white font-bold w-[min(85%,1200px)] gap-y-2">
                

                <button className="bg-[#FA4616] text-[clamp(6px,2vw,16px)] px-[clamp(10px,4vw,80px)] py-[clamp(2px,0.5vw,12px)] rounded-full">
                CISE
                </button>

                <button className="bg-[#002657] text-[clamp(6px,2vw,16px)] px-[clamp(10px,4vw,80px)] py-[clamp(2px,0.5vw,12px)] rounded-full">
                DEPT
                </button>

                <button className="bg-[#002657] text-[clamp(6px,2vw,16px)] px-[clamp(10px,4vw,80px)] py-[clamp(2px,0.5vw,12px)] rounded-full">
                DEPT
                </button>

                <button className="bg-[#FA4616] text-[clamp(6px,2vw,16px)] px-[clamp(10px,4vw,80px)] py-[clamp(2px,0.5vw,12px)] rounded-full">
                AG BIO
                </button>

                <button className="bg-[#002657] text-[clamp(6px,2vw,16px)] px-[clamp(10px,4vw,80px)] py-[clamp(2px,0.5vw,12px)] rounded-full">
                DEPT
                </button>

                <button className="bg-[#002657] text-[clamp(6px,2vw,16px)] px-[clamp(10px,4vw,80px)] py-[clamp(2px,0.5vw,12px)] rounded-full">
                DEPT
                </button>

                <button className="bg-[#002657] text-[clamp(6px,2vw,16px)] px-[clamp(10px,4vw,80px)] py-[clamp(2px,0.5vw,12px)] rounded-full">
                DEPT
                </button>

            </div>

            <div className="flex text-black py-5 text-lg" >
                rest of content here...
            </div>

        </section> 
    );
}