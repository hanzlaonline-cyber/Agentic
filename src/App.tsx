/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, useRef } from 'react';
import { 
  Menu, 
  X, 
  MessageCircle, 
  Play, 
  CheckCircle2, 
  Globe, 
  Zap, 
  Link as LinkIcon, 
  UserPlus, 
  ArrowRight, 
  Smartphone, 
  Database, 
  ShieldCheck, 
  Clock,
  Star,
  ChevronRight,
  TrendingUp,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  Send,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// --- AI Setup ---
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const SYSTEM_INSTRUCTION = `You are a helpful and professional sales representative for "Agentic", a startup that builds AI agents for WhatsApp. 
Agentic's value proposition:
- Custom AI agents that live inside WhatsApp.
- Automate customer support, lead generation, appointment booking, order tracking, FAQs, and sales.
- No app downloads, no dashboards needed - customers just message on WhatsApp.
- Features: 24/7 instant responses, multilingual support, 5-minute setup, CRM integration, smart lead capture, human handoff.
- Pricing: Starter ($49/mo - 1k convos), Business ($149/mo - 5k convos), Enterprise (Custom).
- Target audience: Small to medium businesses, clinics, Realtors, e-commerce, etc.

Your tone: Professional, approachable, intelligent, and human-friendly.
Response style: Concise and helpful, like a WhatsApp message. Use emojis occasionally.
Goal: Answer questions about Agentic and encourage the user to "Book a Demo" or "Get Started".
If you don't know something, be honest and offer to connect them with a human (via the contact form).`;

// --- Components ---

const BackgroundBlobs = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60 animate-float" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[120px] opacity-60 animate-float-delayed" />
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '#what-we-do' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center text-white">
            <MessageCircle size={18} fill="currentColor" />
          </div>
          <span className="text-primary">Agentic</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-gray-600 hover:text-primary font-medium transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="bg-linear-to-r from-accent-purple to-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-accent-purple/20 hover:scale-105 transition-transform">
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="bg-accent-purple text-white px-6 py-3 rounded-xl font-bold text-center"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6 overflow-hidden">
      {/* Hero Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent-purple/5 border border-accent-purple/10 blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 font-bold text-xs uppercase tracking-wider mb-8 border border-green-100"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Now available on WhatsApp
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-primary tracking-tight mb-6 leading-[1.1]"
        >
          Your AI Agent.<br />
          <span className="text-accent-purple">Inside WhatsApp.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Automate support, book appointments, capture leads, and close sales — all where your customers already are. No apps to download.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-black transition-all hover:scale-[1.02] shadow-xl">
            Book a Demo
          </a>
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all hover:scale-[1.02]">
            <Play size={20} fill="currentColor" className="text-gray-400" /> Watch Demo
          </button>
        </motion.div>

        {/* Removed Trusted By section */}
      </div>
    </section>
  );
};

