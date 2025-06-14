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
        "px-8 py-4 bg-gradient-to-r from-primary to-blue-500",
        "hover:from-primary/90 hover:to-blue-500/90",
        "text-primary-foreground font-semibold rounded-2xl shadow-lg",
        "transition-all duration-300 transform hover:scale-105 hover:shadow-primary/25",
        "disabled:from-muted disabled:to-muted",
        "disabled:hover:scale-100 disabled:cursor-not-allowed disabled:shadow-none",
        "flex items-center gap-3 backdrop-blur-sm border border-primary/20",
        "text-lg tracking-wide"
      )}
    >
      <Eraser size={24} />
      Clean Text
    </Button>
  );
};

export default CleanButton;
