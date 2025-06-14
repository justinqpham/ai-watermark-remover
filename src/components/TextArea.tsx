
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
    <div className="relative h-96">
      {isInput ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-full p-6 border border-white/20 rounded-2xl",
            "bg-white/10 backdrop-blur-sm shadow-lg resize-none font-mono text-sm text-gray-100",
            "focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50",
            "transition-all duration-300",
            "placeholder:text-gray-400"
          )}
        />
      ) : (
        <div
          className={cn(
            "w-full h-full p-6 border border-white/20 rounded-2xl",
            "bg-white/5 backdrop-blur-sm shadow-lg font-mono text-sm overflow-auto",
            "whitespace-pre-wrap break-words text-gray-100"
          )}
        >
          {showHtml ? (
            <div dangerouslySetInnerHTML={{ __html: value || `<span class="text-gray-400">${placeholder}</span>` }} />
          ) : (
            <span className={value ? "text-gray-100" : "text-gray-400"}>
              {value || placeholder}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TextArea;
