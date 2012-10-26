SUStorySlide = (function($) {
	function SUStorySlide(params) {
		this.view = params.view;
		this.param = params.param;
		this.main_object = params.view.find('.main-object');
		this.pics = [];
		this.texts = [];
		
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
				context: this,
				success: this.request_success,
				error: function(a,b,c) {alert('error');}
			});
		},
		request_success: function(data, textStatus, jqXHR) {
			
			for(var i = 0; i < data.length; i++) {
				var pic = $('<div></div>').addClass('story-element').addClass('num-' + i);
				// DOM 에 붙이기
				pic.appendTo(this.main_object);
				this.pics.push(pic);
			}

			for(var i = 0; i < data.length; i++) {
			//해당 글이 나의 글인지 검출. 아니면 패스
				if(data[i].my == true) {

					// 태그에 해당하는 오브젝트 알기
					var o = $(this.main_object).find('.story-element').filter('.num-' + i);
					var l = parseInt(o.css('left'), 10);
					var t = parseInt(o.css('top'), 10);
					var w = parseInt(o.css('width'), 10);
					var h = parseInt(o.css('height'), 10);

					// 태그 생성후, 같은 클래스 붙이고, 해당 css 적용시키기, 그후에 실제로 붙이기
					$('<div></div>').addClass('my-story num-' + i).css( {left: l + w/2 , top: t - 30}).appendTo(this.main_object);
				}
			}

			for(var i = 0; i < data.length; i++) {
					
					var textbox = $('<div></div>').addClass('textbox');

					var author = $('<h4></h4>').html(data[i].author).appendTo(textbox);
					var text = $('<p></p>').html(data[i].text).appendTo(textbox);
					var arrow = $('<div></div>').addClass('textbox-arrow').appendTo(textbox);

					// 태그에 해당하는 오브젝트 알기
					var o = $(this.main_object).find('.story-element').filter('.num-' + i);
					var l = parseInt(o.css('left'), 10);
					var t = parseInt(o.css('top'), 10);
					var w = parseInt(o.css('width'), 10);
					var h = parseInt(o.css('height'), 10);

					// 태그 생성후, 같은 클래스 붙이고, 해당 css 적용시키기, 그후에 실제로 붙이기
					textbox.addClass('num-' + i).css( {left: l + w/2 , top: t + h + 6}).appendTo(this.main_object);
					this.texts.push(textbox);
			}

			// 동작 구동시키기
		
			

			this.main_object.find('.story-element').show();
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