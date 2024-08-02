import { $, $$ } from './util.js';
import { html, render } from './node_modules/lit-html/lit-html.js'

export default class ProjectView {

    /**
       * Konstruktor
       * @param {string} idRootElement Selektor für DOM-Element, das für den View als Root-Element verwendet wird
       */
    constructor(idRootElement) {
        this.rootElement = $(idRootElement);
        this.initEventhandler();
    }

    /**
     * Zugehörigen Presenter mit diesem View "verknüpfen"
     * @param {ProjectPresenter} presenter
     */
    setPresenter(presenter) {
        this.presenter = presenter;
    }

    /**
       * DOM-Elememt im "View-Teilbaum" (ab View-Root) selektieren
       * @param {string} selector Selektor für DOM-Selektion
       * @returns {HTMLElement} Selektiertes HTML-Element
       */
    $(selector) {
        return this.rootElement.querySelector(selector);
    }

    templateListProject = (projects) => html`
         <ul class="w3-ul w3-border w3-hoverable">
         <li><h3>Projekte</h3></li>
            ${projects.map(project => html`<li datat-id=${project.id}>${project.name}</li>`)}
        </ul>`;

    /**
     * Alle Events für diesen Views definieren
     */
    initEventhandler() {

        const btnLoad = this.$("#btnLoad");
        btnLoad.on("click", () => { this.presenter.loadProjects(); });
    }


    /**
     * Methode wird vom Presenter aktiviert
     * @param {*} projects 
     */
    showProjects(projects) {
        let divListe = $("#placeholderProjects");
        render(this.templateListProject(projects), divListe);
    }
}