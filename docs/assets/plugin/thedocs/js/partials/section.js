
/**
 *
 */

+function($){

  page.initSection = function() {

    // Collapsable
    //
    $('.section-collapsable.show .section-content').css('display', 'block');
    $(document).on('click', '.section-collapsable .section-title', function() {
      $(this).next('.section-content').slideToggle();
      $(this).closest('.section-collapsable').toggleClass('show');
    });

  }

}(jQuery);

