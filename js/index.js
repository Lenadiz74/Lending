window.addEventListener('resize', changePosition);
setTimeout(changePosition, 1);

function changePosition(){
    let width = window.innerWidth
    if (width <= 2560) {
        if (width > 1440) {
            document.getElementById('header_positioned').setAttribute('style', 'left:' + (((width) / 2) - 586) + 'px');
        } else if (width > 768) {
            document.getElementById('header_positioned').setAttribute('style', 'left:' + 9 + '%');
        } else {
            document.getElementById('header_positioned').setAttribute('style', 'left:' + 'unset');
        }
    }else {
        document.getElementById('header_positioned').setAttribute('style', 'left:' + 694 + 'px');
    }
}

import {Slider} from './slider.js';

const slider = new Slider();

slider.init();

setInterval(slider.nextSlide,3000);