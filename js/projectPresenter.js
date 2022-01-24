export default class ProjectPresenter {
    /**
   * Konstruktor
   * @param {PRojectView} view 
   * @param {ProjectModel} model 
   */
    constructor(view, model) {
        this.view = view;
        this.view.setPresenter(this);
        this.model = model;
        console.log("Constructor ProjectPresenter called");
    }

    async loadProjects() {

        // Daten per REST-API laden
        let jsonData = await this.loadProjectFromServer();

        // View aktualisieren
        this.view.showProjects(jsonData);
    }

    /**
     * Projekte per REST-API als Json-String laden
     * @returns json-String mit Liste aller Projekte
     */
    async loadProjectFromServer() {
        try {
            let response = await fetch(`http://localhost:8080/monolith/rext/projectmgmt/projects`);
            let result = await response.json();
            return result;
        }
        catch (err) {
            console.log(`Fehler:${err}`);
        }
    }
}