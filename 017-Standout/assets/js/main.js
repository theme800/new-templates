 
(function($) {

	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				offsetY: -20,
				offsetX: -1,
				mode: 'fade',
				alignment: 'center',
				noOpenerFade: true
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Slider.
			var $slider = $('#slider');
			if ($slider.length > 0) {

				$slider.slidertron({
					mode: 'fade',
					seamlessWrap: false,
					viewerSelector: '.viewer',
					speed: 'slow',
					autoFit: true,
					autoFitAspectRatio: (1200 / 635),
					reelSelector: '.viewer .reel',
					slidesSelector: '.viewer .reel .slide',
					advanceDelay: 5000,
					speed: 'slow',
					navPreviousSelector: '.previous-button',
					navNextSelector: '.next-button',
					indicatorSelector: '.indicator ul li',
					slideLinkSelector: '.link',
					captionLines: 1,
					captionLineSelector: '.captionLine',
					slideCaptionSelector: '.caption'
				});

				$window
					.on('resize load', function() {
						$slider.trigger('slidertron_reFit');
					})
					.trigger('resize');

			}

	// Portfolio.
		var $portfolio = $('#portfolio');
		if ($portfolio.length > 0) {

			var _settings;

			$portfolio.rotatorrr({
				titlesSelector: '.titles li',
				slidesSelector: '.category'
			});

			if (skel.breakpoint('mobile').active) {

				$portfolio.find('.button-top').click(function(e) {
					_bh.animate({ scrollTop: $portfolio.offset().top - 60 }, 800, 'swing');
					return false;
				});

				_settings = {
					baseZIndex: 100000,
					usePopupCaption: true,
					overlayOpacity: 0.8,
					useBodyOverflow: false,
					usePopupCloser: false,
					popupPadding: 0,
					windowMargin: 5,
					popupCaptionHeight: 40,
					popupSpeed: 0,
					fadeSpeed: 0,
					overlayClass: 'poptrox-overlay skel-layers-fixed'
				};

			}
			else
				_settings = {
					baseZIndex: 100000,
					usePopupCaption: true,
					overlayOpacity: 0.8,
					useBodyOverflow: false,
					usePopupCloser: false,
					overlayClass: 'poptrox-overlay skel-layers-fixed'
				};

			$portfolio.find('.category').each(function() {
				$(this).poptrox(_settings);
			});

		}
	});

})(jQuery);