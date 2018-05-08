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

$("#profilePhoto").click(function(){
  document.querySelector('#file').click();
});