const WhatsAppMockup = () => {
  const [activeDemo, setActiveDemo] = useState<'general' | 'lead' | 'booking'>('general');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: 'Hello! I\'m your Agentic AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset messages when demo changes
    const initialMessages = {
      general: [{ role: 'bot', content: 'Hello! I\'m your Agentic AI assistant. How can I help you today?' }],
      lead: [{ role: 'bot', content: 'Hi! I see you are interested in our services. To get started, could you tell me your name and what business you are in?' }],
      booking: [{ role: 'bot', content: 'Ready to book? I can check availability for you. What service are you looking for?' }]
    };
    setMessages(initialMessages[activeDemo]);
  }, [activeDemo]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const demoInstructions = {
      general: SYSTEM_INSTRUCTION,
      lead: `${SYSTEM_INSTRUCTION} Specific focus: You are currently demonstrating Lead Capture. Your goal is to politely ask for the user's name, business type, and contact details if they haven't provided them. Be very efficient.`,
      booking: `${SYSTEM_INSTRUCTION} Specific focus: You are currently demonstrating Appointment Booking. Your goal is to help the user pick a date and time. If they say a time, confirm it and say 'Booked! You will receive a confirmation shortly'.`
    };

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: demoInstructions[activeDemo],
          temperature: 0.7,
        }
      });

      const botResp = response.text || "🤖 I'm thinking...";
      setMessages(prev => [...prev, { role: 'bot', content: botResp }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', content: "Something went wrong. Mind trying again?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="what-we-do" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">Experience the Magic</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              Select a module below to see how our AI agents handle real-world business tasks directly inside WhatsApp.
            </p>
            
            <div className="grid grid-cols-1 gap-4 mb-12">
              {[
                { id: 'general', title: 'General Inquiry', desc: 'Ask about pricing, features, or company info.', icon: <MessageCircle size={20} /> },
                { id: 'lead', title: 'Smart Lead Capture', desc: 'Watch how it qualifies and captures lead data.', icon: <TrendingUp size={20} /> },
                { id: 'booking', title: 'Appointment Booking', desc: 'Try scheduling a meeting or service.', icon: <Clock size={20} /> }
              ].map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo.id as any)}
                  className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                    activeDemo === demo.id 
                    ? 'border-accent-purple bg-accent-purple/5 shadow-lg shadow-accent-purple/10' 
                    : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${activeDemo === demo.id ? 'bg-accent-purple text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {demo.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold ${activeDemo === demo.id ? 'text-accent-purple' : 'text-primary'}`}>{demo.title}</h4>
                    <p className="text-sm text-gray-500 font-medium">{demo.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {[
                "No dashboard fatigue — just WhatsApp",
                "Context-aware AI that remembers history",
                "Enterprise-grade security and privacy"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-green/20 flex items-center justify-center text-accent-green">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-accent-purple/10 rounded-3xl blur-2xl -z-10" />
            
            <div className="bg-white rounded-[2.5rem] p-1 border-[6px] border-gray-900 shadow-2xl overflow-hidden max-w-[340px] sm:max-w-sm mx-auto h-[600px] flex flex-col">
              {/* WhatsApp Header */}
              <div className="bg-[#075E54] p-4 flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative">
                  <MessageCircle size={20} fill="white" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#075E54] rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Agentic {activeDemo === 'general' ? 'Support' : activeDemo === 'lead' ? 'Sales' : 'Booking'}</h4>
                  <p className="text-[10px] opacity-70">typing...</p>
                </div>
              </div>

              {/* Chat Area */}
              <div ref={scrollRef} className="bg-[#E5DDD5] p-4 flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar scroll-smooth">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-2xl text-xs shadow-sm max-w-[85%] relative ${
                      m.role === 'user' ? 'bg-[#DCF8C6] rounded-tr-none' : 'bg-white rounded-tl-none'
                    }`}>
                      {m.content}
                      <span className="text-[8px] opacity-40 float-right mt-1 ml-2">12:34 PM</span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white p-2.5 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center">
                      {[0, 0.2, 0.4].map((delay) => (
                        <motion.div
                          key={delay}
                          animate={{ 
                            y: [0, -4, 0],
                            opacity: [0.4, 1, 0.4] 
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 0.8, 
                            delay,
                            ease: "easeInOut"
                          }}
                          className="w-1 h-1 bg-accent-purple rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="p-3 bg-[#F0F0F0] flex items-center gap-2 border-t border-gray-200">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-white rounded-full px-4 py-2.5 text-xs focus:outline-none border border-gray-200" 
                />
                <button 
                  type="submit" 
                  disabled={isTyping}
                  className="w-10 h-10 bg-[#128C7E] rounded-full flex items-center justify-center text-white shadow-md active:scale-95 disabled:opacity-50 transition-all hover:bg-[#075E54]"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <Clock className="text-orange-500 animate-pulse-subtle" />, title: "24/7 Instant Responses", desc: "Never miss a customer, even at 3 AM. Our AI handles responses instantly." },
    { icon: <Globe className="text-blue-500 animate-spin-slow" />, title: "Multilingual Support", desc: "Speaks English, Hindi, Urdu, and more. Connect with global customers." },
    { icon: <Zap className="text-yellow-500 animate-pulse-subtle" />, title: "5-Minute Setup", desc: "No coding. Just connect your WhatsApp and upload your data." },
    { icon: <Database className="text-purple-500 animate-bounce-subtle" />, title: "CRM & Integrations", desc: "Sync with HubSpot, Salesforce, or your own custom webhooks." },
    { icon: <TrendingUp className="text-green-500 animate-bounce-subtle" />, title: "Smart Lead Capture", desc: "Qualify leads based on your criteria and forward them to your CRM." },
    { icon: <UserPlus className="text-indigo-500 animate-wiggle" />, title: "Human Handoff", desc: "Seamlessly transfer to your team when the AI detects complex needs." }
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Powerful Features</h2>
          <p className="text-gray-500 text-lg">Everything you need to automate your customer communication.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { icon: <Smartphone />, title: "Connect WhatsApp", desc: "Link your business number via QR code or API in under 60 seconds." },
    { icon: <Database />, title: "Train Your Agent", desc: "Upload PDFs, website URLs, or text snippets about your products and FAQs." },
    { icon: <ShieldCheck />, title: "Deploy & Automate", desc: "Go live! Your AI agent starts handling customers immediately with 99% accuracy." }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-primary text-center mb-16">Three Steps to Freedom</h2>
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/4 left-[10%] right-[10%] h-0.5 bg-gray-100 -z-10" />
          
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-accent-purple rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-accent-purple/20 relative">
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-white text-primary text-xs font-bold rounded-full flex items-center justify-center border-2 border-accent-purple">
                  {i + 1}
                </span>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UseCases = () => {
  const cases = [
    { title: "E‑commerce", desc: "Handle order status, returns, and personalized product recommendations.", color: "text-orange-600" },
    { title: "Real Estate", desc: "Capture property inquiries and schedule site visits automatically.", color: "text-blue-600" },
    { title: "Healthcare", desc: "Automate appointment booking, refill reminders, and clinic FAQs.", color: "text-green-600" },
    { title: "Education", desc: "Manage course inquiries, fee reminders, and student updates.", color: "text-purple-600" }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, i) => (
            <div key={i} className="glass p-8 rounded-[2rem] shadow-sm transition-transform hover:-translate-y-1">
              <h4 className={`text-xl font-bold mb-4 ${c.color}`}>{c.title}</h4>
              <p className="text-gray-600 font-medium leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    { 
      name: "Starter", 
      price: "49", 
      discountedPrice: "36.75",
      hasDiscount: true,
      features: ["1,000 conversations", "1 AI Agent", "Email Support", "Knowledge Base Sync"], 
      popular: false 
    },
    { 
      name: "Business", 
      price: "149", 
      discountedPrice: "111.75",
      hasDiscount: true,
      features: ["5,000 conversations", "3 AI Agents", "CRM Integration", "Priority Support", "Whitelabeling"], 
      popular: true 
    },
    { 
      name: "Enterprise", 
      price: "Custom", 
      hasDiscount: false,
      features: ["Unlimited conversations", "Unlimited Agents", "Dedicated Support", "Custom Model Training", "On-premise deployment"], 
      popular: false 
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Transparent Pricing</h2>
          <p className="text-gray-500 text-lg">Scalable plans for businesses of all sizes.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-[2px] rounded-[2.5rem] transition-all duration-500 ${
                plan.popular 
                ? 'bg-linear-to-br from-accent-purple to-indigo-600 shadow-2xl shadow-accent-purple/20 scale-105 z-10' 
                : 'bg-linear-to-br from-gray-200 via-white to-gray-200 hover:from-accent-purple/30 hover:to-indigo-500/30'
              }`}
            >
              <div className="bg-white p-10 rounded-[2.4rem] h-full flex flex-col relative overflow-hidden">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-purple text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg z-20">
                    Most Popular
                  </div>
                )}
                {plan.hasDiscount && (
                  <div className="absolute top-4 right-[-35px] rotate-45 bg-accent-green text-white text-[10px] font-black px-10 py-1 shadow-sm z-10 uppercase tracking-tighter">
                    25% OFF
                  </div>
                )}
                <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    {plan.hasDiscount ? (
                      <>
                        <span className="text-gray-400 text-lg line-through font-medium">${plan.price}</span>
                        <span className="text-4xl font-black text-primary">${plan.discountedPrice}</span>
                      </>
                    ) : (
                      <span className="text-4xl font-black text-primary">{plan.price === 'Custom' ? '' : '$'}{plan.price}</span>
                    )}
                    {plan.price !== 'Custom' && <span className="text-gray-500 font-medium text-lg">/month</span>}
                  </div>
                  {plan.hasDiscount && (
                    <div className="mt-1">
                      <p className="text-accent-purple text-xs font-bold">(first month)</p>
                      <p className="text-gray-400 text-[10px] mt-0.5">Regular price resumes after first month</p>
                    </div>
                  )}
                </div>
                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-accent-green" />
                      <span className="text-gray-600 font-medium">{f}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.popular ? 'bg-primary text-white shadow-xl shadow-primary/20 hover:bg-black' : 'bg-gray-100 text-primary hover:bg-gray-200'}`}>
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Ramesh", role: "E-commerce Owner", content: "Agentic saved us 30 hours a week on customer support. Our response time went from 2 hours to 30 seconds. Incredible!", stars: 5 },
    { name: "Sarah J.", role: "Clinic Manager", content: "Our patients love booking via WhatsApp. No more busy phone lines, and appointments are up by 40% since we launched Agentic.", stars: 5 }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">Loved by local businesses</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Join 50+ businesses that have switched to automated WhatsApp communication.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-3xl text-center">
                <div className="text-3xl font-black text-accent-purple mb-1">99%</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Uptime</div>
              </div>
              <div className="glass p-6 rounded-3xl text-center">
                <div className="text-3xl font-black text-accent-purple mb-1">10k+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Daily Messages</div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {reviews.map((r, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass p-8 rounded-[2rem] shadow-sm backdrop-blur-md"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(r.stars)].map((_, si) => <Star key={si} size={16} fill="#FACC15" className="text-yellow-400" />)}
                </div>
                <p className="text-lg italic text-gray-700 mb-6 font-medium">"{r.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100" />
                  <div>
                    <h5 className="font-bold text-primary">{r.name}</h5>
                    <p className="text-sm text-gray-500">{r.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Demo — no data stored. We'll contact you on WhatsApp!");
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight">Ready to automate your WhatsApp?</h2>
          <p className="text-gray-500 text-lg">Get early access or book a free consultation today.</p>
        </div>
        <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[2.5rem] shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
              <input type="text" placeholder="John Doe" required className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-white/60 focus:outline-none focus:ring-4 focus:ring-accent-purple/10 transition-all font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <input type="email" placeholder="john@company.com" required className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-white/60 focus:outline-none focus:ring-4 focus:ring-accent-purple/10 transition-all font-medium" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">WhatsApp Number</label>
              <input type="tel" placeholder="+1 (555) 000-0000" required className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-white/60 focus:outline-none focus:ring-4 focus:ring-accent-purple/10 transition-all font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Business Name</label>
              <input type="text" placeholder="Acme Inc." required className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-white/60 focus:outline-none focus:ring-4 focus:ring-accent-purple/10 transition-all font-medium" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">How did you hear about us?</label>
            <select className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-white/60 focus:outline-none focus:ring-4 focus:ring-accent-purple/10 transition-all font-medium appearance-none">
              <option>Search Engine (Google, etc.)</option>
              <option>Social Media</option>
              <option>Friend/Colleague</option>
              <option>News Article</option>
            </select>
          </div>
          <button type="submit" className="w-full py-5 px-8 bg-linear-to-r from-accent-purple to-indigo-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]">
            Get Started <ArrowRight size={20} />
          </button>
          <p className="text-center text-xs text-gray-400 font-medium">No spam. We'll WhatsApp you within 24 hours.</p>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="text-2xl font-black flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center text-white">
                <MessageCircle size={18} fill="currentColor" />
              </div>
              <span className="text-primary">Agentic</span>
            </a>
            <p className="text-gray-500 leading-relaxed mb-6">
              Empowering businesses with intelligent, human-like AI agents inside WhatsApp. Automate, scale, and thrive.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-accent-purple hover:border-accent-purple transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-bold text-primary mb-6">Product</h5>
            <ul className="space-y-4">
              {['Features', 'Integrations', 'Pricing', 'API Docs'].map(f => (
                <li key={f}><a href="#" className="text-gray-500 hover:text-primary transition-colors">{f}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-primary mb-6">Resource</h5>
            <ul className="space-y-4">
              {['Blog', 'Case Studies', 'Support', 'Guides'].map(f => (
                <li key={f}><a href="#" className="text-gray-500 hover:text-primary transition-colors">{f}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-primary mb-6">Legal</h5>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'SLA'].map(f => (
                <li key={f}><a href="#" className="text-gray-500 hover:text-primary transition-colors">{f}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:row items-center justify-between gap-4 text-sm text-gray-400 font-medium">
          <p>© 2025 Agentic AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">English (US)</a>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <Globe size={14} /> Global
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>(() => {
    const saved = localStorage.getItem('agentic_chat_history');
    return saved ? JSON.parse(saved) : [
      { role: 'bot', content: 'Hi there! 👋 I\'m your Agentic AI assistant. How can I help you automate your WhatsApp today?' }
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('agentic_chat_history', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const botResponse = response.text || "Sorry, I'm having trouble connecting right now. 🤖";
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Oops! Something went wrong. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[60] flex flex-col items-end gap-2 sm:gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[calc(100vw-2rem)] max-w-[400px] h-[500px] max-h-[calc(100vh-120px)] glass shadow-2xl rounded-[2rem] sm:rounded-[2.5rem] flex flex-col overflow-hidden backdrop-blur-2xl border-white/40 mb-2"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-purple flex items-center justify-center">
                  <MessageCircle size={20} fill="white" />
                </div>
                <div>
                  <h4 className="font-bold">Agentic Assistant</h4>
                  <p className="text-[10px] opacity-70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green" /> 
                    AI Agent Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#E5DDD5]/50 no-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                    m.role === 'user' 
                    ? 'bg-[#DCF8C6] rounded-tr-none' 
                    : 'bg-white rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                    {[0, 0.2, 0.4].map((delay) => (
                      <motion.div
                        key={delay}
                        animate={{ 
                          y: [0, -6, 0],
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 0.8, 
                          delay,
                          ease: "easeInOut"
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-accent-purple"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* InputArea */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white/80 border-t border-white/20 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..." 
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple/20 transition-all font-medium" 
              />
              <button 
                type="submit"
                disabled={isTyping}
                className="w-10 h-10 bg-[#128C7E] rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center">
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="bg-primary text-white text-[10px] sm:text-xs font-bold px-4 py-2 rounded-xl mr-3 shadow-2xl shadow-primary/40 whitespace-nowrap hidden sm:block relative"
            >
              Chat with our AI Assistant
              {/* Tooltip Arrow */}
              <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => {
            setIsOpen(!isOpen);
            setIsHovered(false);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${
            isOpen ? 'bg-primary text-white' : 'bg-accent-green text-white shadow-accent-green/40 hover:scale-110'
          }`}
        >
          {isOpen ? <X size={32} /> : <MessageCircle size={32} fill="white" />}
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-accent-purple/20 selection:text-accent-purple bg-[#F8F9FC] relative">
      <BackgroundBlobs />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <WhatsAppMockup />
        <Features />
        <HowItWorks />
        <UseCases />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
