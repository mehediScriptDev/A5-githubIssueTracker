let allIssues = [];

const loadAllCardsData = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data || [];
      // show all types
      displayData(allIssues);
      updateTotal(allIssues.length);
      attachFilterHandlers();
    })
    .catch((err) => console.error(err));
};

const updateTotal = (count) => {
  const el = document.getElementById('totalCards');
  if (el) el.textContent = `${count} Issues`;
};

const setActiveTab = (activeId) => {
  const tabs = ['tabAll','tabOpen','tabClosed'];
  tabs.forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    if (id === activeId) {
      btn.classList.add('btn-primary');
      btn.classList.remove('text-[#64748B]','bg-white','border','border-[#E4E4E7]');
    } else {
      btn.classList.remove('btn-primary');
      // inactive card design
      btn.classList.add('text-[#64748B]','bg-white','border','border-[#E4E4E7]');
    }
  });
};

const attachFilterHandlers = () => {
  const allBtn = document.getElementById('tabAll');
  const openBtn = document.getElementById('tabOpen');
  const closedBtn = document.getElementById('tabClosed');
  if (allBtn) allBtn.addEventListener('click', () => { displayData(allIssues); updateTotal(allIssues.length); setActiveTab('tabAll'); });
  if (openBtn) openBtn.addEventListener('click', () => { const f = allIssues.filter(i => i.status === 'open'); displayData(f); updateTotal(f.length); setActiveTab('tabOpen'); });
  if (closedBtn) closedBtn.addEventListener('click', () => { const f = allIssues.filter(i => i.status === 'closed'); displayData(f); updateTotal(f.length); setActiveTab('tabClosed'); });
};

const displayData = (datas) => {
  const dataViewer = document.getElementById('cardContainer');
  dataViewer.innerHTML = '';

  for (const data of datas) {
    const card = document.createElement('div');
    // dynamic border
    let borderCl = 'border-[#00A96E]';
    if (data.status === 'closed') {
      borderCl = 'border-[#A855F7]';
    }
    // dynamic badge background
    let badgeCl = 'text-[#EF4444] bg-[#FEECEC]';
    if (data.priority === 'high') {
      badgeCl = 'text-[#EF4444] bg-[#FEECEC]';
    } else if (data.priority === 'medium') {
      badgeCl = 'text-[#F59E0B] bg-[#FFF6D1]';
    } else if (data.priority === 'low') {
      badgeCl = 'text-[#9CA3AF] bg-[#EEEFF2]';
    }

    // card labels
    let labelContainer = '';
    (data.labels || []).forEach((label) => {
      let labelColor = 'text-[#EF4444] bg-[#FEECEC]';
      if (label === 'bug') {
        labelColor = 'text-[#EF4444] bg-[#FEECEC] border border-[#FECACA]';
      } else if (label === 'help wanted') {
        labelColor = 'bg-[#FFF8DB] text-[#D97706] border border-[#FECACA]';
      } else if (label === 'enhancement') {
        labelColor = 'bg-[#DEFCE8] text-[#00A96E] border border-[#00A96E]';
      } else {
        labelColor = 'bg-[#FFF8DB] text-[#D97706] border border-[#FECACA]';
      }

      let icon = `<i class="fa-solid fa-wand-magic-sparkles"></i>`;
      if (label === 'bug') {
        icon = `<i class="fa-solid fa-bug"></i>`;
      } else if (label === 'help wanted') {
        icon = `<i class="fa-regular fa-life-ring"></i>`;
      } else if (label === 'enhancement') {
        icon = `<i class="fa-solid fa-wand-magic-sparkles"></i>`;
      }

      labelContainer += `
        <p class="uppercase text-[8px] ${labelColor} font-semibold  py-1.5 rounded-full px-4 ">
          ${icon} ${label}
        </p>
      `;
    });

    // card content 
    card.innerHTML = `
      <div class="bg-white shadow rounded-lg border-t-2 ${borderCl} p-4">
        <div class="flex justify-between items-center mb-3">
          <div class="">
            <img src="/assets/Closed- Status .png" class="bg-[#F0E2FF] p-1 rounded-full" alt="Closed Status" />
          </div>
          <div>
            <p class="uppercase text-xs ${badgeCl} font-semibold  py-1.5 rounded-full px-4">${data.priority}</p>
          </div>
        </div>
        <div>
          <h1 class="font-semibold text-sm mb-1 line-clamp-1">${data.title}</h1>
          <p class="text-[#64748B] text-xs line-clamp-2">${data.description}</p>

          <div class="mt-3">
            <div class="flex flex-wrap gap-1 items-center">
              ${labelContainer}
            </div>
          </div>
          <div class="divider -mx-4"></div>
          <div class="space-y-2">
            <p class="text-xs text-[#64748B]">#by ${data.assignee ? data.assignee : 'Unassigned'}</p>
            <p class="text-xs text-[#64748B]">${new Date(data.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    `;

    // modal
    card.addEventListener('click', () => {
      const modal = document.getElementById('my_modal_5');
      if (!modal) return;
      const modalBox = modal.querySelector('.modal-box');
      if (!modalBox) return;
      const statusPill = data.status === 'closed' ? `<p class="text-xs bg-[#A855F7] text-white py-1 px-2 rounded-full">Closed</p>` : `<p class="text-xs bg-[#00A96E] text-white py-1 px-2 rounded-full">Opened</p>`;
      modalBox.innerHTML = `
        <h3 class="text-lg font-bold mb-3">${data.title}</h3>
        <div class="text-[#64748B] flex justify-start gap-2 items-center mb-4">
          ${statusPill}
          <span class="inline-block w-2 h-2 bg-[#9CA3AF] rounded-full"></span>
          <p class="text-xs text-[#64748B]">Opened by ${data.author || data.assignee || 'Unknown'}</p>
          <span class="inline-block w-2 h-2 bg-[#9CA3AF] rounded-full"></span>
          <p class="text-xs text-[#64748B]">${new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
        <div class="flex gap-2 items-center mb-4">
          ${labelContainer}
        </div>
        <p class="text-base text-[#64748B] my-4">${data.description}</p>
        <div class="bg-[#F8FAFC] rounded-lg p-4 flex justify-between">
          <div>
            <h1 class="text-[#64748B] text-base">Assignee:</h1>
            <p class="font-semibold text-base">${data.assignee || 'Unassigned'}</p>
          </div>
          <div class="flex flex-col justify-start items-start">
            <h1 class="text-[#64748B] text-base">Priority:</h1>
            <p class="font-semibold uppercase text-xs ${data.priority === 'high' ? 'bg-[#EF4444] text-white py-1 px-2 rounded-full' : ''}">${data.priority || ''}</p>
          </div>
        </div>
        <div class="modal-action"><form method="dialog"><button class="btn btn-primary">Close</button></form></div>
      `;
      if (typeof modal.showModal === 'function') modal.showModal();
    });

    dataViewer.appendChild(card);
  }
};

loadAllCardsData();
