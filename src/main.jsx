import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

// Easy to edit: these 100+ birthday wishes float behind the doctor-themed page.
const birthdayWishes = [
  ['English', 'Happy Birthday, Keerthi'], ['Tamil', 'இனிய பிறந்தநாள் வாழ்த்துக்கள், கீர்த்தி'], ['Hindi', 'जन्मदिन मुबारक, कीर्ति'], ['Sinhala', 'සුභ උපන්දිනයක්, කීර්ති'], ['Japanese', 'お誕生日おめでとう、キールティ'], ['Korean', '생일 축하해, 키르티'], ['Chinese', '生日快乐，Keerthi'], ['Arabic', 'عيد ميلاد سعيد، كيرثي'], ['French', 'Joyeux anniversaire, Keerthi'], ['Spanish', 'Feliz cumpleaños, Keerthi'], ['Italian', 'Buon compleanno, Keerthi'], ['German', 'Alles Gute zum Geburtstag, Keerthi'], ['Portuguese', 'Feliz aniversário, Keerthi'], ['Russian', 'С днём рождения, Кирти'], ['Greek', 'Χρόνια πολλά, Keerthi'], ['Thai', 'สุขสันต์วันเกิด, Keerthi'], ['Bengali', 'শুভ জন্মদিন, কীর্তি'], ['Telugu', 'పుట్టినరోజు శుభాకాంక్షలు, కీర్తి'], ['Kannada', 'ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು, ಕೀರ್ತಿ'], ['Malayalam', 'ജന്മദിനാശംസകൾ, കീർത്തി'], ['Marathi', 'वाढदिवसाच्या हार्दिक शुभेच्छा, कीर्ती'], ['Gujarati', 'જન્મદિવસની શુભેચ્છાઓ, કીર્તિ'], ['Punjabi', 'ਜਨਮਦਿਨ ਮੁਬਾਰਕ, ਕੀਰਤੀ'], ['Urdu', 'سالگرہ مبارک، کیرتھی'], ['Nepali', 'जन्मदिनको शुभकामना, कीर्ति'], ['Vietnamese', 'Chúc mừng sinh nhật, Keerthi'], ['Indonesian', 'Selamat ulang tahun, Keerthi'], ['Malay', 'Selamat hari lahir, Keerthi'], ['Filipino', 'Maligayang kaarawan, Keerthi'], ['Burmese', 'မွေးနေ့မင်္ဂလာပါ, Keerthi'], ['Khmer', 'រីករាយថ្ងៃកំណើត, Keerthi'], ['Lao', 'ສຸກສັນວັນເກີດ, Keerthi'], ['Mongolian', 'Төрсөн өдрийн мэнд, Keerthi'], ['Kazakh', 'Туған күніңмен, Кирти'], ['Uzbek', 'Tug‘ilgan kuning bilan, Keerthi'], ['Turkish', 'Doğum günün kutlu olsun, Keerthi'], ['Persian', 'تولدت مبارک، کیرتی'], ['Hebrew', 'יום הולדת שמח, קירתי'], ['Armenian', 'Ծնունդդ շնորհավոր, Keerthi'], ['Georgian', 'გილოცავ დაბადების დღეს, Keerthi'], ['Ukrainian', 'З днем народження, Кірті'], ['Polish', 'Wszystkiego najlepszego, Keerthi'], ['Czech', 'Všechno nejlepší, Keerthi'], ['Slovak', 'Všetko najlepšie, Keerthi'], ['Hungarian', 'Boldog születésnapot, Keerthi'], ['Romanian', 'La mulți ani, Keerthi'], ['Bulgarian', 'Честит рожден ден, Keerthi'], ['Serbian', 'Срећан рођендан, Keerthi'], ['Croatian', 'Sretan rođendan, Keerthi'], ['Slovenian', 'Vse najboljše, Keerthi'], ['Bosnian', 'Sretan rođendan, Keerthi'], ['Macedonian', 'Среќен роденден, Keerthi'], ['Albanian', 'Gëzuar ditëlindjen, Keerthi'], ['Lithuanian', 'Su gimtadieniu, Keerthi'], ['Latvian', 'Daudz laimes dzimšanas dienā, Keerthi'], ['Estonian', 'Palju õnne sünnipäevaks, Keerthi'], ['Finnish', 'Hyvää syntymäpäivää, Keerthi'], ['Swedish', 'Grattis på födelsedagen, Keerthi'], ['Norwegian', 'Gratulerer med dagen, Keerthi'], ['Danish', 'Tillykke med fødselsdagen, Keerthi'], ['Icelandic', 'Til hamingju með afmælið, Keerthi'], ['Dutch', 'Fijne verjaardag, Keerthi'], ['Afrikaans', 'Gelukkige verjaarsdag, Keerthi'], ['Catalan', 'Feliç aniversari, Keerthi'], ['Basque', 'Zorionak, Keerthi'], ['Galician', 'Feliz aniversario, Keerthi'], ['Irish', 'Lá breithe shona duit, Keerthi'], ['Welsh', 'Pen-blwydd hapus, Keerthi'], ['Maltese', 'Għeluq is-sena t-tajjeb, Keerthi'], ['Esperanto', 'Feliĉan naskiĝtagon, Keerthi'], ['Latin', 'Felix sit natalis dies, Keerthi'], ['Swahili', 'Heri ya siku ya kuzaliwa, Keerthi'], ['Zulu', 'Usuku lokuzalwa oluhle, Keerthi'], ['Xhosa', 'Usuku lokuzalwa olumnandi, Keerthi'], ['Yoruba', 'Ẹ ku ọjọ́ ìbí, Keerthi'], ['Igbo', 'Ezi ụbọchị ọmụmụ, Keerthi'], ['Hausa', 'Barka da ranar haihuwa, Keerthi'], ['Amharic', 'መልካም ልደት, Keerthi'], ['Somali', 'Dhalasho wacan, Keerthi'], ['Sesotho', 'Letsatsi le monate la tsoalo, Keerthi'], ['Kinyarwanda', 'Isabukuru nziza, Keerthi'], ['Haitian Creole', 'Bòn fèt, Keerthi'], ['Samoan', 'Manuia lou aso fanau, Keerthi'], ['Hawaiian', 'Hauʻoli lā hānau, Keerthi'], ['Māori', 'Rā whānau ki a koe, Keerthi'], ['Tongan', 'Fiefia he ʻaho fanau, Keerthi'], ['Fijian', 'Marau na siga ni sucu, Keerthi'], ['Javanese', 'Sugeng ambal warsa, Keerthi'], ['Sundanese', 'Wilujeng tepang taun, Keerthi'], ['Tibetan', 'འཁྲུངས་སྐར་བཀྲ་ཤིས, Keerthi'], ['Azerbaijani', 'Ad günün mübarək, Keerthi'], ['Kyrgyz', 'Туулган күнүң менен, Keerthi'], ['Turkmen', 'Doglan günüň gutly bolsun, Keerthi'], ['Tajik', 'Зодрӯз муборак, Keerthi'], ['Belarusian', 'З днём нараджэння, Keerthi'], ['Luxembourgish', 'Alles Guddes fir de Gebuertsdag, Keerthi'], ['Frisian', 'Lokwinske mei dyn jierdei, Keerthi'], ['Corsican', 'Bon anniversariu, Keerthi'], ['Sardinian', 'Bonu cumpleannu, Keerthi'], ['Aragonese', 'Feliz cumpleaños, Keerthi'], ['Quechua', 'Kusisqa paqarichiy p’unchay, Keerthi'], ['Guarani', 'Vy’apavẽ nde arambotýre, Keerthi'], ['Navajo', 'Nizhóní bąąh dahazʼą́ą́h, Keerthi'], ['Emoji', '🎂✨💖 Happy Birthday, Keerthi 💖✨🎂'],
]

