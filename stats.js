fetch("http://localhost:3000/todos")
    .then(response => response.json())
    .then(taches => {
        let todolist = taches[0].todolist
        
        let total = todolist.length
        let terminees = todolist.filter(t => t.is_complete === true).length
        let afaire = todolist.filter(t => t.is_complete === false).length
        
        document.getElementById("total").textContent = total
        document.getElementById("terminees").textContent = terminees
        document.getElementById("afaire").textContent = afaire
    })