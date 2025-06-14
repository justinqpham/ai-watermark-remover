import { Button } from '@/components/ui/button';
import { Eraser } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CleanButtonProps {
  onClick: () => void;
  disabled: boolean;
}

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
