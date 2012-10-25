SUStorySlide = (function($) {
	function SUStorySlide(params) {
		this.view = params.view;
		this.ajax_url = params.url;
		this.main_object = params.view.find('.main-object');
		this.objects = [];
		
	}
	
	SUStorySlide.prototype = {
		init: function() {
			console.log(this.view.attr('class') + ' ready!');
			this.parse_data();
		},

		activate: function() {
			console.log(this.view.attr('class') + ' activated!');
			this.view.show();

		},

		deactivate: function() {
			console.log(this.view.attr('class') + ' deactivated!');
			this.view.hide();
		},

		parse_data: function() {
			$.ajax({
				url: 'http://sunshineunderground.kr/sample.json',
				dataType: 'json',
				type: 'GET',
				success: this.request_success
			});
		},
		request_success: function(data, textStatus, jqXHR) {
			console.log(data.length);
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