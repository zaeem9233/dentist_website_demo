jQuery(document).ready(function() {
    "use strict";
    
    // Page preloader
    jQuery('.preloader').fadeOut('slow');
 
    // Image lazy load  
    lozad(".lozad", { 
		rootMargin: "300px 0px",
		loaded: function (el) {
			el.classList.add("is-loaded");
		}
	}).observe();
	lozad(".lazy-load-bg", {}).observe(); 
  
    // Inline popups
    jQuery('.popup').magnificPopup({
      delegate: 'a:not(.popupclose)',   
      callbacks: {
        beforeOpen: function() {
           this.st.mainClass = this.st.el.attr('data-effect');
        }
      },
      midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
    jQuery('.popupclose').on('click', function(){
        jQuery.magnificPopup.close();
    });

    // Multi popups
    jQuery('.step1, .step2, .step3, .step4, .step5').magnificPopup({
        mainClass: 'mfp-zoom-in', 
        removalDelay: 200,
        closeBtnInside:true,
        callbacks: {
            change: function() {
                function disableNext( $button ) {
                    $button.css({'opacity' : '0.5', 'pointer-events' : 'none'});
                }
                function enableNext( $button ) {
                    $button.css({'opacity' : '1', 'pointer-events' : 'auto'});
                }

                var $content = this.content;
                if($content.is("#step1, #step2, #step4")) {

                    if( $content.find('input[type="radio"]:checked').length < 1 ) {
                        disableNext( $content.find('.step-next') );
                    }
                    $content.find('input[type="radio"]').on('change', function () {
                        if( $content.find('input[type="radio"]:checked').length < 1 ) {
                            disableNext( $content.find('.step-next') );
                        } else {
                            enableNext( $content.find('.step-next') );
                        }
                    })
                }
                if($content.is("#step3")) {
                    if( !$content.find('.reserv_input').val() ) {
                        disableNext( $content.find('.step-next') );
                    }
                    $content.find('.reserv_input').on('change', function () {
                        if( $content.find('.reserv_input').val() ) {
                            enableNext( $content.find('.step-next') );
                        } else {
                            disableNext( $content.find('.step-next') );
                        }
                    })
                }
            },
        }

    }); 
 
    // Gallery popups
    jQuery('.gallery').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom', // this class is for CSS animation below
        delegate: 'a', // the selector for gallery item 
        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it
            duration: 300,
            removalDelay: 300,
            easing: 'ease-in-out'  
        },
        gallery: {enabled:true}  
    });
    
    // Slideshow
    var jQueryowl = jQuery('.slideshow');
    jQueryowl.owlCarousel({
        nav : true,
        items: 1,
        smartSpeed : 900,
        navSpeed : 900,
        lazyLoad:true,
        loop:true,
        dots:false,
        autoplayTimeout:6000,
        autoplayHoverPause:true,
        navText:["<i class='dental_icon dentalic_arrow_left'></i>","<i class='dental_icon dentalic_arrow_right'></i>"],
        autoHeight: false,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut'
    });

    // Presentation
    var owl = jQuery('.owl_presentation');
    owl.owlCarousel({ 
        loop:true,
        autoWidth:false,
        margin:30,
        lazyLoad:true,
        dots:true,
        navText:["<i class='dental_icon dentalic_arrow_left'></i>","<i class='dental_icon dentalic_arrow_right'></i>"], 
        navContainer: '.presentation_row .navigation',
        nav:true,
        items: 1,
        onInitialized: function(e) {
        jQuery('.carousel_counter').text('1/' + this.items().length)
        console.log();
      }
    });
    owl.on('changed.owl.carousel', function(e) {
      jQuery('.carousel_counter').text(++e.page.index  + '/' + e.page.count)
    }); 
     
    // Certificates slider
    jQuery('.owl_certificates').owlCarousel({
        loop:true, 
        autoWidth:false,
        margin:30,
        dots:false,
        lazyLoad:true,
        stagePadding: 100,
        navText:["<i class='dental_icon dentalic_arrow_left'></i>","<i class='dental_icon dentalic_arrow_right'></i>"],
        navContainer: '.certificates .navigation',
        nav:true,
        startPosition:1,
        responsive:{
        0:{items:1,stagePadding: 20},
        600:{items:2,stagePadding: 20},
        1024:{items:3,stagePadding: 20},
        1300:{items:5}
        }
    }); 
    
    // Inline Gallery 
    var owl = jQuery('.owl_gallery');
    owl.owlCarousel({  
            loop:true, 
            lazyLoad:true,
            dots:true, 
            margin:30,
            stagePadding: 200,
            navText:["<i class='dental_icon dentalic_arrow_left'></i>","<i class='dental_icon dentalic_arrow_right'></i>"], 
            navContainer: '.gallery .navigation',
            nav:true,
            items: 1,
            startPosition:1,
            responsive:{
                0:{stagePadding: 20},
                600:{stagePadding: 20},
                1024:{stagePadding: 20},
                1300:{stagePadding: 200}
            },
            onInitialized: function(e) {
                jQuery('.carousel_counter').text('1/' + this.items().length)
                console.log();
            }
    });
    owl.on('changed.owl.carousel', function(e) {
      jQuery('.carousel_counter').text(++e.page.index  + '/' + e.page.count)
    });
   
    // Testimonials
    var jQueryowl = jQuery('.owl_testimonials');
    jQueryowl.owlCarousel({ 
        animateIn: 'fadeIn',
        dots:false,
        animateOut: 'fadeOut',
        nav : true,
        lazyLoad:true,
        items: 1,
        smartSpeed : 900,
        navSpeed : 900,
        loop:true,
        autoplay:false, 
        autoplayHoverPause:true,
        navText:["<i class='dental_icon dentalic_arrow_left'></i>","<i class='dental_icon dentalic_arrow_right'></i>"],
        autoHeight: false 
    });  

    // Tabs
    jQuery( ".tabs" ).tabs({
      hide: { effect: "fade", duration: 300 },
      show: { effect: "fade", duration: 300 }
    });  
 
    // Sticky Header 
    function stickyHeader(headerSelector){

        //hide right header menu when sticky header is inited
        var mainHeader = jQuery(headerSelector),
            headerHeight = mainHeader.height();

        //set scrolling variables
        var scrolling = false,
            previousTop = 0,
            currentTop = 0,
            scrollDelta = 10,
            scrollOffset = 60;

        mainHeader.addClass('autohide');

        jQuery(window).on('scroll', function(){
            if( !scrolling ) {
                scrolling = true;
                (!window.requestAnimationFrame)
                    ? setTimeout(autoHideHeader, 250)
                    : requestAnimationFrame(autoHideHeader);
            }
        });

        jQuery(window).on('resize', function(){
            headerHeight = mainHeader.height();
        });

        function autoHideHeader() {
            var currentTop = jQuery(window).scrollTop();

            checkSimpleNavigation(currentTop);
            previousTop = currentTop;
            scrolling = false;

            // add class when pass offset
            if (jQuery(window).scrollTop() > scrollOffset) {
                mainHeader.addClass('fixed');
            } else {
                mainHeader.removeClass('fixed');
            }
        }

        function checkSimpleNavigation(currentTop) {
            //there's no secondary nav or secondary nav is below primary nav
            if (previousTop - currentTop > scrollDelta) {
                //if scrolling up...
                mainHeader.removeClass('is-hidden');
            } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
                //if scrolling down...
                mainHeader.addClass('is-hidden');
            }
        }
    }
    if (jQuery(window).width() > 991) {stickyHeader('#site-header.sticky');} 
    
    // Mobile Navigation 
    var jQueryopen_button = jQuery('.open-button');
    var jQueryclose_button = jQuery('.close-button');
    var jQuerycontainer_right_menu = jQuery('.container_right_menu');
    var jQuerymenu_left = jQuery('.menu_left')

    jQueryopen_button.on('click', function() {
        jQuery('.container_right_menu').toggleClass('open');
    });

    jQueryclose_button.on('click', function() {
        jQuery('.container_right_menu').toggleClass('open');
    });

    jQuery('.scrolurl').on('click', function() {
        jQuery('.container_right_menu').toggleClass('open');
    }); 

    jQuery( '#dl-menu' ).dlmenu({
        animationClasses : { classin : 'dl-animate-in-3', classout : 'dl-animate-out-3' }
    }); 
 
    //  Back to top
    if (jQuery('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = jQuery(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    jQuery('#back-to-top').addClass('show');
                } else {
                    jQuery('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        jQuery(window).on('scroll', function () {
            backToTop(); 
        });
        jQuery('#back-to-top').on('click', function (e) {
            e.preventDefault();
            jQuery('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
    
    // After Before
    jQuery(function(){
      jQuery(".twentytwenty-container").twentytwenty({
        default_offset_pct: 0.4, // How much of the before image is visible when the page loads
        orientation: 'horizontal', // Orientation of the before and after images ('horizontal' or 'vertical')
        no_overlay: false, //Do not show the overlay with before and after
        move_slider_on_hover: false, // Move slider on mouse hover?
        move_with_handle_only: false, // Allow a user to swipe anywhere on the image to control slider movement. 
        click_to_move: false // Allow a user to click (or tap) anywhere on the image to move the slider to that location.
      });
    });
    jQuery(window).on('load',function() {
      jQuery(".twentytwenty-container img").twentytwenty();
    });
        
    // See All Categories
    jQuery(".seeall").on('click', function(){
        jQuery(this).next(".seeall_vn").toggle("fast")
    });
    jQuery(".seeall_close").on('click', function(){
        jQuery(this).parents(".seeall_vn:first").hide("fast")
    }); 
    
    // Footer nav
    jQuery(".footer_see").on('click', function(){
        jQuery(this).next(".footer_nav").toggle("fast")
    });
    jQuery(".footer_menu_close").on('click', function(){
        jQuery(this).parents(".footer_nav:first").hide("fast")
    });  

    // Datepicker Popup
    jQuery( "#datepicker" ).datepicker({
    	minDate: 0,
        beforeShowDay:function(date){return[date.getDay()!=0,""]},
		onSelect: function(dateText, inst){
			var theDate = new Date(Date.parse(jQuery(this).datepicker('getDate')));
			var dateFormatted = jQuery.datepicker.formatDate('D, MM d, yy', theDate);
			jQuery("#temp_date_start").val(dateFormatted);
			jQuery("#temp_date_start").trigger('change');
		}
    });
    function diSetDefaultDate() {
        var theDate = new Date(Date.parse(jQuery("#datepicker").datepicker('getDate')));
        if( theDate.getDay()!=0 ) {
            var dateFormatted = jQuery.datepicker.formatDate('D, MM d, yy', theDate);
            jQuery("#temp_date_start").val(dateFormatted);
            jQuery("#temp_date_start").trigger('change');
        }
    }
    diSetDefaultDate(); 
    function diAlmostThere() {
        var img = jQuery('.almost_select_img');
        var reason = jQuery('.almost_reason');
        var date = jQuery('.almost_date');
        var pos = jQuery('.almost_doc_position');
        var name = jQuery('.almost_doc_name');

        var setAlmostTime = function() {
            var dateStr = '';
            if( jQuery('.reserv_input').val() ) {
                dateStr += jQuery('.reserv_input').val();
            }
            if( jQuery("[name='radio_time']:checked").val() ) {
                dateStr += ' at ' + jQuery("[name='radio_time']:checked").val();
            }
            date.html( dateStr );
        }
        var setAlmostDoc = function() {
            var $docItem = jQuery("[name='radio']:checked").next();
            var doctorImg = $docItem.find('.step_item_img img').clone();
            var doctorName = $docItem.find('.doctor_name').text();
            var doctorPos = $docItem.find('.doctor_position').text();
            img.html(doctorImg);
            pos.html(doctorPos);
            name.html(doctorName);
        }
        var setAlmostReason = function() {
            reason.html(jQuery("[name='radio_service']:checked").val());
        }
        jQuery("[name='radio_service']").on('change', function(){
            reason.html(this.value);
        });
        jQuery(".reserv_input, [name='radio_time']").on('change', function(){
            setAlmostTime();
        });
        jQuery("[name='radio']").on('change', function(){
            setAlmostDoc();
        });
        setAlmostDoc();
        setAlmostTime();
        setAlmostReason();
    }
    diAlmostThere(); 

    // Load More jQuery  
    jQuery(".more3 .blog_item").slice(0, 6).css("display", "block");
    jQuery(".more2 .blog_item").slice(0, 6).css("display", "block");
    jQuery(".more1 .blog_item").slice(0, 4).css("display", "block");

    jQuery("#loadMore").on('click', function (e) {
        e.preventDefault();
        jQuery(".more3 .blog_item:hidden").slice(0, 3).slideDown();
        jQuery(".more2 .blog_item:hidden").slice(0, 2).slideDown();
        jQuery(".more1 .blog_item:hidden").slice(0, 1).slideDown();
        if (jQuery(".blog_item:hidden").length == 0) {
            jQuery("#load").fadeOut('slow');
        }  
    }); 
        
    // Order form       
    var regVr22 = "<div class='process green'>Processing. Please wait.</div>";
    jQuery(".send").on('click', function(){
        jQuery(".process").html(regVr22).show();
            var radio = jQuery(".radio_name:checked").val();
            var radio_service = jQuery(".radio_service:checked").val();
            var radio_time = jQuery(".radio_time:checked").val();
            var posName = jQuery(".posName").val();
            var posTel = jQuery(".posTel").val();
            var posEmail = jQuery(".posEmail").val();
            var posDate = jQuery(".posDate").val(); 
        jQuery.ajax({
            type: "POST",
            url: "order.php",
            data: {"radio": radio, "radio_service": radio_service, "radio_time": radio_time, "posEmail": posEmail, "posName": posName, "posTel": posTel, "posDate": posDate},
            cache: false,
            success: function(response){
                var messageResp = '<div class="infobox infobox_success"><div class="close_button"><i class="fa fa-times"></i></div><i class="fa fa-check"></i><b class="h1">Thank you!</b><p>Dear ';
                var resultStat = ', thank you for contacting. We will be in touch with you shortly!</p><a href="" class="more">Go to Home Page</a></div>';
                var oll = (messageResp + posName + resultStat);
                if(response === '1'){
                    jQuery(".process").html(oll).fadeIn(3000);
                    jQuery(".radio_service:checked").val("");
                    jQuery(".radio_time:checked").val("");
                    jQuery(".radio_name:checked").val("");
                    jQuery(".posName").val("");
                    jQuery(".posTel").val("");
                    jQuery(".posEmail").val("");
                    jQuery(".posDate").val(""); 
                } else {
                    jQuery(".process").html(response).fadeIn(3000); }
                    jQuery('.infobox .close_button').on('click', function(){
                    jQuery(this).closest('.infobox').fadeOut(500);
                });
              }
        });
        return false;
    });
    
    // Order form       
    var regVr22 = "<div class='process green'>Processing. Please wait.</div>";
    jQuery(".contact_send").on('click', function(){
        jQuery(".contact_process").html(regVr22).show(); 
            var posName = jQuery(".posName").val();
            var posText = jQuery(".posText").val();
            var posTel = jQuery(".posTel").val();
            var posEmail = jQuery(".posEmail").val(); 
        jQuery.ajax({
            type: "POST",
            url: "send.php",
            data: {"posText": posText, "posEmail": posEmail, "posName": posName, "posTel": posTel},
            cache: false,
            success: function(response){
                var messageResp = '<div class="infobox infobox_success"><div class="close_button"><i class="fa fa-times"></i></div><i class="fa fa-check"></i><b class="h1">Thank you!</b><p>Dear ';
                var resultStat = ', thank you for contacting DiDent Clinic. We will be in touch with you shortly!</p><a href="" class="btn">Go to Home Page</a></div>';
                var oll = (messageResp + posName + resultStat);
                if(response === '1'){
                    jQuery(".contact_process").html(oll).fadeIn(3000); 
                    jQuery(".posName").val("");
                    jQuery(".posTel").val("");
                    jQuery(".posText").val(""); 
                    jQuery(".posEmail").val(""); 
                } else {
                    jQuery(".contact_process").html(response).fadeIn(3000); }
                    jQuery('.infobox .close_button').on('click', function(){
                    jQuery(this).closest('.infobox').fadeOut(500);
                });
              }
        });
        return false;
    });
    
});