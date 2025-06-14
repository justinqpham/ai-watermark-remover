import TextCleaner from "../components/TextCleaner";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_circle,_#f5f5f7_60%,_#e9e9ec_100%)]">
      {/* Apple-like soft radial gradient background */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-wide px-2">
            AI Watermark Remover
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 font-light tracking-wide px-2">Made for Toma 😘</p>
          <p className="text-gray-600 mt-4 tracking-normal text-base sm:text-lg px-2">Reveal and remove hidden characters with AI precision</p>
        </div>
        <TextCleaner />
      </div>
    </div>
  );
};

export default Index;
