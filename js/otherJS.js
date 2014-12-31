define([
  'jquery',
], function($){
    $('aside').on('click','.opened',function () {
      $(this).removeClass('opened').addClass('closed');
      $('aside').css({width:"50px"});
      $('.page').css({width:"calc(100% - 50px)"});
      $('p.tab').css({display:"none"});
      $('.div-tab').css({transform:"translateY(150px)"});
      $('h1').css({transform: 'rotate(-90deg) translateX(-150px)'});
      $(this).css({transform: 'rotate(180deg) translateY(-150px)'});

    });

    $('aside').on('click','.closed',function () {
      $(this).removeClass('closed').addClass('opened');
      $('aside').removeAttr("style");
      $('.page').removeAttr("style");
      $('p.tab').css({display:"inline-block"});
      $('.div-tab').css({transform:"translateY(0px)"});
      $('h1').css({transform: 'rotate(0deg) translateX(0px)'});
      $(this).css({transform: 'rotate(0deg) translateY(0px)'}); 
    });
});

