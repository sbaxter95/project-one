$('#easy').click(function (event){
	difficulty = 'easy';
	$('#header').html('Choose category');
	$('#easy').addClass('hide');
	$('#medium').addClass('hide');
	$('#hard').addClass('hide');
	$('#rw').removeClass('hide');
	$('#rt').removeClass('hide');
	$('#rc').removeClass('hide');
});