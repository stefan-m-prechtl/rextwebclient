import { $, $$ } from './util.js';
import { html, render } from './node_modules/lit-html/lit-html.js'

export default class ProjectView {

    /**
       *Konstruktor
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


    template = (projects) => html`
      <table class=treeinfo">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Beschreibung</th>
        </tr>
        ${projects.map(project => html`<tr>
        <td><button data-id="${project.projectid}">Lade ${project.projectid}</button></td>
        <td>${project.projectname}</td>
        <td>${project.description}</td>
        </tr>`)}
  </table>`;


    /**
     * Alle Events für diesen Views definieren
     */
    initEventhandler() {

        const btnLoad = this.$("#btnLoad");

        btnLoad.on("click", () => {
            this.presenter.loadProjects();
        });
    }


    /**
     * Methode wird vom Presenter aktiviert
     * @param {*} projects 
     */
    showProjects(projects) {
        let div = $("#placeholderProjects");
        render(this.template(projects), div);
    }
}