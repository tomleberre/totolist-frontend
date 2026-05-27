fetch("https://totolist-backend-phi.vercel.app/todos")
    .then(response => response.json())
    .then(taches => {
        let todolist = taches[0].todolist

        let total     = todolist.length
        let terminees = todolist.filter(t => t.is_complete === true).length
        let afaire    = todolist.filter(t => t.is_complete === false).length

        document.getElementById("total").textContent     = total
        document.getElementById("terminees").textContent = terminees
        document.getElementById("afaire").textContent    = afaire

        let isDark = !window.matchMedia("(prefers-color-scheme: light)").matches

        new Chart(document.getElementById("monGraphique"), {
            type: "bar",
            data: {
                labels: ["Terminées", "À faire"],
                datasets: [{
                    data: [terminees, afaire],
                    backgroundColor: [
                        "rgba(34, 197, 94, 0.15)",
                        "rgba(245, 158, 11, 0.15)"
                    ],
                    borderColor: ["#22c55e", "#f59e0b"],
                    borderWidth: 1.5,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: isDark ? "#18181b" : "#ffffff",
                        borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                        borderWidth: 1,
                        titleColor: isDark ? "#fafafa" : "#09090b",
                        bodyColor: isDark ? "#a1a1aa" : "#52525b",
                        padding: 10,
                        cornerRadius: 8
                    }
                },
                scales: {
                    x: {
                        grid: { color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" },
                        ticks: {
                            color: isDark ? "#71717a" : "#a1a1aa",
                            font: { family: "'Inter', sans-serif", size: 12 }
                        },
                        border: { color: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }
                    },
                    y: {
                        grid: { color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" },
                        ticks: {
                            color: isDark ? "#71717a" : "#a1a1aa",
                            font: { family: "'Inter', sans-serif", size: 12 },
                            precision: 0
                        },
                        border: { color: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" },
                        beginAtZero: true
                    }
                }
            }
        })
    })
