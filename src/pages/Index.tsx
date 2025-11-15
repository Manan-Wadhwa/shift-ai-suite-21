import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import F1Car3D from "@/components/F1Car3D";

// Custom Hooks
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return position;
};

const useScrollObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

const useCountUp = (end: number, duration: number = 2000, isVisible: boolean = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return count;
};

// Icon Components
const LayoutDashboardIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const UploadCloudIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 13v8" />
    <path d="m16 17-4 4-4-4" />
    <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
  </svg>
);

const HardDriveIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="12" x2="2" y2="12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    <line x1="6" y1="16" x2="6.01" y2="16" />
    <line x1="10" y1="16" x2="10.01" y2="16" />
  </svg>
);

const BarChart3Icon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </svg>
);

const FileTextIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const UsersIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SettingsIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const BellIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const UserIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ZapIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ActivityIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const TargetIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const TrendingUpIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

// Helper Components
const AnimatedSection = ({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) => {
  const { ref, isVisible } = useScrollObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  value,
  label,
  badge,
  delay = 0
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  badge?: string;
  delay?: number;
}) => {
  const { ref, isVisible } = useScrollObserver();
  const count = useCountUp(value, 2000, isVisible);

  return (
    <AnimatedSection delay={delay}>
      <Card ref={ref} className="bg-bg-surface border-border-subtle p-6 hover:scale-105 transition-transform duration-300 hover:shadow-xl shadow-md">
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-lg bg-bg-panel border border-border-subtle">
            <Icon className="w-6 h-6 text-racing-red" />
          </div>
          {badge && (
            <span className="text-xs px-2 py-1 rounded-full bg-racing-red/20 text-racing-red border border-racing-red/30">
              {badge}
            </span>
          )}
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold text-text-primary">{count.toLocaleString()}</div>
          <div className="text-sm text-text-secondary mt-1">{label}</div>
        </div>
      </Card>
    </AnimatedSection>
  );
};

// Header Component
const Header = ({ 
  onNotificationClick, 
  onUserClick 
}: { 
  onNotificationClick: () => void;
  onUserClick: () => void;
}) => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-bg-surface/95 backdrop-blur-md border-b border-border-subtle shadow-sm">
    <div className="px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded bg-racing-red shadow-md">
          <ZapIcon className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-text-primary">FRAMESHIFT</span>{" "}
          <span className="text-racing-red">AI</span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onNotificationClick}
          className="p-2 hover:bg-bg-panel rounded-lg transition-colors relative"
        >
          <BellIcon className="w-5 h-5 text-text-primary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-racing-red rounded-full shadow-md" />
        </button>
        <button 
          onClick={onUserClick}
          className="p-2 hover:bg-bg-panel rounded-lg transition-colors"
        >
          <UserIcon className="w-5 h-5 text-text-primary" />
        </button>
      </div>
    </div>
  </header>
);

