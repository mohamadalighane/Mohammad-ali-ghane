import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Instagram, 
  Linkedin, 
  Terminal, 
  Cpu, 
  ShoppingCart, 
  BrainCircuit, 
  Rocket, 
  Code2, 
  ChevronRight, 
  Globe,
  Mail,
  Zap,
  Layout,
  MessageSquare
} from 'lucide-react';

// --- Types ---
type Language = 'en' | 'fa';

interface Translation {
  nav: { about: string; projects: string; vision: string; skills: string; contact: string };
  hero: { greeting: string; name: string; tag: string; cta: string };
  about: { title: string; content: string };
  projects: { title: string; subtitle: string; items: any[] };
  vision: { title: string; quote: string; author: string; content: string };
  skills: { title: string; categories: any[] };
  contact: { title: string; content: string; button: string };
}

// --- Translations ---
const translations: Record<Language, Translation> = {
  en: {
    nav: { about: 'About', projects: 'Ventures', vision: 'Vision', skills: 'Stack', contact: 'Connect' },
    hero: { greeting: "Hi, I'm", name: "Mohammadali Ghaneh", tag: "Building the Next Era of AI Products.", cta: "Explore Ventures" },
    about: { 
      title: "The Architect", 
      content: "A 15-year-old developer obsessed with high-quality digital experiences. I don't just write code; I build scalable ecosystems. My focus lies at the intersection of Artificial Intelligence, advanced Python development, and psychological UI design." 
    },
    projects: {
      title: "Ecosystems",
      subtitle: "Scalable digital products built from the ground up.",
      items: [
        { id: 1, name: "Persian AI Marketplace", desc: "A minimal hub for high-performance AI prompts.", icon: <BrainCircuit size={32} />, tags: ["AI", "Marketplace", "B&W UI"] },
        { id: 2, name: "ZoneBuy", desc: "Premium Persian e-commerce platform for the modern era.", icon: <ShoppingCart size={32} />, tags: ["E-com", "Web", "Persian"] },
        { id: 3, name: "Tech Supplies", desc: "Modern tech infrastructure via social commerce.", icon: <Cpu size={32} />, tags: ["Retail", "Tech", "Instagram"] },
      ]
    },
    vision: {
      title: "Philosophical Foundation",
      quote: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
      content: "I believe in the power of strategic thinking and psychological design. Every product is a bridge between a human need and a technological solution. My goal is to launch global digital businesses that define excellence."
    },
    skills: {
      title: "The Stack",
      categories: [
        { name: "Artificial Intelligence", level: "90%", icon: <BrainCircuit className="text-cyan-400" /> },
        { name: "Advanced Python", level: "85%", icon: <Terminal className="text-purple-400" /> },
        { name: "Frontend Architecture", level: "95%", icon: <Layout className="text-white" /> },
        { name: "Prompt Engineering", level: "98%", icon: <Zap className="text-yellow-400" /> }
      ]
    },
    contact: {
      title: "Initialize Connection",
      content: "Let's build something world-class together.",
      button: "Send Transmission"
    }
  },
  fa: {
    nav: { about: 'درباره', projects: 'پروژه‌ها', vision: 'چشم‌انداز', skills: 'مهارت‌ها', contact: 'ارتباط' },
    hero: { greeting: "من", name: "محمدعلی قانع", tag: "در حال ساخت نسل بعدی محصولات هوش مصنوعی هستم.", cta: "مشاهده پروژه‌ها" },
    about: { 
      title: "معمار دیجیتال", 
      content: "توسعه‌دهنده‌ای ۱۵ ساله که مجذوب تجربه‌های دیجیتال با کیفیت بالا است. من فقط کد نمی‌نویسم؛ من اکوسیستم‌های مقیاس‌پذیر می‌سازم. تمرکز من بر تلاقی هوش مصنوعی، پایتون پیشرفته و طراحی رابط کاربری روان‌شناختی است." 
    },
    projects: {
      title: "اکوسیستم‌ها",
      subtitle: "محصولات دیجیتال مقیاس‌پذیر که از پایه ساخته شده‌اند.",
      items: [
        { id: 1, name: "مارکت‌پلیس هوش مصنوعی", desc: "مرکزی مینیمال برای پرامپت‌های سطح بالای هوش مصنوعی.", icon: <BrainCircuit size={32} />, tags: ["AI", "Marketplace", "B&W UI"] },
        { id: 2, name: "زون‌بای", desc: "پلتفرم فروشگاهی مدرن فارسی برای عصر جدید.", icon: <ShoppingCart size={32} />, tags: ["E-com", "Web", "Persian"] },
        { id: 3, name: "تجهیزات تکنولوژی", desc: "زیرساخت تکنولوژی مدرن از طریق تجارت اجتماعی.", icon: <Cpu size={32} />, tags: ["Retail", "Tech", "Instagram"] },
      ]
    },
    vision: {
      title: "بنیان فلسفی",
      quote: "بهترین راه برای پیش‌بینی آینده، ساختن آن است.",
      author: "پیتر دراکر",
      content: "من به قدرت تفکر استراتژیک و طراحی روان‌شناختی اعتقاد دارم. هر محصول پلی است بین نیاز انسانی و راهکار تکنولوژیک. هدف من راه‌اندازی کسب‌وکارهای دیجیتال جهانی است که استاندارد تعالی را تعیین می‌کنند."
    },
    skills: {
      title: "تکنولوژی‌ها",
      categories: [
        { name: "هوش مصنوعی", level: "90%", icon: <BrainCircuit className="text-cyan-400" /> },
        { name: "پایتون پیشرفته", level: "85%", icon: <Terminal className="text-purple-400" /> },
        { name: "معماری فرانت‌اند", level: "95%", icon: <Layout className="text-white" /> },
        { name: "مهندسی پرامپت", level: "98%", icon: <Zap className="text-yellow-400" /> }
      ]
    },
    contact: {
      title: "برقراری ارتباط",
      content: "بیایید با هم چیزی در سطح جهانی بسازیم.",
      button: "ارسال پیام"
    }
  }
};

