import React, { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Mail, Github, Linkedin, Download, Menu, X, Code2,
  Facebook, Instagram, Phone, MapPin, Sun, Moon, ArrowRight, Sparkles,
} from "lucide-react";
import RainbowCursor from "./components/RainbowCurser";
import ProjectsCard from "./components/ProjectsCard";
import QuickInfo from "./components/QuickInfo";
import StatCounter from "./components/StatCounter";
import SkillsTimeline from "./components/SkillsTimeline";

const PROFILE = {
  name: "Mushtaq Ahmed",
  role: "Full Stack Developer | WordPress Developer",
  desc: "I craft high-performance WordPress & Laravel websites for businesses worldwide.",
  email: "mtaq075@gmail.com",
  phone: "03102240347",
  location: "Karachi, Pakistan",
  socials: {
    facebook: "https://web.facebook.com/mushtaq.king.771/",
    instagram: "https://www.instagram.com/mushtaq_ahmad__01/",
    github: "https://github.com/mushtaqahmad12",
    linkedin: "https://www.linkedin.com/in/mushtaq-reactlaravel-developer",
  },
  resumeUrl: "/Mushtaq-Ahmed.pdf",
};

const EDUCATION = [
  "Matriculation — Almoiz Secondary School (2016 - 2017)",
  "Intermediate — Govt Boys Degree College (2018 - 2019)",
];

