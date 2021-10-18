'use strict'

$(document).ready(init);

function init() {
    console.log('Starting up');
    renderGallery();
}

function renderGallery() {
    var projects = getProjects();
    var strHtmls = projects.map(function (proj) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
      <div class="portfolio-hover">
      <div class="portfolio-hover-content">
      <i class="fa fa-plus fa-3x"></i>
      </div>
      </div>
      <img class="img-fluid" src="${proj.img}" alt="">
      </a>
      <div class="portfolio-caption">
      <h4>${proj.name}</h4>
      <p class="text-muted">${proj.title}</p>
      </div>
      </div>`
    });
    $('.gallery').html(strHtmls);
}


function getProjects() {
    return gProjects;
}