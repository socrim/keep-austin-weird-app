'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Music, Building2, Utensils, Megaphone, Loader2, Coins, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface GeneratedContent {
  bandName: string;
  startupPitch: string;
  tacoRecipe: string;
  protestSign: string;
  protestSignImage?: string;
}

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateAustinWeirdness = async () => {
    setIsGenerating(true);
    setError(null);
    // Clear previous content while generating new content
    setGeneratedContent(null);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedContent(data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Failed to generate content. Please try again.');
        console.error('API Error:', errorData);
      }
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection and try again.';
      setError(errorMessage);
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-400 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-green-400 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* ATX Token Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <a
            href="https://letsbonk.fun/token/G9jvmBmsdzZLWjj8gzPToroHfxoHL3wmBn2FiEbgbonk"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
          >
            <Coins className="w-5 h-5 group-hover:animate-pulse" />
            <span className="text-sm">Get the ATX Token</span>
            <Sparkles className="w-4 h-4 group-hover:animate-spin" />
          </a>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg">
            Keep Austin
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-6 drop-shadow-lg">
            WEIRD
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            One click to generate the most Austin things ever: band names, startup pitches, 
            taco recipes, and protest signs. Because weird is beautiful.
          </p>
        </motion.div>

        {/* Generate Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-12"
        >
          <button
            onClick={generateAustinWeirdness}
            disabled={isGenerating}
            className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin" />
                Generating Austin Weirdness...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
                Generate Austin Weirdness
              </div>
            )}
          </button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          >
            <p className="text-center">{error}</p>
            <p className="text-sm text-center mt-2">
              💡 Tip: Set up your OpenAI API key in .env.local for AI-powered generation!
            </p>
          </motion.div>
        )}

        {/* Generated Content */}
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
          >
            {/* Band Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-yellow-400"
            >
              <div className="flex items-center gap-3 mb-4">
                <Music className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800">Band Name</h3>
              </div>
              <p className="text-lg text-gray-700 font-medium">{generatedContent.bandName}</p>
            </motion.div>

            {/* Startup Pitch */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-blue-400"
            >
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-800">Startup Pitch</h3>
              </div>
              <p className="text-lg text-gray-700">{generatedContent.startupPitch}</p>
            </motion.div>

            {/* Taco Recipe */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-orange-400"
            >
              <div className="flex items-center gap-3 mb-4">
                <Utensils className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-800">Taco Recipe</h3>
              </div>
              <p className="text-lg text-gray-700">{generatedContent.tacoRecipe}</p>
            </motion.div>

            {/* Protest Sign */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-red-400"
            >
              <div className="flex items-center gap-3 mb-4">
                <Megaphone className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-bold text-gray-800">Protest Sign</h3>
              </div>
              <p className="text-lg text-gray-700 mb-4">{generatedContent.protestSign}</p>
              
              {/* Protest Sign Image */}
              {generatedContent.protestSignImage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="relative"
                >
                  <Image
                    src={generatedContent.protestSignImage}
                    alt={`Protest sign: ${generatedContent.protestSign}`}
                    width={400}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-lg border-2 border-red-300"
                    priority
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    AI Generated
                  </div>
                </motion.div>
              ) : (
                <div className="text-sm text-gray-500 italic">
                  💡 Set up your OpenAI API key to generate protest sign images!
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-white/80"
        >
          <p className="text-sm">
            Made with ❤️ and 🌮 in Austin, Texas
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
