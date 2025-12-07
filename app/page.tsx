'use client';

import React, { useState } from 'react';

export default function BrainDump() {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingPhase, setProcessingPhase] = useState(0);
  const [result, setResult] = useState(null);

  const agents = [
    { name: 'LISTIE', color: '#FF3366', highlight: '#FF6B8A', shadow: '#CC1144', catchphrase: 'I hear something good!' },
    { name: 'LINKY', color: '#00D4AA', highlight: '#4DEBB8', shadow: '#00A080', catchphrase: 'Ooh, these connect!' },
    { name: 'WORDY', color: '#FFD426', highlight: '#FFE566', shadow: '#D4A800', catchphrase: 'Let me rephrase that...' },
    { name: 'SPARKY', color: '#FF6B2C', highlight: '#FF8F5A', shadow: '#D44D10', catchphrase: 'But what if...?' },
    { name: 'BLENDY', color: '#7B5CFF', highlight: '#9F85FF', shadow: '#5A3DD4', catchphrase: 'Aha! I see it now!' },
  ];

  const defaultPositions = [
    { x: 5, y: 35, scale: 1.1, rotate: -12 },
    { x: 25, y: 65, scale: 0.85, rotate: 8 },
    { x: 48, y: 40, scale: 1, rotate: -5 },
    { x: 72, y: 60, scale: 0.9, rotate: 10 },
    { x: 92, y: 30, scale: 1.05, rotate: -8 },
  ];

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setResult(null);

    try {
      // Simulate agent processing phases for UI
      for (let i = 0; i < agents.length; i++) {
        setProcessingPhase(i);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Call real AI API
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputText }),
      });

      if (!response.ok) {
        throw new Error('Failed to process');
      }

      const data = await response.json();

      setResult({
        interpretation: data.result.interpretation,
        keyPoints: data.result.keyPoints,
      });
    } catch (error) {
      console.error('Error:', error);
      setResult({
        interpretation: 'Sorry, something went wrong processing your thoughts. Please try again.',
        keyPoints: ['Error occurred', 'Please try again'],
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const resetApp = () => {
    setInputText('');
    setResult(null);
    setProcessingPhase(0);
  };

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Bowlby+One&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .app {
          min-height: 100vh;
          background: #1a1a2e;
          font-family: 'Space Grotesk', sans-serif;
          overflow-x: hidden;
          position: relative;
        }
        
        /* ===== BACKGROUND BLOBS ===== */
        .bg-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        
        .bg-blob {
          position: absolute;
          border-radius: 50%;
        }
        
        .blob-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(145deg, #00E5B8, #00B894);
          top: -100px;
          right: -80px;
          box-shadow: inset -25px -25px 50px rgba(0,0,0,0.15), inset 15px 15px 30px rgba(255,255,255,0.2);
        }
        
        .blob-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(145deg, #FFE566, #FFD426);
          bottom: 5%;
          right: 3%;
          box-shadow: inset -20px -20px 40px rgba(0,0,0,0.1), inset 12px 12px 25px rgba(255,255,255,0.3);
        }
        
        .blob-3 {
          width: 160px;
          height: 160px;
          background: linear-gradient(145deg, #FF6B8A, #FF3366);
          top: 45%;
          left: -50px;
          box-shadow: inset -15px -15px 30px rgba(0,0,0,0.15), inset 10px 10px 20px rgba(255,255,255,0.2);
        }
        
        .blob-4 {
          width: 250px;
          height: 250px;
          background: linear-gradient(145deg, #8B6CFF, #6B4CFF);
          bottom: -100px;
          left: 8%;
          box-shadow: inset -20px -20px 40px rgba(0,0,0,0.2), inset 15px 15px 30px rgba(255,255,255,0.1);
        }
        
        .blob-5 {
          width: 120px;
          height: 120px;
          background: linear-gradient(145deg, #FF8F5A, #FF6B2C);
          top: 12%;
          left: 6%;
          box-shadow: inset -12px -12px 25px rgba(0,0,0,0.15), inset 8px 8px 18px rgba(255,255,255,0.2);
        }
        
        /* ===== CONTENT ===== */
        .content {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
        }
        
        /* ===== HEADER ===== */
        .header {
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .logo-wrap {
          position: relative;
          display: inline-block;
        }
        
        .logo {
          font-family: 'Bowlby One', cursive;
          font-size: clamp(3rem, 12vw, 7.5rem);
          color: #FFF;
          position: relative;
          z-index: 2;
        }
        
        .logo-shadow {
          position: absolute;
          top: 8px;
          left: 8px;
          font-family: 'Bowlby One', cursive;
          font-size: clamp(3rem, 12vw, 7.5rem);
          color: #FF3366;
          z-index: 1;
          user-select: none;
          pointer-events: none;
        }
        
        .tagline {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.9);
          font-weight: 600;
          margin-top: 0.5rem;
        }
        
        /* ===== AGENTS STAGE ===== */
        .agents-stage {
          position: relative;
          width: 100%;
          max-width: 850px;
          height: 200px;
          margin: 1rem 0;
        }
        
        /* ===== AGENT ===== */
        .agent {
          position: absolute;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          filter: drop-shadow(0 12px 20px rgba(0,0,0,0.25));
        }
        
        .agent:hover .blob {
          transform: scale(1.12) rotate(-8deg);
        }
        
        .agent:hover .agent-label {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        
        .blob {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          position: relative;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: blobIdle 4s ease-in-out infinite;
        }
        
        @keyframes blobIdle {
          0%, 100% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
          25% { border-radius: 47% 53% 52% 48% / 48% 52% 48% 52%; }
          50% { border-radius: 52% 48% 48% 52% / 52% 48% 52% 48%; }
          75% { border-radius: 48% 52% 53% 47% / 47% 53% 47% 53%; }
        }
        
        .agent.active .blob {
          animation: blobActive 0.35s ease-in-out infinite;
        }
        
        @keyframes blobActive {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.08) translateY(-10px); }
        }
        
        /* Face */
        .face {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        
        .eyes {
          display: flex;
          gap: 16px;
        }
        
        .eye {
          width: 20px;
          height: 24px;
          background: #FFF;
          border-radius: 50%;
          position: relative;
          box-shadow: inset 2px 2px 4px rgba(0,0,0,0.08);
        }
        
        .pupil {
          width: 10px;
          height: 12px;
          background: #1a1a2e;
          border-radius: 50%;
          position: absolute;
          top: 7px;
          left: 5px;
          animation: look 4s ease-in-out infinite;
        }
        
        .pupil::after {
          content: '';
          width: 4px;
          height: 4px;
          background: #FFF;
          border-radius: 50%;
          position: absolute;
          top: 1px;
          right: 1px;
        }
        
        @keyframes look {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(3px, -2px); }
          40% { transform: translate(-3px, 1px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(-2px, -1px); }
        }
        
        .mouth {
          width: 22px;
          height: 11px;
          background: #1a1a2e;
          border-radius: 0 0 50% 50%;
        }
        
        .agent.active .mouth {
          animation: talk 0.25s ease-in-out infinite;
        }
        
        @keyframes talk {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }
        
        .agent-label {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%) translateY(5px);
          font-size: 0.72rem;
          font-weight: 700;
          color: #FFF;
          background: rgba(0,0,0,0.35);
          padding: 5px 12px;
          border-radius: 20px;
          letter-spacing: 0.1em;
          white-space: nowrap;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        
        .speech-bubble {
          position: absolute;
          top: -48px;
          left: 50%;
          transform: translateX(-50%);
          background: #FFF;
          color: #1a1a2e;
          padding: 10px 16px;
          border-radius: 18px;
          font-size: 0.8rem;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
          animation: popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 100;
        }
        
        .speech-bubble::after {
          content: '';
          position: absolute;
          bottom: -9px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 9px solid transparent;
          border-right: 9px solid transparent;
          border-top: 11px solid #FFF;
        }
        
        @keyframes popIn {
          from { opacity: 0; transform: translateX(-50%) scale(0.5) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) scale(1) translateY(0); }
        }
        
        /* ===== INPUT ===== */
        .input-section {
          width: 100%;
          max-width: 580px;
          margin-top: 1rem;
        }
        
        .input-box {
          background: #FFF;
          border-radius: 24px;
          padding: 4px;
          box-shadow: 10px 10px 0 rgba(0,0,0,0.18);
          transition: all 0.3s ease;
        }
        
        .input-box:focus-within {
          transform: translateY(-4px);
          box-shadow: 14px 14px 0 rgba(0,0,0,0.18), 0 0 0 4px #FFD426;
        }
        
        .input-box.processing {
          animation: shake 0.4s ease-in-out infinite;
        }
        
        @keyframes shake {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(-0.5deg); }
          75% { transform: rotate(0.5deg); }
        }
        
        textarea {
          width: 100%;
          min-height: 120px;
          border: none;
          padding: 1.25rem;
          font-size: 1.05rem;
          font-family: 'Space Grotesk', sans-serif;
          color: #1a1a2e;
          resize: none;
          outline: none;
          border-radius: 20px;
          background: transparent;
          line-height: 1.6;
          font-weight: 500;
        }
        
        textarea::placeholder {
          color: #aaa;
        }
        
        .input-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 1.25rem;
          border-top: 2px solid #f0f0f0;
        }
        
        .hint {
          font-size: 0.82rem;
          color: #999;
          font-weight: 500;
        }
        
        .submit-btn {
          background: #FF3366;
          border: none;
          padding: 0.9rem 1.8rem;
          border-radius: 50px;
          color: #FFF;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 5px 5px 0 #B8244A;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        
        .submit-btn:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 #B8244A;
        }
        
        .submit-btn:active:not(:disabled) {
          transform: translate(2px, 2px);
          box-shadow: 3px 3px 0 #B8244A;
        }
        
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* ===== PROCESSING STATUS ===== */
        .processing-status {
          margin-top: 1rem;
          font-size: 1.1rem;
          color: #FFF;
          font-weight: 600;
          text-align: center;
          animation: pulse 1s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        /* ===== RESULT ===== */
        .result-card {
          width: 100%;
          max-width: 580px;
          margin-top: 2rem;
          background: #FFF;
          border-radius: 24px;
          padding: 1.75rem;
          box-shadow: 10px 10px 0 rgba(0,0,0,0.18);
          animation: cardPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes cardPop {
          from { opacity: 0; transform: scale(0.85) translateY(40px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .result-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        
        .result-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00E5B8, #00B894);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 4px 4px 0 rgba(0,0,0,0.12);
        }
        
        .result-title {
          font-family: 'Bowlby One', cursive;
          font-size: 1.2rem;
          color: #1a1a2e;
        }
        
        .result-text {
          font-size: 1.05rem;
          color: #444;
          line-height: 1.65;
          margin-bottom: 1.25rem;
          font-weight: 500;
        }
        
        .key-points {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1.25rem;
        }
        
        .key-point {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.9rem 1rem;
          background: #f8f8f8;
          border-radius: 14px;
          border-left: 5px solid;
          animation: slideIn 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .key-point:nth-child(1) { border-color: #FF3366; animation-delay: 0.1s; }
        .key-point:nth-child(2) { border-color: #00D4AA; animation-delay: 0.2s; }
        .key-point:nth-child(3) { border-color: #FFD426; animation-delay: 0.3s; }
        .key-point:nth-child(4) { border-color: #7B5CFF; animation-delay: 0.4s; }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .key-point-icon {
          font-size: 1.2rem;
        }
        
        .key-point-text {
          color: #444;
          font-size: 0.9rem;
          line-height: 1.45;
          font-weight: 500;
        }
        
        .result-question {
          font-family: 'Bowlby One', cursive;
          font-size: 1.6rem;
          text-align: center;
          color: #7B5CFF;
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 3px dashed #eee;
        }
        
        .result-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1.25rem;
          flex-wrap: wrap;
        }
        
        .action-btn {
          padding: 0.9rem 1.8rem;
          border-radius: 50px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .action-btn.yes {
          background: #00D4AA;
          border: none;
          color: #FFF;
          box-shadow: 5px 5px 0 #009977;
        }
        
        .action-btn.yes:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 #009977;
        }
        
        .action-btn.retry {
          background: #FFF;
          border: 3px solid #1a1a2e;
          color: #1a1a2e;
          box-shadow: 5px 5px 0 #1a1a2e;
        }
        
        .action-btn.retry:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 #1a1a2e;
        }
        
        /* ===== RESPONSIVE ===== */
        @media (max-width: 700px) {
          .agents-stage { height: 160px; }
          .blob { width: 70px; height: 70px; }
          .eye { width: 16px; height: 20px; }
          .pupil { width: 8px; height: 10px; top: 6px; left: 4px; }
          .eyes { gap: 12px; }
          .mouth { width: 18px; height: 9px; }
          .result-actions { flex-direction: column; }
          .action-btn { width: 100%; }
        }
      `}</style>

      {/* Background */}
      <div className="bg-layer">
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />
        <div className="bg-blob blob-3" />
        <div className="bg-blob blob-4" />
        <div className="bg-blob blob-5" />
      </div>

      <div className="content">
        {/* Header */}
        <header className="header">
          <div className="logo-wrap">
            <h1 className="logo">BRAIN DUMP</h1>
          </div>
          <p className="tagline">Think messy. We'll make sense of it.</p>
        </header>

        {/* Agents */}
        <div className="agents-stage">
          {agents.map((agent, i) => {
            const pos = defaultPositions[i];
            const isActive = isProcessing && processingPhase === i;

            return (
              <div
                key={agent.name}
                className={`agent ${isActive ? 'active' : ''}`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.3 : pos.scale}) rotate(${isActive ? 0 : pos.rotate}deg)`,
                  zIndex: isActive ? 50 : 5 - i,
                }}
              >
                {isActive && (
                  <div className="speech-bubble">{agent.catchphrase}</div>
                )}
                <div
                  className="blob"
                  style={{
                    background: `linear-gradient(145deg, ${agent.highlight} 0%, ${agent.color} 50%, ${agent.shadow} 100%)`,
                    boxShadow: `8px 8px 0 rgba(0,0,0,0.2), inset -12px -12px 25px rgba(0,0,0,0.2), inset 8px 8px 20px rgba(255,255,255,0.25)`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  <div className="face">
                    <div className="eyes">
                      <div className="eye">
                        <div className="pupil" style={{ animationDelay: `${i * 0.4}s` }} />
                      </div>
                      <div className="eye">
                        <div className="pupil" style={{ animationDelay: `${i * 0.4}s` }} />
                      </div>
                    </div>
                    <div className="mouth" />
                  </div>
                </div>
                <span className="agent-label">{agent.name}</span>
              </div>
            );
          })}
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <p className="processing-status">
            {agents[processingPhase]?.name} is working...
          </p>
        )}

        {/* Input */}
        {!result && (
          <div className="input-section">
            <div className={`input-box ${isProcessing ? 'processing' : ''}`}>
              <textarea
                placeholder="Just start typing... your idea doesn't need to make sense yet. That's our job!"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isProcessing}
              />
              <div className="input-footer">
                <span className="hint">Press Enter to dump your thoughts</span>
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={!inputText.trim() || isProcessing}
                >
                  Dump It!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="result-card">
            <div className="result-header">
              <div className="result-icon">✓</div>
              <h2 className="result-title">Here's what we heard...</h2>
            </div>

            <p className="result-text">{result.interpretation}</p>

            <div className="key-points">
              {result.keyPoints.map((point, i) => (
                <div key={i} className="key-point">
                  <span className="key-point-icon">{['•', '•', '•', '•'][i]}</span>
                  <span className="key-point-text">{point}</span>
                </div>
              ))}
            </div>

            <p className="result-question">Did we get it right?</p>

            <div className="result-actions">
              <button className="action-btn yes">Yes! Nailed it</button>
              <button className="action-btn retry" onClick={resetApp}>Try again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
