SUStorygramController = (function($) {
	function SUStorygramController(params) {
		this.view = params.view;
		this.animate_duration = 2000;
		this.story_num;
		this.current_story;
		this.change_story;
		this.selectors = [];
		this.interval;


	}
	
	SUStorygramController.prototype = {
		init: function() {
			this.story_num = this.view.children('.slides').children('a').length;
			this.current_story = 1;
			this.view.children('.slides').children('a:eq(0)').fadeIn(this.animation_duration).css({display : "block" });;
			this.init_selector();
			if(this.story_num != 1) {
				this.interval = setInterval(_.bind(function() {
				this.change_story(this.current_story + 1);
				},this), 5000);
			}
			
		},
		
		init_selector: function() {
			//this.resize_selector();
			for( var i = 0; i < this.story_num; i++) {
				var selector = $('<div class="selector fl"></div>');
				this.selectors.push(selector);
				if (i == 0) selector.addClass('active');
				selector.appendTo(this.view.find('.slide-selectors'));
			}
			
			$.each(this.selectors, _.bind(function(idx, elem) { 
			   $(elem).click(_.bind(function(){
					this.change_story(idx + 1);
					if(this.story_num != 1) this.renew_interval();
				}, this));
			},this));
		},
		/*
resize_selector: function() {
		
			var width = 15 * this.story_num;
			var offset = width - 7 / 2 - 7;
			this.view.find('.slide-selectors').width(width);
			
			
		},
*/
		
		change_story: function(num) {
		
			if( num == this.current_story ) return;
			
			if ( num > this.story_num ) this.current_story = 1;
			else this.current_story = num;
			
			this.view.children('.slides').children('a').fadeOut(this.animation_duration);
			this.view.children('.slides').children('a:eq(' + (this.current_story - 1) + ')').fadeIn(this.animation_duration).css({display : "block" });
			this.view.children('.slide-selectors').children('.selector').removeClass('active');
			this.view.children('.slide-selectors').children('.selector:eq(' + (this.current_story - 1) + ')').addClass('active');
		},
		
		renew_interval: function() {
			window.clearInterval(this.interval);
			this.interval = setInterval(_.bind(function() {
					this.change_story(this.current_story + 1);
				},this), 5000);		
		}
		
	}
	
	return SUStorygramController;
})(jQuery);