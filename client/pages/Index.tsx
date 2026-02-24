import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

  const stats = [
    { label: "TOP SPEED", value: "320", unit: "KM/H", color: "from-blue-500 to-cyan-500" },
    { label: "0-100 KM/H", value: "2.8", unit: "SEC", color: "from-red-500 to-orange-500" },
    { label: "ENGINE", value: "V12", unit: "TT", color: "from-purple-500 to-pink-500" },
    { label: "HORSEPOWER", value: "780", unit: "HP", color: "from-amber-500 to-yellow-500" },
  ];

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Initial Load Animation
      const tl = gsap.timeline();
      
      // Headline reveal
      const chars = headlineRef.current?.innerText.split("") || [];
      if (headlineRef.current) {
        headlineRef.current.innerHTML = chars
          .map((char) => `<span class="inline-block translate-y-20 opacity-0">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");
      }

      tl.to("#headline span", {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
      });

      // Stats reveal
      tl.to(".stat-item", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");

      // Car reveal
      tl.to(carRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "expo.out",
      }, "-=1");

      // 2. Scroll-Based Animation
      gsap.to(carRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
        y: "60vh",
        x: "5vw",
        rotation: 25,
        scale: 1.5,
        opacity: 0,
        ease: "power2.inOut",
      });

      // Headline fade out and zoom
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "40% top",
          scrub: true,
        },
        opacity: 0,
        y: -150,
        scale: 1.2,
        filter: "blur(20px)",
        ease: "none",
      });

      // Stats fade out on scroll
      gsap.to(statsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
        opacity: 0,
        y: 50,
        ease: "none",
      });

      // Reveal text in second section
      gsap.from(".reveal-text > *", {
        scrollTrigger: {
          trigger: ".reveal-text",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative bg-black text-white w-full selection:bg-white selection:text-black">
      <div className="noise-overlay" />

      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070"
          alt="Luxury Sports Car Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Car Element */}
      <div
        ref={carRef}
        className="absolute z-30 w-[70%] max-w-[1000px] opacity-0 scale-110 top-1/2"
        style={{ transformOrigin: "center center" }}
      >
        <div className="relative">
          {/* Car Shadow */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
          <img
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=2070"
            alt="Luxury Car"
            className="w-full h-auto object-cover drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] brightness-110 contrast-105 saturate-105"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-black tracking-tighter">ITZ FIZZ</div>
        <div className="hidden md:flex gap-10 text-[10px] tracking-[0.3em] uppercase font-bold text-white/70">
          <a href="#" className="hover:text-white transition-colors">Performance</a>
          <a href="#" className="hover:text-white transition-colors">Design</a>
          <a href="#" className="hover:text-white transition-colors">Bespoke</a>
          <a href="#" className="hover:text-white transition-colors">Connect</a>
        </div>
        <button className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors">
          Pre-Order
        </button>
      </nav>

      {/* Scrollable Spacer */}
      <div className="h-[300vh] w-full relative">
        {/* Sticky Hero Section */}
        <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          {/* Background Text / Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px]" />
          </div>

          {/* Headline */}
          <div className="relative z-0 text-center px-4 mb-20 pointer-events-none">
            <h1
              id="headline"
              ref={headlineRef}
              className="text-5xl md:text-[10vw] font-black uppercase tracking-[0.08em] leading-tight mix-blend-normal text-white/80"
            >
              <span className="block">WELCOME</span>
              <span className="block mt-6">ITZFIZZ</span>
            </h1>
          </div>



          {/* Scroll Down Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </div>

          {/* Impact Metrics / Statistics */}
          <div
            ref={statsRef}
            className="absolute bottom-12 left-0 w-full px-8 md:px-20 z-30"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-item opacity-0 translate-y-10 flex flex-col items-start border-l border-white/10 pl-6 group transition-all duration-300 hover:border-white/40"
                >
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl md:text-6xl font-bold tracking-tighter tabular-nums bg-gradient-to-b bg-clip-text text-transparent ${stat.color} group-hover:scale-105 transition-transform duration-500`}>
                      {stat.value}
                    </span>
                    <span className="text-xs md:text-sm font-medium text-white/30">
                      {stat.unit}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/40 mt-2 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Below the Fold to enable scrolling */}
        <section className="min-h-screen w-full bg-zinc-950 flex items-center justify-center px-6 py-24">
          <div className="max-w-4xl text-center space-y-12">
            <div className="reveal-text">
              <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter">UNCOMPROMISING PERFORMANCE</h2>
              <p className="text-zinc-400 text-lg md:text-2xl leading-relaxed font-light">
                Experience the pinnacle of automotive engineering. Every curve, every line,
                and every component is designed with one goal in mind: pure, unadulterated speed.
                The Itz Fizz represents a new era of hypercars, where technology meets raw emotion.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <div className="h-[1px] w-24 bg-white/20 mt-4" />
              <div className="text-[10px] tracking-[0.4em] uppercase text-white/40">The Future of Speed</div>
              <div className="h-[1px] w-24 bg-white/20 mt-4" />
            </div>
          </div>
        </section>

        <section className="min-h-screen w-full bg-black flex items-center justify-center px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight">CRAFTED FOR THE BOLD</h3>
              <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed">
                Each unit is hand-built to order, ensuring absolute perfection in every detail.
                From the carbon fiber chassis to the bespoke leather interior, quality is never compromised.
                We don't just build cars; we create masterpieces that defy physics.
              </p>
              <div className="pt-8">
                <button className="group flex items-center gap-4 text-xs tracking-[0.3em] uppercase font-bold">
                  <span>Explore Design</span>
                  <div className="w-12 h-[1px] bg-white group-hover:w-20 transition-all duration-300" />
                </button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 group">
              <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative bg-zinc-900 aspect-square md:aspect-video rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070"
                  alt="Interior detail"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black tracking-tighter">ITZ FIZZ</div>
          <div className="flex gap-12 text-xs tracking-widest uppercase text-white/40">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">YouTube</a>
          </div>
          <div className="text-[10px] text-white/20 uppercase tracking-widest">
           &copy; 2026 ITZFIZZ AUTOMOTIVE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
