
    const navButtons = document.querySelectorAll('.nav button');
    const sections = document.querySelectorAll('.section');
    const headerSub = document.getElementById('header-sub');

    function showSection(id){
      sections.forEach(s => s.classList.toggle('active', s.id === id));
      navButtons.forEach(b => b.classList.toggle('active', b.dataset.target === id));

      headerSub.textContent =
        id === 'app-status'     ? 'Live status for Vinti and PlingifyPlug-Hub releases.' :
        id === 'website-status' ? 'Overview of Odoo and GitHub-hosted websites.' :
        id === 'server-status'  ? 'Core back-end systems and third-party services.' :
        'Live overview of PlingifyPlug apps, sites and core systems.';
    }

    navButtons.forEach(b => {
      b.addEventListener('click', () => showSection(b.dataset.target));
    });

    const jump = document.querySelector('.pill-link[data-jump]');
    if (jump){
      jump.addEventListener('click', () => {
        const target = jump.getAttribute('data-jump');
        showSection(target);
        window.scrollTo({top:0, behavior:'smooth'});
      });
    }

    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn){
      refreshBtn.addEventListener('click', () => {
        refreshBtn.textContent = 'Refreshing...';
        refreshBtn.disabled = true;
        setTimeout(() => {
          refreshBtn.textContent = 'Refresh';
          refreshBtn.disabled = false;
        }, 800);
      });

    }
