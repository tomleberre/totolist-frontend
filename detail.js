let tacheId = new URLSearchParams(window.location.search).get("id")

fetch("http://localhost:3000/todos")
    .then(response => response.json())
    .then(taches => {
        let todolist = taches[0].todolist
        let tache = todolist.find(t => t.id == tacheId)
        let detail = document.getElementById("detailTache")

        let statusBadge = tache.is_complete
            ? '<span class="badge badge--success badge--dot">Terminée</span>'
            : '<span class="badge badge--warning badge--dot">À faire</span>'

        let dateStr = "Date inconnue"
        if (tache.created_at) {
            dateStr = new Date(tache.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })
        }

        detail.innerHTML = `
            <div class="card" style="animation: scaleIn 0.3s both;">
                <div class="card__header">
                    <div>
                        <h2 class="card__title text-lg">${tache.text}</h2>
                        <p class="card__description">Créée le ${dateStr}</p>
                    </div>
                    ${statusBadge}
                </div>
                <div class="card__body">
                    <div id="detailActions" class="detail-actions"></div>
                </div>
            </div>
        `

        let boutonTerminer = document.createElement("button")
        boutonTerminer.className = tache.is_complete ? "btn btn--secondary" : "btn btn--success"
        boutonTerminer.textContent = tache.is_complete ? "Réouvrir la tâche" : "Marquer comme terminée"

        let boutonSupprimer = document.createElement("button")
        boutonSupprimer.className = "btn btn--danger"
        boutonSupprimer.textContent = "Supprimer"

        let actionsEl = document.getElementById("detailActions")
        actionsEl.appendChild(boutonTerminer)
        actionsEl.appendChild(boutonSupprimer)

        boutonSupprimer.addEventListener("click", () => {
            fetch(`http://localhost:3000/todos/${tacheId}`, { method: "DELETE" })
                .then(() => { window.location.assign("taches.html") })
        })

        boutonTerminer.addEventListener("click", () => {
            fetch(`http://localhost:3000/todos/${tacheId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_complete: !tache.is_complete })
            }).then(() => { window.location.assign("taches.html") })
        })
    })
