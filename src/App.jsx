import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  Code2,
  Cloud,
  Cpu,
  ExternalLink,
  Globe,
  MapPin,
  Menu,
  Network,
  Rocket,
  Sparkles,
  Users,
  X
} from 'lucide-react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { announcements } from './data/announcements'
import { eventFilters, events, pastEvents } from './data/events'
import { projects } from './data/projects'
import { resourceCategories } from './data/resources'
import { team } from './data/team'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Events', to: '/events' },
  { label: 'Projects', to: '/projects' },
  { label: 'Team', to: '/team' },
  { label: 'Resources', to: '/resources' },
  { label: 'Join Us', to: '/join' }
]

const featureCards = [
  {
    title: 'LEARN',
    description: 'Cloud, AWS, software development, AI and emerging technologies.',
    icon: Cloud
  },
  {
    title: 'BUILD',
    description: 'Hands-on projects, workshops, challenges and collaborative development.',
    icon: Code2
  },
  {
    title: 'GROW',
    description: 'Community, leadership, networking, mentorship and real-world exposure.',
    icon: Rocket
  }
]

const stats = [
  { value: '01', label: 'Student Builder Group' },
  { value: '06', label: 'Core Team Members' },
  { value: '01', label: 'Campus Community' },
  { value: '∞', label: 'Ideas to Build' }
]

const activityCards = [
  {
    title: 'WORKSHOPS',
    description: 'Hands-on learning sessions.',
    icon: BookOpen
  },
  {
    title: 'PROJECT BUILDS',
    description: 'Students building real applications.',
    icon: BriefcaseBusiness
  },
  {
    title: 'TECH TALKS',
    description: 'Peer and industry knowledge sharing.',
    icon: Cpu
  },
  {
    title: 'COMMUNITY EVENTS',
    description: 'Activities that bring student builders together.',
    icon: Users
  },
  {
    title: 'CHALLENGES',
    description: 'Practical technical challenges and experiments.',
    icon: Sparkles
  },
  {
    title: 'COLLABORATION',
    description: 'Working with students and technology communities.',
    icon: Network
  }
]

const galleryItems = [
  { label: 'Student workshop', accent: 'orange' },
  { label: 'AWS learning day', accent: 'blue' },
  { label: 'Project build session', accent: 'navy' },
  { label: 'Community meetup', accent: 'orange' },
  { label: 'Collaborative sprint', accent: 'blue' },
  { label: 'Group learning space', accent: 'navy' }
]

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function TiltCard({ children, className = '', intensity = 10 }) {
  const ref = useRef(null)

  const handleMove = (event) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    const rotateY = (px - 0.5) * intensity * 2
    const rotateX = (0.5 - py) * intensity * 2

    el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
  }

  const reset = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onMouseEnter={handleMove}
    >
      {children}
    </div>
  )
}

function FloatingCtaStrip() {
  return (
    <section className="section-shell pb-4">
      <div className="glass-cta-strip">
        <div className="glass-cta-copy">
          <span className="glass-cta-badge">Start building</span>
          <p>Join a student-first cloud community designed to turn learning into shipped projects.</p>
        </div>
        <div className="glass-cta-actions">
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-aws-orange px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-glow">
            View Projects <ArrowRight size={15} />
          </Link>
          <Link to="/join" className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-aws-blue/60 hover:text-aws-blue">
            Become a Member
          </Link>
        </div>
      </div>
    </section>
  )
}

