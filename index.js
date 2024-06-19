function addTask(timeOfDay) {
  const input = document.getElementById("taskInput")
  const task = input.value.trim()
  if (task) {
    const tableId = timeOfDay === "day" ? "dayTasks" : "nightTasks"
    const table = document.getElementById(tableId)

    // vai remover o estaço reservado, se tiver
    const placeholder = table.querySelector(".placeholder")
    if (placeholder) {
      placeholder.remove()
    }

    const row = table.insertRow(-1)
    const cell = row.insertCell(0)
    cell.textContent = task
    input.value = ""
  }
}

let lastClickedButton = ""
let isTaskSelectVisible = false
function showRemoveTaskOptions(timeOfDay) {
  const tableId = timeOfDay === "day" ? "dayTasks" : "nightTasks"
  const table = document.getElementById(tableId)
  const taskSelect = document.getElementById(`${timeOfDay}TaskSelect`)
  const confirmRemoveButton = document.getElementById("confirmRemove")

  if (!isTaskSelectVisible || lastClickedButton !== timeOfDay) {
    taskSelect.innerHTML = "" // limpa opções anteriores

    // adiciona opção padrão
    const defaultOption = document.createElement("option")
    defaultOption.value = ""
    defaultOption.text = "Selecione uma das opções"
    defaultOption.disabled = true
    defaultOption.selected = true
    taskSelect.appendChild(defaultOption)

    // aadiciona opções de tarefa
    for (let i = 0; i < table.rows.length; i++) {
      if (!table.rows[i].classList.contains("placeholder")) {
        const option = document.createElement("option")
        option.value = i
        option.text = table.rows[i].cells[0].textContent
        taskSelect.appendChild(option)
      }
    }

    taskSelect.style.display = "inline"
    confirmRemoveButton.style.display = "inline"
    taskSelect.setAttribute("data-table-id", tableId)

    isTaskSelectVisible = true
    lastClickedButton = timeOfDay
  }
}

function removeSelectedTask() {
  const taskSelect = document.querySelector("select[data-table-id]")
  const tableId = taskSelect.getAttribute("data-table-id")
  const table = document.getElementById(tableId)
  const selectedIndex = taskSelect.selectedIndex - 1 // ajusta pra opção padrão

  if (selectedIndex >= 0) {
    table.deleteRow(selectedIndex)

    // adiciona espaço reservado se a tabela estiver vazia
    if (table.rows.length === 0) {
      const row = table.insertRow(-1)
      row.classList.add("placeholder")
      const cell = row.insertCell(0)
      cell.textContent = "Nenhuma tarefa adicionada"
      table.setAttribute(
        "data-placeholder",
        `Adicione sua primeira tarefa à ${
          tableId === "dayTasks" ? "Dia" : "Noite"
        }`
      )
    }

    taskSelect.style.display = "none"
    document.getElementById("confirmRemove").style.display = "none"
    isTaskSelectVisible = false
    const timeOfDay = tableId === "dayTasks" ? "Dia" : "Noite"
    alert(`Tarefa removida com sucesso do ${timeOfDay}`)
  }
}

// inicializa espações reservados com atributos de dados para efeito de foco
document
  .getElementById("dayTasks")
  .setAttribute("data-placeholder", "Adicione sua primeira tarefa ao Dia")
document
  .getElementById("nightTasks")
  .setAttribute("data-placeholder", "Adicione sua primeira tarefa à Noite")

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("removeTaskDay")
    .addEventListener("click", function () {
      lastClickedButton = "day"
      showRemoveTaskOptions("day")
    })
  document
    .getElementById("removeTaskNight")
    .addEventListener("click", function () {
      lastClickedButton = "night"
      showRemoveTaskOptions("night")
    })

  const linkAddDay = document.getElementById("linkAddDay")
  const linkAddNight = document.getElementById("linkAddNight")
  const btnDeleteTasks = document.getElementById("btnDeleteTasks")
  const btnSendFeedback = document.getElementById("btnSendFeedback")

  linkAddDay.addEventListener("click", function (event) {
    event.preventDefault()
    const task = prompt("Digite a tarefa a ser adicionada ao dia:")
    if (task !== null && task.trim() !== "") {
      addTaskToTable("dayTasks", task)
    }
  })

  linkAddNight.addEventListener("click", function (event) {
    event.preventDefault()
    const task = prompt("Digite a tarefa a ser adicionada à noite:")
    if (task !== null && task.trim() !== "") {
      addTaskToTable("nightTasks", task)
    }
  })

  btnDeleteTasks.addEventListener("click", function (event) {
    event.preventDefault()
    if (
      confirm(
        "Tem certeza que deseja apagar os registros de tarefas realizadas?"
      )
    ) {
      localStorage.clear() // limpa os dados do localStorage
      location.reload() // recarrega a página
    }
  })

  btnSendFeedback.addEventListener("click", function (event) {
    event.preventDefault()
    const feedback = prompt("Digite sua dúvida ou sugestão:")
    if (feedback !== null && feedback.trim() !== "") {
      alert("Mensagem enviada com sucesso!")
    }
  })
})

function addTaskToTable(tableId, task) {
  const table = document.getElementById(tableId)
  const placeholder = table.querySelector(".placeholder")
  if (placeholder) {
    placeholder.remove()
  }
  const row = table.insertRow(-1)
  const cell = row.insertCell(0)
  cell.textContent = task
}
