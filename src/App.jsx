import React, { useState } from 'react';
import { SkipLink } from './components/layout/SkipLink';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/layout/Toast';
import { CommandPalette } from './components/common/CommandPalette';
import { HciGuideModal } from './components/common/HciGuideModal';
import { ResumeModal } from './components/common/ResumeModal';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { AcademicSection } from './components/sections/AcademicSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ProjectModal } from './components/sections/ProjectModal';
import { SkillsSection } from './components/sections/SkillsSection';
import { BlogSection } from './components/sections/BlogSection';
import { BlogModal } from './components/sections/BlogModal';
import { SocialSection } from './components/sections/SocialSection';
import { ContactSection } from './components/sections/ContactSection';
import { EvaluationDashboard } from './components/evaluation/EvaluationDashboard';

import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useUsabilityStore } from './hooks/useUsabilityStore';

/**
 * Root Application Component
 * Implements comprehensive HCI principles:
 * - Nielsen's 10 Heuristics throughout all user journeys
 * - Shneiderman's 8 Golden Rules
 * - Fitts's Law (large touch targets >= 44x44px)
 * - Hick's Law (max 6 top-level destinations)
 * - Miller's Law (chunked content blocks)
 * - WCAG 2.2 AA Accessibility Compliance
 */
export function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const usabilityStore = useUsabilityStore();

  // Scroll Spy across primary sections
  const sectionIds = ['hero', 'about', 'academics', 'experience', 'projects', 'skills', 'blog', 'social', 'contact', 'evaluation'];
  const activeSection = useScrollSpy(sectionIds);

  // Modal Dialog States (User Control and Freedom)
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isHciGuideOpen, setIsHciGuideOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Toast Notification State (Visibility of System Status)
  const [toast, setToast] = useState(null);

  const showToast = ({ type, title, message, duration, hasUndo }) => {
    setToast({ type, title, message, duration, hasUndo });
  };

  // Keyboard Shortcuts Hook (Flexibility and Efficiency of Use)
  useKeyboardShortcuts({
    onOpenCommandPalette: () => setIsCommandPaletteOpen(true),
    onOpenHciGuide: () => setIsHciGuideOpen(true),
    onToggleTheme: toggleTheme,
    onEscape: () => {
      setSelectedProject(null);
      setSelectedBlog(null);
      setIsResumeOpen(false);
      setIsHciGuideOpen(false);
      setIsCommandPaletteOpen(false);
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* WCAG 2.2 AA Skip Link */}
      <SkipLink />

      {/* Persistent Navigation (Hick's Law max 6 items) */}
      <Navbar
        activeSection={activeSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenHciGuide={() => setIsHciGuideOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        
        {/* 1. Hero Section */}
        <HeroSection
          onOpenResume={() => setIsResumeOpen(true)}
          onExploreProjects={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. About Section */}
        <AboutSection />

        {/* 3. Academic Section */}
        <AcademicSection />

        {/* 4. Professional & Leadership Section */}
        <ExperienceSection />

        {/* 5. Projects Section (Filterable & Searchable) */}
        <ProjectsSection onSelectProject={setSelectedProject} />

        {/* 6. Skills Section (Competency Tiers, No Deceptive Bars) */}
        <SkillsSection />

        {/* 7. Blog Section (Technical Writing) */}
        <BlogSection onSelectBlog={setSelectedBlog} />

        {/* 8. Social & Campus Organizations */}
        <SocialSection onTriggerToast={showToast} />

        {/* 9. Contact Section (Validated Form) */}
        <ContactSection onTriggerToast={showToast} />

        {/* 10. Usability Evaluation Lab & SUS Suite */}
        <EvaluationDashboard
          store={usabilityStore}
          onTriggerToast={showToast}
        />

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Dialogs (Progressive Disclosure) */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <BlogModal
        article={selectedBlog}
        isOpen={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onDownload={() => {
          showToast({
            type: 'success',
            title: 'Resume Download Triggered',
            message: 'Mokshi Shah VJTI Computer Engineering resume has been downloaded.',
          });
        }}
      />

      <HciGuideModal
        isOpen={isHciGuideOpen}
        onClose={() => setIsHciGuideOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={(proj) => {
          setSelectedProject(proj);
        }}
        onSelectBlog={(blog) => {
          setSelectedBlog(blog);
        }}
        onToggleTheme={toggleTheme}
        onOpenHciGuide={() => setIsHciGuideOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Global Toast Notification */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}

export default App;