// --- Components ---

const Navbar = ({ lang, setLang, t }: { lang: Language; setLang: (l: Language) => void; t: Translation }) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 glass py-4 px-6 md:px-12 flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-lg rounded-sm">M</div>
        <span className="hidden md:block font-bold tracking-tighter uppercase text-sm">Ghaneh.dev</span>
      </div>
      
      <div className="flex items-center gap-8">
        <ul className={`hidden md:flex gap-8 text-xs uppercase tracking-widest font-semibold ${lang === 'fa' ? 'flex-row-reverse' : ''}`}>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors"><a href="#about">{t.nav.about}</a></li>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors"><a href="#projects">{t.nav.projects}</a></li>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors"><a href="#skills">{t.nav.skills}</a></li>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors"><a href="#contact">{t.nav.contact}</a></li>
        </ul>
        
        <button 
          onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
          className="glass px-3 py-1 text-[10px] uppercase font-bold flex items-center gap-2 hover:bg-white/10 transition-all rounded-full"
        >
          <Globe size={14} />
          {lang === 'en' ? 'FA' : 'EN'}
        </button>
      </div>
    </motion.nav>
  );
};

const Hero = ({ t, lang }: { t: Translation; lang: Language }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-900/10 blur-[150px] -z-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-900/10 blur-[150px] -z-10 rounded-full"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase block mb-4">
          {t.hero.greeting}
        </span>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          {t.hero.name}
        </h1>
        <p className="text-xl md:text-2xl text-white/60 font-light mb-10 max-w-2xl mx-auto">
          {t.hero.tag}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            {t.hero.cta}
          </motion.a>
          <motion.a 
            href="#contact"
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            className="border border-white/20 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all"
          >
            {lang === 'en' ? 'Get in Touch' : 'ارتباط مستقیم'}
          </motion.a>
        </div>
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 to-white/40 mx-auto"></div>
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ project, lang }: { project: any; lang: Language }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass p-8 rounded-2xl flex flex-col h-full group transition-all hover:border-white/30"
    >
      <div className="mb-6 p-4 bg-white/5 w-fit rounded-xl group-hover:bg-cyan-500 group-hover:text-black transition-all">
        {project.icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
      <p className="text-white/50 text-sm mb-6 flex-grow">{project.desc}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag: string) => (
          <span key={tag} className="text-[10px] uppercase font-bold tracking-tighter bg-white/10 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
        {lang === 'en' ? 'View Evolution' : 'مشاهده جزئیات'}
        <ChevronRight size={14} className={lang === 'fa' ? 'rotate-180' : ''} />
      </button>
    </motion.div>
  );
};

