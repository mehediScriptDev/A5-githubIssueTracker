const loadAllCardsData = () =>{
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res=>res.json())
    .then(data=>{
        displayData(data.data);
    })
}

const displayData = (datas) => {
    const dataViewer = document.getElementById('cardContainer');
    dataViewer.innerHTML = ''

    for(const data of datas){
        const card = document.createElement('div');
        card.innerHTML = `<div
            onclick="my_modal_5.showModal()"
              class="bg-white shadow rounded-lg border-t-2 border-[#A855F7] p-4"
            >
              <div class="flex justify-between items-center mb-3">
                <div class="">
                  <img
                    src="/assets/Closed- Status .png"
                    class="bg-[#F0E2FF] p-1 rounded-full"
                    alt="Closed Status"
                  />
                </div>
                <div>
                  <p
                    class="uppercase text-xs text-[#EF4444] font-semibold bg-[#FEECEC] py-1.5 rounded-full px-4"
                  >
                    ${data.priority}
                  </p>
                </div>
              </div>
              <div>
                <h1 class="font-semibold text-sm mb-1">
                  ${data.title}
                </h1>
                <p class="text-[#64748B] text-xs line-clamp-2">
                  ${data.description}
                </p>

                <div class="mt-3">
                  <div class="flex gap-1 items-center">
                    <p
                      class="uppercase text-xs text-[#EF4444] font-semibold bg-[#FEECEC] py-1.5 rounded-full px-4 border border-[#FECACA]"
                    >
                      <i class="fa-solid fa-bug"></i> bug
                    </p>

                    <p
                      class="uppercase text-xs font-semibold bg-[#FFF8DB] text-[#D97706] py-1.5 rounded-full px-4 border border-[#FDE68A]"
                    >
                      <i class="fa-regular fa-life-ring"></i> help wanted
                    </p>
                  </div>
                </div>
                <div class="divider -mx-4"></div>
                <div class="space-y-2">
                  <p class="text-xs text-[#64748B]">#${data.assignee ? data.assignee : 'Unassigned'}</p>
                  <p class="text-xs text-[#64748B]">${data.createdAt}</p>
                </div>
              </div>
            </div>`
        dataViewer.appendChild(card);
    }
}
loadAllCardsData()