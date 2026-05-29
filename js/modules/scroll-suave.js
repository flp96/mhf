export default class ScrollSuave {
  constructor(links, options) {
    this.linksInternos = document.querySelectorAll(links);
    if (options === undefined) {
      this.options = { behavior: 'smooth', block: 'start' };
    } else {
      this.options = options;
    }

    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(event) {
    const href = event.currentTarget.getAttribute('href');
    const section = document.querySelector(href);
    if (section) {
      event.preventDefault();
      section.scrollIntoView(this.options);
    }
  }

  addLinkEvent() {
    this.linksInternos.forEach((link) => {
      link.addEventListener('click', this.scrollToSection);
    });
  }

  init() {
    if(this.linksInternos.length) {
      this.addLinkEvent();
    }
    return this;
  }
}
