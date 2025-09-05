import React, { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Mail, Github, Linkedin, Download, Menu, X, ExternalLink, Code2, Rocket, Facebook, Instagram } from "lucide-react";
import RainbowCursor from "./components/RainbowCurser";
import ProjectsCard from "./components/ProjectsCard";



// ----- Simple data you can edit quickly -----
const PROFILE = {
  name: "Mushtaq Ahmad",
  role: "Full Stack Developer",
  desc: " I Craft Delightful Web Experiences.",
  email: "mtaq075@gmail.com",
  location: "Karachi, Pakistan",
  socials: {
    facebook: "https://web.facebook.com/mushtaq.king.771/",
    instagram:"https://www.instagram.com/mushtaq_ahmad__01/",
    github: "https://github.com/mushtaqahmad12",
    linkedin: "www.linkedin.com/in/mushtaq-ahmad-0b4a31279",
  },
  resumeUrl: "https://drive.google.com/file/d/1hDS0a-gn9Z8plBhWsTYtceoIsUF6-pUB/view?usp=sharing", // paste a drive/vercel link later
};

const SKILLS = [
  "HTML5, CSS3, Bootstrap, TailwindCSS",
  "JavaScript (ES6+), React.js, Next.js, Express.js, Node.js",
  "PHP (Core & OOP), Laravel Framework",
  "MySQL, MongoDB, SQL, REST APIs",
  "Problem-solving & analytical thinking",
  "Time management & task prioritization",
  "Communication & collaboration",
  "Continuous learning & adaptability",
];

const EDUCATION = [
  "Matriculation — Almoiz Secondary School (2016 - 2017)",
  "Intermediate — Govt Boys Degree College (2018 - 2019)",
  "Diploma (HDSE) — Aptech (Feb 2024 - Present)",
];



// ----- Helpers -----
const spring = (value) => ({
  scale: value ? 1.02 : 1,
  transition: { type: "spring", stiffness: 300, damping: 20 },
});

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>{children}</section>
);

const useTypewriter = (text = "", speed = 60) => {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!text) return;   // agar text empty ya undefined hai to kuch mat karo
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


