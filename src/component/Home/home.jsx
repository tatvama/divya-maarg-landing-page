import React, { useEffect, useRef, useState } from 'react';
import './home.css';

const LAUNCH_DATE = new Date('2026-06-04T10:00:00');

export default function Home() {
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '' });
  const [statusMsg, setStatusMsg] = useState({ text: '', ok: true });
  const [dialog, setDialog] = useState({ open: false, name: '' });
  const starsRef = useRef(null);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    for (let i = 0; i < 80; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.setProperty('--dur', `${2 + Math.random() * 4}s`);
      star.style.setProperty('--delay', `${Math.random() * 5}s`);
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      container.appendChild(star);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  useEffect(() => {
    const tick = () => {
      const diff = LAUNCH_DATE - new Date();
      if (diff <= 0) { setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' }); return; }
      setCountdown({
        days: String(Math.floor(diff / 86400000)).padStart(2, '0'),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name   = formData.name.trim();
    const mobile = formData.mobile.trim().replace(/\s+/g, '');
    const email  = formData.email.trim();

    const err = (msg) => { setStatusMsg({ text: '✦ ' + msg, ok: false }); };

    if (!name)                                    return err('Please enter your full name.');
    if (!/^[6-9]\d{9}$/.test(mobile))            return err('Please enter a valid 10-digit Indian mobile number.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err('Please enter a valid email address.');

    try {
      const existing = JSON.parse(localStorage.getItem('dm_subscribers') || '[]');
      if (!existing.find(r => r.email === email)) {
        existing.push({ name, mobile, email, at: new Date().toISOString() });
        localStorage.setItem('dm_subscribers', JSON.stringify(existing));
      }
    } catch (_) {}

    const body = new URLSearchParams({
      'entry.1692768234': name,
      'entry.982339615':  mobile,
      'entry.276093511':  email,
      'fvv': '1',
      'pageHistory': '0',
    });
    fetch(process.env.REACT_APP_GFORM_ACTION, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }).catch(() => {});

    setFormData({ name: '', mobile: '', email: '' });
    setDialog({ open: true, name });
  };

  return (
    <>
      <div className="bg-cosmos" aria-hidden="true"></div>
      <div className="bg-grid" aria-hidden="true"></div>
      <div className="bg-glow bg-glow-1" aria-hidden="true"></div>
      <div className="bg-glow bg-glow-2" aria-hidden="true"></div>
      <div className="bg-glow bg-glow-3" aria-hidden="true"></div>
      <div className="stars" ref={starsRef} aria-hidden="true"></div>
      <div className="om-watermark" aria-hidden="true">ॐ</div>

      <main className="hero">

        <header className="topbar" data-aos="fade-down" data-aos-duration="350" data-aos-once="true">
          <div className="brand">
            <div className="brand-mark">
              <img src="/Divya-maarg-logo.png" alt="Divya Maarg" className="brand-logo" />
            </div>
            <div className="brand-text">
              <span className="brand-name">Divya Maarg</span>
              <span className="brand-tag">Astro · Life Path · Temple</span>
            </div>
          </div>
          <span className="topbar-pill">
            <span className="pulse-dot"></span>
            Sacred Launch Coming Soon
          </span>
        </header>

        <section className="hero-center">
          <div className="sacred-rings" aria-hidden="true">
            <span className="ring ring-1"></span>
            <span className="ring ring-2"></span>
            <span className="ring ring-3"></span>
            <span className="ring ring-4"></span>
          </div>

          <div className="om-center" data-aos="zoom-in" data-aos-duration="400" data-aos-once="true" aria-hidden="true">
            <span className="om-glyph">ॐ</span>
          </div>

          <div className="badge" data-aos="fade-up" data-aos-duration="350" data-aos-delay="50" data-aos-once="true">
            <span className="badge-spark">✦</span>
            <span>The Divine Path Awakens</span>
            <span className="badge-spark">✦</span>
          </div>

          <h1 className="title" data-aos="fade-up" data-aos-duration="350" data-aos-delay="100" data-aos-once="true">
            <span className="title-line">Divya</span>
            <span className="title-line">Maarg</span>
          </h1>

          <p className="built-by" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150" data-aos-once="true">
            Built by <span className="built-by-highlight">Tatvam AI Labs</span>
          </p>

          <div className="ornament" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150" data-aos-once="true" aria-hidden="true">
            <span className="ornament-line"></span>
            <span className="ornament-diamond">◆</span>
            <span className="ornament-line"></span>
          </div>

          <p className="subtitle" data-aos="fade-up" data-aos-duration="300" data-aos-delay="200" data-aos-once="true">
            <span className="quote-mark">"</span>
            Ancient Light. Your Path.
            <span className="quote-mark">"</span>
          </p>

          <div className="countdown" data-aos="fade-up" data-aos-duration="350" data-aos-delay="200" data-aos-once="true" aria-label="Time until launch">
            <div className="cd-cell">
              <span className="cd-num">{countdown.days}</span>
              <span className="cd-lbl">Days</span>
            </div>
            <span className="cd-sep" aria-hidden="true">:</span>
            <div className="cd-cell">
              <span className="cd-num">{countdown.hours}</span>
              <span className="cd-lbl">Hours</span>
            </div>
            <span className="cd-sep" aria-hidden="true">:</span>
            <div className="cd-cell">
              <span className="cd-num">{countdown.minutes}</span>
              <span className="cd-lbl">Minutes</span>
            </div>
            <span className="cd-sep" aria-hidden="true">:</span>
            <div className="cd-cell">
              <span className="cd-num">{countdown.seconds}</span>
              <span className="cd-lbl">Seconds</span>
            </div>
          </div>

          <form className="subscribe" data-aos="fade-up" data-aos-duration="350" data-aos-delay="250" data-aos-once="true" noValidate onSubmit={handleSubmit}>
            <div className="sub-card">
              <p className="sub-card-title">
                <span className="badge-spark">✦</span>
                Get Notified at Launch
                <span className="badge-spark">✦</span>
              </p>
              <div className="sub-fields">
                <div className="sub-field">
                  <span className="sub-field-icon" aria-hidden="true">👤</span>
                  <input type="text" className="sub-input" placeholder="Your Full Name" autoComplete="name" required
                    value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="sub-field">
                  <span className="sub-field-icon" aria-hidden="true">📱</span>
                  <input type="tel" className="sub-input" placeholder="Mobile Number" autoComplete="tel" required
                    value={formData.mobile} onChange={e => setFormData(p => ({ ...p, mobile: e.target.value }))} />
                </div>
                <div className="sub-field">
                  <span className="sub-field-icon" aria-hidden="true">✉</span>
                  <input type="email" className="sub-input" placeholder="Email Address" autoComplete="email" required
                    value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                </div>
              </div>
              <button type="submit" className="sub-btn">
                <span className="sub-btn-text">Notify Me</span>
                <span className="sub-btn-arrow" aria-hidden="true">→</span>
              </button>
            </div>
            <p className="sub-success" role="status" aria-live="polite"
              style={{ color: statusMsg.ok ? '#6EE7B7' : '#FCA5A5' }}>
              {statusMsg.text}
            </p>
          </form>

          <div className="trust-pills" data-aos="fade-up" data-aos-duration="350" data-aos-delay="250" data-aos-once="true">
            <span className="trust-pill"><span className="trust-icon">🔮</span>Vedic Astrology</span>
            <span className="trust-pill"><span className="trust-icon">🛕</span>Sacred Pujas</span>
            <span className="trust-pill"><span className="trust-icon">🪷</span>Spiritual Guidance</span>
            <span className="trust-pill"><span className="trust-icon">📿</span>Divine Remedies</span>
          </div>
        </section>

        <section className="about-section">
          <div className="section-header" data-aos="fade-up" data-aos-duration="350" data-aos-once="true">
            <h2 className="preview-title">What is Divya Maarg?</h2>
            <div className="preview-rule" aria-hidden="true"></div>
          </div>
          <div className="about-content" data-aos="fade-up" data-aos-duration="350" data-aos-delay="50" data-aos-once="true">
            <div className="about-emblem" aria-hidden="true">🌟</div>
            <p className="about-lead">India's First <span className="gold-text">Dharmic Life Navigation Ecosystem</span></p>
            <p className="about-body">
              Divya Maarg is not just an astrology app; it is India's first Dharmic Life Navigation Ecosystem.
              It is a full-stack digital spiritual platform designed to provide a personal "sacred path" for
              every user, offering deep clarity, direction, and actionable spiritual intelligence.
            </p>
          </div>
        </section>

        <section className="pillars-section">
          <div className="section-header" data-aos="fade-up" data-aos-duration="350" data-aos-once="true">
            <h2 className="preview-title">How is it Different?</h2>
            <div className="preview-rule" aria-hidden="true"></div>
            <p className="section-intro">
              Traditional astrology platforms rely on generic predictions, one-time transactions, and often
              use fear-based language (e.g., "Saturn is bad"). Divya Maarg disrupts this by offering a message
              of empowerment and an ongoing relationship. Instead of just a Kundli, users receive a highly
              personalized Dharmic Life Map. The platform seamlessly integrates four core pillars:
            </p>
          </div>
          <div className="pillars-grid">
            {[
              { pc: '#7C3AED', num: '01', name: 'Jyotir Marga', tagline: 'AI-Driven Spiritual Intelligence', desc: 'The AI-driven spiritual intelligence report — your highly personalized Dharmic Life Map, not just a Kundli.' },
              { pc: '#D97706', num: '02', name: 'Divya Karma', tagline: 'Personalized Remedy Prescriptions', desc: 'Personalized remedy prescriptions — gemstones, yantras, and remedies mapped directly to your chart.' },
              { pc: '#0891B2', num: '03', name: 'Divya Kriya', tagline: 'Customized Daily Practices', desc: 'Customized daily practices, mantras, and fasting guidance tailored to your current dasha period and life phase.' },
              { pc: '#059669', num: '04', name: 'Divya Seva', tagline: 'Remote Temple Pujas & Guidance', desc: 'Remote temple puja bookings and direct guidance sessions with trained spiritual advisors.' },
            ].map((p, i) => (
              <article key={p.num} className="pillar-card" style={{ '--pc': p.pc }}
                data-aos="fade-up" data-aos-duration="350" data-aos-delay={i * 60} data-aos-once="true">
                <div className="pillar-glow"></div>
                <div className="pillar-num">{p.num}</div>
                <h3 className="pillar-name">{p.name}</h3>
                <p className="pillar-tagline">{p.tagline}</p>
                <p className="pillar-desc">{p.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="impact-section">
          <div className="section-header" data-aos="fade-up" data-aos-duration="350" data-aos-once="true">
            <h2 className="preview-title">How it Will Impact People</h2>
            <div className="preview-rule" aria-hidden="true"></div>
          </div>
          <div className="impact-card" data-aos="fade-up" data-aos-duration="350" data-aos-once="true">
            <p className="impact-body">
              Modern individuals face immense challenges, including mental stress, career confusion,
              relationship delays, and financial uncertainty. Divya Maarg acts as a{' '}
              <span className="gold-text">"trusted elder,"</span> stepping in to provide emotional
              reassurance and solutions during these crises.
            </p>
            <div className="impact-grid">
              <div className="impact-item" data-aos="zoom-in" data-aos-duration="300" data-aos-delay="0"   data-aos-once="true"><span className="impact-icon">🧘</span><span>Mental Clarity</span></div>
              <div className="impact-item" data-aos="zoom-in" data-aos-duration="300" data-aos-delay="60"  data-aos-once="true"><span className="impact-icon">💼</span><span>Career Direction</span></div>
              <div className="impact-item" data-aos="zoom-in" data-aos-duration="300" data-aos-delay="120" data-aos-once="true"><span className="impact-icon">💞</span><span>Relationship Guidance</span></div>
              <div className="impact-item" data-aos="zoom-in" data-aos-duration="300" data-aos-delay="180" data-aos-once="true"><span className="impact-icon">💰</span><span>Financial Insight</span></div>
            </div>
            <p className="impact-sub">
              By delivering personalized daily WhatsApp Panchang alerts and exact remedies, it ensures
              users never feel lost on their life journey.
            </p>
          </div>
        </section>

        <section className="tech-section">
          <div className="section-header" data-aos="fade-up" data-aos-duration="350" data-aos-once="true">
            <h2 className="preview-title">How Ancient Knowledge is Indexed to AI</h2>
            <div className="preview-rule" aria-hidden="true"></div>
          </div>
          <div className="tech-card" data-aos="fade-up" data-aos-duration="350" data-aos-once="true">
            <div className="tech-split">
              <div className="tech-block" data-aos="fade-right" data-aos-duration="350" data-aos-delay="50" data-aos-once="true">
                <div className="tech-icon-box">📜</div>
                <h3 className="tech-block-title">Ancient Foundations</h3>
                <p className="tech-block-desc">
                  Divya Maarg merges thousands of years of Vedic wisdom with modern technology. The
                  platform's core engine uses the <strong>Surya Siddhanta</strong> (a 4th-century CE
                  astronomical text) and the <strong>Swiss Ephemeris</strong> to calculate exact planetary
                  positions, doshas, and dasha periods with mathematical precision spanning millennia.
                </p>
              </div>
              <div className="tech-arrow" aria-hidden="true">
                <span className="tech-arrow-line"></span>
                <span className="tech-arrow-glyph">✦</span>
                <span className="tech-arrow-line"></span>
              </div>
              <div className="tech-block" data-aos="fade-left" data-aos-duration="350" data-aos-delay="50" data-aos-once="true">
                <div className="tech-icon-box">🤖</div>
                <h3 className="tech-block-title">AI Translation Layer</h3>
                <p className="tech-block-desc">
                  This raw, ancient data is fed into <strong>Large Language Models (LLMs) fine-tuned on
                  Vedic texts</strong>. The AI translates complex astrological calculations into warm,
                  empathetic, human-sounding guidance — giving users clear reasons why a specific remedy
                  or practice will help them navigate their current life phase.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="team-section">
          <div className="section-header" data-aos="fade-up" data-aos-duration="350" data-aos-once="true">
            <h2 className="preview-title">The Visionaries Behind the Platform</h2>
            <div className="preview-rule" aria-hidden="true"></div>
            <p className="section-intro">The sacred souls and brilliant minds bringing Divya Maarg to life.</p>
          </div>
          <div className="team-grid">
            {[
              { avatar: '🙏', badge: 'Founder · Chief Spiritual Guide', name: 'Dr. Pujya Sri Gurumurthy Guruji', desc: 'Trained under Shri Thrayambak Babaji, Guruji is a nationally recognized spiritual authority with a dedicated following of over 10,000 devotees, lending immense trust and authenticity to the platform.' },
              { avatar: '🕉️', badge: 'Platform Co-Founder · Spiritual Reference', name: 'Yogi Shivanand Ji', desc: 'A devoted disciple of Pujya Sri Gurumurthy Guruji belonging to the revered Mahavatar Babaji Guru Parampare. Known for his profound sadhanas, including offerings to Kaalabhairava, he provides a deep spiritual anchor to the project.' },
              { avatar: '⚡', badge: 'Technology Leadership · Tatvam AI Labs', name: 'Sai Ram G Gowda', desc: 'A 28-year-old tech visionary and son of Pujya Sri Gurumurthy Guruji. Through Tatvam AI Labs, he spearheads the AI training and platform architecture to seamlessly bridge Vedic traditions with cutting-edge technology.' },
            ].map((m, i) => (
              <article key={m.name} className="team-card"
                data-aos="fade-up" data-aos-duration="350" data-aos-delay={i * 70} data-aos-once="true">
                <div className="team-card-top">
                  <div className="team-avatar">{m.avatar}</div>
                  <span className="team-role-badge">{m.badge}</span>
                </div>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-desc">{m.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mission-section">
          <div className="mission-card" data-aos="fade-up" data-aos-duration="350" data-aos-once="true">
            <div className="mission-om" aria-hidden="true">ॐ</div>
            <h2 className="mission-title">A Mission Driven by Dharma, Not Profit</h2>
            <div className="preview-rule" style={{ marginBottom: '1.5rem' }} aria-hidden="true"></div>
            <p className="mission-body">
              While built on a highly scalable digital infrastructure, the ultimate purpose of Divya Maarg
              transcends commerce. Operating as a <span className="gold-text">not-for-profit initiative</span>,
              the revenues generated from the platform will be channeled directly into social upliftment.
            </p>
            <div className="mission-goals">
              <div className="mission-goal" data-aos="fade-right" data-aos-duration="300" data-aos-delay="0"   data-aos-once="true"><span className="mission-goal-icon">🏥</span><span>Funding the construction of hospitals</span></div>
              <div className="mission-goal" data-aos="fade-right" data-aos-duration="300" data-aos-delay="60"  data-aos-once="true"><span className="mission-goal-icon">🛕</span><span>Rebuilding ancient temples</span></div>
              <div className="mission-goal" data-aos="fade-right" data-aos-duration="300" data-aos-delay="120" data-aos-once="true"><span className="mission-goal-icon">📿</span><span>Preservation of Sanatan Dharma</span></div>
            </div>
          </div>
        </section>

        <section className="mantra">
          <div className="mantra-card" data-aos="zoom-in" data-aos-duration="350" data-aos-once="true">
            <span className="mantra-quote-mark left">"</span>
            <p className="mantra-text">
              Your birth chart is not a sentence — it is a map.<br />
              Jyotish illuminates the path, never imprisons you on it.
            </p>
            <p className="mantra-author">— Pujya Sri Gurumurthy Guruji</p>
            <span className="mantra-quote-mark right">"</span>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-rule" aria-hidden="true"></div>
          <div className="footer-inner" data-aos="fade-up" data-aos-duration="350" data-aos-once="true">
            <div className="footer-brand">
              <span className="footer-om">ॐ</span>
              <div>
                <div className="footer-name">Divya Maarg</div>
                <div className="footer-sub">The Sacred Path · Est. 2026</div>
              </div>
            </div>
            <div className="footer-contact">
              <a href="mailto:support@divyamaarg.com" className="footer-link">
                <span className="footer-link-icon">✉</span> support@divyamaarg.com
              </a>
              <span className="footer-divider" aria-hidden="true">·</span>
              <span className="footer-loc">
                <span className="footer-link-icon">📍</span> Bengaluru, Karnataka, India
              </span>
            </div>
          </div>
          <p className="footer-copyright" data-aos="fade-up" data-aos-duration="300" data-aos-delay="50" data-aos-once="true">
            © 2026 Divya Maarg · Where ancient wisdom meets the modern seeker · Made with 🙏 in India
          </p>
        </footer>

      </main> 

      {dialog.open && (
        <div className="dlg-overlay" onClick={() => setDialog({ open: false, name: '' })}>
          <div className="dlg-box" onClick={e => e.stopPropagation()}>
            <div className="dlg-om" aria-hidden="true">ॐ</div>
            <div className="dlg-spark-row" aria-hidden="true">
              <span className="dlg-spark">✦</span>
              <span className="dlg-spark">✦</span>
              <span className="dlg-spark">✦</span>
            </div>
            <h2 className="dlg-title">🙏 Thank You, {dialog.name}!</h2>
            <p className="dlg-body">
              Your details have been received on the sacred path of <span className="dlg-gold">Divya Maarg</span>.
            </p>
            <p className="dlg-sub">
              We will reach out to you personally before the launch.<br />
              May the divine light guide your journey. 🪔
            </p>
            <button className="dlg-close-btn" onClick={() => setDialog({ open: false, name: '' })}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
