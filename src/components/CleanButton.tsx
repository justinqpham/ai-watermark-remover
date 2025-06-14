import { Button } from '@/components/ui/button';
import { Eraser, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CleanButtonProps {
  onClick: () => void;
  disabled: boolean;
}

interface SampleButtonProps {
  onClick: () => void;
}

const SampleButton = ({ onClick }: SampleButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "px-4 sm:px-6 py-3 sm:py-4 bg-gray-100",
        "hover:bg-gray-200",
        "text-gray-700 font-medium rounded-xl shadow-sm",
        "transition-all duration-200 hover:shadow-md",
        "flex items-center gap-2 sm:gap-3",
        "text-sm sm:text-base tracking-normal",
        "mb-2 sm:mb-0 sm:mr-3 w-full sm:w-auto"
      )}
    >
      <FileText size={18} className="sm:w-5 sm:h-5" />
      <span className="whitespace-nowrap">Try sample text</span>
    </Button>
  );
};

const CleanButton = ({ onClick, disabled }: CleanButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-6 sm:px-8 py-3 sm:py-4 bg-blue-500",
        "hover:bg-blue-600",
        "text-white font-medium rounded-xl shadow-sm",
        "transition-all duration-200 hover:shadow-md",
        "disabled:bg-gray-200 disabled:text-gray-400",
        "disabled:cursor-not-allowed disabled:shadow-none",
        "flex items-center gap-2 sm:gap-3",
        "text-sm sm:text-base tracking-normal",
        "w-full sm:w-auto"
      )}
    >
      <Eraser size={18} className="sm:w-5 sm:h-5" />
      <span className="whitespace-nowrap">Clean Text</span>
    </Button>
  );
};

export default CleanButton;
export { SampleButton };
