import React, { useState } from 'react';
import './FortuneTeller.css';

function FortuneTeller() {
  const [fortune, setFortune] = useState('');
  const [activeMode, setActiveMode] = useState('crystal');
  const [isRevealing, setIsRevealing] = useState(false);

  // Crystal Ball Fortunes
  const crystalFortunes = [
    "A great opportunity will present itself soon. Be ready to seize it!",
    "Your kindness will return to you tenfold in unexpected ways.",
    "The stars align in your favor this week. Trust your intuition.",
    "A journey of a thousand miles begins with a single step. Take it now.",
    "Someone from your past will reappear with an important message.",
    "Financial abundance is on the horizon. Stay patient and focused.",
    "Love will find you when you least expect it. Keep your heart open.",
    "Your creative talents will be recognized soon. Don't hide your light.",
    "A challenge you face today will make you stronger tomorrow.",
    "The universe is conspiring in your favor. Have faith in the process.",
    "A new friendship will bring joy and inspiration to your life.",
    "The answer you seek is already within you. Listen to your inner voice.",
    "Change is coming, and it will be for the better. Embrace it.",
    "Your hard work will soon pay off in ways you never imagined.",
    "The next full moon will bring clarity to a confusing situation."
  ];

  // Tarot Cards
  const tarotCards = [
    { name: "The Fool", meaning: "New beginnings, innocence, spontaneity. Take a leap of faith!" },
    { name: "The Magician", meaning: "Manifestation, resourcefulness, power. You have all the tools you need." },
    { name: "The High Priestess", meaning: "Intuition, sacred knowledge, divine feminine. Trust your inner wisdom." },
    { name: "The Empress", meaning: "Femininity, beauty, nature, abundance. Creativity flows through you." },
    { name: "The Emperor", meaning: "Authority, structure, control. Take charge of your destiny." },
    { name: "The Lovers", meaning: "Love, harmony, relationships. Important choices await." },
    { name: "The Chariot", meaning: "Control, willpower, success. Victory is within reach." },
    { name: "Strength", meaning: "Courage, patience, compassion. You are stronger than you know." },
    { name: "The Hermit", meaning: "Soul-searching, introspection, inner guidance. Time for reflection." },
    { name: "Wheel of Fortune", meaning: "Change, cycles, destiny. The wheel is turning in your favor." },
    { name: "Justice", meaning: "Justice, fairness, truth. Balance will be restored." },
    { name: "The Hanged Man", meaning: "Pause, surrender, letting go. A new perspective emerges." },
    { name: "The Star", meaning: "Hope, faith, purpose, renewal. Your wishes will be granted." },
    { name: "The Sun", meaning: "Joy, success, celebration. Happiness illuminates your path." },
    { name: "The World", meaning: "Completion, accomplishment, travel. Your journey reaches fulfillment." }
  ];

  // Yes/No Oracle
  const yesNoAnswers = [
    "Yes, absolutely! The signs are clear.",
    "No, the time is not right.",
    "Perhaps, but proceed with caution.",
    "Most definitely yes!",
    "The answer is no, but don't lose hope.",
    "Yes, if you trust your instincts.",
    "Not at this moment, but soon.",
    "Without a doubt, yes!",
    "The spirits say no.",
    "Yes, but patience is required."
  ];

  // Zodiac Signs for Horoscope
  const horoscopes = {
    "Aries": "Today brings fiery energy and passion. Channel it into your goals!",
    "Taurus": "Stability and comfort surround you. Enjoy life's simple pleasures.",
    "Gemini": "Communication flows easily. Share your ideas with the world.",
    "Cancer": "Emotional depth guides you. Trust your feelings today.",
    "Leo": "Your natural leadership shines. Others look to you for guidance.",
    "Virgo": "Attention to detail serves you well. Organize and prosper.",
    "Libra": "Balance and harmony are yours. Relationships flourish today.",
    "Scorpio": "Transformation is in the air. Embrace the change within.",
    "Sagittarius": "Adventure calls your name. Expand your horizons!",
    "Capricorn": "Hard work pays off. Your ambitions are within reach.",
    "Aquarius": "Innovation and originality set you apart. Be yourself!",
    "Pisces": "Intuition and dreams guide your path. Listen to your soul."
  };

  const revealFortune = (newFortune) => {
    setIsRevealing(true);
    setTimeout(() => {
      setFortune(newFortune);
      setIsRevealing(false);
    }, 800);
  };

  const consultCrystalBall = () => {
    const randomFortune = crystalFortunes[Math.floor(Math.random() * crystalFortunes.length)];
    revealFortune(randomFortune);
  };

  const drawTarotCard = () => {
    const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    revealFortune(`${randomCard.name}: ${randomCard.meaning}`);
  };

  const consultOracle = () => {
    const randomAnswer = yesNoAnswers[Math.floor(Math.random() * yesNoAnswers.length)];
    revealFortune(randomAnswer);
  };

  const generateLuckyNumbers = () => {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 49) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    numbers.sort((a, b) => a - b);
    revealFortune(`Your lucky numbers are: ${numbers.join(', ')}`);
  };

  const getDailyHoroscope = () => {
    const signs = Object.keys(horoscopes);
    const randomSign = signs[Math.floor(Math.random() * signs.length)];
    revealFortune(`${randomSign}: ${horoscopes[randomSign]}`);
  };

  const handleDivination = () => {
    switch(activeMode) {
      case 'crystal':
        consultCrystalBall();
        break;
      case 'tarot':
        drawTarotCard();
        break;
      case 'oracle':
        consultOracle();
        break;
      case 'numbers':
        generateLuckyNumbers();
        break;
      case 'horoscope':
        getDailyHoroscope();
        break;
      default:
        consultCrystalBall();
    }
  };

  return (
    <div className="fortune-teller">
      <div className="fortune-container">
        <h2 className="fortune-title">✨ Mystical Fortune Teller ✨</h2>

        <div className="divination-modes">
          <button
            className={`mode-btn ${activeMode === 'crystal' ? 'active' : ''}`}
            onClick={() => setActiveMode('crystal')}
          >
            🔮 Crystal Ball
          </button>
          <button
            className={`mode-btn ${activeMode === 'tarot' ? 'active' : ''}`}
            onClick={() => setActiveMode('tarot')}
          >
            🃏 Tarot Card
          </button>
          <button
            className={`mode-btn ${activeMode === 'oracle' ? 'active' : ''}`}
            onClick={() => setActiveMode('oracle')}
          >
            ⚡ Yes/No Oracle
          </button>
          <button
            className={`mode-btn ${activeMode === 'numbers' ? 'active' : ''}`}
            onClick={() => setActiveMode('numbers')}
          >
            🎲 Lucky Numbers
          </button>
          <button
            className={`mode-btn ${activeMode === 'horoscope' ? 'active' : ''}`}
            onClick={() => setActiveMode('horoscope')}
          >
            ♈ Daily Horoscope
          </button>
        </div>

        <div className={`crystal-ball ${isRevealing ? 'revealing' : ''}`}>
          <div className="crystal-glow"></div>
          <div className="crystal-inner">
            {!fortune && <span className="crystal-hint">Click below to reveal your fortune...</span>}
          </div>
        </div>

        <button className="reveal-btn" onClick={handleDivination}>
          Reveal Your Fortune
        </button>

        {fortune && (
          <div className={`fortune-text ${isRevealing ? 'fade-out' : 'fade-in'}`}>
            <p>{fortune}</p>
          </div>
        )}

        <div className="instructions">
          <p>
            {activeMode === 'crystal' && "Gaze into the crystal ball for wisdom from the universe..."}
            {activeMode === 'tarot' && "Draw a card to unveil the mysteries of your path..."}
            {activeMode === 'oracle' && "Ask a yes or no question in your mind, then click..."}
            {activeMode === 'numbers' && "Receive numbers blessed by cosmic energy..."}
            {activeMode === 'horoscope' && "Discover what the stars have aligned for you today..."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FortuneTeller;
