fetch("http://localhost:3000/todos")
    .then(response => response.json())
    .then(taches => {
        let listeTaches = document.getElementById("listeTaches")
        let todolist = taches[0].todolist

        for (let i = 0; i < todolist.length; i++) {
            let div = document.createElement("div")
            div.textContent = todolist[i].text

            let bouton = document.createElement("button")
            bouton.textContent = "Voir détails"
            bouton.addEventListener("click", () => {
                window.location.assign("detail.html?id="+todolist[i].id)
            })

            div.appendChild(bouton)
            listeTaches.appendChild(div)
        }
    })