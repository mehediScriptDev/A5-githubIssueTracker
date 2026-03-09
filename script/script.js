const loadAllCardsData = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      displayData(data.data);
    });
};

const displayData = (datas) => {
  const dataViewer = document.getElementById("cardContainer");
  dataViewer.innerHTML = "";

  for (const data of datas) {
    const card = document.createElement("div");
    // dynamic border
    let borderCl = "border-[#00A96E]";
    if (data.status === "closed") {
      borderCl = "border-[#A855F7]";
    }
    // dynamic badge background
    let badgeCl = "text-[#EF4444] bg-[#FEECEC]";
    if (data.priority === "high") {
      badgeCl = "text-[#EF4444] bg-[#FEECEC]";
    } else if (data.priority === "medium") {
      badgeCl = "text-[#F59E0B] bg-[#FFF6D1]";
    } else if (data.priority === "low") {
      badgeCl = "text-[#9CA3AF] bg-[#EEEFF2]";
    }

    // card labels
let labelContainer = '';
    data.labels.forEach(label=>{
        let labelColor = "text-[#EF4444] bg-[#FEECEC]";
        if(label === "bug") {
            labelColor ='text-[#EF4444] bg-[#FEECEC] border border-[#FECACA]'
        }
        else if(label === "help wanted") {
            labelColor ='bg-[#FFF8DB] text-[#D97706] border border-[#FECACA]'
        }
        else if(label === "enhancement") {
            labelColor ='bg-[#DEFCE8] text-[#00A96E] border border-[#00A96E]'
        }
        else{
            labelColor ='bg-[#FFF8DB] text-[#D97706] border border-[#FECACA]'
        }

        let icon = `<i class="fa-solid fa-wand-magic-sparkles"></i>`;
        if(label === "bug") {
            icon = `<i class="fa-solid fa-bug"></i>`;
        } else if(label === "help wanted") {
            icon = `<i class="fa-regular fa-life-ring"></i>`;
        } else if(label === "enhancement") {
            icon = `<i class="fa-solid fa-wand-magic-sparkles"></i>`;
        }

        labelContainer += `
        <p
                      class="uppercase text-[8px] ${labelColor} font-semibold  py-1.5 rounded-full px-4 "
                    >
                      ${icon} ${label}
                    </p>
        `
    })
    card.innerHTML = `<div
            onclick="my_modal_5.showModal()"
              class="bg-white shadow rounded-lg border-t-2 ${borderCl} p-4"
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
                    class="uppercase text-xs ${badgeCl} font-semibold  py-1.5 rounded-full px-4"
                  >
                    ${data.priority}
                  </p>
                </div>
              </div>
              <div>
                <h1 class="font-semibold text-sm mb-1 line-clamp-1">
                  ${data.title}
                </h1>
                <p class="text-[#64748B] text-xs line-clamp-2">
                  ${data.description}
                </p>

                <div class="mt-3">
                  <div id="cardLabels" class="flex flex-wrap gap-1 items-center">
                    ${labelContainer}
                  </div>
                </div>
                <div class="divider -mx-4"></div>
                <div class="space-y-2">
                  <p class="text-xs text-[#64748B]">#by ${data.assignee ? data.assignee : "Unassigned"}</p>
                  <p class="text-xs text-[#64748B]">${data.createdAt}</p>
                </div>
              </div>
            </div>`;
    dataViewer.appendChild(card);
  }
};
loadAllCardsData();