const careCards = [
  ['01', 'The healer', 'You bring calm to difficult moments and hope to the people who need it most.', '♡'],
  ['02', 'The listener', 'You notice the quiet things. That is a rare kind of brilliance.', '◌'],
  ['03', 'The human', 'Behind the white coat is a beautiful heart that deserves celebrating today.', '✦'],
]

// Replace with your Formspree endpoint after creating a free form.
const feedbackEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'

// Easy to edit: these notes become the interactive birthday reveal.
const littleThings = [
  'The way your smile can make an ordinary room feel warmer.',
  'How you make people feel seen, heard, and completely themselves.',
  'Your beautiful strength, even on the days you do not notice it.',
  'The tiny details you remember that mean so much to everyone around you.',
  'Your laugh — impossible not to love and even harder not to join.',
  'The kindness you give so naturally, without asking for anything back.',
  'The quiet magic you bring just by being exactly who you are.',
]

function Confetti({ active }) {
  const pieces = useMemo(() => Array.from({ length: 72 }, (_, index) => ({ id: index, left: Math.random() * 100, delay: Math.random() * .8, color: ['#f5c37a', '#f0788f', '#ffffff', '#be9cf2'][index % 4] })), [])
  if (!active) return null
  return <div className="confetti" aria-hidden="true">{pieces.map((piece) => <i key={piece.id} style={{ left: `${piece.left}%`, animationDelay: `${piece.delay}s`, background: piece.color }} />)}</div>
}

