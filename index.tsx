
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion as m, AnimatePresence } from 'framer-motion';
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
  MessageSquare,
  Menu,
  X
} from 'lucide-react';

// --- Fix: Shadow the motion object with an 'any' type to resolve property inference errors ---
const motion = m as any;

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
      title: "Mohammadali ghane", 
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
      title: "محمد علی قانع", 
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
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#contact", label: t.nav.contact }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 glass py-4 px-6 md:px-12 flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-lg rounded-sm">M</div>
        <span className="hidden sm:block font-bold tracking-tighter uppercase text-sm">Ghaneh.dev</span>
      </div>
      
      <div className="flex items-center gap-4 md:gap-8">
        <ul className={`hidden md:flex gap-8 text-xs uppercase tracking-widest font-semibold ${lang === 'fa' ? 'flex-row-reverse' : ''}`}>
          {navLinks.map(link => (
            <li key={link.href} className="hover:text-cyan-400 cursor-pointer transition-colors">
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        
        <button 
          onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
          className="glass px-3 py-1 text-[10px] uppercase font-bold flex items-center gap-2 hover:bg-white/10 transition-all rounded-full"
        >
          <Globe size={14} />
          {lang === 'en' ? 'FA' : 'EN'}
        </button>

        <button 
          className="md:hidden p-2 glass rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: lang === 'fa' ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: lang === 'fa' ? -100 : 100 }}
            className="fixed inset-0 top-[64px] bg-black/95 backdrop-blur-xl z-40 md:hidden flex flex-col p-8 gap-8 items-center justify-center text-center"
          >
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-black uppercase tracking-tighter hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = ({ t, lang }: { t: Translation; lang: Language }) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-cyan-900/10 blur-[80px] md:blur-[150px] -z-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-900/10 blur-[80px] md:blur-[150px] -z-10 rounded-full"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <span className="text-cyan-400 font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-4">
          {t.hero.greeting}
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-[1.1] md:leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          {t.hero.name}
        </h1>
        <p className="text-lg md:text-2xl text-white/60 font-light mb-10 max-w-2xl mx-auto px-4">
          {t.hero.tag}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            {t.hero.cta}
          </motion.a>
          <motion.a 
            href="#contact"
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            className="w-full sm:w-auto border border-white/20 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all"
          >
            {lang === 'en' ? 'Get in Touch' : 'ارتباط مستقیم'}
          </motion.a>
        </div>
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
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
      className="glass p-6 md:p-8 rounded-2xl flex flex-col h-full group transition-all hover:border-white/30"
    >
      <div className="mb-6 p-4 bg-white/5 w-fit rounded-xl group-hover:bg-cyan-500 group-hover:text-black transition-all">
        {project.icon}
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-3">{project.name}</h3>
      <p className="text-white/50 text-sm mb-6 flex-grow">{project.desc}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag: string) => (
          <span key={tag} className="text-[9px] md:text-[10px] uppercase font-bold tracking-tighter bg-white/10 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <button className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
        {lang === 'en' ? 'View Evolution' : 'مشاهده جزئیات'}
        <ChevronRight size={14} className={lang === 'fa' ? 'rotate-180' : ''} />
      </button>
    </motion.div>
  );
};

const SkillsSection = ({ t, lang }: { t: Translation; lang: Language }) => {
  return (
    <section id="skills" className="py-20 md:py-32 px-6 md:px-12 bg-zinc-950/30">
      <div className="max-w-6xl mx-auto">
        <div className={`mb-12 md:mb-16 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">{t.skills.title}</h2>
          <div className={`w-16 md:w-24 h-1 bg-white ${lang === 'fa' ? 'mr-0 ml-auto' : ''}`}></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {t.skills.categories.map((skill, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-5 md:p-6 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all cursor-default"
            >
              <div className="p-2 md:p-3 bg-black rounded-lg shrink-0">{skill.icon}</div>
              <div className="w-full overflow-hidden">
                <h4 className="font-bold text-xs md:text-sm tracking-tighter uppercase truncate">{skill.name}</h4>
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
    <section id="vision" className="py-20 md:py-32 px-6 md:px-12 overflow-hidden relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className={`mb-12 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter">{t.vision.title}</h2>
          <blockquote className={`border-l-4 border-cyan-400 ${lang === 'fa' ? 'border-l-0 border-r-4 pr-6 pl-0' : 'pl-6 md:pl-8'} mb-8 italic text-xl md:text-3xl font-light text-white/80`}>
            "{t.vision.quote}"
            <footer className="mt-4 text-xs md:text-sm font-bold uppercase tracking-widest text-cyan-400">— {t.vision.author}</footer>
          </blockquote>
          <p className="text-base md:text-xl leading-relaxed text-white/60 font-light">
            {t.vision.content}
          </p>
        </div>
      </div>
      <div className={`absolute top-0 ${lang === 'fa' ? 'left-0' : 'right-0'} opacity-5 pointer-events-none select-none hidden lg:block`}>
        <span className="text-[200px] font-black uppercase leading-none tracking-tighter block rotate-90">FUTURE</span>
      </div>
    </section>
  );
};

const Footer = ({ t, lang }: { t: Translation; lang: Language }) => {
  return (
    <footer className="py-16 md:py-20 px-6 md:px-12 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-md w-full">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white text-black flex items-center justify-center font-bold text-lg md:text-xl rounded-sm">M</div>
            <span className="font-bold tracking-tighter uppercase text-base md:text-lg">Ghaneh.dev</span>
          </div>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            {lang === 'en' 
              ? "Designing elite-level digital products that push the boundaries of technology and human potential."
              : "طراحی محصولات دیجیتال در سطح نخبگان که مرزهای تکنولوژی و پتانسیل انسانی را جابجا می‌کند."}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-cyan-400 transition-colors"><Instagram size={22} /></a>
            <a href="#" className="text-white/40 hover:text-cyan-400 transition-colors"><Github size={22} /></a>
            <a href="#" className="text-white/40 hover:text-cyan-400 transition-colors"><Linkedin size={22} /></a>
          </div>
        </div>
        
        <div id="contact" className="w-full md:w-auto md:min-w-[350px]">
          <h3 className="text-lg md:text-xl font-bold uppercase mb-6">{t.contact.title}</h3>
          <div className="flex flex-col gap-4">
            <a href="mailto:contact@ghaneh.dev" className="flex items-center gap-4 glass p-4 rounded-xl hover:bg-white/5 transition-all">
              <Mail size={18} className="text-cyan-400 shrink-0" />
              <span className="font-mono text-xs md:text-sm truncate">contact@ghaneh.dev</span>
            </a>
            <button className="w-full bg-white text-black font-bold py-4 rounded-xl uppercase tracking-widest text-[10px] md:text-xs hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all">
              {t.contact.button}
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 text-[9px] md:text-[10px] uppercase tracking-widest text-white/30 font-bold">
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
    <div className={`selection:bg-cyan-500 selection:text-black ${lang === 'fa' ? 'font-vazir' : 'font-inter'} antialiased`}>
      <Navbar lang={lang} setLang={setLang} t={t} />
      
      <main>
        <section id="about" className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div 
              initial={{ x: lang === 'en' ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className={lang === 'fa' ? 'text-right order-1 md:order-1' : 'text-left order-1 md:order-1'}
            >
              <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-cyan-400 mb-4">{t.nav.about}</h2>
              <h3 className="text-4xl md:text-7xl font-black mb-8 leading-tight md:leading-none tracking-tighter">{t.about.title}</h3>
              <p className="text-base md:text-xl text-white/60 leading-relaxed font-light">
                {t.about.content}
              </p>
            </motion.div>
            <div className="relative order-2 md:order-2 px-4 md:px-0">
              <div className="aspect-square glass rounded-3xl overflow-hidden relative group max-w-[500px] mx-auto">
                {/* Visual representation of AI/Core */}
                <div className="absolute inset-0 flex items-center justify-center scale-75 sm:scale-100">
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
                      <BrainCircuit size={48} className="text-white group-hover:text-cyan-400 transition-colors md:w-16 md:h-16" />
                    </motion.div>
                  </motion.div>
                </div>
                {/* Ambient light */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
              </div>
              <div className={`absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 glass p-4 md:p-6 rounded-2xl ${lang === 'fa' ? 'right-auto -left-4 md:-left-6' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">AI Status: Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className={`mb-12 md:mb-20 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
              <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-purple-400 mb-4">{t.nav.projects}</h2>
              <h3 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-tight md:leading-none">{t.projects.title}</h3>
              <p className="text-base md:text-xl text-white/50 max-w-2xl">{t.projects.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
