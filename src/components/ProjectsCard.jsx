import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Eye, Github, Globe } from "lucide-react";
import StatCounter from "./StatCounter";

const featuredClients = [
  {
    title: "Hearts of Compassion LLC",
    description: "Nonprofit organization website with compassionate branding, service pages, and donation-focused UX.",
    tech: ["WordPress", "Custom Theme", "Responsive"],
    live: "https://heartsofcompassionllc.org/",
    uiImage: "/Image/heartsofcompassionllc.png",
  },
  {
    title: "Hardbody Way",
    description: "Fitness brand platform with bold visuals, program showcases, and conversion-driven layout.",
    tech: ["WordPress", "WooCommerce", "UI/UX"],
    live: "https://hardbodyway.com/",
    uiImage: "/Image/hardbodyway.png",
  },
  {
    title: "Tally Exp Shuttle",
    description: "Transportation service site with booking flow, route info, and clean mobile-first design.",
    tech: ["WordPress", "Elementor", "Responsive"],
    live: "https://tallyexpshuttle.com/",
    uiImage: "/Image/tallyexpshuttle.png",
  },
  {
    title: "Restore Minds",
    description: "Mental wellness platform with calming aesthetics, service listings, and trust-building content.",
    tech: ["WordPress", "Custom Design", "SEO"],
    live: "https://restore-minds.com/",
    uiImage: "/Image/restore-minds.png",
  },
  {
    title: "Opulent Tourz",
    description: "Luxury travel & tours website with premium visuals, package listings, and inquiry forms.",
    tech: ["WordPress", "Travel UI", "Responsive"],
    live: "https://opulenttourz.com/",
    uiImage: "/Image/opulenttourz.png",
  },
  {
    title: "Power Car Sales Ltd",
    description: "UK automotive dealership site with inventory showcase, lead forms, and professional branding.",
    tech: ["WordPress", "Automotive", "UK Market"],
    live: "https://powercarsalesltd.co.uk/",
    uiImage: "/Image/powercarsalesltd.png",
  },
  {
    title: "EAM Construction Ltd",
    description: "Construction company portfolio with project galleries, services, and corporate identity.",
    tech: ["WordPress", "Portfolio", "B2B"],
    live: "https://eamconstructionltd.designvation.com/",
    uiImage: "/Image/eamconstructionltd.png",
  },
  {
    title: "Sakura Holistic Therapies",
    description: "Holistic therapy practice site with serene design, treatment pages, and booking integration.",
    tech: ["WordPress", "Wellness", "Custom UI"],
    live: "https://sakuraholistictherapies.co.uk/",
    uiImage: "/Image/sakuraholistictherapies.png",
  },
  {
    title: "InfoSec AI",
    description: "Cybersecurity & AI solutions site with modern tech aesthetic and service-focused architecture.",
    tech: ["WordPress", "Tech SaaS", "Landing Pages"],
    live: "https://infosecai.designvation.com/",
    uiImage: "/Image/infosecai.png",
  },
];

const devProjects = [
  {
    title: "MoodMusic",
    description: "Music streaming app with Laravel and YouTube API — dynamic search, playlists, and smooth playback.",
    tech: ["Laravel", "MySQL", "YouTube API"],
    live: "https://github.com/mushtaqahmad12/MoodMusic",
    uiImage: "/Image/moodmusic.png",
    type: "github",
  },
  {
    title: "CRM System",
    description: "Client and sales management with authentication, reporting dashboard, and role-based access.",
    tech: ["Laravel", "MySQL"],
    live: "https://github.com/mushtaqahmad12/CRM",
    uiImage: "/Image/crm.jpg",
    type: "github",
  },
  {
    title: "CRUD Application",
    description: "Full CRUD system with live search, clean UI, and MySQL database integration.",
    tech: ["PHP", "MySQL", "Bootstrap"],
    live: "https://github.com/mushtaqahmad12/CRUD-",
    uiImage: "/Image/crud.png",
    type: "github",
  },
  {
    title: "SoundBlast",
    description: "Modern music platform with responsive React UI, Tailwind styling, and audio management.",
    tech: ["React.js", "Tailwind CSS"],
    live: "https://github.com/mushtaqahmad12/SoundBlast",
    uiImage: "/Image/soundblast.png",
    type: "github",
  },
];

