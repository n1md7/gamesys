var defaultModal = modal({
  text: 'my content is here',
  title:' my modal is here'
}).show(function (  ) {
  console.log(this, 'first modal shown')
}).on.confirm(function (  ) {
  console.log('confirmed');
}).hide(function (  ) {
  console.log('canceled/hide');
});
