class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
    this.closeMenuOnLinkClick = this.closeMenuOnLinkClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  closeMenuOnLinkClick() {
    this.navLinks.forEach(link => {
      link.addEventListener("click", event => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          event.preventDefault(); // Impede comportamento padrão
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }

          // Fecha o menu
          this.navList.classList.remove(this.activeClass);
          this.mobileMenu.classList.remove(this.activeClass);

          // Limpa animações
          this.navLinks.forEach(l => (l.style.animation = ""));
        }
      });
    });
  }

  addClickEvent() {
    if (this.mobileMenu) {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  }

  init() {
    if (this.mobileMenu && this.navList && this.navLinks.length > 0) {
      this.addClickEvent();
      this.closeMenuOnLinkClick(); // <- ✅ Aqui ativamos o clique nos links do menu
    }
    return this;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li a" // <- importante que seja "a" aqui!
  );
  mobileNavbar.init();
});
