import { useState} from "react";

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Dancing+Script:wght@600;700&display=swap');
`;

const globalStyle = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #fff5f7; font-family: 'Nunito', sans-serif; overflow-x: hidden; }
  @keyframes heartbeat {
    0%,100% { transform: scale(1); }
    14% { transform: scale(1.18); }
    28% { transform: scale(1); }
    42% { transform: scale(1.12); }
  }
  @keyframes bounceIn {
    0%   { opacity: 0; transform: scale(0.65); }
    65%  { transform: scale(1.06); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes floatUp {
    0%   { transform: translateY(0) rotate(-8deg); opacity: 1; }
    100% { transform: translateY(-110vh) rotate(15deg); opacity: 0; }
  }
  @keyframes burst {
    0%   { opacity: 1; transform: translate(0,0) scale(1.2); }
    100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0.2); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes wiggle {
    0%,100% { transform: rotate(-6deg) scale(1); }
    50%     { transform: rotate(6deg) scale(1.1); }
  }
  @keyframes popBadge {
    0%  { opacity: 0; transform: scale(0.5) rotate(-5deg); }
    70% { transform: scale(1.1) rotate(2deg); }
    100%{ opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @keyframes shimmer {
    0%,100% { opacity: 0.7; }
    50%     { opacity: 1; }
  }
`;

function FloatingHearts() {
  const symbols = ["💕","💗","💖","🌸","💞","🩷","✿","🎀"];
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    sym: symbols[i % symbols.length],
    left: `${(i * 5.1) % 100}vw`,
    duration: `${9 + (i % 7)}s`,
    delay: `${(i * 0.7) % 11}s`,
    size: `${15 + (i % 14)}px`,
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {hearts.map(h => (
        <div key={h.id} style={{
          position: "absolute", bottom: "-30px", left: h.left,
          fontSize: h.size, opacity: 0,
          animation: `floatUp ${h.duration} linear ${h.delay} infinite`,
        }}>{h.sym}</div>
      ))}
    </div>
  );
}

function Screen1({ onNext }) {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={{ fontSize: 64, marginBottom: 14, animation: "heartbeat 1.5s ease-in-out infinite", display: "inline-block" }}>💝</div>
        <p style={styles.tagLine}>a little something for</p>
        <div style={styles.nameBig}>Morayo Oyindamola</div>
        <div style={styles.nameSub}>Adenike 🌸</div>
        <div style={styles.dots}>
          {[0,1,2,3,4].map(i => <span key={i} style={styles.dot} />)}
        </div>
        <p style={styles.introText}>
          There's something I've been wanting to say to you<br />
          and I thought… why not make it a little special? 🎀
        </p>
        <button style={styles.btnMain} onMouseEnter={e => Object.assign(e.target.style, styles.btnMainHover)} onMouseLeave={e => Object.assign(e.target.style, styles.btnMain)} onClick={onNext}>
          Open your surprise 🎁
        </button>
      </div>
    </div>
  );
}

function Screen2({ onYes }) {
  const [noMoves, setNoMoves] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  function runAway() {
    if (noMoves >= 5) return;
    const rx = (Math.random() - 0.5) * 240;
    const ry = (Math.random() - 0.5) * 120;
    setNoPos({ x: rx, y: ry });
    setNoMoves(n => n + 1);
  }

  const noVisible = noMoves < 5;

  return (
    <div style={styles.page}>
      <div style={{ ...styles.card, maxWidth: 500, animation: "bounceIn 0.7s cubic-bezier(.17,.67,.3,1.3) both" }}>
        <div style={{ fontSize: 40, marginBottom: 14 }}>🌷</div>
        <h2 style={styles.cardTitle}>Hey you, yes you,<br />Morayo 😊</h2>

        <p style={{ ...styles.bodyText, animationDelay: "0.15s" }}>
         Okay so… I keep trying to find the right words, but honestly, every sentence falls short the moment I look at you.
        </p>

        <div style={styles.bubble}>
          <p style={{ ...styles.bodyText, margin: 0, color: "#c06080" }}>
            Looking at you… just staring at your face somehow makes ordinary days feel like something worth remembering. 💕
          </p>
        </div>

        <p style={{ ...styles.bodyText, ...styles.bigQuote }}>
          "I LOVE you. A lot. More than I know how to say — so I made this little website instead. 
        </p>

<p style={{ ...styles.bodyText, ...styles.bigQuote }}>
           Remember when I said I'd do my own things my own way?... This is my way... It is a little bit strange but I love strange, not Doctor Strange though" 😄 
        </p>
       

        <p style={{ ...styles.bodyText, marginBottom: 8 }}>
          So here I am, asking you the most important question:
        </p>

        <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(22px,5vw,32px)", color: "#e8527a", fontWeight: 700, margin: "20px 0", lineHeight: 1.3 }}>
          Will you be my girlfriend? 💖
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 28, alignItems: "flex-start" }}>
          <button
            style={styles.btnYes}
            onMouseEnter={e => Object.assign(e.target.style, styles.btnYesHover)}
            onMouseLeave={e => Object.assign(e.target.style, styles.btnYes)}
            onClick={onYes}
          >
            Yes! Obviously!! 🥰
          </button>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button
              id="no-btn"
              style={{
                ...styles.btnNo,
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                transition: "transform 0.35s cubic-bezier(.17,.67,.4,1.4)",
                opacity: noVisible ? 1 : 0.08,
                pointerEvents: noVisible ? "auto" : "none",
                color: "#d63f72",
                backgroundColor: "#fff",
              }}
              onMouseEnter={runAway}
              onClick={runAway}
            >
              Hmm maybe...
            </button>
            <span style={{ fontSize: 11, color: "#f4b8ca", marginTop: 6 }}>You can't say NO because you've no choice in this</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BurstHeart({ x, y, sym, onDone }) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 80 + Math.random() * 80;
  const tx = Math.cos(angle) * dist;
  const ty = Math.sin(angle) * dist;
  return (
    <div style={{
      position: "fixed", left: x, top: y, fontSize: 22,
      pointerEvents: "none", zIndex: 9999,
      "--tx": `${tx}px`, "--ty": `${ty}px`,
      animation: `burst ${0.8 + Math.random() * 0.5}s ease forwards`,
    }} onAnimationEnd={onDone}>{sym}</div>
  );
}

