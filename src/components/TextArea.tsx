
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
            "w-full h-full p-4 border border-slate-300 rounded-lg",
            "bg-white shadow-sm resize-none font-mono text-sm",
            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "transition-all duration-200",
            "placeholder:text-slate-400"
          )}
        />
      ) : (
        <div
          className={cn(
            "w-full h-full p-4 border border-slate-300 rounded-lg",
            "bg-slate-50 shadow-sm font-mono text-sm overflow-auto",
            "whitespace-pre-wrap break-words"
          )}
        >
          {showHtml ? (
            <div dangerouslySetInnerHTML={{ __html: value || `<span class="text-slate-400">${placeholder}</span>` }} />
          ) : (
            <span className={value ? "text-slate-900" : "text-slate-400"}>
              {value || placeholder}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TextArea;
