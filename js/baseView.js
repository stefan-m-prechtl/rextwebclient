export default class BaseView {
    /**
   * Ein DOM-Elememt im "View-Teilbaum" (ab View-Root) selektieren
   * @param {string} selector Selektor für DOM-Selektion
   * @returns {HTMLElement} Selektiertes HTML-Element
   */
  $(selector) {
    return this.rootElement.querySelector(selector);
  }

    /**
   * Mehrere DOM-Elememte im "View-Teilbaum" (ab View-Root) selektieren
   * @param {string} selector Selektor für DOM-Selektion
   * @returns {NodeList} Selektierte HTML-Elemente
   */
  $$(selector) {
    return this.rootElement.querySelectorAll(selector);
  }

    /**
   * Zugehörigen Presenter mit diesem View "verknüpfen"
   * @param {ProjectPresenter} presenter
   */
    setPresenter(presenter) {
        this.presenter = presenter;
      }
    
}