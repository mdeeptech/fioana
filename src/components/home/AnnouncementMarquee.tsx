const announcements = [
  "FIONA BEAUTY ACADEMY",
  "GUWAHATI & TINSUKIA",
  "COURSES NOW OPEN",
  "SPECIAL ENROLMENT OFFER — UP TO 25% OFF",
  "ENQUIRE NOW",
];

export default function AnnouncementMarquee() {
  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#3A0A1B',
        borderTop: '1px solid rgba(212,175,98,0.20)',
        borderBottom: '1px solid rgba(212,175,98,0.20)',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Left fade mask */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '80px',
          background: 'linear-gradient(to right, #3A0A1B, transparent)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
      {/* Right fade mask */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: '80px',
          background: 'linear-gradient(to left, #3A0A1B, transparent)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Scrolling track */}
      <div
        style={{
          display: 'flex',
          animation: 'heroMarquee 45s linear infinite',
          willChange: 'transform',
        }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            {announcements.map((text, index) => (
              <span key={index} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <span style={{
                  color: '#F7F3EA',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '0 24px',
                  whiteSpace: 'nowrap',
                }}>
                  {text}
                </span>
                <span style={{
                  color: '#D4AF62',
                  fontSize: '10px',
                  flexShrink: 0,
                }}>
                  ◆
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
