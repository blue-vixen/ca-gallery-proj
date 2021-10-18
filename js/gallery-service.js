'use strict'

var gProjects = [
    {
        id: "minesweeper",
        name: "Minesweeper",
        title: "Watch your step!",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "projects/Minesweeper",
        publishedAt: formatted_date(),
        labels: ["Matrixes", "keyboard events"],
        img: "img/portfolio/minesweeper.png"
    },
    {
        id: "pacman",
        name: "Pacman",
        title: "Oldie but goldie",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "projects/PACMAN UPGRADE",
        publishedAt: formatted_date(),
        labels: ["Matrixes", "keyboard events"],
        img: "img/portfolio/pacman.png"
    },
    {
        id: "ball-board",
        name: "Ball Board",
        title: "Get those balls!",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "projects/ball-board",
        publishedAt: formatted_date(),
        labels: ["Matrixes", "keyboard events"],
        img: "img/portfolio/ball-board.png"
    },
]


function getProjectById(projId) {
    return gProjects.find(proj => projId === proj.id);

}

function formatted_date() {
    var result = "";
    var d = new Date();
    result += d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    return result;
}