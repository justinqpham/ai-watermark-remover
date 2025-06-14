import TextCleaner from "../components/TextCleaner";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_circle,_#f5f5f7_60%,_#e9e9ec_100%)]">
      {/* Apple-like soft radial gradient background */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            AI Watermark Remover
          </h1>
          <p className="text-xl text-gray-500 font-light tracking-wide">For Toma</p>
          <p className="text-gray-600 mt-4 text-lg">Reveal and remove hidden characters with AI precision</p>
        </div>
        <TextCleaner />
      </div>
    </div>
  );
};

export default Index;
