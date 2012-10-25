(function($) {
	$(document).ready(function() {
		function repeatFunc(elem) {
			$(elem).fadeIn(1000, function() {
				$(elem).fadeOut(1000, function() {
					repeatFunc(elem);
				});
			});
		}
		// json 받은 갯수만큼 렌더링하게 바꿔야 함.

		// 필요없는 오리지널 요소는 가리기.
		var original = $('.story-element').detach();
		var originaltext = $('.textbox').detach();

		//오브젝트 붙이기
		for(var i = 0; i < 42; i++) {
			// 임의로 스토리 오브젝트 생성
			var clone = original.clone().addClass('num-' + i);

			// DOM 에 붙이기
			clone.appendTo('.su-storyslide.story-0 .main-object');
		}

		//태그 붙이기
		for(var i = 0; i < 42; i++) {
			//해당 글이 마이 오브젝트인지 검출. 아니면 패스
			if(i == 7 || i == 4 || i == 9 ) {

				// 태그에 해당하는 오브젝트 알기
				var l = parseInt($('.story-element').filter('.num-' + i).css('left'), 10);
				var t = parseInt($('.story-element').filter('.num-' + i).css('top'), 10);

				// 태그 생성후, 같은 클래스 붙이고, 해당 css 적용시키기, 그후에 실제로 붙이기
				$('<div></div>').addClass('my-story num-' + i).css( {left: l , top: t - 20}).appendTo('.su-storyslide.story-0 .main-object');
			}
		}

		// 텍스트 붙이기
		for(var i = 0; i < 42; i++) {
			// 임의로 텍스트 오브젝트 생성
			var clonetext = originaltext.clone().addClass('num-' + i);

			// 텍스트에 해당하는 오브젝트 알기 & css 빼내기
			var l = parseInt($('.story-element').filter('.num-' + i).css('left'), 10);
			var t = parseInt($('.story-element').filter('.num-' + i).css('top'), 10);
			var h = parseInt($('.story-element').filter('.num-' + i).css('height'), 10);
			var w = parseInt($('.story-element').filter('.num-' + i).css('width'), 10);

			// DOM 에 붙이기
			clonetext.addClass('num-' + i).css( {left: l + w/2 , top: t + h + 6}).appendTo('.su-storyslide.story-0 .main-object');
		}


		// 액션 부여
		$('.story-element').hover(function() {
			//$(this).appendTo($(this).parent());
			var cArray = $(this).attr('class').split(' ');
			var c = cArray[cArray.length - 1];

			$('.textbox').filter('.' + c ).dequeue().fadeIn(300);	
		}, function() {
			var cArray = $(this).attr('class').split(' ');
			var c = cArray[cArray.length - 1];
			$('.textbox').filter('.' + c ).dequeue().fadeOut(300);	
		});





		$('.story-element').hide();

		var size = $('.story-element')
		$('.story-element').add('.my-story').each(function(idx, elem) {
			setTimeout(function() {
				$(elem).fadeIn(1000,function() {
					// 내 이야기면 반짝이도록 한다.
					if( $(elem).hasClass('my-story') ) {
						repeatFunc(elem);
					}
				});
			}, idx * 50);
		});
	});
})(jQuery);