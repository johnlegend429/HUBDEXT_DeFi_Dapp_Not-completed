window.triggerSlider = () => {
  setTimeout(function () {
    $(".sc-carousel").each(function () {
      var owlCarousel = $(this),
        loop = owlCarousel.data("loop"),
        items = owlCarousel.data("items"),
        margin = owlCarousel.data("margin"),
        stagePadding = owlCarousel.data("stage-padding"),
        autoplay = owlCarousel.data("autoplay"),
        autoplayTimeout = owlCarousel.data("autoplay-timeout"),
        smartSpeed = owlCarousel.data("smart-speed"),
        dots = owlCarousel.data("dots"),
        nav = owlCarousel.data("nav"),
        navSpeed = owlCarousel.data("nav-speed"),
        xsDevice = owlCarousel.data("mobile-device"),
        xsDeviceNav = owlCarousel.data("mobile-device-nav"),
        xsDeviceDots = owlCarousel.data("mobile-device-dots"),
        smDevice = owlCarousel.data("ipad-device"),
        smDeviceNav = owlCarousel.data("ipad-device-nav"),
        smDeviceDots = owlCarousel.data("ipad-device-dots"),
        smDevice2 = owlCarousel.data("ipad-device2"),
        smDeviceNav2 = owlCarousel.data("ipad-device-nav2"),
        smDeviceDots2 = owlCarousel.data("ipad-device-dots2"),
        mdDevice = owlCarousel.data("md-device"),
        centerMode = owlCarousel.data("center-mode"),
        HoverPause = owlCarousel.data("hoverpause"),
        mdDeviceNav = owlCarousel.data("md-device-nav"),
        mdDeviceDots = owlCarousel.data("md-device-dots");
      owlCarousel.owlCarousel({
        loop: loop ? true : false,
        items: items ? items : 4,
        lazyLoad: true,
        center: centerMode ? true : false,
        autoplayHoverPause: HoverPause ? true : false,
        margin: margin ? margin : 0,
        //stagePadding: (stagePadding ? stagePadding : 0),
        autoplay: autoplay ? true : false,
        autoplayTimeout: autoplayTimeout ? autoplayTimeout : 1000,
        smartSpeed: smartSpeed ? smartSpeed : 250,
        dots: dots ? true : false,
        nav: nav ? true : false,
        navText: [
          "<i class='flaticon flaticon-left-arrow'></i>",
          "<i class='flaticon flaticon-right-arrow'></i>",
        ],
        navSpeed: navSpeed ? true : false,
        responsiveClass: true,
        responsive: {
          0: {
            items: xsDevice ? xsDevice : 1,
            nav: xsDeviceNav ? true : false,
            dots: xsDeviceDots ? true : false,
            center: false,
          },
          768: {
            items: smDevice2 ? smDevice2 : 2,
            nav: smDeviceNav2 ? true : false,
            dots: smDeviceDots2 ? true : false,
            center: false,
          },
          992: {
            items: smDevice ? smDevice : 3,
            nav: smDeviceNav ? true : false,
            dots: smDeviceDots ? true : false,
            center: false,
          },
          1025: {
            items: mdDevice ? mdDevice : 4,
            nav: mdDeviceNav ? true : false,
            dots: mdDeviceDots ? true : false,
          },
        },
      });
    });
  }, 1000);
};
window.startLoading = () => { 
  $(".loader_first").fadeIn(); 
}; 
 
window.stopLoading = () => { 
  $(".loader_first").fadeOut(); 
};