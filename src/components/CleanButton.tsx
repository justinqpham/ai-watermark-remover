
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
        "px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700",
        "hover:from-blue-700 hover:to-blue-800",
        "text-white font-semibold rounded-lg shadow-lg",
        "transition-all duration-200 transform hover:scale-105",
        "disabled:from-slate-400 disabled:to-slate-500",
        "disabled:hover:scale-100 disabled:cursor-not-allowed",
        "flex items-center gap-2"
      )}
    >
      <Eraser size={20} />
      Clean
    </Button>
  );
};

export default CleanButton;
