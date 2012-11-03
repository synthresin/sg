SUStorySlide = (function($) {
	function SUStorySlide(params) {
		this.view = params.view;
		this.param = params.param;
		this.main_object = params.view.find('.main-object');
		this.texts = {};
		
	}
	
	SUStorySlide.prototype = {
		init: function() {
			//console.log(this.view.attr('class') + ' ready!');
			this.parse_data();
		},

		activate: function() {
			this.undraw();
			//console.log(this.view.attr('class') + ' activated!');
			this.view.show();
			this.draw();

		},

		deactivate: function() {
			this.activated = false;
			//console.log(this.view.attr('class') + ' deactivated!');
			this.view.hide();
		},

		parse_data: function() {
			$.ajax({
				url: 'http://sunshineunderground.kr/sample' + this.param +'.json',
				dataType: 'json',
				type: 'GET',
				context: this,
				success: this.request_success,
				error: function (request, status, error) { alert(status); }
			});
		},
		request_success: function(data, textStatus, jqXHR) {
			
			for(var i = 0; i < data.length; i++) {
				var pic = $('<div></div>').addClass('story-element').addClass('num-' + i);
				// DOM 에 붙이기
				pic.appendTo(this.main_object);
				
				var l = parseInt(pic.css('left'), 10);
				var t = parseInt(pic.css('top'), 10);
				var w = parseInt(pic.css('width'), 10);
				var h = parseInt(pic.css('height'), 10);
				
				if(data[i].my == true) {					
					// 태그 생성후, 같은 클래스 붙이고, 해당 css 적용시키기, 그후에 실제로 붙이기
					$('<div></div>').addClass('my-story num-' + i).css( {left: l + w/2 , top: t - 30}).appendTo(this.main_object);
				}
				
				var textbox = $('<div></div>').addClass('textbox');

				var author = $('<h4></h4>').html(data[i].author).appendTo(textbox);
				var text = $('<p></p>').html(data[i].text).appendTo(textbox);
				var arrow = $('<div></div>').addClass('textbox-arrow').appendTo(textbox);
				
				textbox.addClass('num-' + i).css( {left: l + w/2 , top: t + h + 6}).appendTo(this.main_object);
				
				this.texts['num-' + i] = textbox;
			}
			
			$('.story-element').hover(_.bind(function(ev) {
				var cArray = $(ev.target).attr('class').split(' ');
				var c = cArray[cArray.length - 1];
				this.texts[c].show();
			}, this), _.bind(function(ev) {
				var cArray = $(ev.target).attr('class').split(' ');
				var c = cArray[cArray.length - 1];
				this.texts[c].hide();
			}, this));
			
			this.draw();
			


			
			//this.main_object.find('.textbox').show();
		},

		
		draw: function() {
			this.main_object.find('.story-element, .my-story').each(function(idx, elem) {
				setTimeout(function() {
					$(elem).fadeIn(1000,function() {
						// 내 이야기면 반짝이도록 한다.
						if( $(elem).hasClass('my-story') ) {
						
							function repeatFunc(elem) {
								$(elem).fadeIn(1000, function() {
									$(elem).fadeOut(1000, function() {
										repeatFunc(elem);
									});
								});
							}
							repeatFunc(elem);
						}
					});
				}, idx * 50);
		});
		},
		
		undraw: function() {
			this.main_object.find('.story-element, .my-story').hide();
		}
	}
	
	return SUStorySlide;
})(jQuery);