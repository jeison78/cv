////////////Lo que debo aprender
(function ($) {
  "use strict";
  function portfolio_init() {
    var portfolio_grid = $(".portfolio-grid"),
      portfolio_filter = $(".portfolio-filters");
    if (portfolio_grid) {
      portfolio_grid.shuffle({ speed: 450, itemSelector: "figure" });
      portfolio_filter.on("click", ".filter", function (e) {
        portfolio_grid.shuffle("update");
        e.preventDefault();
        $(".portfolio-filters .filter").parent().removeClass("active");
        $(this).parent().addClass("active");
        portfolio_grid.shuffle("shuffle", $(this).attr("data-group"));
      });
    }
  }
  //////////Por ahora
  function mobileMenuHide() {
    var windowWidth = $(window).width(),
      siteHeader = $("#site_header");
    if (windowWidth < 1025) {
      siteHeader.addClass("mobile-menu-hide");
      $(".menu-toggle").removeClass("open");
      setTimeout(function () {
        siteHeader.addClass("animate");
      }, 500);
    } else {
      siteHeader.removeClass("animate");
    }
  }
  function customScroll() {
    var windowWidth = $(window).width();
    if (windowWidth > 1024) {
      $(".animated-section, .single-page-content").each(function () {
        $(this).perfectScrollbar();
      });
    } else {
      $(".animated-section, .single-page-content").each(function () {
        $(this).perfectScrollbar("destroy");
      });
    }
  }
  $(function () {
    $("#contact_form").validator();
    $("#contact_form").on("submit", function (e) {
      if (!e.isDefaultPrevented()) {
        var url = "contact_form/contact_form.php";
        $.ajax({
          type: "POST",
          url: url,
          data: $(this).serialize(),
          success: function (data) {
            var messageAlert = "alert-" + data.type;
            var messageText = data.message;
            var alertBox =
              '<div class="alert ' +
              messageAlert +
              ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
              messageText +
              "</div>";
            if (messageAlert && messageText) {
              $("#contact_form").find(".messages").html(alertBox);
              $("#contact_form")[0].reset();
            }
          },
        });
        return false;
      }
    });
  });
  $(window)
    .on("load", function () {
      $(".preloader").fadeOut(800, "linear");
      var ptPage = $(".animated-sections");
      if (ptPage[0]) {
        PageTransitions.init({ menu: "ul.main-menu" });
      }
    })
    .on("resize", function () {
      mobileMenuHide();
      $(".animated-section").each(function () {
        $(this).perfectScrollbar("update");
      });
      customScroll();
    });
  $(document).on("ready", function () {
    var movementStrength = 23;
    var height = movementStrength / $(document).height();
    var width = movementStrength / $(document).width();
    $("body").on("mousemove", function (e) {
      var pageX = e.pageX - $(document).width() / 2,
        pageY = e.pageY - $(document).height() / 2,
        newvalueX = width * pageX * -1,
        newvalueY = height * pageY * -1,
        elements = $(".lm-animated-bg");
      elements.addClass("transition");
      elements.css({
        "background-position":
          "calc( 50% + " + newvalueX + "px ) calc( 50% + " + newvalueY + "px )",
      });
      setTimeout(function () {
        elements.removeClass("transition");
      }, 300);
    });
    $(".menu-toggle").on("click", function () {
      $("#site_header").addClass("animate");
      $("#site_header").toggleClass("mobile-menu-hide");
      $(".menu-toggle").toggleClass("open");
    });
    $(".main-menu").on("click", "a", function (e) {
      mobileMenuHide();
    });
    $(".sidebar-toggle").on("click", function () {
      $("#blog-sidebar").toggleClass("open");
    });
    var $portfolio_container = $(".portfolio-grid");
    $portfolio_container.imagesLoaded(function () {
      portfolio_init(this);
    });
    var $container = $(".blog-masonry");
    $container.imagesLoaded(function () {
      $container.masonry();
    });
    customScroll();
    $(".text-rotation").owlCarousel({
      loop: true,
      dots: false,
      nav: false,
      margin: 0,
      items: 1,
      autoplay: true,
      autoplayHoverPause: false,
      autoplayTimeout: 3800,
      animateOut: "animated-section-scaleDown",
      animateIn: "animated-section-scaleUp",
    });
    $(".testimonials.owl-carousel").imagesLoaded(function () {
      $(".testimonials.owl-carousel").owlCarousel({
        nav: true,
        items: 3,
        loop: false,
        navText: false,
        autoHeight: true,
        margin: 25,
        responsive: {
          0: { items: 1 },
          480: { items: 1 },
          768: { items: 2 },
          1200: { items: 2 },
        },
      });
    });
    $(".clients.owl-carousel")
      .imagesLoaded()
      .owlCarousel({
        nav: true,
        items: 2,
        loop: false,
        navText: false,
        margin: 10,
        autoHeight: true,
        responsive: { 0: { items: 2 }, 768: { items: 4 }, 1200: { items: 5 } },
      });
    $(".form-control")
      .val("")
      .on("focusin", function () {
        $(this).parent(".form-group").addClass("form-group-focus");
      })
      .on("focusout", function () {
        if ($(this).val().length === 0) {
          $(this).parent(".form-group").removeClass("form-group-focus");
        }
      });
    $("body").magnificPopup({
      delegate: "a.lightbox",
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-fade",
      image: { titleSrc: "title", gallery: { enabled: true } },
      iframe: {
        markup:
          '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
          '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
          "</div>",
        // patterns: {
        //   youtube: { index: "youtube.com/", id: null, src: "%id%?autoplay=1" },
        //   vimeo: {
        //     index: "vimeo.com/",
        //     id: "/",
        //     src: "//player.vimeo.com/video/%id%?autoplay=1",
        //   },
        //   gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
        // },
        // srcAction: "iframe_src",
      },
      callbacks: {
        markupParse: function (template, values, item) {
          values.title = item.el.attr("title");
        },
      },
    });
  });
})(jQuery);

