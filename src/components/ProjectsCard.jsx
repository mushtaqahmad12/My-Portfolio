"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projectsData = [
  {
    title: "MoodMusic",
    description:
      "Built a music streaming application using Laravel and integrated Youtube API to fetch and play songs dynamically. Implemented search, playlist management and smooth UI.",
    tech: ["Laravel", "Mysql", "Youtube API"],
    live: "https://github.com/mushtaqahmad12/MoodMusic",
  },
  {
    title: "CRM Application",
    description:
      "Created a Customer Relationship Management system to manage leads, Task and Craete task. Implemented user authentication,reporting dashbourd and role based access.",
    tech: ["React.js", "TailwindCSS", "LocalStorage"],
    live: "https://github.com/mushtaqahmad12/CRM",
  },
  {
    title: "C.R.U.D",
    description:
      "Developed a complete CRUD (Create, Read, Update, Delete, Live search) system with user-friendly interface and database integration.",
    tech: ["Bootstrap", "PHP", "MySQL"],
    live: "https://github.com/mushtaqahmad12/CRUD-",
  },
  {
    title: "SoundBlast",
    description:
      "Designed and developed a modern music platform with interface UI, responsive layout and audio management features.",
    tech: ["HTML", "CSS3", "JavaScript", "AJAX"],
    live: "https://github.com/mushtaqahmad12/SoundBlast",
  },
  {
    title: "WalkWay Inventory Shop",
    description:
      "Created a WalkWay Inventory Shop to manage clients, total inventory, total income,  products and customers. Implemented user authentication,reporting dashbourd and role based access.",
    tech: ["Laravel", "Bootstrap", "Mysql"],
    live: "https://github.com/mushtaqahmad12/WalkWay-Inventory-Shop",
  },
  {
    title: "Weather Project",
    description:
      "Created a Weather app system to show the every country, city live weather with user-friendly interface and responsive layout .",
    tech: ["HTML", "Bootstrap", "API"],
    live: "https://github.com/mushtaqahmad12/Weather-Project",
  },
];

// 👇 shuffle function
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// 👇 spring config
const spring = { type: "spring", damping: 20, stiffness: 300 };

export default function ProjectsCard() {
  const [projects, setProjects] = useState(projectsData);

  // har 4 sec me shuffle
  useEffect(() => {
    const t = setTimeout(() => setProjects(shuffle(projects)), 4000);
    return () => clearTimeout(t);
  }, [projects]);

  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p, i) => (
        <motion.li
          key={p.title}
          layout
          transition={spring}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{
            y: -8,
            scale: 1.03,
            boxShadow: "0px 0px 25px rgba(99,102,241,0.4)",
          }}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm opacity-80 mt-1">{p.description}</p>
            </div>
            <ExternalLink className="h-5 w-5 opacity-60" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span
                key={t}
                className="text-xs rounded-lg px-2 py-1 border border-slate-200 dark:border-slate-800"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center text-sm">
            <motion.a
              href={p.live}
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 15px rgba(59,130,246,0.6)",
              }}
              whileTap={{ scale: 0.9 }}
              className="rounded-xl px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-500"
            >
              Github Code
            </motion.a>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