function FeaturedCard({ project, index, onPreview }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="group"
    >
      <div className="featured-card">
        <div className="featured-card-image">
          <img
            src={project.uiImage}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="featured-card-overlay" />
          <span className="featured-badge">
            <Globe className="h-3 w-3" /> Live Client
          </span>
          <div className="featured-card-arrow">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="p-5">
          <h3 className="featured-card-title">{project.title}</h3>
          <p className="featured-card-desc">{project.description}</p>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="chip-tech">{t}</span>
            ))}
          </div>
          <div className="flex gap-2">
            <motion.a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-glow-primary flex-1 !py-2.5 !text-xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Visit Live Site
            </motion.a>
            <motion.button
              type="button"
              onClick={() => onPreview(project.uiImage)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-glow !px-4 !py-2.5 !text-xs"
            >
              <Eye className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

function DevCard({ project, index, onPreview }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group h-full"
    >
      <div className="project-card">
        <div className="relative aspect-video shrink-0 overflow-hidden">
          {project.uiImage && (
            <>
              <img
                src={project.uiImage}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] via-transparent to-transparent opacity-80" />
            </>
          )}
        </div>
        <div className="project-card-body">
          <h3 className="mb-2 line-clamp-1 text-base font-bold" style={{ color: "var(--text-primary)" }}>
            {project.title}
          </h3>
          <p className="project-card-desc">{project.description}</p>
          <div className="project-card-tags">
            {project.tech.map((t) => (
              <span key={t} className="chip-tech">{t}</span>
            ))}
          </div>
          <div className="project-card-actions">
            <motion.a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-glow min-w-0 flex-1 !px-2 !py-2 !text-[11px]"
            >
              <Github className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Source</span>
            </motion.a>
            {project.uiImage && (
              <motion.button
                type="button"
                onClick={() => onPreview(project.uiImage)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-glow min-w-0 flex-1 !px-2 !py-2 !text-[11px]"
              >
                <Eye className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Preview</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default function ProjectsCard() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {/* Featured client work */}
      <div className="mb-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow !mb-2">Client Work</p>
            <h3 className="text-2xl font-bold md:text-3xl" style={{ color: "var(--text-primary)" }}>
              Live Websites I've Built
            </h3>
            <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              {featuredClients.length}+ production websites — WordPress, custom themes & eCommerce
            </p>
          </div>
          <div className="hero-stat-pill">
            <StatCounter value={featuredClients.length} suffix="+" className="hero-stat-num" />
            <span className="hero-stat-label">Live Sites</span>
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredClients.map((p, i) => (
            <FeaturedCard key={p.live} project={p} index={i} onPreview={setSelectedImage} />
          ))}
        </ul>
      </div>

      {/* Dev projects */}
      <div>
        <div className="mb-8">
          <p className="section-eyebrow !mb-2">Code Projects</p>
          <h3 className="text-2xl font-bold md:text-3xl" style={{ color: "var(--text-primary)" }}>
            Full-Stack Applications
          </h3>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            Laravel, React & PHP projects with source code on GitHub
          </p>
        </div>

        <ul className="grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {devProjects.map((p, i) => (
            <DevCard key={p.title} project={p} index={i} onPreview={setSelectedImage} />
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            style={{ background: "rgba(0,0,0,0.8)" }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[88vh] max-w-5xl overflow-hidden rounded-2xl"
              style={{ border: "1px solid var(--border)", boxShadow: "0 0 80px var(--glow)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                style={{ background: "var(--bg-glass)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
              >
                ✕
              </button>
              <img src={selectedImage} alt="Project preview" className="max-h-[88vh] w-full object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
