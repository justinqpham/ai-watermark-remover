
import TextCleaner from "../components/TextCleaner";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-gradient-x relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 via-cyan-800/20 to-blue-800/20 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
            AI Watermark Remover
          </h1>
          <p className="text-xl text-gray-300 font-light tracking-wide">For Toma</p>
          <p className="text-gray-400 mt-4 text-lg">Reveal and remove hidden characters with AI precision</p>
        </div>
        <TextCleaner />
      </div>
    </div>
  );
};

export default Index;
