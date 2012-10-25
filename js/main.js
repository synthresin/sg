(function($) {
	$(document).ready(function() {
		var storygramController;

		storygramController = new SUStorygramController({view: $('#su-storygram-view')});
		storygramController.init();
	});
})(jQuery);