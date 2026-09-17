'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, Code2, GitBranch, Globe2, Mail, Menu, Moon, Send, Sun, X } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { journey, links, process, projects, services, skillGroups, technologyIcons } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const navItems = [['Projects', 'projects'], ['Contact', 'contact']]
const gmailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=hasnaintahir605@gmail.com'

function Reveal({ children, className = '' }) { return <div className={`reveal ${className}`}>{children}</div> }
function SectionLabel({ number, children }) { return <div className="section-label"><span>{number}</span><span>{children}</span></div> }

function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  useEffect(() => { gsap.fromTo(navRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', delay: .2 }) }, [])
  return <header ref={navRef} className="floating-nav">
    <a href="#top" className="brand">~/hasnain<span>_</span></a>
    <nav className={open ? 'mobile-open' : ''} aria-label="Primary navigation">
      {navItems.map(([label, id]) => <a key={id} href={id === 'contact' ? gmailComposeUrl : `#${id}`} target={id === 'contact' ? '_blank' : undefined} rel={id === 'contact' ? 'noreferrer' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
      <a href={links.github} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>GitHub</a>
    </nav>
    <div className="nav-actions"><a href={links.whatsapp} className="talk-button">Let&apos;s Talk <ArrowUpRight size={15} /></a><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X size={20} /> : <Menu size={20} />}</button></div>
  </header>
}

function ThemeToggle({ theme, setTheme }) {
  const [show, setShow] = useState(false)
  const chooseTheme = (nextTheme) => { setTheme(nextTheme); setShow(false) }
  return <div className="theme-wrap"><div className={`theme-menu ${show ? 'visible' : ''}`}><button onClick={() => chooseTheme('dark')} className={theme === 'dark' ? 'selected' : ''}><Moon size={14} /> Dark</button><button onClick={() => chooseTheme('light')} className={theme === 'light' ? 'selected' : ''}><Sun size={14} /> Light</button></div><button className="theme-toggle" onClick={() => setShow(!show)} aria-label="Choose color theme">{theme === 'dark' ? <Moon size={17} /> : <Sun size={17} />}</button></div>
}

function Hero() { return <section className="hero section-shell" id="top"><div className="hero-copy"><div className="availability"><span /> Available for internship opportunities</div><p className="kicker">MERN STACK DEVELOPER <span>— 2026</span></p><h1>Building digital<br /><em>experiences</em> that<br />feel <span>alive.</span></h1><p className="hero-description">I&apos;m a MERN Stack Developer Intern candidate focused on building thoughtful, practical products with React, Next.js, Node.js and MongoDB.</p><div className="hero-actions"><a className="primary-button" href="#projects">View projects <ArrowUpRight size={17} /></a><a className="secondary-button" href={links.whatsapp}>Let&apos;s talk <ArrowUpRight size={17} /></a></div><div className="hero-meta"><span>6+ months learning &amp; building</span><span>Based in Pakistan</span></div></div><div className="hero-visual" aria-label="Decorative developer visual"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="code-window"><div className="window-bar"><span /><span /><span /><small>portfolio.js</small></div><div className="code-lines"><p><i>const</i> developer = {'{'}</p><p className="indent"><b>name:</b> <strong>&apos;Hasnain&apos;</strong>,</p><p className="indent"><b>focus:</b> <strong>&apos;MERN stack&apos;</strong>,</p><p className="indent"><b>mindset:</b> <strong>&apos;keep building&apos;</strong></p><p>{'}'}</p><p className="cursor-line"><span className="prompt">›</span> <span className="cursor" /></p></div></div><div className="visual-tag tag-top">01 / creativity</div><div className="visual-tag tag-bottom">02 / curiosity</div><div className="visual-cross cross-one">+</div><div className="visual-cross cross-two">+</div></div></section> }

function About() { return <section className="section-shell about-section" id="about"><Reveal><SectionLabel number="01">About me</SectionLabel></Reveal><div className="about-grid"><Reveal className="about-heading"><h2>Curious by nature,<br /><span>builder by choice.</span></h2></Reveal><Reveal className="about-copy"><p>I&apos;m a MERN Stack Developer with 6+ months of learning and hands-on project experience. I enjoy turning ideas into clean, responsive interfaces and reliable backend experiences.</p><p>My focus is growing through real-world development: building practical projects, learning from every iteration and strengthening my frontend, backend, REST API and MongoDB skills. I understand JWT authentication concepts and cloud image storage with ImageKit (an AWS-style cloud service), while keeping this portfolio simple and login-free.</p><a className="text-link" href={links.email}>Let&apos;s connect <ArrowUpRight size={16} /></a></Reveal></div></section> }

function Skills() { const [active, setActive] = useState('Frontend'); return <section className="section-shell skills-section" id="skills"><Reveal><SectionLabel number="02">My toolkit</SectionLabel></Reveal><div className="skills-intro"><Reveal><h2>A toolkit that<br /><span>keeps evolving.</span></h2></Reveal><Reveal><p>I believe the best tools are the ones that help you stay curious, move with intention and make the work better.</p></Reveal></div><div className="skills-explorer"><div className="skill-sidebar"><div className="file-label"><Code2 size={15} /> skills.json</div>{Object.keys(skillGroups).map((category, index) => <button key={category} className={active === category ? 'active' : ''} onClick={() => setActive(category)}><span>0{index + 1}</span>{category}<ChevronDown size={14} /></button>)}</div><div className="skill-detail" key={active}><div className="detail-top"><span>category / {active.toLowerCase()}</span><span>{skillGroups[active].length} skills</span></div><h3>{active}</h3><p>Tools and technologies I use to turn ideas into useful experiences.</p><div className="skill-pills">{skillGroups[active].map(skill => <div className="skill-pill" key={skill}><span>{technologyIcons[skill]}</span>{skill}</div>)}</div><div className="detail-footer"><span>learning never stops</span><span>↗</span></div></div></div></section> }

function Journey() { return <section className="section-shell journey-section"><Reveal><SectionLabel number="03">Learning journey</SectionLabel></Reveal><div className="journey-heading"><Reveal><h2>Small steps,<br /><span>real progress.</span></h2></Reveal><Reveal><p>There is no shortcut to good work. Just consistent learning, hands-on practice and a willingness to improve.</p></Reveal></div><div className="journey-list">{journey.map(([number, title, text]) => <Reveal key={number}><div className="journey-item"><span className="journey-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div><span className="journey-arrow">↗</span></div></Reveal>)}</div></section> }

function Projects() { return <section className="projects-section" id="projects"><div className="section-shell"><Reveal><SectionLabel number="04">Selected projects</SectionLabel></Reveal><div className="projects-heading"><Reveal><h2>Things I&apos;ve<br /><span>made.</span></h2></Reveal><Reveal><p>A few practical projects where I explored new ideas, sharpened my process and learned by doing.</p></Reveal></div><Swiper className="project-swiper" modules={[Navigation, Pagination, Keyboard]} navigation pagination={{ clickable: true }} keyboard={{ enabled: true }} spaceBetween={20} slidesPerView={1} breakpoints={{ 800: { slidesPerView: 1.5 }, 1120: { slidesPerView: 2 } }}>{projects.map(project => <SwiperSlide key={project.name}><article className="project-card"><div className={`project-image bg-gradient-to-br ${project.tone}`}><img src={project.image} alt={`${project.name} project preview`} /></div><div className="project-info"><span className="project-eyebrow">{project.eyebrow}</span><h3>{project.name}</h3><p>{project.description}</p><div className="project-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><div className="project-links"><a href={project.live}>Live demo <ArrowUpRight size={14} /></a><a href={project.github} target="_blank" rel="noreferrer"><GitBranch size={14} /> GitHub</a></div></div></article></SwiperSlide>)}</Swiper></div></section> }

function Services() { return <section className="section-shell services-section"><Reveal><SectionLabel number="05">What I can build</SectionLabel></Reveal><div className="services-grid">{services.map((service, index) => <Reveal key={service}><div className="service-item"><span>0{index + 1}</span><h3>{service}</h3><ArrowUpRight size={18} /></div></Reveal>)}</div></section> }

function Process() { return <section className="section-shell process-section"><Reveal><SectionLabel number="06">How I work</SectionLabel></Reveal><div className="process-grid">{process.map(([number, title, text]) => <Reveal key={number}><article><span>{number}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div></section> }

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('Please fill in all fields.')
      return
    }

    setSending(true)
    setStatus('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.error || `Form submission failed with status ${response.status}`)
      }
      setForm({ name: '', email: '', message: '' })
      setStatus('Message sent successfully. I will get back to you soon.')
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatus('Message could not be sent. Please email me directly instead.')
    } finally {
      setSending(false)
    }
  }

  return <section className="contact-section" id="contact"><div className="section-shell"><Reveal><SectionLabel number="07">Get in touch</SectionLabel></Reveal><div className="contact-grid"><Reveal><h2>Have an idea?<br /><span>Let&apos;s talk.</span></h2><p>I&apos;m open to internship opportunities, collaborations and conversations about building useful things on the web.</p><div className="contact-links"><a href={links.email}><Mail size={17} /> hasnaintahir605@gmail.com <ArrowUpRight size={15} /></a><a href={links.github} target="_blank" rel="noreferrer"><GitBranch size={17} /> GitHub <ArrowUpRight size={15} /></a><a href={links.linkedin} target="_blank" rel="noreferrer"><Globe2 size={17} /> LinkedIn <ArrowUpRight size={15} /></a><a href={links.whatsapp}><Send size={17} /> WhatsApp <ArrowUpRight size={15} /></a></div></Reveal><Reveal><form className="contact-form" onSubmit={submit}><label>Name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label><label>Email<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label><label>Message<textarea required rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me a little about your idea..." /></label><button className="primary-button" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send message'} {!sending && <Send size={16} />}</button>{status && <p className="form-status" role="status">{status}</p>}</form></Reveal></div></div></section>
}

function Footer() { return <footer className="site-footer"><div className="section-shell footer-inner"><a href="#top" className="brand">~/hasnain<span>_</span></a><p>MERN Stack Developer</p><div><a href={links.github} target="_blank" rel="noreferrer">GitHub</a><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={links.email}>Email</a><a href={links.whatsapp}>WhatsApp</a></div><small>© 2026 Hasnain Tahir. Built with curiosity.</small></div></footer> }

export default function Portfolio() { const [theme, setTheme] = useState('dark'); useEffect(() => { const saved = window.localStorage.getItem('theme') || 'dark'; setTheme(saved); document.documentElement.classList.toggle('dark', saved === 'dark'); document.documentElement.classList.toggle('light', saved === 'light') }, []); useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); document.documentElement.classList.toggle('light', theme === 'light'); window.localStorage.setItem('theme', theme) }, [theme]); useEffect(() => { const ctx = gsap.context(() => { gsap.fromTo('.hero-copy, .hero-visual', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .12, ease: 'power3.out' }); gsap.utils.toArray('.reveal').forEach(el => gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' } })); gsap.to('.orbit-one', { rotate: 360, duration: 22, repeat: -1, ease: 'none' }); gsap.to('.orbit-two', { rotate: -360, duration: 30, repeat: -1, ease: 'none' }) }, document); return () => ctx.revert() }, []); return <><Navbar theme={theme} setTheme={setTheme} /><main><Hero /><About /><Skills /><Journey /><Projects /><Services /><Process /><Contact /></main><Footer /><ThemeToggle theme={theme} setTheme={setTheme} /></> }
