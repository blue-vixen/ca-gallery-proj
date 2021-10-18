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
        <a class="portfolio-link" data-toggle="modal" onclick="renderModal('${proj.id}')" href="#portfolioModal1">
      <div class="portfolio-hover">
      <div class="portfolio-hover-content">
      <i class="fa fa-star fa-3x"></i>
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

function renderModal(projId) {
  var clickedProj = getProjectById(projId);
  var strHtmls = `<h2>${clickedProj.name}</h2>
  <p class="item-intro text-muted">${clickedProj.title}</p>
  <img class="img-fluid d-block mx-auto" src="img/portfolio/${clickedProj.id}.png" alt="">
  <p>${clickedProj.desc}</p>
  <ul class="list-inline">
    <li>Date: ${clickedProj.publishedAt}</li>
  </ul> 
  <a class="btn btn-primary" href="${clickedProj.url}" target="_blank"><i class="fa fa-play"></i>
  Check it out!</a>
  <button class="btn btn-primary" data-dismiss="modal" type="button">
  <i class="fa fa-times"></i>
  Close Project</button>`
  $('.modal-body').html(strHtmls);
}

function getProjects() {
  return gProjects;
}


function onSubmitForm() {
  var elEmail = $('.contact-email').val();
  var elSubj = $('.contact-subj').val();
  var elMsg = $('.contact-msg').val();
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${elEmail}&su=${elSubj}&body=${elMsg}`);
}