function Screen3() {
  return (
    <div style={styles.page}>
      <div style={{ ...styles.card, animation: "bounceIn 0.7s cubic-bezier(.17,.67,.3,1.3) both" }}>
        <div style={{ fontSize: 34, marginBottom: 18, animation: "wiggle 0.7s ease infinite" }}>
          🎉💕🎊💝🎀
        </div>
        <h2 style={{ ...styles.cardTitle, fontSize: "clamp(32px,8vw,52px)", marginBottom: 20 }}>
          She said YES!!! 🥳
        </h2>
        <p style={{ ...styles.bodyText, marginBottom: 10 }}>
          Well… that definitely just made my whole day better 💃💕... I'm dying of heat here at Lekki

        </p>
        <p style={{ ...styles.bodyText, marginBottom: 10 }}>
          You just made me the happiest person right now. Like genuinely. 🌸
        </p>
        <p style={styles.bodyText}>
          This is us now. Whatever comes, we face it together — the good days, the stressful ones, the overthinking, the complaints… all of it. 💑
 💑
        </p>
        <div style={{ display: "inline-block", background: "#fff0f4", border: "1.5px solid #ffd6e0", borderRadius: 50, padding: "10px 28px", fontSize: 13, fontWeight: 800, color: "#e8527a", marginTop: 32, animation: "popBadge 0.6s 0.4s cubic-bezier(.17,.67,.3,1.3) both", opacity: 0 }}>
          💖 Official Girlfriend Status: Unlocked 💖
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState(1);
  const [bursts, setBursts] = useState([]);
  const [rainHearts, setRainHearts] = useState([]);

  function handleYes(e) {
    const cx = e?.clientX ?? window.innerWidth / 2;
    const cy = e?.clientY ?? window.innerHeight / 2;
    const syms = ["💕","💗","💖","✨","🌸","💞"];
    const newBursts = Array.from({ length: 16 }, (_, i) => ({
      id: Date.now() + i, x: cx, y: cy,
      sym: syms[i % syms.length],
    }));
    setBursts(newBursts);

    setTimeout(() => {
      setScreen(3);
      const rh = Array.from({ length: 55 }, (_, i) => ({
        id: i,
        sym: syms[i % syms.length],
        left: `${(i * 1.9) % 100}vw`,
        duration: `${2.5 + (i % 5) * 0.5}s`,
        delay: `${(i * 0.09) % 2.5}s`,
        size: `${16 + (i % 14)}px`,
      }));
      setRainHearts(rh);
      setTimeout(() => setRainHearts([]), 6000);
    }, 650);
  }

  return (
    <>
      <style>{fonts}{globalStyle}</style>
      <FloatingHearts />

      {/* Burst hearts */}
      {bursts.map(b => (
        <BurstHeart key={b.id} x={b.x} y={b.y} sym={b.sym} onDone={() => setBursts(prev => prev.filter(p => p.id !== b.id))} />
      ))}

      {/* Rain hearts */}
      {rainHearts.map(h => (
        <div key={h.id} style={{
          position: "fixed", top: "-40px", left: h.left,
          fontSize: h.size, pointerEvents: "none", zIndex: 999,
          animation: `floatUp ${h.duration} linear ${h.delay} forwards`,
        }}>{h.sym}</div>
      ))}

      {screen === 1 && <Screen1 onNext={() => setScreen(2)} />}
      {screen === 2 && <Screen2 onYes={handleYes} />}
      {screen === 3 && <Screen3 />}
    </>
  );
}

const styles = {
  page: {
    position: "relative", zIndex: 1,
    minHeight: "100vh", display: "flex",
    flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "48px 24px",
    textAlign: "center",
  },
  card: {
    background: "#fff", borderRadius: 32,
    padding: "48px 40px", maxWidth: 480, width: "100%",
    boxShadow: "0 8px 40px rgba(255,100,140,0.14), 0 2px 12px rgba(255,100,140,0.08)",
    animation: "bounceIn 0.7s cubic-bezier(.17,.67,.3,1.3) both",
    textAlign: "center",
  },
  tagLine: {
    fontSize: 12, fontWeight: 700, letterSpacing: 3,
    color: "#ffb3c6", textTransform: "uppercase", marginBottom: 10,
  },
  nameBig: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: "clamp(30px,7vw,48px)", fontWeight: 700,
    color: "#e8527a", lineHeight: 1.15, marginBottom: 6,
  },
  nameSub: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: "clamp(17px,4vw,24px)", color: "#f48fb1", marginBottom: 24,
  },
  dots: { display: "flex", gap: 6, justifyContent: "center", margin: "0 auto 20px" },
  dot: { width: 6, height: 6, borderRadius: "50%", background: "#ffb3c6", display: "inline-block" },
  introText: { fontSize: 15, color: "#b06080", lineHeight: 1.9, marginBottom: 28, fontWeight: 400 },
  cardTitle: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: "clamp(26px,6vw,42px)", fontWeight: 700,
    color: "#e8527a", lineHeight: 1.25, marginBottom: 20,
  },
  bodyText: {
    fontSize: 15, color: "#b06080", lineHeight: 1.95,
    marginBottom: 16, fontWeight: 400,
    animation: "fadeSlideUp 0.7s ease both",
  },
  bigQuote: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: "clamp(17px,3.5vw,22px)", color: "#e8527a",
    fontWeight: 600, lineHeight: 1.6, margin: "20px 0",
  },
  bubble: {
    background: "#fff0f4", borderRadius: 20,
    padding: "14px 18px", margin: "16px 0",
    border: "1.5px solid #ffd6e0",
  },
  btnMain: {
    background: "linear-gradient(135deg,#ff6b8a,#e8527a)",
    border: "none", color: "#fff",
    padding: "15px 42px", borderRadius: 50,
    fontFamily: "'Nunito', sans-serif",
    fontSize: 15, fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 4px 18px rgba(232,82,122,0.35)",
    transition: "all 0.25s ease", letterSpacing: 0.5,
    display: "inline-block",
  },
  btnMainHover: {
    background: "linear-gradient(135deg,#ff6b8a,#e8527a)",
    border: "none", color: "#fff",
    padding: "15px 42px", borderRadius: 50,
    fontFamily: "'Nunito', sans-serif",
    fontSize: 15, fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 8px 28px rgba(232,82,122,0.5)",
    transition: "all 0.25s ease",
    transform: "translateY(-3px) scale(1.04)",
    letterSpacing: 0.5, display: "inline-block",
  },
  btnYes: {
    background: "linear-gradient(135deg,#ff6b8a,#e8527a)",
    border: "none", color: "#fff",
    padding: "15px 40px", borderRadius: 50,
    fontFamily: "'Nunito', sans-serif",
    fontSize: 15, fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 4px 18px rgba(232,82,122,0.35)",
    transition: "all 0.25s ease",
    display: "inline-block",
  },
  btnYesHover: {
    background: "linear-gradient(135deg,#ff6b8a,#e8527a)",
    border: "none", color: "#fff",
    padding: "15px 40px", borderRadius: 50,
    fontFamily: "'Nunito', sans-serif",
    fontSize: 15, fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 8px 28px rgba(232,82,122,0.5)",
    transition: "all 0.25s ease",
    transform: "translateY(-3px) scale(1.05)",
    display: "inline-block",
  },
  btnNo: {
    background: "#fff",
    border: "2px solid #ffd6e0",
    color: "#d63f72",
    padding: "15px 28px", borderRadius: 50,
    fontFamily: "'Nunito', sans-serif",
    fontSize: 14, fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.35s cubic-bezier(.17,.67,.4,1.4)",
    display: "inline-block",
  },
};