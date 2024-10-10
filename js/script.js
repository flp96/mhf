import ScrollSuave from './modules/scroll-suave.js';
import AnimaScroll from './modules/anima-scroll.js';
import Accordion from './modules/accordion.js';
import SlideNav from './modules/slide.js';

const slide = new SlideNav('.slide', '.slide-wrapper');
slide.init();
slide.addArrow('.prev', '.next');

const scrollSuave = new ScrollSuave('[data-menu="suave"] a[href^="#"]');
scrollSuave.init();

const animaScroll = new AnimaScroll('[data-anime="scroll"]');
animaScroll.init();

const accordion = new Accordion('[data-anime="accordion"] dt');
accordion.init();

