
/**
 *
 */

+function($){

  page.initFileTree = function() {

    $(document).on('click', '.file-tree li.is-file', function(e){
      e.stopPropagation();
    });

    $(document).on('click', '.file-tree li.is-folder', function(e){
      $(this).find('ul:first').slideToggle(400, function(){
        $(this).parent('li').toggleClass('open');
      });
      e.stopPropagation();
    });

  }

}(jQuery);
