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
    <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-12 border border-border/50 shadow-xl">
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
        <div className="flex items-center">
          <SampleButton onClick={handleSampleText} />
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
