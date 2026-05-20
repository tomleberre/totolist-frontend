let form = document.getElementById("formPrenom")
let inputPrenom = document.getElementById("prenom")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    let prenom = inputPrenom.value
    if (prenom === "") {
        alert("Veuillez saisir votre prénom !")
    } else {
        localStorage.setItem("prenom", prenom)
        window.location.assign("taches.html")
    }
})