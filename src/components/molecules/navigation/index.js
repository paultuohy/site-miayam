class Navigation {
  constructor(className='m-navigation') {
    this.className = className;
  }

  buildActiveLink() {
    const currentLocation = window.location.pathname;
    const navigationLinks = Array.from(document.getElementsByClassName(`${this.className}__link`));

    navigationLinks.forEach((link) => {
      let href = link.getAttribute('href');

      if (currentLocation === '/about/' && href !== '/about/') {
        href = document.referrer;
        link.setAttribute('href', href);
      }

      if (currentLocation === href) {
        link.style = 'border-bottom: 3px solid #333; font-weight: bold;';
      } else {
        link.style = '';
      }
    });
  }

  init() {
    this.buildActiveLink();
  }
}

export default Navigation;