function ParallaxImpactSection() {
  return (
    <section className="section-shell py-16">
      <div className="parallax-zone">
        <div className="parallax-grid">
          <Reveal delay={80} className="parallax-copy-wrap">
            <div className="parallax-copy">
              <p className="eyebrow">Why SBG stands out</p>
              <h3>Learn through momentum, not just lectures.</h3>
              <p>
                We help students turn cloud curiosity into real execution through collaborative projects, peer leadership, and practical events that feel like a startup and a community at the same time.
              </p>
              <div className="parallax-pills">
                <span>Cloud-first</span>
                <span>Hands-on</span>
                <span>Community-driven</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="parallax-visual-wrap">
            <div className="parallax-visual" aria-label="Project dashboard preview">
              <div className="parallax-layer layer-back" />
              <div className="parallax-layer layer-mid" />
              <div className="parallax-layer layer-front">
                <div className="mini-panel top-panel">
                  <span className="mini-dot orange" />
                  <span className="mini-dot blue" />
                  <span className="mini-dot slate" />
                </div>
                <div className="mini-card-grid">
                  <div className="mini-card primary">
                    <span className="mini-label">Builds</span>
                    <strong>24+</strong>
                  </div>
                  <div className="mini-card">
                    <span className="mini-label">Events</span>
                    <strong>12</strong>
                  </div>
                </div>
                <div className="mini-chart">
                  <span style={{ height: '26%' }} />
                  <span style={{ height: '44%' }} />
                  <span style={{ height: '61%' }} />
                  <span style={{ height: '82%' }} />
                  <span style={{ height: '100%' }} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#040b16] text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:slug" element={<EventDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <header className={`sticky top-0 z-50 border-b border-white/10 bg-[#040b16]/80 backdrop-blur-xl transition-all duration-300 ${compact ? 'py-2' : 'py-4'}`}>
      <div className="section-shell flex items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-aws-orange/60 bg-[#0d1725] shadow-[0_0_18px_rgba(255,153,0,0.16)] transition group-hover:border-aws-orange">
            <img src="/logo.png" alt="SBG logo" className="h-full w-full object-cover" />
          </span>
          <span className="hidden sm:flex sm:flex-col sm:leading-none">
            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-300">Student Builder Group</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white">SITAMS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-aws-orange' : 'text-slate-300 hover:text-white'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/join"
            className="inline-flex items-center gap-2 rounded-md border border-aws-orange/70 bg-aws-orange px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            Join the Community <ArrowRight size={16} />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-[#0d1525] text-slate-100 md:hidden"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#040b16] md:hidden">
          <nav className="section-shell flex flex-col gap-3 py-4">
            {navItems.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `rounded-md px-2 py-2 text-sm font-medium ${isActive ? 'bg-aws-orange/10 text-aws-orange' : 'text-slate-200 hover:bg-white/5'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link to="/join" className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-aws-orange px-4 py-2.5 text-sm font-semibold text-slate-950">
              Join the Community <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

function HomePage() {
  const featuredEvent = events[0]

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(31,144,255,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,153,0,0.15),transparent_25%)]" />
        <div className="floating-orb orb-one" />
        <div className="floating-orb orb-two" />
        <div className="section-shell relative grid gap-12 py-16 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <Reveal className="w-full" delay={80}>
            <div className="hero-copy">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-aws-blue">AWS STUDENT BUILDER GROUP · SITAMS</p>
              <h1 className="max-w-2xl text-4xl font-black leading-none tracking-tightest text-white sm:text-5xl lg:text-7xl">
                LEARN. BUILD. GROW.
              </h1>
              <h2 className="mt-5 max-w-xl text-lg text-slate-300 sm:text-xl">
                Building a community of students who learn cloud technology, build real projects, and create meaningful technology experiences.
              </h2>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/events" className="inline-flex items-center gap-2 rounded-md bg-aws-orange px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-glow">
                  Explore Events <ArrowRight size={16} />
                </Link>
                <Link to="/join" className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-aws-blue/60 hover:text-aws-blue">
                  Join the Community
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal className="hero-visual w-full" delay={160}>
            <div className="hero-product-shell">
              <div className="hero-panel-glow" />
              <div className="hero-panel-layer layer-back" />
              <div className="hero-panel-layer layer-mid" />
              <div className="hero-panel-root">
                <TiltCard className="w-full" intensity={12}>
                  <ChatAssistant />
                </TiltCard>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FloatingCtaStrip />

      <ParallaxImpactSection />

      <section className="section-shell py-16">
        <div className="rounded-3xl border border-white/10 bg-[#0a1321]/80 p-6 shadow-card sm:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aws-orange">Upcoming Event</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-white">AWS KICKSTART</h3>
            </div>
            <span className="inline-flex rounded-full border border-aws-orange/40 bg-aws-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-aws-orange">
              {featuredEvent.status}
            </span>
          </div>

          <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(18,29,45,0.9),rgba(15,25,39,0.7))] p-5">
              <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-aws-blue">
                <CalendarDays size={14} />
                {featuredEvent.date}
              </div>
              <h4 className="text-3xl font-black text-white">CODE TO CLOUD</h4>
              <p className="mt-3 text-xl font-medium text-slate-200">{featuredEvent.heroLabel}</p>
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-3"><CalendarDays size={16} className="text-aws-orange" /> <span>{featuredEvent.date}</span></div>
                <div className="flex items-center gap-3"><ClockIcon /> <span>{featuredEvent.time}</span></div>
                <div className="flex items-center gap-3"><MapPin size={16} className="text-aws-orange" /> <span>{featuredEvent.venue}</span></div>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-aws-orange/35 bg-[#0e1a2d] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Live Project</p>
              <h4 className="mt-3 text-2xl font-black text-white">Certificate Studio</h4>
              <p className="mt-3 text-base text-slate-300">From Code → AWS Cloud → Live Application</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/events/${featuredEvent.slug}`} className="inline-flex items-center gap-2 rounded-md bg-aws-orange px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-glow">
                  View Event <ArrowRight size={15} />
                </Link>
                <a href={featuredEvent.meetupLink} className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-aws-blue/60 hover:text-aws-blue" target="_blank" rel="noreferrer">
                  Join Meetup <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-2 pt-6">
        <div className="marquee-shell">
          <div className="marquee-track">
            {['AWS', 'Cloud', 'AI', 'Projects', 'Workshops', 'Community', 'Build', 'Learn', 'AWS', 'Cloud', 'AI', 'Projects', 'Workshops', 'Community', 'Build', 'Learn'].map((item, index) => (
              <span key={`${item}-${index}`} className="marquee-pill">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal delay={80}>
            <div className="rounded-3xl border border-white/10 bg-[#0b1523] p-7 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-aws-orange">Why students join</p>
              <h3 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">A practical ecosystem for cloud learning and building.</h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                SBG gives students a place to move from curiosity to capability through events, collaborative builds, curated learning paths, and a visible student-first community culture.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Hands-on learning', value: '100%' },
                  { label: 'Project driven', value: '24/7' },
                  { label: 'Mentor-ready', value: 'Active' }
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-[#101d2d] p-4">
                    <div className="text-3xl font-black text-aws-orange">{item.value}</div>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-slate-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-3xl border border-aws-orange/30 bg-[linear-gradient(135deg,rgba(255,153,0,0.12),rgba(31,144,255,0.08))] p-7 shadow-card">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-aws-orange">Student path</p>
                <span className="pulse-ring inline-flex h-3 w-3 rounded-full bg-aws-blue" aria-hidden="true" />
              </div>
              <div className="space-y-4">
                {[
                  'Explore fundamentals through guided AWS and cloud learning.',
                  'Build projects with real-world workflows and student teams.',
                  'Present, share, and grow through community events and leadership.'
                ].map((step, index) => (
                  <div key={step} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0c1728] p-3">
                    <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-aws-orange/15 text-[10px] font-bold text-aws-orange">0{index + 1}</span>
                    <p className="text-sm leading-7 text-slate-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AboutSection />

      <section className="section-shell py-16">
        <SectionHeader eyebrow="Community Stats" title="Technical community momentum" description="Simple, clear indicators that are easy to update as the SBG evolves." />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80}>
              <TiltCard intensity={9} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-[#0b1523] p-6 text-center shadow-card transition duration-300 hover:border-aws-orange/40 hover:shadow-[0_0_24px_rgba(255,153,0,0.12)]">
                  <div className="text-4xl font-black text-aws-orange">{stat.value}</div>
                  <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-300">{stat.label}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeader eyebrow="Community Activity" title="What SBG is doing" description="Hands-on technical learning, practical challenges, and community growth in one ecosystem." />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {activityCards.map(({ title, description, icon: Icon }, index) => (
            <Reveal key={title} delay={index * 100}>
              <TiltCard intensity={8} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-[#0a1321] p-6 transition duration-300 hover:border-aws-orange/30 hover:shadow-glow">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#101c2d] text-aws-orange">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{description}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeader eyebrow="Gallery" title="Photo / Event gallery" description="A lightweight, responsive gallery for moments, events, and community experiences." />
        </div>
        <GalleryGrid items={galleryItems} />
      </section>

      <section className="section-shell py-16">
        <SectionHeader eyebrow="Announcements" title="Latest from SBG" description="Short updates that connect students to upcoming learning, builds, and community opportunities." />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {announcements.map(({ title, description, link, tag }) => (
            <Link key={title} to={link} className="group rounded-2xl border border-white/10 bg-[#0b1523] p-5 transition hover:-translate-y-1 hover:border-aws-blue/35 hover:shadow-card">
              <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-aws-blue">
                {tag}
              </div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm text-slate-300">{description}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-aws-orange">
                View details <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

function ChatAssistant() {
  const quickPrompts = ['Upcoming events', 'Projects', 'Join us', 'Learn AWS']

  const initialMessages = [
    {
      id: 1,
      sender: 'bot',
      text: 'Hi! I can help you explore SBG events, projects, learning resources, and ways to join the community.'
    },
    {
      id: 2,
      sender: 'user',
      text: 'What are the upcoming workshops?'
    },
    {
      id: 3,
      sender: 'bot',
      text: 'Check out the Events page for the latest AWS Kickstart and student-led workshops. You can also browse the resources hub for cloud learning tracks.'
    }
  ]

  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messageEndRef = useRef(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const generateReply = (value) => {
    const text = value.toLowerCase()

    if (text.includes('event') || text.includes('workshop') || text.includes('upcoming')) {
      return 'You can explore our upcoming schedules in the Events section. We regularly host AWS learning sessions, cloud workshops, and hands-on student events.'
    }

    if (text.includes('project') || text.includes('build')) {
      return 'Our projects page highlights student-made solutions, technical experiments, and real-world cloud builds. It is a great place to see what SBG members are creating.'
    }

    if (text.includes('join') || text.includes('community')) {
      return 'You can join through the Join Us page and connect with our meetup and LinkedIn community. We welcome students who want to learn, build, and grow together.'
    }

    if (text.includes('resource') || text.includes('learn') || text.includes('aws')) {
      return 'The Resources page contains AWS documentation, learning links, and curated study material for students who want to build real skills in cloud and development.'
    }

    if (text.includes('team') || text.includes('who')) {
      return 'The Team page introduces the SBG leadership and contributors who organize events, build projects, design content, and guide student growth.'
    }

    if (text.includes('hello') || text.includes('hi')) {
      return 'Hello! I can help you navigate the SBG website and point you to the right page for events, projects, learning resources, and community membership.'
    }

    return 'I can help you find the best route through the SBG website. Try asking about events, projects, team, learning resources, or how to join the community.'
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input.trim()
    }

    setMessages((current) => [...current, userMessage])
    setInput('')
    setIsTyping(true)

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: generateReply(userMessage.text)
        }
      ])
      setIsTyping(false)
    }, 500)
  }

  return (
    <div className="chat-shell rounded-2xl border border-white/10 bg-[#0b1628]/90 p-4 shadow-card">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-aws-blue/40 bg-aws-blue/10 text-[10px] font-bold text-aws-blue">
            AI
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">SBG Assistant</p>
            <p className="mt-0.5 text-sm font-semibold text-white">How can I help?</p>
          </div>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
          Online
        </span>
      </div>

      <div className="chat-window mb-4 space-y-3 rounded-xl border border-white/10 bg-[#091822] p-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                message.sender === 'user'
                  ? 'bg-aws-blue text-slate-950'
                  : 'border border-white/10 bg-[#101f2d] text-slate-200'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-white/10 bg-[#101f2d] px-3 py-2">
              <div className="chat-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => setInput(prompt)}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:border-aws-orange/60 hover:text-aws-orange"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-form flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about events, projects, or learning..."
          className="flex-1 rounded-xl border border-white/10 bg-[#0c1b2c] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-aws-blue/70"
        />
        <button
          type="submit"
          className="rounded-xl bg-aws-orange px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:brightness-110"
        >
          Send
        </button>
      </form>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="section-shell py-16">
      <AboutSection />
    </div>
  )
}

function AboutSection() {
  return (
    <section id="about" className="section-shell py-16">
      <SectionHeader
        eyebrow="About SBG"
        title="WHAT IS AWS STUDENT BUILDER GROUP?"
        description="The AWS Student Builder Group at SITAMS is a student-led technology community focused on helping students learn, build, experiment, and grow through cloud technology and practical projects."
      />
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {featureCards.map(({ title, description, icon: Icon }, index) => (
          <Reveal key={title} delay={index * 120}>
            <div className="rounded-2xl border border-white/10 bg-[#0b1523] p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-aws-blue/30 hover:shadow-[0_0_28px_rgba(31,144,255,0.08)]">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#0f1d31] text-aws-orange">
                <Icon size={22} />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function EventsPage() {
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All'
      ? events
      : events.filter((event) => event.category === filter || event.type === filter || event.category === 'Cloud')

  return (
    <div className="section-shell py-16">
      <SectionHeader eyebrow="Events" title="Upcoming Events" description="A curated calendar of learning sessions, hands-on workshops, and student-led technical events." />

      <div className="mt-8 flex flex-wrap gap-3">
        {eventFilters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              filter === item
                ? 'border-aws-orange bg-aws-orange text-slate-950'
                : 'border-white/10 bg-white/5 text-slate-200 hover:border-aws-blue/50 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6">
        {filtered.map((event) => (
          <div key={event.slug} className="rounded-3xl border border-white/10 bg-[#0b1523] p-6 shadow-card md:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                  <span className="rounded-full border border-aws-blue/30 bg-aws-blue/10 px-2 py-1 text-aws-blue">{event.category}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{event.type}</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-white">{event.title}</h3>
              </div>
              <span className="inline-flex rounded-full border border-aws-orange/35 bg-aws-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-aws-orange">
                {event.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
              <InfoBlock label="Date" value={event.date} />
              <InfoBlock label="Time" value={event.time} />
              <InfoBlock label="Venue" value={event.venue} />
              <InfoBlock label="Registration" value={event.registration} />
            </div>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">{event.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={`/events/${event.slug}`} className="inline-flex items-center gap-2 rounded-md border border-aws-orange/40 bg-aws-orange px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-glow">
                View Details <ArrowRight size={15} />
              </Link>
              <a href={event.meetupLink} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-aws-blue/50 hover:text-aws-blue" target="_blank" rel="noreferrer">
                Join Meetup <ExternalLink size={15} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <SectionHeader eyebrow="Archive" title="Past Events" description="A quick look at the community’s previous learning sessions, builds, and conversations." />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pastEvents.map((event) => (
            <div key={event.slug} className="rounded-2xl border border-white/10 bg-[#0a1321] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-aws-orange">{event.category}</p>
              <h3 className="mt-3 text-2xl font-black text-white">{event.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{event.date}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EventDetailPage() {
  const { slug } = useParams()
  const event = events.find((entry) => entry.slug === slug) || events[0]

  return (
    <div className="section-shell py-16">
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1523] shadow-card">
        <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(255,153,0,0.12),rgba(31,144,255,0.08))] p-6 sm:p-8 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-aws-orange">{event.category}</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{event.title}</h1>
          <p className="mt-3 text-lg text-slate-200">{event.heroLabel}</p>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div>
            <p className="text-base leading-8 text-slate-300">{event.description}</p>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-white">What you’ll learn</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {event.learning.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-aws-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-white">Agenda</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-300">
                {event.agenda.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aws-blue/15 text-[10px] font-bold text-aws-blue">{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 rounded-2xl border border-aws-orange/30 bg-[#0f1a2c] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aws-orange">Live Project</p>
              <h3 className="mt-3 text-2xl font-black text-white">{event.project}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{event.projectDescription}</p>
              <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span className="inline-block h-2 w-2 rounded-full bg-aws-orange" />
                From Code → AWS Cloud → Live Application
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#0e1b2b] p-5">
              <h3 className="text-lg font-bold text-white">Event Details</h3>
              <div className="mt-4 space-y-4 text-sm text-slate-300">
                <InfoBlock label="Date" value={event.date} />
                <InfoBlock label="Time" value={event.time} />
                <InfoBlock label="Venue" value={event.venue} />
                <InfoBlock label="Team" value={event.speakers?.join(', ')} />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0e1b2b] p-5">
              <h3 className="text-lg font-bold text-white">Registration</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={event.registrationLink} className="inline-flex items-center gap-2 rounded-md bg-aws-orange px-4 py-2.5 text-sm font-semibold text-slate-950" target="_blank" rel="noreferrer">
                  Register Now <ArrowRight size={15} />
                </a>
                <a href={event.meetupLink} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white" target="_blank" rel="noreferrer">
                  Meetup <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-2xl font-black text-white">Photo gallery</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {event.gallery.map((photo, idx) => (
            <div key={photo.label} className={`gallery-placeholder ${photo.accent}`}>
              <span>{photo.label}</span>
              <small>Placeholder • {idx + 1}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 rounded-2xl border border-white/10 bg-[#0b1523] p-6">
        <h2 className="text-2xl font-black text-white">Event recap</h2>
        <p className="mt-4 text-base leading-8 text-slate-300">{event.recap}</p>
      </div>
    </div>
  )
}

function ProjectsPage() {
  const featured = projects.find((project) => project.featured) || projects[0]

  return (
    <div className="section-shell py-16">
      <SectionHeader eyebrow="SBG Build Showcase" title="BUILT BY STUDENT BUILDERS" description="Hands-on student projects that turn ideas into useful experiences, tools, and community value." />

      <div className="mt-10 rounded-3xl border border-white/10 bg-[#0b1523] p-6 shadow-card md:p-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="rounded-full border border-aws-orange/40 bg-aws-orange/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-aws-orange">Featured</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">{featured.status}</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h3 className="text-4xl font-black tracking-tight text-white">{featured.name}</h3>
            <p className="mt-4 text-base leading-7 text-slate-300">{featured.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {featured.technologies.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={featured.github} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white" target="_blank" rel="noreferrer">
                <Code2 size={16} /> GitHub
              </a>
              <a href={featured.demo} className="inline-flex items-center gap-2 rounded-md bg-aws-orange px-4 py-2.5 text-sm font-semibold text-slate-950" target="_blank" rel="noreferrer">
                Live Demo <ExternalLink size={15} />
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0f1a2b] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Project Flow</p>
            <div className="mt-5 space-y-3">
              {featured.flow.map((step, index) => (
                <div key={step} className="flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-slate-200">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-aws-blue/15 text-[10px] font-bold text-aws-blue">{index + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div key={project.slug} className="rounded-2xl border border-white/10 bg-[#0a1321] p-5 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl font-black text-white">{project.name}</h3>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                {project.category}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((item) => (
                <span key={item} className="rounded-full border border-aws-blue/25 bg-aws-blue/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-aws-blue">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-5 text-sm text-slate-300">
              <span className="font-semibold text-white">Builders:</span> {project.builders.join(', ')}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={project.github} className="inline-flex items-center gap-2 text-sm font-semibold text-aws-orange" target="_blank" rel="noreferrer">
                <Code2 size={16} /> GitHub
              </a>
              <a href={project.demo} className="inline-flex items-center gap-2 text-sm font-semibold text-white" target="_blank" rel="noreferrer">
                Live Demo <ExternalLink size={15} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TeamPage() {
  const leadMember = team[0]
  const otherMembers = team.slice(1)

  const getMemberFocus = (role) => {
    if (role.toLowerCase().includes('technical')) return 'Build'
    if (role.toLowerCase().includes('events')) return 'Programs'
    if (role.toLowerCase().includes('marketing')) return 'Reach'
    if (role.toLowerCase().includes('operations')) return 'Operations'
    if (role.toLowerCase().includes('design')) return 'Brand'
    return 'Leadership'
  }

  return (
    <div className="section-shell py-16">
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#071521] p-6 shadow-card sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,153,0,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(31,144,255,0.16),transparent_35%)]" />

        <div className="relative">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-aws-orange">Student leadership</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">Built by people who turn ideas into action.</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Strategy', 'Events', 'Design', 'Build'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Reveal delay={80}>
            <div className="overflow-hidden rounded-[30px] border border-aws-orange/20 bg-[linear-gradient(135deg,rgba(255,153,0,0.12),rgba(10,19,30,0.96),rgba(31,144,255,0.08))] shadow-[0_24px_80px_rgba(2,6,23,0.6)]">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_26%)]" />
                  {leadMember.image ? (
                    <img
                      src={leadMember.image}
                      alt={leadMember.name}
                      className="relative h-full min-h-[360px] w-full object-cover object-center"
                    />
                  ) : (
                    <div className="relative flex h-full min-h-[360px] w-full items-center justify-center bg-[#dfeaf7] text-5xl font-black text-slate-700">
                      {leadMember.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="inline-flex rounded-full border border-aws-orange/30 bg-aws-orange/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-aws-orange">
                      Featured Lead
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">01</span>
                  </div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-aws-blue">{leadMember.role}</p>
                  <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                    {leadMember.name}
                  </h2>
                  <p className="mt-4 max-w-lg text-lg font-medium text-slate-100">{leadMember.responsibility}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: 'Vision', value: 'Strategy' },
                      { label: 'Focus', value: 'Growth' },
                      { label: 'Impact', value: 'Community' }
                    ].map((meta) => (
                      <div key={meta.label} className="rounded-2xl border border-white/10 bg-[#0f1d31] p-3 text-left">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{meta.label}</div>
                        <div className="mt-2 text-base font-bold text-white">{meta.value}</div>
                      </div>
                    ))}
                  </div>

                  <a
                    href={leadMember.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 self-start rounded-md bg-aws-orange px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-glow"
                  >
                    View Lead Profile <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-aws-orange">Extended team</p>
            <h3 className="mt-2 text-2xl font-black text-white">The builders behind the momentum</h3>
          </div>
        </div>

        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
          {otherMembers.map((member, index) => (
            <Reveal key={member.name} delay={(index + 1) * 120}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1523] shadow-card transition duration-300 hover:-translate-y-1 hover:border-aws-orange/35 hover:shadow-[0_0_32px_rgba(255,153,0,0.12)]">
                <div className="relative flex h-full flex-col p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="inline-flex rounded-full border border-aws-orange/30 bg-aws-orange/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-aws-orange">
                      {getMemberFocus(member.role)}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {String(index + 2).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0f1d31]">
                    {member.image ? (
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#dfeaf7] text-4xl font-black text-slate-700">
                        {member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex flex-1 flex-col">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-aws-blue">{member.role}</p>
                    <h3 className="mt-3 text-2xl font-black leading-tight text-white sm:text-[1.9rem]">
                      {member.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{member.responsibility}</p>

                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 self-start rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-aws-blue/50 hover:text-aws-blue"
                    >
                      View Profile <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

function ResourcesPage() {
  return (
    <div className="section-shell py-16">
      <SectionHeader eyebrow="Learning Hub" title="Curated student learning resources" description="A practical collection of tools, documentation, and community materials for cloud, development, AI, and student growth." />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {resourceCategories.map((category) => (
          <div key={category.id} className="rounded-2xl border border-white/10 bg-[#0b1523] p-6 shadow-card">
            <h3 className="text-xl font-black uppercase tracking-[0.16em] text-white">{category.title}</h3>
            <ul className="mt-5 space-y-3">
              {category.items.map((item) => (
                <li key={item.name}>
                  <a href={item.url} className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-aws-blue/40 hover:text-white" target="_blank" rel="noreferrer">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      {item.official && <span className="rounded-full border border-aws-orange/40 bg-aws-orange/10 px-2 py-1 text-[9px] uppercase tracking-[0.15em] text-aws-orange">Official Resource</span>}
                      <ExternalLink size={14} className="text-slate-400 transition group-hover:text-aws-blue" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function JoinPage() {
  const joinCards = [
    { title: 'MEETUP', description: 'Join the official SBG Meetup community.', link: 'https://www.meetup.com/aws-sbg-at-sreenivasa-inst-of-technology-and-mgmt-studies/', label: 'Meetup' },
    { title: 'LINKEDIN', description: 'Follow the SBG page for announcements and event updates.', link: 'https://www.linkedin.com/company/aws-student-builder-group-at-sitams', label: 'LinkedIn' },
    { title: 'EVENTS', description: 'Participate in workshops, sessions and community activities.', link: '/events', label: 'Events' }
  ]

  return (
    <div className="section-shell py-16">
      <div className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,153,0,0.12),rgba(31,144,255,0.08))] p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-aws-orange">Join the Community</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">BUILD WITH US.</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-200">
          Whether you&apos;re just starting with cloud or already building projects, there&apos;s a place for you in the AWS Student Builder Group – SITAMS.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {joinCards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-white/10 bg-[#0b1523] p-6 shadow-card">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#101c2d] text-aws-orange">
              {card.title === 'MEETUP' ? <Globe size={22} /> : card.title === 'LINKEDIN' ? <Users size={22} /> : <CalendarDays size={22} />}
            </div>
            <h2 className="text-2xl font-black text-white">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
            {card.link.startsWith('/') ? (
              <Link to={card.link} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-aws-orange">
                {card.label} <ArrowRight size={14} />
              </Link>
            ) : (
              <a href={card.link} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-aws-orange" target="_blank" rel="noreferrer">
                {card.label} <ExternalLink size={14} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#050b16]">
      <div className="section-shell py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-aws-orange/60 bg-[#0e172a] text-[10px] font-bold text-aws-orange">AWS</span>
              <span>AWS Student Builder Group – SITAMS</span>
            </div>
            <p className="mt-4 text-slate-300">Sreenivasa Institute of Technology and Management Studies</p>
            <p className="mt-1 text-slate-400">Department of Computer Science and Engineering</p>
            <p className="mt-5 text-xl font-black uppercase tracking-[0.16em] text-aws-orange">LEARN. BUILD. GROW.</p>
          </div>

          <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
            <Link to="/events">Events</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/team">Team</Link>
            <Link to="/resources">Resources</Link>
            <a href="https://www.meetup.com/aws-sbg-at-sreenivasa-inst-of-technology-and-mgmt-studies/" target="_blank" rel="noreferrer">Meetup</a>
            <a href="https://www.linkedin.com/company/aws-student-builder-group-at-sitams" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">
          © 2026 AWS Student Builder Group – SITAMS
        </div>
      </div>
    </footer>
  )
}

function NotFoundPage() {
  return (
    <div className="section-shell py-24 text-center">
      <p className="text-xs uppercase tracking-[0.24em] text-aws-orange">404</p>
      <h1 className="mt-4 text-4xl font-black text-white">Page not found</h1>
      <p className="mt-3 text-slate-300">The page you requested could not be found.</p>
      <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-md bg-aws-orange px-4 py-2.5 text-sm font-semibold text-slate-950">
        Go Home <ArrowRight size={15} />
      </Link>
    </div>
  )
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-aws-orange">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-8 text-slate-300">{description}</p>}
    </div>
  )
}

function InfoBlock({ label, value }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm text-slate-100">{value}</p>
    </div>
  )
}

function GalleryGrid({ items }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setSelected(item)}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b1523] text-left transition hover:-translate-y-1 hover:border-aws-blue/35"
          >
            <div className={`gallery-placeholder ${item.accent}`}>
              <span>{item.label}</span>
              <small>Preview</small>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0b1523] p-5 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-black text-white">{selected.label}</h3>
              <button type="button" onClick={() => setSelected(null)} className="rounded-full border border-white/10 p-2 text-slate-200" aria-label="Close preview">
                <X size={16} />
              </button>
            </div>
            <div className={`mt-4 gallery-placeholder ${selected.accent} h-64`}>
              <span>{selected.label}</span>
              <small>Placeholder image</small>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-aws-orange" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5v4.8l3.2 2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default App
