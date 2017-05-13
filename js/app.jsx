require('../scss/style.scss');

document.addEventListener('DOMContentLoaded', function(){
    
    var photo = document.querySelector('.photo');
    var mag = null;
    var zoom = null;
    
    var createMagnifier = function() {
        var magEl = document.createElement('div');
        magEl.classList.add('magnifier');
        mag = magEl;
        photo.appendChild(magEl);
    }
    
    var removeMagnifier = function() {
        if(mag) {
            photo.removeChild(mag);
            mag = null;
        }
    }
    
    var createZoomedPhoto = function() {
        zoom = document.createElement('div');
        zoom.classList.add('zoom');
        document.body.appendChild(zoom);
    }
    
    var removeZoomedPhoto = function() {
        if(zoom) {
            document.body.removeChild(zoom);
            zoom = null
        }
    }
    
    var onMouseEnter = function() {
        createMagnifier();
        createZoomedPhoto();
    }
    
    var onMouseMove = function(e) {
        var photoBounding = this.getBoundingClientRect(),
            x = e.clientX - photoBounding.left,
            y = e.clientY - photoBounding.top,
            photoSize = parseInt(window.getComputedStyle(photo).height),
            magSize = parseInt(window.getComputedStyle(mag).height),
            MAX_POSITION = photoSize - magSize;
        
        x -= magSize / 2;
        y -= magSize / 2;
        
        if(x + magSize > photoSize) {
            x = MAX_POSITION;
        }
        
        if(y + magSize > photoSize) {
            y = MAX_POSITION;
        }
        
        if(x  < 0) {
            x = 0;
        }
        
        if(y < 0) {
            y = 0;
        }
        
        var transformCSSValues = "translateX(" + x + "px) translateY(" + y + "px)";
        mag.style.transform = transformCSSValues;
        
        zoom.style.backgroundPosition = -x * 2 + "px " + -y + "px";
    }
    
    var onMouseLeave = function() {
        removeMagnifier();
        removeZoomedPhoto();
    }
    
    photo.addEventListener('mouseenter', onMouseEnter);
    photo.addEventListener('mousemove', onMouseMove);
    photo.addEventListener('mouseleave', onMouseLeave);
    
});