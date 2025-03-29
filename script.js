const loadingElement = document.getElementById("loading")
const container = document.querySelector(".cards__section")
const dailyOption = document.getElementById("daily")
const weeklyOption = document.getElementById("weekly")
const monthlyOption = document.getElementById("monthly")

// Modifying the DOM
dailyOption.addEventListener("click", () => {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  dailyOption.classList.add("active")
  weeklyOption.classList.remove("active")
  monthlyOption.classList.remove("active")
  loadData(1)
})
weeklyOption.addEventListener("click", () => {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  weeklyOption.classList.add("active")
  monthlyOption.classList.remove("active")
  dailyOption.classList.remove("active")
  loadData(2)
})
monthlyOption.addEventListener("click", () => {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  monthlyOption.classList.add("active")
  dailyOption.classList.remove("active")
  weeklyOption.classList.remove("active")
  loadData(3)
})

// Accessing the data
async function loadData(timeframes) {
  try {
    loadingElement.classList.remove("hidden")

    const response = await fetch("./data.json")
    if (!response.ok) {
      throw new Error("Erro ao carregar o arquivo JSON")
    }
    let externalData = await response.json()
    externalData.forEach((item) => {
      appendItem(item, timeframes)
    })
  } catch (error) {
    console.error("Erro:", error)
  } finally {
    loadingElement.classList.add("hidden")
  }
}

// Populating the DOM
function appendItem(item, option) {
  const title = item.title
  let timeframes

  switch (option) {
    case 2:
      timeframes = item.timeframes.weekly
      break
    case 3:
      timeframes = item.timeframes.monthly
      break
    default:
      timeframes = item.timeframes.daily
      break
  }

  const card = document.createElement("div")
  card.classList.add("card")
  card.style.backgroundColor = `var(--${title.replace(" ", "-")})`
  card.style.backgroundImage = `url(./images/icon-${title.replace(
    " ",
    "-"
  )}.svg)`

  card.innerHTML += `
      <div class="card__content">
        <span class="card__id">${title}</span>
        <span class="card__menu">...</span>
        <span class="card__current-hrs">${timeframes.current}hrs</span>
        <span class="card__previous-hrs">Last Week - ${timeframes.previous}hrs</span>
      </div>`

  container.appendChild(card)
}

// Default inicialização
loadData(1)
