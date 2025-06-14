
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import TextArea from './TextArea';
import CleanButton from './CleanButton';
import { detectHiddenCharacters, cleanText } from '../utils/textUtils';

const TextCleaner = () => {
  const [inputText, setInputText] = useState('');
  const [processedText, setProcessedText] = useState('');

  useEffect(() => {
    if (inputText) {
      const processed = detectHiddenCharacters(inputText);
      setProcessedText(processed);
    } else {
      setProcessedText('');
    }
  }, [inputText]);

  const handleClean = async () => {
    const cleaned = cleanText(inputText);
    
    try {
      await navigator.clipboard.writeText(cleaned);
      toast({
        title: "✨ Text Cleaned!",
        description: "Clean text has been copied to your clipboard",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Cleaned Successfully",
        description: "Text cleaned but couldn't copy to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-end mb-4">
        <CleanButton onClick={handleClean} disabled={!inputText.trim()} />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-700">Original Text</h2>
          <TextArea
            value={inputText}
            onChange={setInputText}
            placeholder="Paste your text here to reveal hidden characters..."
            isInput={true}
          />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-700">
            Text with Highlighted Hidden Characters
          </h2>
          <TextArea
            value={processedText}
            onChange={() => {}}
            placeholder="Hidden characters will appear highlighted here..."
            isInput={false}
            showHtml={true}
          />
        </div>
      </div>
    </div>
  );
};

export default TextCleaner;
