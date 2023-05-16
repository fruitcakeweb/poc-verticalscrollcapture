// only apply this on load because we need to wait for images to be loaded
$(window).on('load', () => {
  $('.vertical-scroll-capture').each(function() {
    const $capture = $(this);
    const $wrapper = $capture.find('.scroll--wrapper');
    const $content = $wrapper.find('.scroll--content');

    let scrollCapture = () => {
      const contentWidth = $content.outerWidth();
      const wrapperWidth = $wrapper.outerWidth();

      // do we even need to scroll capture?
      if (contentWidth > wrapperWidth) {
        // the amount to scroll horizontally
        const scrollMaximum = contentWidth - wrapperWidth;

        // the capture offset from the top of the viewport
        const scrollOffset = window.scrollY - $capture.offset().top;

        // set capture element total height to content width (and adjust for difference in wrapper width and height)
        $capture.css('height', (contentWidth + $wrapper.outerHeight() - wrapperWidth) + 'px');

        // clip the scrollOffset between 0 and scrollMaximum
        let clippedScrollOffset = Math.max(0, Math.min(scrollOffset, scrollMaximum));

        // apply the current scroll offset via CSS variable to the content
        $content.css('--scroll', clippedScrollOffset + 'px');
      }
    };

    window.addEventListener('scroll', scrollCapture, {
      passive: true,
    });

    window.addEventListener('resize', scrollCapture, {
      passive: true,
    });
  });
});
