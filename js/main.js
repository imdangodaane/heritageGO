$(document).ready(function () {
    // Fetch list of photos here and use Jquery to render it dynamically.
   mHeritageGoService.getPhotos().then(photos => {
      for(let i in photos){
        let photoId = photos[i];
        mHeritageGoService.getPhoto(photoId).then(res => {
          console.log(res);
          let idSection = "section-" + i;
          $("#main-content").append('<section class="section" id="'+idSection+'">');
          $("#"+idSection).append('<aside class="section__aside-left"></aside>');
          $("#"+idSection).append(' <div class="post">\n' +
                  '        <div class="post__title">\n' +
                  '          <img class="post__title__avatar" src="http:'+res.account.picture_url+'" />\n' +
                  '          <div class="post__title__information">\n' +
                  '            <div class="post__title__information__caption">\n' +
                  '              <span style="font-weight: 500; font-size: 18px">'+ res.title[0].content + '</span>\n' +
                  '              <i class="fas fa-language fa-lg post__title__information__translate-icon"></i>\n' +
                  '            </div>\n' +
                  '            <div class="post__title__information__location">\n' +
                  '              <i class="fas fa-map-marker-alt"></i><span style="margin-left: 5px;">' + res.area_name + '</span>\n' +
                  '              <i class="far fa-clock" style="margin-left: 20px;"></i><span style="margin-left: 5px;">' + parseInt(res.creation_time) + '</span>\n' +
                  '            </div>\n' +
                  '          </div>\n' +
                  '        </div>' +
                  '<div class="post__image">\n' +
                  '          <img src="http:'+ res.image_url +'?size=large" />\n' +
                  '        </div>\n' +
                  '        <div class="post__interact">\n' +
                  '          <div class="post__interact__user-react">\n' +
                  '            <i class="fas fa-heart fa-lg"></i><strong style="margin-left: 5px;">0</strong>\n' +
                  '            <i class="fas fa-comment fa-lg" style="margin-left: 30px;"></i></i><strong style="margin-left: 5px;">0</strong>\n' +
                  '            <i class="fas fa-camera fa-lg" style="margin-left: 30px;"></i><strong style="margin-left: 5px;">0</strong>\n' +
                  '          </div>\n' +
                  '          <i class="fas fa-bookmark fa-lg" style="margin-right: 1rem; margin-bottom: 1rem;"></i>\n' +
                  '        </div>\n' +
                  '        <!-- <hr class="mb-4"> -->\n' +
                  '        <div class="post__comment">\n' +
                  '          <div class="input-wrapper post__comment__input">\n' +
                  '            <input type="text" placeholder=" Write a comment">\n' +
                  '          </div>\n' +
                  '          <i class="fab fa-telegram-plane" style="margin-right: 30px; color: rgba(0, 0, 0, 0.3);"></i>\n' +
                  '        </div>\n' +
                  '      </div>');
          $("#"+idSection).append('<aside class="section__aside-right"></aside>');
        }).catch(error => {
            console.log(error);
        })
      }
    }).catch(error => {
        console.log(error);
        alert("There are errors. Try again!")
   })
});
