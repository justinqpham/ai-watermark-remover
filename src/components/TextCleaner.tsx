import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";
import TextArea from './TextArea';
import CleanButton, { SampleButton } from './CleanButton';
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

  const handleSampleText = () => {
    const sampleText = `Although the text you see appears perfectly normal, modern AI models can embed invisible "watermarks" that only specialized programs can detect. These watermarks consist of zero-width or control characters—such as the zero-width space (​), zero-width non-joiner (‌), zero-width joiner (‍), zero-width no-break space (), soft hyphen (­), and word joiner ( )—which remain hidden to human readers.

When you paste AI-generated text into your editor, every few words may secretly contain these markers. For example, an unseen zero-width space might follow "although"​ or a soft hyphen might slip in between "invisible"­ and "watermarks." These characters are not random typos; they serve as a fingerprint that flags the text's origin.

Why do these watermarks occur? Developers may intentionally insert them to help detect machine-written content, or they can emerge as byproducts of internal tokenization and encoding processes within the AI system. Since AI models handle text at a byte or token level, certain control characters may be introduced during generation without affecting the visible output.

Specialized scripts scan for these hidden characters and count occurrences. Once detected, the text can be flagged as AI-generated. By highlighting each marker and reporting "Found 7 watermarks," tools make it clear why a paragraph wasn't written by a human. Although invisible by design, these tiny markers ensure transparency and traceability in the age of AI writing.`;
    setInputText(sampleText);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-8 md:p-12 border border-border/50 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        {/* Mobile: Stack everything vertically, Desktop: Alerts on left */}
        <div className="flex flex-col gap-3 sm:gap-4 order-2 sm:order-1">
          {showCleanNotification && (
            <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800 w-auto rounded-2xl text-sm">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
              <AlertDescription className="font-medium">
                ✨ No hidden characters detected - your text is clean!
              </AlertDescription>
            </Alert>
          )}
          {hiddenCharCount > 0 && (
            <Alert className="bg-red-50 border-red-200 text-red-800 w-auto rounded-2xl text-sm">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
              <AlertDescription className="font-medium">
                🚨 {hiddenCharCount} hidden character{hiddenCharCount !== 1 ? 's' : ''} detected
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        {/* Mobile: Stack buttons vertically, Desktop: Side by side */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 order-1 sm:order-2">
          <SampleButton onClick={handleSampleText} />
          <CleanButton onClick={handleClean} disabled={!inputText.trim()} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground tracking-wide">Original Text</h2>
          <TextArea
            value={inputText}
            onChange={setInputText}
            placeholder="Paste your text here to reveal hidden characters..."
            isInput={true}
          />
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground tracking-wide">
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
