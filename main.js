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
        const wrapperHeight = $wrapper.outerHeight();

        // set capture element total height to content width
        const captureHeight = contentWidth - wrapperWidth;
        $capture.css('height', captureHeight + 'px');

        const captureOffsetTop = $capture.offset().top;
        const scrollPosition = window.scrollY;

        // the capture offset from the top of the viewport
        const topOffset = scrollPosition - captureOffsetTop;

        // the capture offset from the bottom of the viewport
        const bottomOffset = (captureHeight + captureOffsetTop - wrapperHeight - scrollPosition);

        // are we anywhere below the capture top?
        const belowTop = topOffset > 0;
        //  are we anywhere above the capture bottom?
        const aboveBottom = bottomOffset > 0;

        if (belowTop && aboveBottom) {
          // we need to add a fraction of the wrapper height so that once we are at the bottom, we are also all the way at the right
          const wrapperWidthFraction = wrapperHeight * (topOffset / (captureHeight - wrapperHeight));
          $content.css('--scroll', topOffset + wrapperWidthFraction + 'px');
        } else if (!belowTop)
          $content.css('--scroll', '0px');
        else if (!aboveBottom)
          $content.css('--scroll', captureHeight + 'px');
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
