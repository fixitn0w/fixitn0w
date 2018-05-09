document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

$("#modal-signup").click(function(){
  $("#signup").addClass('is-active');
});

$("#modal-login").click(function(){
  $("#login").addClass('is-active');
});

$(".delete2").click(function(){
  $("#signup").removeClass('is-active');
});

$(".delete2").click(function(){
  $("#login").removeClass('is-active');
});

$("#logout").click(function(){
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
});

$("#how").click(function(){
  $(".projects").hide(1000);
  $(".workers").hide(1000);
  $(".how").show(1000);
});

$("#projects").click(function(){
  $(".how").hide(1000);
  $(".workers").hide(1000);
  $(".projects").show(1000);
});

$("#workers").click(function(){
  $(".how").hide(1000);
  $(".projects").hide(1000);
  $(".workers").show(1000);
});

$( document ).ready(function() {
  $(".projects").hide();
  $(".workers").hide();
});

