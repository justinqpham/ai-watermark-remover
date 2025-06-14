import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";
import TextArea from './TextArea';
import CleanButton from './CleanButton';
import { detectHiddenCharacters, cleanText, hasHiddenCharacters, countHiddenCharacters } from '../utils/textUtils';

const TextCleaner = () => {
  const [inputText, setInputText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [showCleanNotification, setShowCleanNotification] = useState(false);
  const [hiddenCharCount, setHiddenCharCount] = useState(0);

  useEffect(() => {
    if (inputText) {
      const processed = detectHiddenCharacters(inputText);
      setProcessedText(processed);
      
      // Check if text has hidden characters
      const hasHidden = hasHiddenCharacters(inputText);
      const count = countHiddenCharacters(inputText);
      
      setShowCleanNotification(inputText.trim() !== '' && !hasHidden);
      setHiddenCharCount(count);
    } else {
      setProcessedText('');
      setShowCleanNotification(false);
      setHiddenCharCount(0);
    }
  }, [inputText]);

  const handleClean = async () => {
    const cleaned = cleanText(inputText);
    
    // Update the processed text to show the cleaned version
    setProcessedText(cleaned);
    
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
    <div className="max-w-8xl mx-auto bg-card/80 backdrop-blur-sm rounded-3xl p-12 border border-border/50 shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          {showCleanNotification && (
            <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800 w-auto rounded-2xl">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <AlertDescription className="font-medium">
                ✨ No hidden characters detected - your text is clean!
              </AlertDescription>
            </Alert>
          )}
          {hiddenCharCount > 0 && (
            <Alert className="bg-red-50 border-red-200 text-red-800 w-auto rounded-2xl">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <AlertDescription className="font-medium">
                🚨 {hiddenCharCount} hidden character{hiddenCharCount !== 1 ? 's' : ''} detected
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div>
          <CleanButton onClick={handleClean} disabled={!inputText.trim()} />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground tracking-wide">Original Text</h2>
          <TextArea
            value={inputText}
            onChange={setInputText}
            placeholder="Paste your text here to reveal hidden characters..."
            isInput={true}
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground tracking-wide">
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