// Bottom Navigation
const BottomNav = ({ 
  activePage, 
  onPageChange 
}: { 
  activePage: string;
  onPageChange: (page: string) => void;
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
    { id: "upload", label: "Upload & Analyze", icon: UploadCloudIcon },
    { id: "modules", label: "Modules", icon: HardDriveIcon },
    { id: "results", label: "Results", icon: BarChart3Icon },
    { id: "reports", label: "Reports", icon: FileTextIcon },
    { id: "team", label: "Team", icon: UsersIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-bg-surface/95 backdrop-blur-md border-t border-border-subtle shadow-lg">
      <div className="flex items-center justify-around px-4 py-3">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => onPageChange(id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "text-racing-red border-t-2 border-racing-red"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium whitespace-nowrap">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// Page Components
const DashboardPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Car */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23F5F1E8' width='1920' height='1080'/%3E%3C/svg%3E"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-abstract-data-flow-4485-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-bg-cream/80" />
        
        {/* 3D F1 Car */}
        <div className="absolute inset-0 z-0">
          <F1Car3D />
        </div>
        
        <div className="relative z-10 text-center px-6">
          {/* Haas Logo */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="px-6 py-3 rounded-lg bg-bg-surface/90 backdrop-blur-sm border border-border-subtle shadow-lg">
              <span className="text-2xl font-black tracking-wider text-text-primary">HAAS</span>
            </div>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-text-primary mb-6">
            FRAMESHIFT
          </h1>
          <p className="text-xl md:text-2xl text-text-primary mb-4 max-w-3xl mx-auto">
            Agentic AI Mobility Simulator
          </p>
          <p className="text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            A living, breathing simulation where AI agents act as real race engineers — detecting incidents,
            optimizing strategy, and evolving with every lap. Where decision-making happens in milliseconds and
            every event is backed by data.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={TargetIcon}
            value={847}
            label="Total Projects"
            delay={0}
          />
          <StatCard
            icon={ZapIcon}
            value={7}
            label="Active Modules"
            badge="Active"
            delay={100}
          />
          <StatCard
            icon={ActivityIcon}
            value={1243}
            label="Recent Detections"
            delay={200}
          />
          <StatCard
            icon={TrendingUpIcon}
            value={98.5}
            label="System Accuracy"
            delay={300}
          />
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <AnimatedSection delay={400}>
            <Card className="bg-bg-surface border-border-subtle p-8 text-center hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl">
              <h3 className="text-2xl font-bold text-racing-red mb-3">Real-Time</h3>
              <p className="text-text-secondary">Live telemetry streaming with sub-second latency</p>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={500}>
            <Card className="bg-bg-surface border-border-subtle p-8 text-center hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl">
              <h3 className="text-2xl font-bold text-racing-red mb-3">Multi-Agent</h3>
              <p className="text-text-secondary">Specialized AI for strategy, incidents & commentary</p>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={600}>
            <Card className="bg-bg-surface border-border-subtle p-8 text-center hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl">
              <h3 className="text-2xl font-bold text-racing-red mb-3">Autonomous</h3>
              <p className="text-text-secondary">AI-driven pit stops, tire decisions & recovery</p>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

const UploadPage = () => {
  const [file1, setFile1] = useState(false);
  const [file2, setFile2] = useState(false);

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <AnimatedSection>
        <h2 className="text-4xl font-bold text-text-primary mb-2">Upload & Analyze</h2>
        <p className="text-text-secondary mb-12">Upload your telemetry data and race footage for AI analysis</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <AnimatedSection delay={100}>
          <div
            onClick={() => setFile1(!file1)}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ${
              file1
                ? "border-racing-red bg-racing-red/10 shadow-lg"
                : "border-border-strong bg-bg-surface hover:border-racing-red shadow-md hover:shadow-lg"
            }`}
          >
            <UploadCloudIcon className={`w-16 h-16 mx-auto mb-4 ${file1 ? "text-racing-red" : "text-text-secondary"}`} />
            <h3 className="text-xl font-bold text-text-primary mb-2">
              {file1 ? "Telemetry Data Uploaded" : "Upload Telemetry Data"}
            </h3>
            <p className="text-sm text-text-secondary">CSV, JSON, or Binary formats accepted</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div
            onClick={() => setFile2(!file2)}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ${
              file2
                ? "border-racing-red bg-racing-red/10 shadow-lg"
                : "border-border-strong bg-bg-surface hover:border-racing-red shadow-md hover:shadow-lg"
            }`}
          >
            <UploadCloudIcon className={`w-16 h-16 mx-auto mb-4 ${file2 ? "text-racing-red" : "text-text-secondary"}`} />
            <h3 className="text-xl font-bold text-text-primary mb-2">
              {file2 ? "Race Footage Uploaded" : "Upload Race Footage"}
            </h3>
            <p className="text-sm text-text-secondary">MP4, MOV, or AVI formats accepted</p>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={300}>
        <Button
          disabled={!file1 || !file2}
          className={`w-full py-6 text-lg font-bold ${
            file1 && file2
              ? "bg-racing-red hover:bg-racing-red/90 text-white shadow-lg hover:shadow-xl"
              : "bg-bg-panel text-text-secondary cursor-not-allowed"
          }`}
        >
          START ANALYSIS
        </Button>
      </AnimatedSection>
    </div>
  );
};

const ModulesPage = () => {
  const modules = [
    { title: "Incident Detection", desc: "Real-time crash and hazard identification", icon: ActivityIcon },
    { title: "Strategy Optimizer", desc: "AI-powered pit stop and tire strategy", icon: TargetIcon },
    { title: "Performance Analysis", desc: "Lap time and sector comparison", icon: BarChart3Icon },
    { title: "Telemetry Monitor", desc: "Live data streaming and visualization", icon: ActivityIcon },
    { title: "Weather Prediction", desc: "Track condition forecasting", icon: TrendingUpIcon },
    { title: "Driver Coaching", desc: "AI-generated improvement suggestions", icon: UserIcon },
  ];

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <AnimatedSection>
        <h2 className="text-4xl font-bold text-text-primary mb-2">Analysis Modules</h2>
        <p className="text-text-secondary mb-12">Specialized AI modules for comprehensive race analysis</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, idx) => (
          <AnimatedSection key={idx} delay={idx * 100}>
            <Card className="bg-bg-surface border-border-subtle p-6 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer">
              <module.icon className="w-12 h-12 text-racing-red mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">{module.title}</h3>
              <p className="text-sm text-text-secondary">{module.desc}</p>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

const ResultsPage = () => {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const { ref: confidenceRef, isVisible: confidenceVisible } = useScrollObserver();
  const confidenceScore = useCountUp(94.2, 2000, confidenceVisible);

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <AnimatedSection>
        <h2 className="text-4xl font-bold text-text-primary mb-2">Analysis Results</h2>
        <p className="text-text-secondary mb-12">AI-generated insights from your race data</p>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <Card className="bg-bg-surface border-border-subtle p-8 mb-8 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-text-primary">Comparative Analysis</h3>
            <div className="flex items-center gap-3">
              <Label htmlFor="heatmap-toggle" className="text-text-secondary text-sm">
                Show Difference Heatmap
              </Label>
              <Switch
                id="heatmap-toggle"
                checked={showHeatmap}
                onCheckedChange={setShowHeatmap}
                className="data-[state=checked]:bg-racing-red"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-3">Before Optimization</h4>
              <div className="aspect-video bg-bg-panel rounded-lg border border-border-subtle relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                  Race Data Visualization
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-3">After Optimization</h4>
              <div className="aspect-video bg-bg-panel rounded-lg border border-border-subtle relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                  Race Data Visualization
                </div>
                {showHeatmap && (
                  <div className="absolute inset-0 bg-gradient-to-br from-racing-red/40 via-transparent to-racing-red/20 animate-fade-in" />
                )}
              </div>
            </div>
          </div>
        </Card>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={confidenceRef}>
        <AnimatedSection delay={200}>
          <Card className="bg-bg-surface border-border-subtle p-6 text-center shadow-md">
            <div className="text-4xl font-bold text-racing-red mb-2">{confidenceScore}%</div>
            <div className="text-sm text-text-secondary">Confidence Score</div>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={300}>
          <Card className="bg-bg-surface border-border-subtle p-6 text-center shadow-md">
            <div className="text-4xl font-bold text-text-primary mb-2">-1.2s</div>
            <div className="text-sm text-text-secondary">Lap Time Improvement</div>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={400}>
          <Card className="bg-bg-surface border-border-subtle p-6 text-center shadow-md">
            <div className="text-4xl font-bold text-text-primary mb-2">High</div>
            <div className="text-sm text-text-secondary">Severity Level</div>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

const ReportsPage = () => {
  const reports = [
    { id: "RPT-2024-001", name: "Monaco GP Analysis", date: "2024-05-26", status: "Complete" },
    { id: "RPT-2024-002", name: "Barcelona Testing", date: "2024-06-10", status: "Complete" },
    { id: "RPT-2024-003", name: "Silverstone Qualifying", date: "2024-07-06", status: "Processing" },
    { id: "RPT-2024-004", name: "Hungary Race Day", date: "2024-07-21", status: "Complete" },
    { id: "RPT-2024-005", name: "Spa Practice Sessions", date: "2024-07-28", status: "Complete" },
  ];

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <AnimatedSection>
        <h2 className="text-4xl font-bold text-text-primary mb-2">Analysis Reports</h2>
        <p className="text-text-secondary mb-12">Historical analysis reports and insights</p>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <Card className="bg-bg-surface border-border-subtle overflow-hidden shadow-md">
          <table className="w-full">
            <thead className="bg-bg-panel">
              <tr className="border-b border-border-subtle">
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Report ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, idx) => (
                <AnimatedSection key={report.id} delay={idx * 50} className="contents">
                  <tr className="border-b border-border-subtle hover:bg-bg-panel transition-colors">
                    <td className="px-6 py-4 text-sm text-text-secondary">{report.id}</td>
                    <td className="px-6 py-4 text-sm text-text-primary font-medium">{report.name}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{report.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          report.status === "Complete"
                            ? "bg-racing-red/20 text-racing-red border border-racing-red/30"
                            : "bg-text-secondary/20 text-text-secondary border border-text-secondary/30"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="text-racing-red hover:text-racing-red/80">
                        View
                      </Button>
                    </td>
                  </tr>
                </AnimatedSection>
              ))}
            </tbody>
          </table>
        </Card>
      </AnimatedSection>
    </div>
  );
};

const TeamPage = () => {
  const team = [
    { name: "Kevin Magnussen", role: "Driver #20", avatar: "KM" },
    { name: "Nico Hulkenberg", role: "Driver #27", avatar: "NH" },
    { name: "Guenther Steiner", role: "Team Principal", avatar: "GS" },
    { name: "Simone Resta", role: "Technical Director", avatar: "SR" },
    { name: "Ayao Komatsu", role: "Chief Engineer", avatar: "AK" },
    { name: "Laura Mueller", role: "Strategy Lead", avatar: "LM" },
  ];

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <AnimatedSection>
        <h2 className="text-4xl font-bold text-text-primary mb-2">Team Members</h2>
        <p className="text-text-secondary mb-12">Haas F1 Team personnel with system access</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, idx) => (
          <AnimatedSection key={idx} delay={idx * 100}>
            <Card className="bg-bg-surface border-border-subtle p-6 text-center hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-racing-red to-racing-red/50 mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white grayscale hover:grayscale-0 transition-all duration-300 shadow-md">
                {member.avatar}
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-1">{member.name}</h3>
              <p className="text-sm text-text-secondary">{member.role}</p>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoAnalysis, setAutoAnalysis] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <AnimatedSection>
        <h2 className="text-4xl font-bold text-text-primary mb-2">System Settings</h2>
        <p className="text-text-secondary mb-12">Configure your FRAMESHIFT AI preferences</p>
      </AnimatedSection>

      <div className="space-y-6">
        <AnimatedSection delay={100}>
          <Card className="bg-bg-surface border-border-subtle p-6 shadow-md">
            <h3 className="text-xl font-bold text-text-primary mb-6">General Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-text-primary font-medium">Push Notifications</Label>
                  <p className="text-sm text-text-secondary mt-1">Receive alerts for analysis completion</p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                  className="data-[state=checked]:bg-racing-red"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-text-primary font-medium">Automatic Analysis</Label>
                  <p className="text-sm text-text-secondary mt-1">Start analysis immediately after upload</p>
                </div>
                <Switch
                  checked={autoAnalysis}
                  onCheckedChange={setAutoAnalysis}
                  className="data-[state=checked]:bg-racing-red"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-text-primary font-medium">Data Sharing</Label>
                  <p className="text-sm text-text-secondary mt-1">Share anonymized data for AI improvement</p>
                </div>
                <Switch
                  checked={dataSharing}
                  onCheckedChange={setDataSharing}
                  className="data-[state=checked]:bg-racing-red"
                />
              </div>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <Card className="bg-bg-surface border-border-subtle p-6 shadow-md">
            <h3 className="text-xl font-bold text-text-primary mb-6">API Configuration</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="api-key" className="text-text-primary font-medium">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  defaultValue="sk_live_xxxxxxxxxxxxx"
                  className="mt-2 bg-bg-panel border-border-subtle text-text-primary"
                />
              </div>
              <div>
                <Label htmlFor="webhook" className="text-text-primary font-medium">Webhook URL</Label>
                <Input
                  id="webhook"
                  type="url"
                  placeholder="https://api.example.com/webhook"
                  className="mt-2 bg-bg-panel border-border-subtle text-text-primary"
                />
              </div>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <Button className="w-full bg-racing-red hover:bg-racing-red/90 text-white py-6 text-lg font-bold glow-red">
            Save Settings
          </Button>
        </AnimatedSection>
      </div>
    </div>
  );
};

// Main App Component
const Index = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const mousePosition = useMousePosition();

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "upload":
        return <UploadPage />;
      case "modules":
        return <ModulesPage />;
      case "results":
        return <ResultsPage />;
      case "reports":
        return <ReportsPage />;
      case "team":
        return <TeamPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-cream relative overflow-x-hidden">
      {/* Mouse-Follow Spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(227, 6, 19, 0.08), transparent 80%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Header
          onNotificationClick={() => console.log("Notifications")}
          onUserClick={() => console.log("User menu")}
        />
        
        <main className="pt-20 pb-24">
          {renderPage()}
        </main>

        <BottomNav activePage={activePage} onPageChange={setActivePage} />
      </div>
    </div>
  );
};

export default Index;
