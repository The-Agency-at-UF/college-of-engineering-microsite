interface ExcellenceSectionProps {
  selectedDepartment: string | null;
  onDepartmentChange: (department: string | null) => void;
}

export default function ExcellenceSection({ selectedDepartment, onDepartmentChange }: ExcellenceSectionProps) {
    const departments = [
        { id: "all", name: "ALL", dataValue: null },
        { id: "cise", name: "CISE", dataValue: "CISE" },
        { id: "agbio", name: "AG BIO", dataValue: "ABE" }, // Maps to ABE in data
        { id: "bme", name: "BME", dataValue: "BME" },
        { id: "chem", name: "CHEM", dataValue: "CHEM" },
        { id: "civil", name: "CIVIL", dataValue: "CIVIL" },
        { id: "ese", name: "ESE", dataValue: "ESE" },
        { id: "ise", name: "ISE", dataValue: "ISE" }, // Added back missing ISE
        { id: "mae", name: "MAE", dataValue: "MAE" },
        { id: "mse", name: "MSE", dataValue: "MSE" },
        { id: "eee", name: "EEE", dataValue: "EEE" }
    ];

    const handleDepartmentClick = (dept: typeof departments[0]) => {
        onDepartmentChange(dept.dataValue);
    };

    const getSelectedDeptDisplay = () => {
        if (!selectedDepartment) return null;
        const dept = departments.find(d => d.dataValue === selectedDepartment);
        return dept?.name || selectedDepartment;
    };

    return( 
        <section className = "flex flex-col items-center justify-center gap-8 pt-[clamp(15px,3vw,50px)]">
            {/* Blue Banner area */}
            <div className="bg-[#0021A5] text-white text-center font-bold rounded-full px-16 py-4 text-[clamp(13px,3vw,40px)] w-[min(83%,1200px)]" >
                Defining Excellence Since 1910
            </div>

            {/* Department buttons - Now functional with correct mapping */}
            <div className="flex flex-wrap justify-center ml-[-5vw] gap-3 text-white font-bold w-[min(85%,1200px)] gap-y-2">
                {departments.map((dept) => (
                    <button 
                        key={dept.id}
                        onClick={() => handleDepartmentClick(dept)}
                        className={`text-[clamp(6px,2vw,16px)] px-[clamp(10px,4vw,80px)] py-[clamp(2px,0.5vw,12px)] rounded-full transition-colors ${
                            selectedDepartment === dept.dataValue
                                ? "bg-[#FA4616]" 
                                : "bg-[#002657] hover:bg-[#FA4616]"
                        }`}
                    >
                        {dept.name}
                    </button>
                ))}
            </div>

           

        </section> 
    );
}