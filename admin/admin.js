'use strict';

// SoftCode Pro - Admin Dashboard Script
// Handles: nav routing, sidebar toggle, theme/lang persistence, forms, charts init

(function () {
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function applySavedTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-theme');
      const icon = qs('#themeToggleIcon');
      if (icon) icon.className = 'fa-solid fa-sun';
    }

  // Calendar: simple month renderer for Process Calendar
  function initProcessCalendar() {
    const container = qs('#processCalendar');
    const label = qs('#procCalMonthLabel');
    if (!container || !label) return;

    const state = {
      current: new Date(),
    };

    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const weekNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    function daysInMonth(year, month) { // month: 0-11
      return new Date(year, month + 1, 0).getDate();
    }

    function render() {
      const y = state.current.getFullYear();
      const m = state.current.getMonth();
      label.textContent = `${monthNames[m]} ${y}`;

      const first = new Date(y, m, 1);
      const startWeekday = first.getDay();
      const totalDays = daysInMonth(y, m);
      const today = new Date();
      const isThisMonth = today.getFullYear() === y && today.getMonth() === m;

      // Build header and grid
      let html = '';
      html += '<div class="cal-head">' + weekNames.map(w => `<div>${w}</div>`).join('') + '</div>';
      html += '<div class="cal-grid">';

      // leading blanks
      for (let i = 0; i < startWeekday; i++) {
        html += '<div class="cal-day" aria-disabled="true"></div>';
      }
      // days
      for (let d = 1; d <= totalDays; d++) {
        const classes = ['cal-day'];
        if (isThisMonth && d === today.getDate()) classes.push('process');
        // Example: mark every 5th day as schedule for visual variety
        if (d % 5 === 0) classes.push('schedule');
        html += `<div class="${classes.join(' ')}"><div class="date">${d}</div></div>`;
      }

      html += '</div>';
      container.innerHTML = html;
    }

    render();

    // Optional: if nav buttons exist, wire them
    const prev = qs('#procCalPrev');
    const next = qs('#procCalNext');
    const todayBtn = qs('#procCalToday');
    prev?.addEventListener('click', () => { state.current.setMonth(state.current.getMonth() - 1); render(); });
    next?.addEventListener('click', () => { state.current.setMonth(state.current.getMonth() + 1); render(); });
    todayBtn?.addEventListener('click', () => { state.current = new Date(); render(); });
  }

  // Process View: bind edit buttons and modal
  function initProcessView() {
    const list = qs('#projectProcessList');
    if (!list) return;
    if (list._bind) return; // avoid duplicate bind
    list._bind = true;

    let currentEditCard = null;

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('.process-edit');
      if (!btn) return;
      const card = btn.closest('.scp-card');
      if (!card) return;
      currentEditCard = card;

      const nameEl = card.querySelector('h6');
      const activeLi = card.querySelector('.process-stepper li.active');
      const progressEl = card.querySelector('.project-progress');

      const projectName = nameEl ? nameEl.textContent.trim() : '';
      const phase = activeLi ? activeLi.querySelector('.label')?.textContent.trim() : 'Planning';
      const progress = progressEl ? (parseInt(progressEl.textContent) || 0) : 0;

      // Prefill modal
      const modalEl = document.getElementById('updatePhaseModal');
      if (!modalEl) return;
      const updName = qs('#updProjectName');
      const updPhase = qs('#updPhase');
      const updStatus = qs('#updStatus');
      const updProgress = qs('#updProgress');
      const updOutput = updProgress?.nextElementSibling;
      if (updName) updName.value = projectName;
      if (updPhase) updPhase.value = phase;
      if (updStatus) updStatus.value = 'In Progress';
      if (updProgress) {
        updProgress.value = String(progress);
        if (updOutput) updOutput.value = progress + '%';
      }
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    });

    const form = qs('#formUpdatePhase');
    if (form && !form._bind) {
      form._bind = true;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentEditCard) return;
        const selPhase = qs('#updPhase')?.value || 'Planning';
        const selStatus = qs('#updStatus')?.value || 'In Progress';
        const selProgress = parseInt(qs('#updProgress')?.value || '0');

        // Update stepper
        const steps = Array.from(currentEditCard.querySelectorAll('.process-stepper li'));
        const idx = steps.findIndex(li => li.querySelector('.label')?.textContent.trim() === selPhase);
        steps.forEach((li, i) => {
          li.classList.remove('done', 'active', 'pending');
          if (i < idx) li.classList.add('done');
          if (i === idx) li.classList.add('active');
        });

        // Update subtitle status text
        const sub = currentEditCard.querySelector('.text-muted.small');
        if (sub) {
          sub.innerHTML = sub.innerHTML.replace(/Status:\s*[^·]+/i, `Status: ${selStatus}`);
        }

        // Update progress badge and color
        const badge = currentEditCard.querySelector('.project-progress');
        if (badge) {
          badge.textContent = selProgress + '% ';
          badge.classList.remove('bg-primary', 'bg-secondary', 'bg-success', 'bg-warning');
          if (selProgress >= 80) badge.classList.add('bg-success');
          else if (selProgress >= 50) badge.classList.add('bg-primary');
          else if (selProgress >= 25) badge.classList.add('bg-secondary');
          else badge.classList.add('bg-warning');
        }

        const modalEl = document.getElementById('updatePhaseModal');
        if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      });
    }
  }
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const icon = qs('#themeToggleIcon');
    if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    if (window.refreshChartThemes) window.refreshChartThemes();
  }

  function applySavedLanguage() {
    const saved = localStorage.getItem('language') || 'en';
    const currentLang = qs('#currentLang');
    if (currentLang) currentLang.textContent = saved.toUpperCase();
  }

  function setLanguage(lang) {
    localStorage.setItem('language', lang);
    const currentLang = qs('#currentLang');
    if (currentLang) currentLang.textContent = lang.toUpperCase();
  }

  function handleSidebarToggle() {
    const sidebar = qs('#scpSidebar');
    const main = qs('#scpMain');
    if (!sidebar || !main) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      sidebar.classList.toggle('active');
    } else {
      sidebar.classList.toggle('collapsed');
      main.classList.toggle('expanded');
    }
  }

  function setActivePage(page) {
    qsa('.scp-nav-link').forEach((a) => a.classList.toggle('active', a.getAttribute('data-page') === page));
    qsa('.page').forEach((p) => p.classList.add('d-none'));
    const el = qs(`#page-${page}`);
    if (el) el.classList.remove('d-none');
    const title = qs('#pageTitle');
    if (title) title.textContent = page.charAt(0).toUpperCase() + page.slice(1);
    // Page-specific initializers
    if (page === 'dashboard') {
      initCharts();
    } else if (page === 'tasks') {
      initKanban();
    } else if (page === 'users') {
      initEmployees();
    } else if (page === 'clients') {
      initClients();
    }
  }

  function initNavRouting() {
    qsa('.scp-nav-link').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const page = a.getAttribute('data-page');
        setActivePage(page);
      });
    });
  }

  function initThemeAndLanguage() {
    applySavedTheme();
    applySavedLanguage();
    const themeToggle = qs('#themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    qsa('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
      });
    });
  }

  function initSidebarButton() {
    const btn = qs('#sidebarToggle');
    if (btn) btn.addEventListener('click', handleSidebarToggle);
  }

  function initForms() {
    const projectForm = qs('#formCreateProject');
    if (projectForm) {
      projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const modalEl = document.getElementById('createProjectModal');
        if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      });
    }
    const empForm = qs('#formAddEmployee');
    if (empForm) {
      empForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const modalEl = document.getElementById('addEmployeeModal');
        if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      });
    }
    const invForm = qs('#formAddInvoice');
    if (invForm) {
      invForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const modalEl = document.getElementById('addInvoiceModal');
        if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      });
    }
    const addClientForm = qs('#formAddClient');
    if (addClientForm) {
      addClientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const modalEl = document.getElementById('addClientModal');
        if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      });
    }
  }

  function initCharts() {
    const tryInit = () => {
      if (typeof window.Chart === 'undefined' || typeof window.initAdminCharts !== 'function') {
        setTimeout(tryInit, 50);
        return;
      }
      try {
        window.initAdminCharts();
      } catch (err) {
        console.error('Chart init failed:', err);
      }
    };
    tryInit();
  }

  // On resize, update charts without animation and keep scroll at 0
  function bindResizeForCharts() {
    let rafId = null;
    window.addEventListener('resize', () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (window.refreshChartThemes) window.refreshChartThemes();
      });
    });
  }

  // Tasks: Kanban board init (SortableJS)
  function initKanban() {
    const lists = qsa('.kanban-list');
    if (!lists.length || typeof Sortable === 'undefined') return;
    lists.forEach((el) => {
      if (el._sortableInited) return; // avoid duplicate init
      el._sortableInited = true;
      new Sortable(el, {
        group: 'tasks',
        animation: 150,
        ghostClass: 'drag-ghost',
        handle: '.drag-handle',
      });
    });
  }

  // Employees: simple search filter
  function initEmployees() {
    const search = qs('#employeesSearch');
    const table = qs('#employeesTable');
    if (!table) return;
    if (search && !search._bind) {
      search._bind = true;
      search.addEventListener('input', () => {
        const term = search.value.toLowerCase();
        qsa('tbody tr', table).forEach((tr) => {
          tr.style.display = tr.textContent.toLowerCase().includes(term) ? '' : 'none';
        });
      });
    }
  }

  // Clients: simple search filter
  function initClients() {
    const search = qs('#clientsSearch');
    const table = qs('#clientsTable');
    if (!table) return;
    if (search && !search._bind) {
      search._bind = true;
      search.addEventListener('input', () => {
        const term = search.value.toLowerCase();
        qsa('tbody tr', table).forEach((tr) => {
          tr.style.display = tr.textContent.toLowerCase().includes(term) ? '' : 'none';
        });
      });
    }
  }

  function initPageLoadAnimation() {
    // Keep consistent with site-wide behavior
    document.body.classList.add('page-loaded');
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Prevent browser from restoring previous scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    initThemeAndLanguage();
    initSidebarButton();
    initNavRouting();
    setActivePage('dashboard');
    initForms();
    initCharts();
    bindResizeForCharts();
    initProcessView();
    initProcessCalendar();
    initPageLoadAnimation();
  });
})();