const EXPERIENCE = [
  {
    company: "Intersys Ltd",
    location: "Karachi, Pakistan",
    role: "WordPress & Laravel Developer",
    period: "Present",
    desc: "Developing and maintaining websites using WordPress and Laravel. Creating responsive, mobile-friendly websites and customizing themes, plugins, and layouts. Building eCommerce sites with WooCommerce, developing frontend UI with HTML, CSS, Bootstrap, and Tailwind CSS, and integrating APIs while optimizing performance.",
  },
  {
    company: "Devcodexa",
    location: "Karachi, Pakistan",
    role: "Junior Backend Developer",
    period: "5 Months",
    desc: "Assisted in backend development using PHP and Laravel. Worked with MySQL for database management, implemented authentication systems, and supported API integration in collaboration with frontend developers.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
};

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-28 ${className}`}>{children}</section>
);

const SectionHeader = ({ eyebrow, title, desc }) => (
  <div className="mb-12">
    {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
    <h2 className="section-heading">{title}</h2>
    {desc && <p className="section-desc">{desc}</p>}
  </div>
);

const useTypewriter = (text = "", speed = 50) => {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!text) return;
    setOut("");
    let i = 0;
    const t = setInterval(() => {
      setOut((p) => p + text[i]);
      i++;
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return out;
};

const SOCIALS = [
  { href: `mailto:${PROFILE.email}`, icon: Mail, label: "Email" },
  { href: PROFILE.socials.github, icon: Github, label: "GitHub" },
  { href: PROFILE.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: PROFILE.socials.facebook, icon: Facebook, label: "Facebook" },
  { href: PROFILE.socials.instagram, icon: Instagram, label: "Instagram" },
];

export default function AnimatedPortfolio() {
  const typed = useTypewriter(PROFILE.desc, 50)?.replace(/undefined/gi, "");
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const navItems = useMemo(() => ([
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ]), []);

  return (
    <div data-theme={dark ? "dark" : "light"} className="min-h-screen">
      <div className="bg-mesh" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <RainbowCursor />

      <div className="page-content">
        <motion.div style={{ scaleX }} className="progress-bar" />

        {/* NAVBAR */}
        <header className="sticky top-0 z-40 pt-2">
          <div className="section-wrap">
            <div className="glass-nav flex items-center justify-between px-4 py-2">
              <a href="#home" className="flex items-center">
                <video
                  src="/logo.mp4"
                  autoPlay loop muted playsInline
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-violet-500/30 transition-transform duration-300 hover:scale-105"
                />
              </a>

              <nav className="hidden items-center gap-1 md:flex">
                {navItems.map((n) => (
                  <a key={n.href} href={n.href} className="nav-link">{n.label}</a>
                ))}
              </nav>

              <div className="hidden items-center gap-2 md:flex">
                <motion.a
                  href={PROFILE.resumeUrl}
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-glow !px-4 !py-2 !text-xs"
                >
                  <Download className="h-3.5 w-3.5" /> Resume
                </motion.a>
                <button
                  type="button"
                  onClick={() => setDark((d) => !d)}
                  className="btn-ghost !rounded-xl !p-2.5"
                  aria-label="Toggle theme"
                >
                  {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>

              <button type="button" className="btn-ghost !p-2 md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {open && (
            <div className="section-wrap md:hidden">
              <div className="glass-nav mt-2 px-4 py-4">
                {navItems.map((n) => (
                  <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="nav-link block py-2.5">{n.label}</a>
                ))}
                <div className="mt-3 flex gap-2 border-t pt-3" style={{ borderColor: "var(--border)" }}>
                  <a href={PROFILE.resumeUrl} download className="btn-glow flex-1 !text-xs">Download CV</a>
                  <button type="button" onClick={() => setDark((d) => !d)} className="btn-ghost !p-2">
                    {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* HERO */}
        <Section id="home" className="section-wrap pt-4 pb-20 md:pt-6 md:pb-28">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="status-pill">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Open to opportunities
                </span>
                <span className="role-badge">
                  <Code2 className="h-4 w-4 text-violet-400" />
                  {PROFILE.role}
                </span>
              </div>

              <div>
                <h1 className="hero-title">
                  Hi, I'm{" "}
                  <span className="hero-name">{PROFILE.name}</span>
                </h1>
                <p className="hero-subtitle mt-6">
                  {typed}
                  <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-violet-500 align-middle" />
                </p>

                {/* Stats */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    { value: 9, suffix: "+", label: "Live Websites" },
                    { value: 3, suffix: "+", label: "Years Experience" },
                    { value: 100, suffix: "%", label: "Client Focused" },
                  ].map((s) => (
                    <div key={s.label} className="hero-stat-pill">
                      <StatCounter value={s.value} suffix={s.suffix} className="hero-stat-num" />
                      <span className="hero-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-glow-primary"
                >
                  <Sparkles className="h-4 w-4" />
                  Hire Me
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href={PROFILE.resumeUrl}
                  download
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-glow"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </motion.a>
                <motion.a href="#projects" whileHover={{ scale: 1.03 }} className="btn-ghost hidden sm:inline-flex">
                  View Projects →
                </motion.a>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {SOCIALS.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={label}
                    className="social-btn"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative mx-auto w-full max-w-lg"
            >
              <div className="profile-ring">
                <div className="profile-inner">
                  <motion.img
                    src="/Image/profile.png"
                    alt={PROFILE.name}
                    className="aspect-square w-full object-cover"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  />
                </div>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <QuickInfo />
              </div>
              {/* Decorative orbs */}
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" aria-hidden="true" />
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-pink-500/20 blur-2xl" aria-hidden="true" />
            </motion.div>
          </div>
        </Section>

        {/* ABOUT */}
        <Section id="about" className="section-wrap section-block divider">
          <motion.div {...fadeUp}>
            <SectionHeader eyebrow="About Me" title="Crafting Digital Experiences" />
            <p className="max-w-3xl text-base leading-[1.9] md:text-lg" style={{ color: "var(--text-secondary)" }}>
              Front-end UI/UX Developer with 3+ years of experience in building responsive,
              user-friendly websites. Skilled in custom website development and CMS platforms
              including WordPress and Shopify. Experienced in developing and managing eCommerce
              solutions with a strong focus on performance, usability, and modern design practices.
              Adept at translating client requirements into high-quality digital experiences.
            </p>
          </motion.div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" className="section-wrap section-block divider">
          <motion.div {...fadeUp}>
            <SectionHeader
              eyebrow="Expertise"
              title="Skills & Technologies"
              desc="Skill proficiency levels — bars animate on scroll so you can see exactly how strong each area is."
            />
            <SkillsTimeline />
          </motion.div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" className="section-wrap section-block divider">
          <motion.div {...fadeUp}>
            <SectionHeader
              eyebrow="Career"
              title="Work Experience"
              desc="Roles where I've built and shipped real-world products."
            />
            <div className="grid gap-5">
              {EXPERIENCE.map((job, i) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="card-premium group"
                >
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{job.role}</h3>
                      <p className="mt-1 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        {job.company} — {job.location}
                      </p>
                    </div>
                    <span className="chip-tech">{job.period}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{job.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" className="section-wrap section-block divider">
          <motion.div {...fadeUp}>
            <SectionHeader eyebrow="Background" title="Education" />
            <div className="flex flex-wrap gap-3">
              {EDUCATION.map((s) => (
                <motion.span key={s} whileHover={{ y: -3 }} className="chip-skill">{s}</motion.span>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" className="section-wrap section-block divider">
          <motion.div {...fadeUp}>
            <SectionHeader
              eyebrow="Portfolio"
              title="My Work"
              desc="Production client websites I've built and full-stack applications in my portfolio."
            />
            <ProjectsCard />
          </motion.div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" className="section-wrap section-block divider">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div {...fadeUp}>
              <SectionHeader
                eyebrow="Get In Touch"
                title="Let's Work Together"
                desc="Have a project in mind or just want to say salam? Drop me a message."
              />
              <div className="grid gap-4 text-sm">
                {[
                  { href: `tel:${PROFILE.phone}`, icon: Phone, text: PROFILE.phone },
                  { href: `mailto:${PROFILE.email}`, icon: Mail, text: PROFILE.email },
                ].map(({ href, icon: Icon, text }) => (
                  <a
                    key={text}
                    href={href}
                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-400"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Icon className="h-5 w-5 shrink-0 text-violet-400" />
                    {text}
                  </a>
                ))}
                <span className="flex items-center gap-3" style={{ color: "var(--text-secondary)" }}>
                  <MapPin className="h-5 w-5 shrink-0 text-violet-400" />
                  {PROFILE.location}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {SOCIALS.map(({ href, icon: Icon, label }) => (
                  <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" aria-label={label} className="social-btn">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.form
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const subject = encodeURIComponent("Portfolio Contact");
                const body = encodeURIComponent(
                  `Name: ${data.get("name")}\nEmail: ${data.get("from")}\nMessage: ${data.get("message")}`
                );
                window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
              }}
              className="card-premium grid gap-4 !p-6"
            >
              <input name="name" required placeholder="Your name" className="input-field" />
              <input name="from" required type="email" placeholder="Your email" className="input-field" />
              <textarea name="message" required rows={5} placeholder="Your message..." className="input-field resize-none" />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-glow-primary w-fit"
              >
                Send Message
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.form>
          </div>
        </Section>

        {/* FOOTER */}
        <footer className="divider py-10">
          <div className="section-wrap flex flex-col items-center justify-between gap-4 text-sm sm:flex-row" style={{ color: "var(--text-muted)" }}>
            <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
            <p>Built with React, Tailwind & Framer Motion ✦</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
