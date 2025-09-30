import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export default function YearSelector({ selectedYear, onYearChange }: YearSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const years = [2025, 2024, 2023, 2022, 2021];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between bg-white border-2 border-gray-300 rounded-xl px-4 py-2 min-w-[120px] text-gray-700 hover:border-orange-400 transition-colors"
      >
        <span>{selectedYear}년</span>
        <LuChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border-2 border-gray-300 rounded-xl shadow-lg z-10 min-w-[120px]">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => {
                onYearChange(year);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                selectedYear === year ? 'bg-orange-100 text-orange-600' : 'text-gray-700'
              }`}
            >
              {year}년
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
