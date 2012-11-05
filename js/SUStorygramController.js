SUStorygramController = (function($) {
	function SUStorygramController(params) {
		this.view = params.view;
		this.story_slides = [];
		this.selectors = [];
		this.current_slide;

	}
	
	SUStorygramController.prototype = {
		init: function() {
			// 각 스토리 받아서, 슬라이드 객체를 슬라이드 배열에 추가.
			this.view.find('.su-storyslide').each(_.bind(function(idx, elem) {
				var slide =  new SUStorySlide({ view: $(elem), param: idx }); // 각 슬라이드 객체 생성
				slide.init(); // 각 슬라이드 초기화
				this.story_slides.push(slide); // 슬라이드는 배열에 보관
			}, this));

			//this.story_slides[0].activate();
			this.change_slide(0);

			this.view.find('.su-storyslide-selector').each(_.bind(function(idx, elem) {
				$(elem).click(_.bind(function() {
					this.change_slide(idx);
				}, this));
			},this))
		},

		change_slide: function(idx) {

			// 버튼과 슬라이드가 동일하면, 아무것도 하지 않음
			if(this.current_slide === this.story_slides[idx]) {
				return;
			}

			if(this.current_slide != null) this.current_slide.deactivate(); // 현재 슬라이드가 비지 않았으면, 현재 슬라이드를 비활성화.

			this.current_slide = this.story_slides[idx]; // 현재 슬라이드 바꿈
			this.current_slide.activate(); // 현재 슬라이드 액티베이트
			//console.log('this.current_slide is ' + this.current_slide.view.attr('class'));
		}
			
	}
	
	return SUStorygramController;
})(jQuery);