const SkillsSection = ({ t, lang }: { t: Translation; lang: Language }) => {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-zinc-950/30">
      <div className="max-w-6xl mx-auto">
        <div className={`mb-16 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">{t.skills.title}</h2>
          <div className="w-24 h-1 bg-white"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.skills.categories.map((skill, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all cursor-default"
            >
              <div className="p-3 bg-black rounded-lg">{skill.icon}</div>
              <div>
                <h4 className="font-bold text-sm tracking-tighter uppercase">{skill.name}</h4>
                <div className="w-full bg-white/10 h-[2px] mt-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-white"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VisionSection = ({ t, lang }: { t: Translation; lang: Language }) => {
  return (
    <section id="vision" className="py-32 px-6 md:px-12 overflow-hidden relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className={`mb-12 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">{t.vision.title}</h2>
          <blockquote className="border-l-4 border-cyan-400 pl-8 mb-8 italic text-2xl md:text-3xl font-light text-white/80">
            "{t.vision.quote}"
            <footer className="mt-4 text-sm font-bold uppercase tracking-widest text-cyan-400">— {t.vision.author}</footer>
          </blockquote>
          <p className="text-lg md:text-xl leading-relaxed text-white/60 font-light">
            {t.vision.content}
          </p>
        </div>
      </div>
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none select-none">
        <span className="text-[200px] font-black uppercase leading-none tracking-tighter block rotate-90">FUTURE</span>
      </div>
    </section>
  );
};

const Footer = ({ t, lang }: { t: Translation; lang: Language }) => {
  return (
    <footer className="py-20 px-6 md:px-12 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold text-xl rounded-sm">M</div>
            <span className="font-bold tracking-tighter uppercase text-lg">Ghaneh.dev</span>
          </div>
          <p className="text-white/40 text-sm mb-8">
            {lang === 'en' 
              ? "Designing elite-level digital products that push the boundaries of technology and human potential."
              : "طراحی محصولات دیجیتال در سطح نخبگان که مرزهای تکنولوژی و پتانسیل انسانی را جابجا می‌کند."}
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-cyan-400 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-cyan-400 transition-colors"><Github size={20} /></a>
            <a href="#" className="hover:text-cyan-400 transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
        
        <div id="contact" className="w-full md:w-auto min-w-[300px]">
          <h3 className="text-xl font-bold uppercase mb-6">{t.contact.title}</h3>
          <div className="flex flex-col gap-4">
            <a href="mailto:contact@ghaneh.dev" className="flex items-center gap-4 glass p-4 rounded-xl hover:bg-white/5 transition-all">
              <Mail size={20} className="text-cyan-400" />
              <span className="font-mono text-sm">contact@ghaneh.dev</span>
            </a>
            <button className="w-full bg-white text-black font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all">
              {t.contact.button}
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-[10px] uppercase tracking-widest text-white/30 font-bold">
        <span>© 2024 MOHAMMADALI GHANEH. ALL RIGHTS RESERVED.</span>
        <span>DESIGNED FOR THE FUTURE.</span>
      </div>
    </footer>
  );
};

// --- App Root ---

const App = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`selection:bg-cyan-500 selection:text-black ${lang === 'fa' ? 'font-vazir' : 'font-inter'}`}>
      <Navbar lang={lang} setLang={setLang} t={t} />
      
      <main>
        <Hero t={t} lang={lang} />
        
        <section id="about" className="py-32 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ x: lang === 'en' ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-mono uppercase tracking-[0.5em] text-cyan-400 mb-4">{t.nav.about}</h2>
              <h3 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter">{t.about.title}</h3>
              <p className="text-xl text-white/60 leading-relaxed font-light">
                {t.about.content}
              </p>
            </motion.div>
            <div className="relative">
              <div className="aspect-square glass rounded-3xl overflow-hidden relative group">
                {/* Visual representation of AI/Core */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-2/3 h-2/3 border-2 border-white/10 rounded-full flex items-center justify-center border-dashed"
                  >
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="w-1/2 h-1/2 border-2 border-cyan-400/30 rounded-full flex items-center justify-center"
                    >
                      <BrainCircuit size={64} className="text-white group-hover:text-cyan-400 transition-colors" />
                    </motion.div>
                  </motion.div>
                </div>
                {/* Ambient light */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">AI Status: Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-32 px-6 md:px-12 relative">
          <div className="max-w-6xl mx-auto">
            <div className={`mb-20 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
              <h2 className="text-sm font-mono uppercase tracking-[0.5em] text-purple-400 mb-4">{t.nav.projects}</h2>
              <h3 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">{t.projects.title}</h3>
              <p className="text-xl text-white/50">{t.projects.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.projects.items.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProjectCard project={project} lang={lang} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <VisionSection t={t} lang={lang} />
        
        <SkillsSection t={t} lang={lang} />
      </main>
      
      <Footer t={t} lang={lang} />
      
      {/* Visual background noise/texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
