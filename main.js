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

        // set capture element total height to content width
        $capture.css('height', contentWidth + 'px');

        // clip the scrollOffset between 0 and scrollMaximum and apply
        $content.css('--scroll',
            Math.max(0, Math.min(scrollOffset, scrollMaximum)) + 'px');
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
