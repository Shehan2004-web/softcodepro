// SoftCode Pro - Admin Charts
// Requires Chart.js 4.x (chart.umd.min.js)

let scpCharts = {
  revenue: null,
  projects: null,
};

function scpCreateGradient(ctx) {
  const h = ctx?.canvas?.clientHeight || ctx?.canvas?.height || 240;
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  // Primary blue with alpha
  gradient.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
  gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
  return gradient;
}

function initAdminCharts() {
  if (typeof window.Chart === 'undefined') return;
  // Stabilize defaults
  try {
    Chart.defaults.animation = false;
    Chart.defaults.resizeDelay = 200;
    Chart.defaults.devicePixelRatio = 1;
  } catch (e) {}
  const revenueEl = document.getElementById('monthlyRevenueChart');
  const projectsEl = document.getElementById('projectProgressChart');

  if (revenueEl && !scpCharts.revenue) {
    try {
      const ctx = revenueEl.getContext('2d');
      const primary = 'rgba(37, 99, 235, 1)';
      scpCharts.revenue = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Revenue',
            data: [8, 10, 9, 12, 14, 16, 15, 18, 19, 21, 24, 26],
            fill: true,
            borderColor: primary,
            backgroundColor: scpCreateGradient(ctx),
            tension: 0.35,
            pointRadius: 3,
            pointHoverRadius: 5,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          resizeDelay: 200,
          layout: { padding: 0 },
          plugins: {
            legend: { display: false },
            tooltip: {
              mode: 'index', intersect: false,
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#fff',
              bodyColor: '#e2e8f0',
              borderColor: 'rgba(255,255,255,0.08)',
              borderWidth: 1
            }
          },
          interaction: { mode: 'nearest', intersect: false },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: 'rgba(148,163,184,0.15)' }, beginAtZero: true }
          }
        }
      });
    } catch (e) {
      console.error('Revenue chart error:', e);
    }
  }

  if (projectsEl && !scpCharts.projects) {
    try {
      const ctx2 = projectsEl.getContext('2d');
      scpCharts.projects = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: ['Proj A', 'Proj B', 'Proj C', 'Proj D', 'Proj E', 'Proj F'],
          datasets: [
            {
              label: 'Completed %',
              data: [80, 65, 92, 40, 73, 55],
              backgroundColor: 'rgba(59, 130, 246, 0.7)'
            },
            {
              label: 'Remaining %',
              data: [20, 35, 8, 60, 27, 45],
              backgroundColor: 'rgba(203, 213, 225, 0.7)'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          resizeDelay: 200,
          layout: { padding: 0 },
          plugins: {
            legend: { display: true, position: 'bottom' },
          },
          scales: {
            x: { stacked: true, grid: { display: false } },
            y: { stacked: true, beginAtZero: true, grid: { color: 'rgba(148,163,184,0.15)' } }
          }
        }
      });
    } catch (e) {
      console.error('Project progress chart error:', e);
    }
  }
}

// Optional: helper to refresh colors on theme change in the future
function refreshChartThemes() {
  // In case you want to adjust tooltip/background colors when theme toggles
  [scpCharts.revenue, scpCharts.projects].forEach((chart) => chart && chart.update());
}

// Expose to window for non-module usage
if (typeof window !== 'undefined') {
  window.initAdminCharts = initAdminCharts;
  window.refreshChartThemes = refreshChartThemes;
}
