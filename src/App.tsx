import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Gift, Music, Flower2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface FloatingHeartProps {
  delay: number;
  duration: number;
  x: number;
}

const FloatingHeart: React.FC<FloatingHeartProps> = ({ delay, duration, x }) => {
  return (
    <motion.div
      initial={{ y: '100vh', opacity: 0, scale: 0 }}
      animate={{ 
        y: '-100vh', 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.5],
        rotate: [0, 360]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        pointerEvents: 'none'
      }}
    >
      <Heart className="text-pink-400 fill-pink-400" size={24} />
    </motion.div>
  );
};

interface SparkleProps {
  delay: number;
}

const Sparkle: React.FC<SparkleProps> = ({ delay }) => {
  const [position] = useState({
    top: Math.random() * 100,
    left: Math.random() * 100
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 1
      }}
      style={{
        position: 'absolute',
        top: `${position.top}%`,
        left: `${position.left}%`,
        pointerEvents: 'none'
      }}
    >
      <Sparkles className="text-yellow-300" size={20} />
    </motion.div>
  );
};

interface Scene3DProps {
  isRomantic?: boolean;
}

const Scene3D: React.FC<Scene3DProps> = ({ isRomantic = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.fillStyle = isRomantic ? 'rgba(255, 192, 203, 0.1)' : 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.z -= particle.vz;
        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = Math.random() * canvas.width - canvas.width / 2;
          particle.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const scale = 1000 / (1000 + particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;
        const size = (1 - particle.z / 1000) * 5;

        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = isRomantic ? `rgba(255, 105, 180, ${1 - particle.z / 1000})` : `rgba(255, 255, 255, ${1 - particle.z / 1000})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isRomantic]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

const ValentineWebsite: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'question' | 'romantic'>('question');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleYes = () => {
    setCurrentPage('romantic');
  };

  const handleNoHover = () => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoButtonSize(Math.max(0.3, noButtonSize - 0.1));
    setYesButtonSize(yesButtonSize + 0.2);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <Scene3D isRomantic={currentPage === 'romantic'} />
      
      <AnimatePresence mode="wait">
        {currentPage === 'question' ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 relative"
          >
            {[...Array(10)].map((_, i) => (
              <FloatingHeart
                key={i}
                delay={i * 0.5}
                duration={8 + Math.random() * 4}
                x={Math.random() * 100}
              />
            ))}

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="relative z-10"
            >
              <Card className="p-12 bg-background/90 backdrop-blur-lg border-2 border-pink-500/50 shadow-2xl max-w-2xl">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  className="flex justify-center mb-8"
                >
                  <Heart className="text-pink-500 fill-pink-500" size={80} />
                </motion.div>

                <motion.h1
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 bg-clip-text text-transparent"
                >
                  Will You Be My Valentine?
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-xl text-muted-foreground mb-12"
                >
                  I promise to make every moment magical ✨
                </motion.p>

                <div className="flex gap-6 justify-center items-center">
                  <motion.div
                    animate={{ scale: yesButtonSize }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Button
                      onClick={handleYes}
                      size="lg"
                      className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold text-2xl px-12 py-8 rounded-full shadow-lg hover:shadow-2xl transition-all"
                    >
                      <Heart className="mr-2 fill-white" />
                      Yes! 💕
                    </Button>
                  </motion.div>

                  <motion.div
                    animate={{ 
                      x: noButtonPosition.x,
                      y: noButtonPosition.y,
                      scale: noButtonSize
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Button
                      onMouseEnter={handleNoHover}
                      onTouchStart={handleNoHover}
                      variant="outline"
                      size="lg"
                      className="font-bold text-xl px-8 py-6 rounded-full"
                    >
                      No
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="romantic"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-full bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300 relative overflow-hidden"
          >
            {[...Array(20)].map((_, i) => (
              <FloatingHeart
                key={`heart-${i}`}
                delay={i * 0.3}
                duration={6 + Math.random() * 4}
                x={Math.random() * 100}
              />
            ))}

            {[...Array(15)].map((_, i) => (
              <Sparkle key={`sparkle-${i}`} delay={i * 0.2} />
            ))}

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-center mb-12"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  className="inline-block mb-6"
                >
                  <Heart className="text-red-500 fill-red-500" size={120} />
                </motion.div>

                <h1 className="text-7xl font-bold mb-4 text-red-600 drop-shadow-lg">
                  Yay! 🎉
                </h1>
                <p className="text-3xl text-pink-800 font-semibold">
                  You made my day! 💖
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl w-full">
                {[
                  { icon: Gift, text: 'Endless Surprises', color: 'from-pink-400 to-red-400' },
                  { icon: Music, text: 'Sweet Melodies', color: 'from-purple-400 to-pink-400' },
                  { icon: Flower2, text: 'Beautiful Moments', color: 'from-red-400 to-pink-400' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.2 }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    <Card className={`p-8 bg-gradient-to-br ${item.color} border-none shadow-xl`}>
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: 'reverse'
                        }}
                        className="flex justify-center mb-4"
                      >
                        <item.icon className="text-white" size={48} />
                      </motion.div>
                      <p className="text-center text-white font-bold text-xl">
                        {item.text}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="w-full max-w-2xl"
              >
                <Card className="p-8 bg-white/90 backdrop-blur-lg border-2 border-pink-400 shadow-2xl">
                  <h2 className="text-3xl font-bold text-center mb-6 text-pink-600 flex items-center justify-center gap-2">
                    <Star className="fill-pink-600 text-pink-600" />
                    Send a Sweet Message
                    <Star className="fill-pink-600 text-pink-600" />
                  </h2>
                  
                  <div className="flex gap-4">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="flex-1 text-lg border-pink-300 focus:border-pink-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                    >
                      <Send className="mr-2" size={20} />
                      Send
                    </Button>
                  </div>

                  <AnimatePresence>
                    {showMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 p-4 bg-pink-100 rounded-lg border-2 border-pink-400"
                      >
                        <p className="text-center text-pink-800 font-semibold">
                          💕 Message sent with love! 💕
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-12 text-center"
              >
                <p className="text-2xl text-pink-800 font-bold">
                  Forever & Always 💑
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentineWebsite;
