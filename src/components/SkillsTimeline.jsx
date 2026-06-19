import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SKILL_GROUPS = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML5 & CSS3", percent: 95 },
      { name: "JavaScript", percent: 85 },
      { name: "React.js", percent: 55 },
      { name: "Next.js", percent: 35 },
      { name: "Tailwind CSS", percent: 60 },
      { name: "Bootstrap", percent: 88 },
    ],
  },
  {
    category: "Backend & Database",
    skills: [
      { name: "PHP", percent: 88 },
      { name: "Laravel", percent: 85 },
      { name: "MySQL", percent: 85 },
      { name: "REST APIs", percent: 80 },
    ],
  },
  {
    category: "CMS & eCommerce",
    skills: [
      { name: "WordPress", percent: 92 },
      { name: "WooCommerce", percent: 88 },
      { name: "Shopify", percent: 45 },
      { name: "Custom Themes & Plugins", percent: 90 },
    ],
  },
  {
    category: "Professional",
    skills: [
      { name: "Responsive Web Design", percent: 95 },
      { name: "UI/UX Implementation", percent: 85 },
      { name: "Communication & Teamwork", percent: 90 },
      { name: "MS Office", percent: 75 },
    ],
  },
];

function SkillBar({ name, percent, delay, animate }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) {
      setCount(0);
      return;
    }

    let raf;
    const start = performance.now();
    const duration = 1400;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * percent));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(percent);
    };

    const timeout = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [animate, percent, delay]);

  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-percent">{count}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={animate ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <motion.div
          className="skill-bar-glow"
          initial={{ left: 0, opacity: 0 }}
          animate={animate ? { left: `${percent}%`, opacity: [0, 1, 0] } : { left: 0, opacity: 0 }}
          transition={{ duration: 1.4, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function SkillGroup({ group, groupIndex, animate }) {
  let delayOffset = groupIndex * 0.15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
      className="skill-group"
    >
      <h3 className="skill-group-title">{group.category}</h3>
      <div className="skill-group-list">
        {group.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            percent={skill.percent}
            delay={delayOffset + i * 0.08}
            animate={animate}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="skills-progress">
      <div className="skills-progress-grid">
        {SKILL_GROUPS.map((group, i) => (
          <SkillGroup key={group.category} group={group} groupIndex={i} animate={inView} />
        ))}
      </div>
    </div>
  );
}
