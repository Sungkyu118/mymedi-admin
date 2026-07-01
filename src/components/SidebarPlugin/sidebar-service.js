const sidebarStore = {
  showSidebar: false,
  sidebarLinks: [],
  isMinimized: false,
  displaySidebar(value) {
    this.showSidebar = value;
  },
  toggleMinimize() {
    document.body.classList.toggle("sidebar-mini");
    // Keep chart layouts in sync while the sidebar animation changes widths.
    const simulateWindowResize = setInterval(() => {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    setTimeout(() => {
      clearInterval(simulateWindowResize);
    }, 1000);

    this.isMinimized = !this.isMinimized;
  }
};

function configureSidebar(options) {
  if (options && options.sidebarLinks) {
    sidebarStore.sidebarLinks = options.sidebarLinks;
  }
}

export { configureSidebar, sidebarStore };
