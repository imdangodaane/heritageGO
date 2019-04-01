// function () {
//   mHeritageGoServices.getPhotos()
// }
// $( "section" ).removeClass( "section" );

// $( "section" ).addClass( "section" );

// alert( "As you can see, the link no longer took you to jquery.com" );

function getPosts() {
  mHeritageGoService.getPhotos({limit: 5})
  .then(asd => { console.log(asd); })
  .catch(error => { console.log(error); });
}

getPosts();
