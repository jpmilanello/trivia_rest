define([
  'jquery',
], function($){
    $('aside').on('click','.aside-opened',function () {
      $(this).removeClass('aside-opened').addClass('aside-closed');
      $('aside').css({width:"50px"});
      $('.page').css({width:"calc(100% - 50px)"});
      $(this).css({transform: 'rotate(180deg)'}); 
    });

    $('aside').on('click','.aside-closed',function () {
      $(this).removeClass('aside-closed').addClass('aside-opened');
      $('aside').removeAttr("style");
      $('.page').removeAttr("style");
      $(this).css({transform: 'rotate(0deg)'}); 
    });
});

