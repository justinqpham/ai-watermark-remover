
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
        "px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600",
        "hover:from-cyan-400 hover:to-purple-500",
        "text-white font-semibold rounded-2xl shadow-2xl",
        "transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/25",
        "disabled:from-gray-600 disabled:to-gray-700",
        "disabled:hover:scale-100 disabled:cursor-not-allowed disabled:shadow-none",
        "flex items-center gap-3 backdrop-blur-sm border border-white/20",
        "text-lg tracking-wide"
      )}
    >
      <Eraser size={24} />
      Clean Text
    </Button>
  );
};

export default CleanButton;
