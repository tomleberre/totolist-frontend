let tacheId = new URLSearchParams(window.location.search).get("id")

fetch("http://localhost:3000/todos")
    .then(response => response.json())
    .then(taches => {
        let todolist = taches[0].todolist
        let tache = todolist.find(t => t.id == tacheId)
        let detail = document.getElementById("detailTache")
detail.innerHTML = `
    <h2>${tache.text}</h2>
    <p>Statut : ${tache.is_complete ? "Terminée" : "À faire"}</p>
    <p>Créée le : ${tache.created_at}</p>
`
let boutonSupprimer = document.createElement("button")
boutonSupprimer.textContent = "Supprimer"

let boutonTerminer = document.createElement("button")
boutonTerminer.textContent = tache.is_complete ? "Réouvrir" : "Terminer"

detail.appendChild(boutonTerminer)
detail.appendChild(boutonSupprimer)
boutonSupprimer.addEventListener("click", () => {
    fetch(`http://localhost:3000/todos/${tacheId}`, {
        method: "DELETE"
    })
    .then(() => {
        window.location.assign("taches.html")
    })
})
boutonTerminer.addEventListener("click", () => {
    fetch(`http://localhost:3000/todos/${tacheId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_complete: !tache.is_complete })
    })
    .then(() => {
        window.location.assign("taches.html")
    })
})
    })