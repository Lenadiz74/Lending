export class Slider {

    timeoutToNextSlide = 0;
    interval;

    getDomElements = elementSelector => document.querySelectorAll(elementSelector);

    imageElement = document.querySelectorAll('.slider_image');

    currentSlideNumber = 1;

    slidersData = {

        1: {
            'CITY': 'Rostov-on-Don LCD admiral',
            'APARTMENT AREA': '81 m2',
            'REPAIR TIME': '3.5 months',
            imageSrc: './img/slide_1.jpg',
        },

        2: {
            'CITY': 'Sochi Thieves',
            'APARTMENT AREA': '105 m2',
            'REPAIR TIME': '4 months',
            imageSrc: './img/slide_2.jpg',
        },

        3: {
            'CITY': 'Rostov-on-Don Patriotic',
            'APARTMENT AREA': '93 m2',
            'REPAIR TIME': '3 months',
            imageSrc: './img/slide_3.jpg',
        },
    }

    switchButtons = this.getDomElements('.slide_switch__button');

    addListenerToElements(elements) {
        elements.forEach((element) => {
                element.addEventListener('click', this.switchSlide);
            }
        )
    }

    init() {
        this.addListenerToElements(this.switchButtons);
    }

    switchSlide = (event) => {

        const classListOfEventTarget = event.currentTarget.classList;

        if (classListOfEventTarget.contains('button-left')) {

            this.previousSlide();

        } else if (classListOfEventTarget.contains('button-first')) {

            this.switchToSlide(1);

        } else if (classListOfEventTarget.contains('button-second')) {

            this.switchToSlide(2);

        } else if (classListOfEventTarget.contains('button-third')) {

            this.switchToSlide(3);

        } else if (classListOfEventTarget.contains('button-right')) {

            this.nextSlide();
        }
    }

    switchToSlide = (slideNumber) => {
        this.currentSlideNumber = slideNumber;
        this.imageElement.forEach((element) => {
            element.src = this.slidersData[slideNumber].imageSrc;
        })
        this.setActivatingClass(slideNumber, 'active', '.svg__circle');
        this.setActivatingClass(slideNumber, 'selected', '.slide__header');
        this.slideTextChange(slideNumber);
        if (this.timeoutToNextSlide !== 0){
            clearInterval(this.interval);
            this.sliderPagingDelay(this.timeoutToNextSlide);
        }
    }

    nextSlide = () => {
        if (this.currentSlideNumber < 3) {
            this.currentSlideNumber += 1;
            this.switchToSlide(this.currentSlideNumber);
        } else {
            this.currentSlideNumber = 1;
            this.switchToSlide(this.currentSlideNumber);
        }
    }

    previousSlide = () => {
        if (this.currentSlideNumber > 1) {
            this.currentSlideNumber -= 1;
            this.switchToSlide(this.currentSlideNumber);
        } else {
            this.currentSlideNumber = 3;
            this.switchToSlide(this.currentSlideNumber);
        }
    }

    setActivatingClass = (currentSlideNumber, activeClass, domElementClassName) => {
        const domElementsNode = this.getDomElements(domElementClassName);
        const domElementIndexForMobileLayout = currentSlideNumber - 1;
        const domElementIndexForDesktopLayout = currentSlideNumber + 2;
        domElementsNode.forEach((element) => {
            element.classList.remove(activeClass);
        })
        domElementsNode[domElementIndexForMobileLayout].classList.add(activeClass);
        domElementsNode[domElementIndexForDesktopLayout].classList.add(activeClass);
    }

    slideTextChange = slideNumber => {
        const cityFieldsNodeList = this.getDomElements('.city');
        const apartmentAreaFieldsNodeList = this.getDomElements('.apartment__area');
        const repairTimeFieldsNodeList = this.getDomElements('.repair__time');

        this.setContent(slideNumber, cityFieldsNodeList, 'CITY');
        this.setContent(slideNumber, apartmentAreaFieldsNodeList, 'APARTMENT AREA');
        this.setContent(slideNumber, repairTimeFieldsNodeList, 'REPAIR TIME');
    }

    setContent = (slideNumber, elementsNodeList, argumentName) => {
        elementsNodeList.forEach((element) => {
            element.textContent = this.slidersData[slideNumber][argumentName];
        })
    }

    sliderPagingDelay = timeout => {
        this.timeoutToNextSlide = timeout;
        this.interval = setInterval(this.nextSlide,timeout);
    }
}