document.querySelectorAll(".certificate-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    const img = (e.target.offsetParent.firstElementChild.childNodes[1].src).split('/')[5];
    

    const contenedor = document.body;

    const subcont1 = document.createElement("DIV");
    const subcont2 = document.createElement("DIV");
    const subcont3 = document.createElement("DIV");
    const subcont4 = document.createElement("DIV");
    const subcont5 = document.createElement("DIV");
    const IMG = document.createElement("IMG");

    subcont1.classList.add("mfp-bg", "mfp-fade", "mfp-ready");
    subcont2.classList.add(
      "mfp-wrap",
      "mfp-close-btn-in",
      "mfp-auto-cursor",
      "mfp-fade",
      "mfp-ready"
    );
    subcont3.classList.add("mfp-container", "mfp-s-ready", "mfp-iframe-holder");
    subcont4.classList.add("mfp-content");
    subcont5.classList.add("mfp-iframe-scaler");
    IMG.src = 'img/clients/' + img;
    IMG.alt = 'certifi';
    

    const html = `<button title="Cerrar (Esc)" type="button" class="mfp-close" id="closed">
                      <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">×</font></font>
                    </button>
                      
                    <div class="image" frameborder="0" >
                    </div>
                    `;
    subcont5.innerHTML = html;

    subcont4.appendChild(subcont5);
    subcont3.appendChild(subcont4);
    subcont2.appendChild(subcont3);

    contenedor.appendChild(subcont1);
    contenedor.appendChild(subcont2);

    document.querySelector(".image").appendChild(IMG);

    document.querySelector("#closed, .mfp-close, .mfp-container").addEventListener("click", function () {
      subcont1.remove();
      subcont2.remove();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        subcont1.remove();
        subcont2.remove();
      }
    });
  });
});

  
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight') {
    const activeItem = $(".main-menu a.active").parent("li");
    activeItem.next("li").children("a").click();
    if (activeItem.is(":last-child")) {
      $(".main-menu li:first-child").children("a").click();
    }
  } else if (e.key === 'ArrowLeft') {
    const activeItem = $(".main-menu a.active").parent("li");
    activeItem.prev("li").children("a").click();
    if (activeItem.is(":first-child")) {
      $(".main-menu li:last-child").children("a").click();
    }
  }
});
