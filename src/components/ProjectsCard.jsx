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
     uiImage: "/Image/moodmusic.png",
  },
  {
    title: "CRM Application",
    description:
      "Created a Customer Relationship Management system to manage leads, Task and Craete task. Implemented user authentication,reporting dashbourd and role based access.",
    tech: ["React.js", "TailwindCSS", "LocalStorage"],
    live: "https://github.com/mushtaqahmad12/CRM",
     uiImage: "/Image/crm.jpg",
  },
  {
    title: "C.R.U.D",
    description:
      "Developed a complete CRUD (Create, Read, Update, Delete, Live search) system with user-friendly interface and database integration.",
    tech: ["Bootstrap", "PHP", "MySQL"],
    live: "https://github.com/mushtaqahmad12/CRUD-",
     uiImage: "/Image/crud.png",
  },
  {
    title: "SoundBlast",
    description:
      "Designed and developed a modern music platform with interface UI, responsive layout and audio management features.",
    tech: ["HTML", "CSS3", "JavaScript", "AJAX"],
    live: "https://github.com/mushtaqahmad12/SoundBlast",
     uiImage: "/Image/soundblast.png",
  },
  {
    title: "WalkWay Inventory Shop",
    description:
      "Created a WalkWay Inventory Shop to manage clients, total inventory, total income,  products and customers. Implemented user authentication,reporting dashbourd and role based access.",
    tech: ["Laravel", "Bootstrap", "Mysql"],
    live: "https://github.com/mushtaqahmad12/WalkWay-Inventory-Shop",
     uiImage: "/Image/inventory.jpg",
  },
  {
    title: "Weather Project",
    description:
      "Created a Weather app system to show the every country, city live weather with user-friendly interface and responsive layout .",
    tech: ["HTML", "Bootstrap", "API"],
    live: "https://github.com/mushtaqahmad12/Weather-Project",
     uiImage: "/Image/weather.PNG",
  },
];

// shuffle
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
const spring = { type: "spring", damping: 20, stiffness: 300 };

export default function ProjectsCard() {
  const [projects, setProjects] = useState(projectsData);
  const [selectedImage, setSelectedImage] = useState(null); // 👈 modal image

  // shuffle every 8s
  useEffect(() => {
    const t = setTimeout(() => setProjects(shuffle(projects)), 8000);
    return () => clearTimeout(t);
  }, [projects]);

  return (
    <>
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
            className="rounded-2xl p-5 bg-gradient-to-br from-indigo-500/20 via-transparent to-fuchsia-500/20 "
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

            <div className="mt-5 flex items-center gap-3 text-sm">
              {/* Github Code button */}
              <motion.a
                href={p.live}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 15px rgba(59,130,246,0.6)",
                }}
                whileTap={{ scale: 0.9 }}
                className=" px-3 py-2 text-white font-bold rounded-full 
  bg-gradient-to-br from-indigo-500/20 via-transparent to-fuchsia-500/20"
              >
                Github Code
              </motion.a>

              {/* View UI button */}
              {p.uiImage && (
                <motion.button
                  onClick={() => setSelectedImage(p.uiImage)}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0px 0px 15px rgba(255,165,0,0.6)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="px-3 py-2 text-white font-bold rounded-full 
  bg-gradient-to-br from-indigo-500/20 via-transparent to-fuchsia-500/20"
                >
                  View UI
                </motion.button>
              )}
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-transparent rounded-xl p-1 max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-3 text-black text-3xl"
            >
              ✖
            </button>
            <img
              src={selectedImage}
              alt="Project UI"
              className="rounded-lg max-h-[80vh] mx-auto"
            />
          </motion.div>
        </div>
      )}
    </>
  );
}