let prenom = localStorage.getItem("prenom")
let welcomeEl = document.getElementById("welcomeMsg")
if (prenom && welcomeEl) {
    welcomeEl.textContent = `Bonjour ${prenom} \u{1F44B}`
}

fetch("https://totolist-backend-phi.vercel.app/todos")
    .then(response => response.json())
    .then(taches => {
        let listeTaches = document.getElementById("listeTaches")
        let todolist = taches[0].todolist

        let countEl = document.getElementById("taskCount")
        if (countEl) {
            countEl.textContent = `${todolist.length} tâche${todolist.length > 1 ? "s" : ""}`
        }

        for (let i = 0; i < todolist.length; i++) {
            let tache = todolist[i]

            let card = document.createElement("div")
            card.className = "task-card" + (tache.is_complete ? " task-card--done" : "")

            let checkbox = document.createElement("div")
            checkbox.className = "task-card__checkbox"
            if (tache.is_complete) {
                checkbox.innerHTML = '<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            }

            let text = document.createElement("span")
            text.className = "task-card__text"
            text.textContent = tache.text

            let arrow = document.createElement("span")
            arrow.className = "task-card__meta"
            arrow.textContent = "→"

            card.appendChild(checkbox)
            card.appendChild(text)
            card.appendChild(arrow)

            card.addEventListener("click", () => {
                window.location.assign("detail.html?id=" + tache.id)
            })

            listeTaches.appendChild(card)
        }

        if (todolist.length === 0) {
            let empty = document.createElement("div")
            empty.className = "empty-state"
            empty.innerHTML = `
                <div class="empty-state__icon">✓</div>
                <p class="empty-state__title">Aucune tâche</p>
                <p class="empty-state__description">Votre liste est vide. Ajoutez des tâches depuis votre API.</p>
            `
            listeTaches.appendChild(empty)
        }
    })
