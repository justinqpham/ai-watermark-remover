import { cn } from '@/lib/utils';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isInput: boolean;
  showHtml?: boolean;
}

const TextArea = ({ value, onChange, placeholder, isInput, showHtml = false }: TextAreaProps) => {
  return (
    <div className="relative h-64 sm:h-80 md:h-96">
      {isInput ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-full p-4 sm:p-6 border border-input rounded-2xl sm:rounded-3xl",
            "bg-background/50 backdrop-blur-sm shadow-lg resize-none font-mono text-xs sm:text-sm text-foreground",
            "focus:ring-2 focus:ring-ring focus:border-ring",
            "transition-all duration-300",
            "placeholder:text-muted-foreground"
          )}
        />
      ) : (
        <div
          className={cn(
            "w-full h-full p-4 sm:p-6 border border-input rounded-2xl sm:rounded-3xl",
            "bg-muted/30 backdrop-blur-sm shadow-lg font-mono text-xs sm:text-sm overflow-auto",
            "whitespace-pre-wrap break-words text-foreground"
          )}
        >
          {showHtml ? (
            <div dangerouslySetInnerHTML={{ __html: value || `<span class="text-muted-foreground">${placeholder}</span>` }} />
          ) : (
            <span className={value ? "text-foreground" : "text-muted-foreground"}>
              {value || placeholder}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TextArea;
