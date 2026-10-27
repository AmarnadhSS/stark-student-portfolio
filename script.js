/**
 * STUDENT PORTFOLIO INTERACTIVE CONTROLLER
 * Handles: Theme toggle, Mobile nav, Project filter, Deep dive modals,
 * Certificate previews, Copy-to-clipboard, Form validation, and Live info customization.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Project Data Store for Deep Dive Modals ---
  const projectsData = {
    synthflow: {
      title: "SynthFlow AI",
      category: "AI & Machine Learning",
      award: "🏆 1st Place - National Collegiate AI Hackathon 2026",
      role: "Lead Machine Learning Architect & Full-Stack Developer",
      image: "assets/project-synthflow.jpg",
      summary: "An open-source distributed neural network inference engine and visual workflow visualizer designed to compress and orchestrate LLM workflows with sub-10ms latency.",
      problem: "Deploying multi-step LLM chains and deep learning pipelines on resource-constrained campus clusters frequently encountered severe memory bottlenecks and unmonitored inference drift.",
      solution: "Engineered an asynchronous task queuing pipeline using FastAPI and Redis streams, paired with dynamic quantization and a node-based interactive WebGL dashboard for real-time latency visualization.",
      techStack: ["Python", "PyTorch", "FastAPI", "React", "WebSockets", "Docker", "Redis"],
      metrics: [
        { label: "Latency Reduction", value: "42%" },
        { label: "GitHub Stars", value: "1,420+" },
        { label: "Monthly Inferences", value: "12,000+" }
      ],
      githubUrl: "https://github.com/placeholder-student/synthflow-ai",
      demoUrl: "https://synthflow-demo.example.edu"
    },
    devmesh: {
      title: "DevMesh",
      category: "Cloud & Distributed Systems",
      award: "🥈 Runner-Up & Best Cloud Architecture - DevCon Collegiate Showcase",
      role: "Backend Architect & DevOps Lead",
      image: "assets/project-devmesh.jpg",
      summary: "A real-time collaborative cloud topology designer and API gateway visualizer that automatically models microservice communication latencies and failure cascades.",
      problem: "Student engineering teams struggled to understand how distributed services interact in production, leading to cascading HTTP timeouts during high-traffic hackathon releases.",
      solution: "Built a distributed tracing collector in Go using eBPF hooks and WebSockets to visualize live traffic graphs on an interactive HTML5 Canvas with simulated network chaos injection.",
      techStack: ["TypeScript", "Go", "Next.js", "gRPC", "Docker", "Kubernetes", "TailwindCSS"],
      metrics: [
        { label: "Telemetry Latency", value: "<15ms" },
        { label: "Services Modeled", value: "50+ nodes" },
        { label: "Open Source Forks", value: "850+" }
      ],
      githubUrl: "https://github.com/placeholder-student/devmesh-cloud",
      demoUrl: "https://devmesh-demo.example.edu"
    },
    ecopulse: {
      title: "EcoPulse",
      category: "Full-Stack & IoT",
      award: "🌱 Grand Prize - Global CleanTech Student Challenge 2025",
      role: "Lead Frontend Engineer & IoT Firmware Integrator",
      image: "assets/project-ecopulse.jpg",
      summary: "A smart grid intelligence platform that aggregates real-time solar, wind, and battery telemetry across campus buildings to recommend automated peak-shaving energy schedules.",
      problem: "University facilities lacked granular sub-hourly visibility into renewable power consumption, causing significant peak tariff charges during laboratory experiments.",
      solution: "Integrated MQTT telemetry brokers with a high-throughput TimescaleDB cluster and designed a responsive, accessible dashboard with predictive battery discharge curves.",
      techStack: ["React", "Node.js", "TimescaleDB", "Chart.js", "MQTT", "ESP32", "TailwindCSS"],
      metrics: [
        { label: "Energy Peak Saved", value: "~18%" },
        { label: "Campus Testbeds", value: "3 Facilities" },
        { label: "Telemetry Uptime", value: "99.98%" }
      ],
      githubUrl: "https://github.com/placeholder-student/ecopulse-iot",
      demoUrl: "https://ecopulse-demo.example.edu"
    }
  };

  // --- Theme Controller (Dark / Light) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconDark = document.getElementById('theme-icon-dark');
  const themeIconLight = document.getElementById('theme-icon-light');

  const savedTheme = localStorage.getItem('portfolio-theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (theme === 'light') {
      themeIconDark.style.display = 'block';
      themeIconLight.style.display = 'none';
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      themeIconDark.style.display = 'none';
      themeIconLight.style.display = 'block';
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
    }
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
      showToast(`Switched to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  // --- Header Scrolled State ---
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- Mobile Navigation Menu ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      hamburgerBtn.innerHTML = isOpen ? 
        `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>` : 
        `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // --- Scrollspy: Update active navigation item ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }, { passive: true });

  // --- Project Category Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsCount = document.getElementById('projects-count');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      let visibleCount = 0;

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (projectsCount) {
        projectsCount.textContent = `Showing ${visibleCount} of ${projectCards.length} projects`;
      }
    });
  });

  // --- Skills Tab Category Switcher ---
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCategoryCards = document.querySelectorAll('.skill-category-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      skillCategoryCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Project Deep Dive Modal ---
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const deepDiveBtns = document.querySelectorAll('.btn-deep-dive');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-img').alt = `${data.title} UI preview and architecture`;
    document.getElementById('modal-award').textContent = data.award;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-role').textContent = `Role: ${data.role}`;
    document.getElementById('modal-summary').textContent = data.summary;
    document.getElementById('modal-problem').textContent = data.problem;
    document.getElementById('modal-solution').textContent = data.solution;

    // Tech tags
    const techContainer = document.getElementById('modal-tech-tags');
    techContainer.innerHTML = '';
    data.techStack.forEach(tech => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = tech;
      techContainer.appendChild(tag);
    });

    // Metrics
    const metricsContainer = document.getElementById('modal-metrics-grid');
    metricsContainer.innerHTML = '';
    data.metrics.forEach(m => {
      const metricCard = document.createElement('div');
      metricCard.className = 'modal-metric-card';
      metricCard.innerHTML = `
        <div class="modal-metric-value">${m.value}</div>
        <div class="modal-metric-label">${m.label}</div>
      `;
      metricsContainer.appendChild(metricCard);
    });

    // Links
    document.getElementById('modal-github-link').href = data.githubUrl;
    document.getElementById('modal-demo-link').href = data.demoUrl;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closeProjectModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  deepDiveBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // --- Certificate / Award Preview Modal ---
  const certModal = document.getElementById('cert-modal');
  const certCloseBtn = document.getElementById('cert-close-btn');
  const certBtns = document.querySelectorAll('.achievement-action-btn');

  certBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-award-title') || 'Collegiate Achievement Award';
      const eventName = btn.getAttribute('data-award-event') || 'National Collegiate Hackathon';
      const date = btn.getAttribute('data-award-date') || 'Spring 2026';

      document.getElementById('cert-title').textContent = title;
      document.getElementById('cert-event').textContent = eventName;
      document.getElementById('cert-date').textContent = date;

      certModal.classList.add('open');
      certModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      certCloseBtn.focus();
    });
  });

  if (certCloseBtn) {
    certCloseBtn.addEventListener('click', () => {
      certModal.classList.remove('open');
      certModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        certModal.classList.remove('open');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  // Global Escape key to close any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('open')) {
        closeProjectModal();
      }
      if (certModal && certModal.classList.contains('open')) {
        certModal.classList.remove('open');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
      if (customizerDrawer && customizerDrawer.classList.contains('open')) {
        customizerDrawer.classList.remove('open');
      }
    }
  });

  // --- Copy to Clipboard Utility with Toast ---
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
          const originalText = btn.innerHTML;
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        }).catch(() => {
          showToast('Failed to copy to clipboard');
        });
      }
    });
  });

  // --- Toast Notification System ---
  function showToast(message) {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3200);
  }

  // --- Contact Form Submission & Validation ---
  const contactForm = document.getElementById('contact-form');
  const formSuccessBanner = document.getElementById('form-success-banner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const subjectInput = document.getElementById('sender-subject');
      const messageInput = document.getElementById('sender-message');
      const submitBtn = document.getElementById('form-submit-btn');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showFieldError(nameInput, 'Please enter your name');
        isValid = false;
      } else {
        clearFieldError(nameInput);
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearFieldError(emailInput);
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        showFieldError(subjectInput, 'Please provide a subject');
        isValid = false;
      } else {
        clearFieldError(subjectInput);
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 15) {
        showFieldError(messageInput, 'Message should be at least 15 characters long');
        isValid = false;
      } else {
        clearFieldError(messageInput);
      }

      if (!isValid) return;

      // Simulate sending
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
        Sending Message...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <svg class="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        `;
        contactForm.reset();
        showToast('Thank you! Your message has been simulated and sent successfully.');
        if (formSuccessBanner) {
          formSuccessBanner.style.display = 'block';
          setTimeout(() => {
            formSuccessBanner.style.display = 'none';
          }, 6000);
        }
      }, 1200);
    });
  }

  function showFieldError(inputElement, errorMessage) {
    const parentField = inputElement.closest('.form-field');
    if (parentField) {
      parentField.classList.add('invalid');
      const errorSpan = parentField.querySelector('.field-error');
      if (errorSpan) errorSpan.textContent = errorMessage;
    }
  }

  function clearFieldError(inputElement) {
    const parentField = inputElement.closest('.form-field');
    if (parentField) {
      parentField.classList.remove('invalid');
    }
  }

  // --- Live Info Customizer Drawer (No Fake Details Rule) ---
  const customizerDrawer = document.getElementById('customizer-drawer');
  const openCustomizerBtn = document.getElementById('open-customizer-btn');
  const closeCustomizerBtn = document.getElementById('close-customizer-btn');
  const applyCustomizerBtn = document.getElementById('apply-customizer-btn');
  const resetCustomizerBtn = document.getElementById('reset-customizer-btn');

  // Placeholder target elements
  const elName = document.querySelectorAll('.student-name-text');
  const elTitle = document.querySelectorAll('.student-title-text');
  const elSchool = document.querySelectorAll('.student-school-text');
  const elEmail = document.querySelectorAll('.student-email-text');

  // Load custom values if stored
  const storedConfig = JSON.parse(localStorage.getItem('student-portfolio-config') || '{}');
  if (storedConfig.name) updateLiveText(elName, storedConfig.name);
  if (storedConfig.title) updateLiveText(elTitle, storedConfig.title);
  if (storedConfig.school) updateLiveText(elSchool, storedConfig.school);
  if (storedConfig.email) updateLiveText(elEmail, storedConfig.email);

  if (openCustomizerBtn) {
    openCustomizerBtn.addEventListener('click', () => {
      customizerDrawer.classList.add('open');
      document.getElementById('cust-name').value = storedConfig.name || 'Alex Morgan';
      document.getElementById('cust-title').value = storedConfig.title || 'Building intelligent web apps & distributed systems';
      document.getElementById('cust-school').value = storedConfig.school || 'Stanford University / Your Institution';
      document.getElementById('cust-email').value = storedConfig.email || 'alex.morgan.student@example.edu';
    });
  }

  if (closeCustomizerBtn) {
    closeCustomizerBtn.addEventListener('click', () => {
      customizerDrawer.classList.remove('open');
    });
  }

  if (applyCustomizerBtn) {
    applyCustomizerBtn.addEventListener('click', () => {
      const newConfig = {
        name: document.getElementById('cust-name').value.trim() || '[Alex Morgan]',
        title: document.getElementById('cust-title').value.trim() || '[Building intelligent web apps & distributed systems]',
        school: document.getElementById('cust-school').value.trim() || '[Stanford University / Your Institution]',
        email: document.getElementById('cust-email').value.trim() || 'alex.morgan.student@example.edu'
      };

      localStorage.setItem('student-portfolio-config', JSON.stringify(newConfig));
      updateLiveText(elName, newConfig.name);
      updateLiveText(elTitle, newConfig.title);
      updateLiveText(elSchool, newConfig.school);
      updateLiveText(elEmail, newConfig.email);

      customizerDrawer.classList.remove('open');
      showToast('Personal profile information updated successfully!');
    });
  }

  if (resetCustomizerBtn) {
    resetCustomizerBtn.addEventListener('click', () => {
      localStorage.removeItem('student-portfolio-config');
      updateLiveText(elName, '[Alex Morgan]');
      updateLiveText(elTitle, 'Building intelligent web apps & distributed systems');
      updateLiveText(elSchool, '[Stanford University / Your Institution]');
      updateLiveText(elEmail, 'alex.morgan.student@example.edu');
      customizerDrawer.classList.remove('open');
      showToast('Reset to default competition candidate placeholders.');
    });
  }

  function updateLiveText(elements, text) {
    elements.forEach(el => {
      el.textContent = text;
    });
  }

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
