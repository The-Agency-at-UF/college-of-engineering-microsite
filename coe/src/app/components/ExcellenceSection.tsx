interface ExcellenceSectionProps {
  selectedDepartment: string | null;
  onDepartmentChange: (department: string | null) => void;
}

export default function ExcellenceSection({ selectedDepartment, onDepartmentChange }: ExcellenceSectionProps) {
    const departments = [
        { id: "all", name: "ALL", dataValue: null },
        { id: "ece", name: "ELECTRICAL & COMPUTER ENGINEERING", dataValue: "ECE" },
        { id: "chem", name: "CHEMICAL ENGINEERING", dataValue: "CHEM" },
        { id: "abe", name: "AGRICULTURAL & BIOLOGICAL ENGINEERING", dataValue: "ABE" },
        { id: "mae", name: "MECHANICAL & AEROSPACE ENGINEERING", dataValue: "MAE" },
        { id: "mse", name: "MATERIALS SCIENCE ENGINEERING", dataValue: "MSE" },
        { id: "ne", name: "NUCLEAR ENGINEERING", dataValue: "NE" },
        { id: "ise", name: "INDUSTRIAL SYSTEMS ENGINEERING", dataValue: "ISE" },
        { id: "cise", name: "COMPUTER & INFORMATION SCIENCE ENGINEERING", dataValue: "CISE" },
        { id: "bme", name: "BIOMEDICAL ENGINEERING", dataValue: "BME" },
        { id: "essie", name: "ENGINEERING SCHOOL OF SUSTAINABLE INFRASTRUCTURE & ENVIRONMENT", dataValue: "ESSIE" },
        { id: "eed", name: "ENGINEERING EDUCATION", dataValue: "EED" }
    ];

    const handleDepartmentClick = (dept: typeof departments[0]) => {
        onDepartmentChange(dept.dataValue);
    };

    return( 
        <section className = "flex flex-col items-center justify-center gap-8 pt-[clamp(15px,3vw,50px)]">
            {/* Blue Banner area */}
            <div className="bg-[#0021A5] text-white text-center font-bold rounded-full px-16 py-4 text-[clamp(13px,3vw,40px)] w-[min(83%,1200px)]" >
                Defining Excellence Since 1910
            </div>

            {/* Department buttons - Now functional with correct mapping */}
            <div className="flex flex-wrap justify-center gap-2 text-white font-bold w-[min(83%,1200px)] gap-y-2">
                {departments.map((dept) => (
                    <button 
                        key={dept.id}
                        onClick={() => handleDepartmentClick(dept)}
                        className={`h-[clamp(48px,6vw,52px)] max-w-[clamp(250px,24vw,350px)] leading-tight grid place-items-center text-center text-[clamp(11px,1.4vw,14px)] px-[clamp(1rem,2.2vw,1.5rem)] rounded-full transition-colors border-2 wrap-break-word ${
                            selectedDepartment === dept.dataValue
                                ? "bg-[#0021A5] text-white border-[#0021A5]"
                                : "bg-white text-[#0021A5] border-[#0021A5] hover:bg-[#0021A5] hover:text-white"
                        }`}
                    >
                        {dept.name}
                    </button>
                ))}
            </div>

           

        </section> 
    );
}