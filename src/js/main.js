(function() {
    var overlay = document.querySelector( 'div.overlay' ),
        closeBttn = overlay.querySelector( 'button.overlay-close'),
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' )],
        support = { transitions : Modernizr.csstransitions };

    function toggleOverlay() {
        if( classie.has( overlay, 'open' ) ) {
            $("html, body").css("overflow", "visible");
            classie.remove( overlay, 'open' );
            classie.add( overlay, 'close' );
            var onEndTransitionFn = function( ev ) {
                if( support.transitions ) {
                    if( ev.propertyName !== 'visibility' ) return;
                    this.removeEventListener( transEndEventName, onEndTransitionFn );
                }
                classie.remove( overlay, 'close' );
            };
            if( support.transitions ) {
                overlay.addEventListener( transEndEventName, onEndTransitionFn );
            }
            else {
                onEndTransitionFn();
            }
        }
        else if( !classie.has( overlay, 'close' ) ) {
            classie.add( overlay, 'open' );
            $("html, body").css("overflow", "hidden");
        }
    }

    $('.toggleSlide').click(toggleOverlay);
    $('.openForm').click(function() {
        window.open('https://docs.google.com/forms/d/17kbUGwkv5oi5OwUylki9Yfch3QsDBBZRbpEs8QXPo5A/viewform?usp=send_form', '_blank');
    });
    closeBttn.addEventListener( 'click', toggleOverlay );
})();

function initialize() {
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: new google.maps.LatLng(52.515098, 13.395570),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(52.515098, 13.395570),
        map: map,
        icon: 'img/happy-pin-icon.png'
    });
}
google.maps.event.addDomListener(window, 'load', initialize);