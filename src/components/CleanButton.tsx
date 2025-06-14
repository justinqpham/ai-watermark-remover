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
        "px-6 py-4 bg-gray-100",
        "hover:bg-gray-200",
        "text-gray-700 font-medium rounded-xl shadow-sm",
        "transition-all duration-200 hover:shadow-md",
        "flex items-center gap-3",
        "text-base tracking-normal mr-3"
      )}
    >
      <FileText size={20} />
      Try sample text
    </Button>
  );
};

const CleanButton = ({ onClick, disabled }: CleanButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-8 py-4 bg-blue-500",
        "hover:bg-blue-600",
        "text-white font-medium rounded-xl shadow-sm",
        "transition-all duration-200 hover:shadow-md",
        "disabled:bg-gray-200 disabled:text-gray-400",
        "disabled:cursor-not-allowed disabled:shadow-none",
        "flex items-center gap-3",
        "text-base tracking-normal"
      )}
    >
      <Eraser size={20} />
      Clean Text
    </Button>
  );
};

export default CleanButton;
export { SampleButton };
