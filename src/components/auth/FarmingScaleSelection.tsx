interface FarmingScaleSelectionProps {
  selectedScale: string;
  onScaleSelect: (scale: string) => void;
}

export const FarmingScaleSelection = ({ 
  selectedScale, 
  onScaleSelect 
}: FarmingScaleSelectionProps) => {
  const scales = ["Never Leave Home", "Backyard Boys", "Tiny Farmer", "The Real Deal!"];
  
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">
          What&apos;s your preferred scale of farming?
        </h1>
        <p className="text-gray-500 mt-2">
          Please let us know your preferred scale of farming.
        </p>
      </div>

      <div className="space-y-3 mt-8">
        {scales.map((scale) => (
          <button
            key={scale}
            onClick={() => onScaleSelect(scale)}
            className={`w-full p-4 text-left rounded-lg border border-gray-200 flex justify-between items-center hover:border-[#77AD3F] transition-all ${
              selectedScale === scale ? "border-[#77AD3F] bg-[#77AD3F]/5" : ""
            }`}
          >
            <span>{scale}</span>
            <span className="text-gray-400">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 