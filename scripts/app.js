// simplify access to the X3D element
var element;
var debug = false;
var pick_mode_info;
var nav_mode_info;
var ab_info;

function init(){
	
	element = $('#the_element').get(0);
	updateAbInfo('Viewpoint');
	updateNavInfo();
	// toggleDebug();
}

function updateNavInfo(){
	
	$('#nav_mode_info').html( element.runtime.navigationType() );
}

function updateAbInfo( typeName ){
	
	var bindable = element.runtime.getActiveBindable( typeName );
	$('#ab_info').html( bindable.tagName + " / " + bindable.getAttribute('description') );
}

function toggleStats(){
	
	if( element.runtime.statistics() ){
		
		element.runtime.statistics(false);
		$('a[ref="stats"]').html('Show stats');
		
	} else {
		
		element.runtime.statistics(true);
		$('a[ref="stats"]').html('Hide stats');
	}
}

function toggleDebug(){
	
	if( debug ){
		
		element.runtime.debug(false);
		$('a[ref="debug"]').html('Show debug');
		
	} else {
		
		element.runtime.debug(true);
		$('a[ref="debug"]').html('Hide debug');
	}
	
	debug = !debug
}

function objClick( obj ){
	
	alert(obj.tagName);
}

$(document).ready( function(){	
	
	var currentColor = {r:240,g:240,b:240};
	
	$('#colorSelector').ColorPicker({
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			$('#body_color').attr( 'diffuseColor', currentColor.r/255 + ' ' + currentColor.g/255 + ' ' + currentColor.b/255 );
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$('#colorSelector div').css('backgroundColor', '#' + hex);
			currentColor = rgb;
		}
	});

	$('#viewpoint').change( function(){

		$('#' + $(this).val()).attr( 'set_bind', 'true' );
	});
	
	$('.roda').click( function(){
		
		$('#roda_tex').attr( 'url', $(this).attr( 'src' ) );
	});
	
	$('#menu').css( 'width', $('#menu').attr('width') );
	$('#the_element').attr( 'width', window.innerWidth - $('#menu').attr('width') - 20 ).attr( 'height', window.innerHeight );
});