function fetchData(options) {
    return mHeritageGoService.getPhotos(options);
}

function renderPhotos(options, photos){
    for (let i in photos) {
        let photoId = photos[i];

        let idSection = "section-" + (options.offset + parseInt(i));
        $("#sample_section").clone().prop({
            "hidden": false,
            "id": idSection
        }).appendTo(["#main-content", "#main-content-blurred"]);
        mHeritageGoService.getPhoto(photoId).then(res => {
            let titlePart = "#" + idSection + " > .post > .post__title";
            let imagePart = "#" + idSection + " > .post > .post__image";

            $(titlePart + " > .post__title__avatar").prop("src", "http:" + res.account.picture_url);
            $(titlePart + " > .post__title__information > .post__title__information__caption > span").text(res.title[0].content);
            $(titlePart + " > .post__title__information > .post__title__information__location > #location").text(res.area_name);
            $(titlePart + " > .post__title__information > .post__title__information__location > #date").text(parseInt(res.creation_time));

            $(imagePart + " > img").prop("src", "http:" + res.image_url + "?size=large");

        }).catch(error => {
            console.log(error);
        });
    }
}


function canLoadMore(options){
    let one = document.getElementById("section-" + (options.offset));
    let two = document.getElementById("section-" + (options.offset + 1));
    if(one && two){
        return true;
    }else{
        return false;
    }
}

function blurHeader() {
  var content = $('#main-content'), header = $('#blur-header');
  // $(content).clone().prop("id", "main-content-blurred").prependTo(header).addClass("blurred");
  // $(header).addClass("blurred");
  // $(header).children().replaceWith($(content).children().clone());
  // $(content).children().clone().appendTo(header);
  // $('#main-content-blurred').replaceWith($(content).clone().prop("id", "main-content-blurred").addClass("blurred"));
  // $(content).clone().prependTo(header).addClass('blurred');
  $('#main-content-blurred').addClass('blurred');
}

$(document).ready(function () {
    // Fetch list of photos here and use Jquery to render it dynamically.
    let loadFinish = true;
    let options = {offset: 0, limit: 2};
    let api = fetchData(options);
    api.then(res => {
        renderPhotos(options, res);
    });
    $(window).scroll(function () {
        if($(window).scrollTop() == $(document).height() - $(window).height() && $(window).scrollTop() != 0 && canLoadMore(options)){
            options.offset += options.limit;
            api = fetchData(options);
            api.then(res => {
                renderPhotos(options, res);
            })
        }
    });
    // Blur header
    blurHeader();
    $(document).scroll(function(){
      var scroll = $(this).scrollTop();
      $('.blurred').css({
        '-webkit-transform' : 'translateY(-'+scroll+'px)',
        'transform' : 'translateY(-'+scroll+'px)'
      });
    })
});
