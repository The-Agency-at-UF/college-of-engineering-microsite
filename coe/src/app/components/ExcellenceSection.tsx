import { DepartmentDropdown } from './DepartmentDropdown';
import Image from 'next/image';

interface ExcellenceSectionProps {
  selectedDepartments: string[];
  onDepartmentChange: (departments: string[]) => void;
}

export default function ExcellenceSection({
  selectedDepartments,
  onDepartmentChange,
}: ExcellenceSectionProps) {
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

    return( 
        <section className = "flex flex-col items-center justify-center gap-8 pt-[clamp(15px,3vw,50px)]">
            {/* Headline with integrated underline */}
            <div className="w-[min(83%,1200px)] pb-4">
                <h2 className="text-[#0021A5] text-center font-bold text-[clamp(18px,4vw,50px)] leading-tight">
                    DEFINING EXCELLENCE <span className="relative inline-block">SINCE 1910
                        <Image
                            src="/images/subhead-underline.svg"
                            alt="underline swoop"
                            width={302}
                            height={12}
                            className="absolute bottom-[-0.2em] left-1/2 -translate-x-1/2 w-[clamp(150px,20vw,302px)] h-auto"
                        />
                    </span>
                </h2>
            </div>

            {/* Department Dropdown Filter */}
            <div className="w-[min(83%,1200px)] flex justify-end">
                <DepartmentDropdown
                    departments={departments}
                    selectedDepartments={selectedDepartments}
                    onApply={onDepartmentChange}
                />
            </div>

        </section> 
    );
}