function Sparkles() {
  return <div className="sparkles" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ '--left': `${(index * 37) % 100}%`, '--top': `${(index * 61) % 100}%`, '--delay': `${(index % 8) * .45}s`, '--size': `${3 + index % 4}px` }}>✦</i>)}</div>
}

function App() {
  const [opened, setOpened] = useState(false)
  const [finale, setFinale] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [thingIndex, setThingIndex] = useState(0)
  const [rxOpen, setRxOpen] = useState(false)
  const [feedbackStatus, setFeedbackStatus] = useState('')

  useEffect(() => {
    if (!opened) return
    const sections = document.querySelectorAll('.section-shell')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [opened])
  const audioRef = useRef(null)

  useEffect(() => {
    if (opened) document.querySelector('#message')?.scrollIntoView({ behavior: 'smooth' })
  }, [opened])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (playing) audioRef.current.pause()
    else audioRef.current.play().catch(() => {})
    setPlaying(!playing)
  }

  const submitFeedback = async (event) => {
    event.preventDefault()
    if (feedbackEndpoint.includes('YOUR_FORM_ID')) {
      setFeedbackStatus('Add your Formspree endpoint in src/main.jsx first.')
      return
    }
    const form = event.currentTarget
    try {
      const response = await fetch(feedbackEndpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('Unable to send')
      form.reset()
      setFeedbackStatus('Your note has been sent. Thank you for adding a little magic.')
    } catch {
      setFeedbackStatus('Something went wrong. Please try again in a moment.')
    }
  }

  return <main>
    <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/10/25/audio_946b6d7b31.mp3" />
    <Confetti active={opened || finale} />
    <Sparkles />
    <div className="aurora aurora-one" /><div className="aurora aurora-two" />
    <div className="grain" />
    <div className="floating-wishes" aria-hidden="true">{birthdayWishes.map(([language, wish], index) => <span key={`${language}-${index}`} className={`wish wish-${index % 7}`} style={{ '--i': index, '--x': `${(index * 17) % 100}%`, '--y': `${(index * 23) % 94}%` }}><small>{language}</small>{wish}</span>)}</div>
    <header className="topbar"><a className="monogram" href="#top">K<span>·</span></a><div className="topbar-note">a little universe of care <b>＋</b></div><button className="music-button" onClick={toggleMusic} aria-label={playing ? 'Pause music' : 'Play music'}>{playing ? 'Ⅱ' : '♪'} <span>{playing ? 'pause' : 'music'}</span></button></header>

    <section className="hero" id="top">
      <div className="hero-content hero-enter">
        <div className="hero-seal" aria-hidden="true"><span>＋</span><small>private<br />delivery</small><b>♥</b></div>
        <p className="eyebrow"><span /> 11 · 09 · 2026 · today is yours <span /></p>
        <div className="hero-title-wrap"><p className="script">for the doctor with the biggest heart</p><h1>Happy Birthday,<br /><em>Dr. Keerthi</em> <span className="heart">♥</span></h1></div>
        <p className="hero-subtitle">Today, the doctor is officially off duty.</p>
        <button className={`primary-button hero-cta ${opened ? 'opened' : ''}`} onClick={() => setOpened(true)}>{opened ? '♥' : '✨'} <span>{opened ? 'Your surprise is open' : "Open Dr. Keerthi's surprise"}</span> <b>↗</b></button>
        <p className="hero-footnote"><span>♡</span> a little celebration, prescribed just for you <span>♡</span></p>
        <div className="scroll-hint">scroll to discover <span>↓</span></div>
      </div>
    </section>

    {opened && <>
      <section className="message-section section-shell" id="message">
        <div className="section-kicker">01 <span /> from the heart</div><h2>A Little Message <i>For You</i> <span>💌</span></h2>
        <div className="message-card"><div className="quote-mark">“</div><p className="message-copy">Some people make ordinary days feel special.<br />Today, I just want to remind you how special you are.<br /><strong>Happy Birthday, Keerthi. <span>♥</span></strong></p><div className="signature">with all the warmth in the world <span>—</span></div></div>
      </section>
      <section className="care-section section-shell">
        <div className="section-kicker">02 <span /> beyond the white coat</div><h2>The Heart<br /><i>Behind The Care</i> <span>＋</span></h2><p className="section-intro">A small case note on the qualities that make Dr. Keerthi unforgettable.</p>
        <div className="care-grid">{careCards.map(([number, title, text, icon]) => <article className="care-card" key={number}><small>{number} / case note</small><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="things-section section-shell">
        <div className="section-kicker">03 <span /> a few things worth saying</div><h2>The Little Things<br /><i>About You</i> <span>✦</span></h2><p className="section-intro">Tap the little envelope whenever you need a reminder of how loved you are.</p>
        <div className="things-card"><div className="stamp">for<br />keerthi</div><span className="note-number">0{thingIndex + 1} / 07</span><p key={thingIndex} className="thing-note">{littleThings[thingIndex]}</p><button className="note-button" onClick={() => setThingIndex((thingIndex + 1) % littleThings.length)} aria-label="Show another little thing">open another note <b>↗</b></button></div>
      </section>
      <section className="prescription-section section-shell">
        <div className="section-kicker">04 <span /> especially for the doctor of our hearts</div><h2>A Prescription<br /><i>For Joy</i> <span>＋</span></h2><p className="section-intro">Because even the person who takes care of everyone deserves a little care, too.</p>
        <div className={`prescription-card ${rxOpen ? 'rx-open' : ''}`}>
          <div className="rx-header"><span className="rx-symbol">＋</span><div><b>birthday prescription</b><small>for: Dr. Keerthi · today</small></div><span className="rx-mark">Rx</span></div>
          <div className="heartbeat"><span>♡</span><svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-label="Animated heartbeat line"><path d="M0 42 H120 L145 42 L162 12 L184 68 L207 42 H290 L314 42 L334 26 L350 54 L369 42 H600" /></svg></div>
          <div className="rx-body"><div><small>diagnosis</small><p>Exceptionally kind.<br />Incurably wonderful.</p></div><div><small>treatment</small><p>One day of cake,<br />laughter & zero guilt.</p></div></div>
          {rxOpen && <div className="rx-reveal"><span>dosage: </span>infinite joy, taken daily · <b>refill every birthday</b></div>}
          {!rxOpen && <button className="rx-button" onClick={() => setRxOpen(true)}>read the full prescription <b>↗</b></button>}
        </div>
      </section>
      <section className="note-section section-shell">
        <div className="section-kicker">05 <span /> a small open door</div><h2>Leave A Little<br /><i>Note</i> <span>♡</span></h2><p className="section-intro">Want to send a birthday message back? This is completely optional — your details are only used to reply.</p>
        <form className="feedback-form" onSubmit={submitFeedback}>
          <label>Your name<input name="name" type="text" placeholder="Your name" required /></label>
          <label>Your email<input name="email" type="email" placeholder="you@example.com" required /></label>
          <label className="full-field">Your message<textarea name="message" rows="4" placeholder="Write something lovely..." required /></label>
          <label className="consent"><input name="consent" type="checkbox" required /> <span>I agree to share my email so Keerthi can reply.</span></label>
          <button className="note-button" type="submit">send the note <b>↗</b></button>
          {feedbackStatus && <p className="feedback-status" role="status">{feedbackStatus}</p>}
        </form>
      </section>
      <section className="final-section section-shell"><div className="final-card"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><p className="script">before you go...</p><h2>One last <i>thing</i> <span>♡</span></h2>{finale ? <div className="reveal"><p>Happy Birthday once again,<br /><strong>Keerthi ♥</strong></p><span>May your smile always stay this beautiful.</span></div> : <button className="primary-button" onClick={() => setFinale(true)}>💖 <span>Click me</span> <b>↗</b></button>}</div></section>
      <footer><span>K</span> made with a little bit of magic for Keerthi · <b>♥</b></footer>
    </>}
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
