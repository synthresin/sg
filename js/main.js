(function($) {
	$(document).ready(function() {
		
		// json 받은 갯수만큼 렌더링하게 바꿔야 함.

		// 필요없는 오리지널 요소는 가리기.
		var original = $('.story-element').hide();

		for(var i = 0; i < 50; i++) {
			// 임의로 스토리 오브젝트 생성
			var clone = original.clone().addClass('num-' + i);
			
			// 임의로 자기글, 혹은 새글 끼워넣기.
			if(i == 19) {
				clone.addClass('my').append('<div class="my-story"></div>');
			}
			// DOM 에 붙이기
			clone.appendTo('.su-storyslide.story-0 .main-object');
			
		}

		$('.story-element').hover(function() {
			//$(this).appendTo($(this).parent());
			$('.story-element').not(this).each(function(idx, elem) {
					$(elem).prependTo($(elem).parent());	
			});
			$(this).find('.textbox').dequeue().fadeIn(300);	
		}, function() {
			$(this).find('.textbox').dequeue().fadeOut(300);	
		});

		$('.story-element').hide();
		$('.story-element').each(function(idx, elem) {
			setTimeout(function() {
				$(elem).fadeIn(1000, function() {
					if( $(elem).hasClass('my') ) {

						function repeatFunc(elem) {
							elem.fadeOut(1000, function() {
								elem.fadeIn(1000, function() {
									repeatFunc(elem);
								});
							});
						}

						//repeatFunc($(elem));
					}
				});
			}, idx * 50);
		});
	});
})(jQuery);