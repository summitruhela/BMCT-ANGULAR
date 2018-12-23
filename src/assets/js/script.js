$(function () {
	windowheight();
	$("#menu-toggle").click(function (e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});
	$('.dropdown').on('show.bs.dropdown', function () {
		$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
	});

	$('.dropdown').on('hide.bs.dropdown', function () {
		$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
	});

	$('.mybrand input').focus(function () {
		$(this).parents('.mybrand').addClass('hastext');
	});
	$('.mybrand input').blur(function () {
		if ($(this).val() == '') {
			$(this).parents('.mybrand').removeClass('hastext');
		}
	});         
   
	// $('.btn-primary.addoption').click(function () {
	// 	if ($('.variants .variantsoption .form-group').length <= 2) {
	// 		$(this).parents('.variants .variantsoption .form-group').after('<div class="form-group"><div class="variant_custom row clearfix"><div class="col-sm-3"><input class="form-control" type="text" value="Size" /></div><div class="col-sm-6"><input class="form-control" type="text" value="XS"   /></div><div class="col-sm-3"><button type="button" class="btn btn-primary removebtn">Remove</button></div></div></div>');
	// 	}
	// });

	// $(document).on('click', '.removebtn', function () {
	// 	$(this).parents('.variants .variantsoption .form-group').remove();
	// });

});
function windowheight() {
	$('.loginscreenwrap').css({ 'height': $(window).height() });
	$(window).resize(function () {
		$('.loginscreenwrap').css({ 'height': $(window).height() });
	});
}
