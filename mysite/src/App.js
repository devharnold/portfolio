import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Database, ChevronDown } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const words = React.useMemo(() => ['A Backend Developer', 'An API Nerd', 'A Problem Solver'], []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= currentWord.length) {
        setTypedText(currentWord.slice(0, charIndex));
        charIndex++;
      } else {
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            if (charIndex > 0) {
              setTypedText(currentWord.slice(0, charIndex));
              charIndex--;
            } else {
              clearInterval(deleteInterval);
              setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
          }, 50);
        }, 2000);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [words, currentWordIndex]);

  const skills = [
    { name: 'Python', level: 90, icon: Code },
    { name: 'Java', level: 40, icon: Code},
    { name: 'FastAPI', level: 85, icon: Code },
    { name: 'Flask', level: 80, icon: Code },
    { name: 'Postgres', level: 88, icon: Database },
  ];

  const projects = [
    {
      title: 'Mobile Wallet Backend Service',
      description: 'A backend service for a mobile wallet',
      image: '',
      tech: ['Flask', 'Kafka', 'Postgres', 'Stripe', 'Daraja API', 'Micro-services'],
      github: 'https://github.com/devharnold/earwall',
      //live: 'https://your-ecommerce-demo.com',
    },
    {
      title: 'Farm-Client App',
      description: 'Redefines how food is being distributed after being produced by the local farmer',
      image: '',
      tech: ['FastAPI', 'Postgres'],
      github: 'https://github.com/devharnold/farm-client',
      //live: 'https://your-taskmanager-demo.com',
    },
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              &lt;Henry Arnold /&gt;
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-purple-400 ${
                    activeSection === item ? 'text-purple-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-pulse"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
              Welcome Aboard!
            </h1>
            <div className="text-2xl md:text-3xl text-gray-300 h-12 flex items-center justify-center">
              <span className="mr-2">I'm </span>
              <span className="text-purple-400 font-semibold min-w-[300px] text-left">
                {typedText}
                <span className="animate-pulse">$</span>
              </span>
            </div>
          </div>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Passionate about creating exceptional digital experiences through clean code and innovative solutions. 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-purple-400 rounded-full font-semibold transition-all duration-300 hover:bg-purple-400 hover:text-black"
            >
              Get In Touch
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-purple-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate backend developer with over 1 years of experience creating digital solutions 
                that make a difference. My journey started with curiosity about how websites work, and it has 
                evolved into a deep love for crafting exceptional user experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Besides work, you'll find me exploring new technologies, or sharing knowledge with the developer community. 
                I believe in continuous learning 
                and staying ahead in this ever-evolving field.
              </p>
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">3+</div>
                  <div className="text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">2+</div>
                  <div className="text-gray-400">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">100+</div>
                  <div className="text-gray-400">Commits</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                  <img
                    src="/path-to-your-photo.jpg"
                    alt="My Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={skill.name} className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <Icon className="text-purple-400 mr-3" size={24} />
                    <h3 className="text-xl font-semibold">{skill.name}</h3>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: isVisible.skills ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                  <div className="text-gray-400 text-sm">{skill.level}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                    </div>
                    <div className="flex space-x-2">
                      <a href={project.github} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <Github size={16} />
                      </a>
                      <a href={project.live} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Invite me to work with you
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Have a project going on? Let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="mailto:henryarnoldme@gmail.com"
              className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <Mail className="mr-2" size={20} />
              Send Email
            </a>
            <div className="flex space-x-4">
              <a href="https://github.com/devharnold" className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors hover:scale-110">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/arnold-henry-ah01/" className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors hover:scale-110">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © Henry Arnold. Bye!!!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;