export default function AnimatedPortfolio() {
  const safeTyped = useTypewriter(PROFILE?.desc ?? "", 60);

// force-remove any accidental "undefined" text
const typed = safeTyped?.replace(/undefined/gi, "");


  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, restDelta: 0.001 });

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);


  const navItems = useMemo(() => ([
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ]), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 selection:bg-indigo-200 selection:text-slate-900">
   <RainbowCursor/>
     
      {/* Top progress bar */}
      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 h-1 origin-left bg-indigo-500 z-50" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mt-3" />
          <div className={`flex items-center justify-between rounded-2xl px-4 py-3 shadow-md ${dark ? 'glass-dark' : 'glass'}`}>
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6" />
              <span className="font-semibold">{PROFILE.name}</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {navItems.map((n) => (
                <a key={n.href} href={n.href} className="hover:opacity-80">{n.label}</a>
              ))}
              
                <motion.a
            href={PROFILE.resumeUrl}
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(59,130,246,0.7)" }}
           whileTap={{ scale: 0.9 }}
             className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-500">
        <Download className="h-4 w-4" /> Resume
        </motion.a>

              <button onClick={() => setDark((d) => !d)} className="rounded-xl px-3 py-2 border border-slate-300 dark:border-slate-700">
                {dark ? "Light" : "Dark"}
              </button>
            </nav>
            <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden mx-auto max-w-6xl px-4">
            <div className={`mt-2 rounded-2xl px-4 py-3 shadow-md ${dark ? 'glass-dark' : 'glass'}`}>
              <div className="grid gap-2">
                {navItems.map((n) => (
                  <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 border-b border-slate-200/40 dark:border-slate-700/40">
                    {n.label}
                  </a>
                ))}
                <div className="flex items-center gap-3 pt-3">
                  <a href={PROFILE.resumeUrl} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-500">
                    <Download className="h-4 w-4" /> Resume
                  </a>
                  <button onClick={() => setDark((d) => !d)} className="rounded-xl px-3 py-2 border border-slate-300 dark:border-slate-700">
                    {dark ? "Light" : "Dark"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <Section id="home" className="mx-auto max-w-6xl px-4 pt-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-sm w-fit">
              <Code2 className="h-4 w-4" /> {PROFILE.role}
            </div>
            

 <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold mb-4"
      >
        Hi, I’m {PROFILE.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-xl text-gray-200"
      >
     {typed} 
              <span className="inline-block w-1.5 h-6 align-middle bg-indigo-500 ml-1 animate-pulse" />
      </motion.p>

            <div className="flex items-center gap-3">
<motion.a
href="#projects"
  whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(59,130,246,0.7)" }}
  whileTap={{ scale: 0.9 }}
className="rounded-2xl px-5 py-3 bg-indigo-600 text-white hover:bg-indigo-500"
>
  View Projects
</motion.a>
<motion.a
href="#contact"
  whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(59,130,246,0.7)" }}
  whileTap={{ scale: 0.9 }}
className="rounded-2xl px-5 py-3 border border-slate-300 dark:border-slate-700"
>
  Contact Me
</motion.a>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a className="inline-flex items-center gap-2 hover:opacity-80" href={`mailto:${PROFILE.email}`}>
                <Mail className="h-5 w-5" /> Email
              </a>
              <a className="inline-flex items-center gap-2 hover:opacity-80" href={PROFILE.socials.github} target="_blank" rel="noreferrer">
                <Github className="h-5 w-5" /> GitHub
              </a>
              <a className="inline-flex items-center gap-2 hover:opacity-80" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-5 w-5" /> LinkedIn
              </a>
              <a className="inline-flex items-center gap-2 hover:opacity-80" href={PROFILE.socials.facebook} target="_blank" rel="noreferrer">
                <Facebook className="h-5 w-5" /> Facebook
              </a>
              <a className="inline-flex items-center gap-2 hover:opacity-80" href={PROFILE.socials.instagram} target="_blank" rel="noreferrer">
                <Instagram className="h-5 w-5" /> Instagram
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl shadow-xl overflow-hidden bg-gradient-to-br from-indigo-500/20 via-transparent to-fuchsia-500/20 flex items-center justify-center">
              <motion.img
                src="/Image/profile.png"
                alt="Profile"
                className="h-full w-full object-contain rounded-3xl"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" className="mx-auto max-w-6xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-4 ">
            <h2 className="text-3xl font-bold">About Me</h2>
            <p className="opacity-90 leading-relaxed">
             A results-driven developer with hands-on experience in PHP, Laravel, React.js, and Next.js. I excel at delivering
robust software solutions, building full-stack applications, and integrating APIs. Quick to adapt, I continuously
learn new technologies to meet modern development challenges.
            </p>
          </div>

<motion.div

  whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(59,130,246,0.7)" }}
  whileTap={{ scale: 0.9 }}
className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 gap-4 shadow-sm bg-white/60 dark:bg-slate-900/60 backdrop-blur"
>
  <h3 className="font-semibold mb-3">Quick Info</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="opacity-70"> Location: </span>{PROFILE.location}</li>
              <li><span className="opacity-70"> Email:  </span> {PROFILE.email}</li>
              <li><span className="opacity-70"> Open to Work: </span> Yes</li>
            </ul>
</motion.div>

        
        </motion.div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-bold mb-8">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {SKILLS.map((s) => (
            <motion.span key={s} whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(59,130,246,0.7)" }}
            whileTap={{ scale: 0.9 }} className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-sm">
              {s}
            </motion.span>
          ))}
        </div>
      </Section>

         {/* EDUCATION */}
      <Section id="education" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-bold mb-8">Education</h2>
        <div className="flex flex-wrap gap-3">
          {EDUCATION.map((s) => (
            <motion.span key={s}  whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(59,130,246,0.7)" }}
            whileTap={{ scale: 0.9 }} className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-sm">
              {s}
            </motion.span>
          ))}
        </div>
      </Section>

     {/* PROJECTS */}
<Section id="projects" className="mx-auto max-w-6xl px-4 py-20">
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-3xl font-bold">Projects</h2>
  </div>

  <ProjectsCard />
</Section>


      {/* CONTACT */}
      <Section id="contact" className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Let’s work together</h2>
            <p className="opacity-90">Have a project in mind or just want to say salam? Drop me a message.</p>
            <div className="mt-6 grid gap-3 text-sm">
              <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2">
                <Mail className="h-5 w-5" /> {PROFILE.email}
              </a>
              <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Github className="h-5 w-5" /> GitHub
              </a>
              <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Linkedin className="h-5 w-5" /> LinkedIn
              </a>
               <a href={PROFILE.socials.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Facebook className="h-5 w-5" /> LinkedIn
              </a>
               <a href={PROFILE.socials.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Instagram className="h-5 w-5" /> Instagram
              </a>
            </div>
          </div>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const subject = encodeURIComponent("Portfolio Contact");
              const body = encodeURIComponent(
                `Name: ${data.get("name")}\nEmail: ${data.get("from")}\nMessage: ${data.get("message")}`
              );
              window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
            }}
            className="grid gap-4"
          >
            <input name="name" required placeholder="Your name" className="rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 bg-transparent" />
            <input name="from" required type="email" placeholder="Your email" className="rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 bg-transparent" />
            <textarea name="message" required rows={5} placeholder="Message" className="rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 bg-transparent" />
           
           <motion.button
  whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(59,130,246,0.7)" }}
  whileTap={{ scale: 0.9 }}
  className="rounded-2xl px-5 py-3 bg-indigo-600 text-white hover:bg-indigo-500">
  Send
</motion.button>
          </motion.form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 mt-10">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-80">
          <div>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
          <div>Built with React, Tailwind & Framer Motion.</div>
        </div>
      </footer>
    </div>
  );
}
