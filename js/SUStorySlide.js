SUStorySlide = (function($) {
	function SUStorySlide(params) {
		this.view = params.view;
		this.main_object = params.view.find('.main-object');
		this.objects = [];
	}
	
	SUStorySlide.prototype = {
		init: function() {
			console.log(this.view.attr('class') + ' ready!');
		},

		activate: function() {
			console.log(this.view.attr('class') + ' activated!');
			this.view.show();

		},

		deactivate: function() {
			console.log(this.view.attr('class') + ' deactivated!');
			this.view.hide();
		},

		repeatFunc: function(elem) {
			$(elem).fadeIn(1000, function() {
				$(elem).fadeOut(1000, function() {
					repeatFunc(elem);
				});
			});
		}
	}
	
	return SUStorySlide;
})(jQuery);