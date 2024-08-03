import { $, $$ } from "./util.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

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

  $$(selector) {
    return this.rootElement.querySelectorAll(selector);
  }

  templateListProject = (projects) => html`
        <div class="w3-container w3-border">
        <h3>Projekte</h3>
         <ul id="listProject" class="w3-ul w3-border w3-margin-bottom " @click=${
           this.handleSelectedProject
         }>
         </li>${projects.map(
           (project) => html`<li data-id=${project.id}>${project.name}<div class="divtreelist" data-id=${project.id}></div></li>`
         )}
        </ul>
        </div>`;

  templateListTree = (trees) => html`
    <ul class="w3-ul w3-border w3-margin-bottom">
    <li class="w3-grey">Bäume</li>
    </li>${trees.map((tree) => html`<li data-id=${tree.id}>${tree.name}</li>`)}
    </ul>`;

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
   * @param {*} projects Liste der Projekte
   */
  showProjects(projects) {
    let divListe = $("#placeholderProjects");
    render(this.templateListProject(projects), divListe, {eventContext: this});
  }

  /**
   * Methode wird vom Presenter aktiviert
   * @param {number*} idProject Projekt-ID
   * @param {*} tree Liste der Bäume des Projekts
   */
  showTrees(idProject, trees) {

    let allDivTreelist = $$("div.divtreelist");
    allDivTreelist.map((div) => {
        if (div.className == "divtreelist w3-show") {
            console
            div.className = "divtreelist w3-hide";
          };
        }); 

    let liProjekt = $("div[data-id='"+idProject+"']")
    liProjekt.className = "divtreelist w3-show";
    render(this.templateListTree(trees), liProjekt);

  }

  // Event-Handler
  handleSelectedProject(e) {
    const idProject = e.target.getAttribute("data-id");
    console.log(idProject);
    this.presenter.loadTree(idProject);
  }
}
