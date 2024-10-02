import ScrollSuave from './modules/scroll-suave.js';
import AnimaScroll from './modules/anima-scroll.js';
import Accordion from './modules/accordion.js';

const scrollSuave = new ScrollSuave('[data-menu="suave"] a[href^="#"]');
scrollSuave.init();

const animaScroll = new AnimaScroll('[data-anime="scroll"]');
animaScroll.init();

const accordion = new Accordion('[data-anime="accordion"] dt');
accordion.init();

