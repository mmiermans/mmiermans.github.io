/*
	HTML5 UP theme customizations
	Mathijs Miermans
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

/*********************************************************************************/
/* Effects                                                                       */
/*********************************************************************************/
$( document ).ready( function() {
  
  // Toggle visibility of an individual text field.
  $( ".readmore" ).click(function() {
    $(this).closest("article").find(".readmore-content").slideToggle("slow");
    var icon = $(this).find(".fa");
    icon.toggleClass("fa-plus-square");
    icon.toggleClass("fa-minus-square");
  });
  
  // Toggle visibility of all text fields.
  $( ".expand-all" ).click(function() {
    var readmoreIcons = $(".readmore .fa");
    var readmoreContent = $("article .readmore-content");
    var expandallIcon = $("#expand-all-icon a");
    
    if (expandallIcon.hasClass("fa-plus-square")) {
      readmoreContent.slideDown("slow");
      readmoreIcons.addClass("fa-minus-square");
      readmoreIcons.removeClass("fa-plus-square");
      $("#expand-all-link").text("Hide all");
    } else {
      readmoreContent.slideUp("slow");
      readmoreIcons.removeClass("fa-minus-square");
      readmoreIcons.addClass("fa-plus-square");
      $("#expand-all-link").text("Expand all");
    }

    expandallIcon.toggleClass("fa-plus-square");
    expandallIcon.toggleClass("fa-minus-square");
  });
  
});