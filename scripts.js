$(document).ready(function() {
  var images = [
    {image: '/images/angry-cat.jpg', caption: 'Our cat seems to have shredded all our computers... '},
    {image: '/images/cannot-choose.jpg', caption: 'We cannot choose one among these minimalist designs... '},
    {image: '/images/fresh-ideas.jpg', caption: 'We keep getting these fresh ideas about what to do... '},
    {image: '/images/funny-cats.jpg', caption: 'We kind of lost track of time watching funny cats... '},
    {image: '/images/getting-ready.jpg', caption: 'We cannot do a launch event with a mess of a hairdo... '},
    {image: '/images/new-computer.jpg', caption: 'We cannot for the life of us operate this computer... '},
    {image: '/images/new-perspective.jpg', caption: 'We are working on a revolutionary new perspective... '},
    {image: '/images/no-usb.jpg', caption: 'We cannot connect usb to this cam to get the pics out... '},
    {image: '/images/which-font.jpg', caption: 'Oh my god there are just too many fonts to choose from... '}
  ];
  var pick = Math.floor(Math.random() * images.length);
  var image = images[pick].image;
  var caption = images[pick].caption;

  function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = func;
    } else {
      window.onload = function() {
        if (oldonload) {
          oldonload();
        }
        func();
      }
    }
  }

  addLoadEvent(function(){
    outdatedBrowser({
      bgColor: '#f25648',
      color: '#ffffff',
      lowerThan: 'transform',
      languagePath: '/outdated/en.html'
    })
  });


  /* fix vertical when not overflow
   call fullscreenFix() if .fullscreen content changes */
  function fullscreenFix(){
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function(i){
      if($(this).innerHeight() <= h){
        $(this).closest(".fullscreen").addClass("not-overflow");
      }
    });
  }
  $(window).resize(fullscreenFix);
  fullscreenFix();

  /* resize background images */
  function backgroundResize(){
    var windowH = $(window).height();
    $(".background").each(function(i){
      var path = $(this);
      // variables
      var contW = path.width();
      var contH = path.height();
      var imgW = path.attr("data-img-width");
      var imgH = path.attr("data-img-height");
      var ratio = imgW / imgH;
      // overflowing difference
      var diff = parseFloat(path.attr("data-diff"));
      diff = diff ? diff : 0;
      // remaining height to have fullscreen image only on parallax
      var remainingH = 0;
      if(path.hasClass("parallax")){
        var maxH = contH > windowH ? contH : windowH;
        remainingH = windowH - contH;
      }
      // set img values depending on cont
      imgH = contH + remainingH + diff;
      imgW = imgH * ratio;
      // fix when too large
      if(contW > imgW){
        imgW = contW;
        imgH = imgW / ratio;
      }
      //
      path.data("resized-imgW", imgW);
      path.data("resized-imgH", imgH);
      path.css("background-size", imgW + "px " + imgH + "px");
    });
  }
  $(window).resize(backgroundResize);
  $(window).focus(backgroundResize);
  backgroundResize();

  console.log(image);
  console.log(caption);
  $('.image').attr('style', 'background-image: url(' + image + ') !important');
  $('.caption').text(caption);

});
