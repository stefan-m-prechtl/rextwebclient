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
        console.log("Lade Projekte vom Server....");

        // Daten per REST-API laden
        let jsonData = await this.loadProjectFromServer();

        // View aktualisieren
        this.view.showProjects(jsonData);
    }

    async loadTree(idProject) {
        console.log("Lade Bäume vom Server....");

        // Daten per REST-API laden
        let jsonData = await this.loadTreeFromServer(idProject);

        // View aktualisieren
        this.view.showTrees(idProject, jsonData);
    }

    /**
     * Projekte per REST-API als Json-String laden
     * @returns json-String mit Liste aller Projekte
     */
    async loadProjectFromServer() {
        try {
            //let response = await fetch(`http://localhost:8080/monolith/rext/projectmgmt/projects`);
            let response = await fetch("testdata/projectdata.json");
            let result = await response.json();
            return result;
        } catch (err) {
            console.log(`Fehler:${err}`);
        }
    }

    async loadTreeFromServer(idProject) {
        console.log(idProject);
        try {
            //let response = await fetch(`http://localhost:8080/monolith/rext/projectmgmt/projects`);
            let response = await fetch("testdata/treedata.json");
            let result = await response.json();
            let filteredResult = result.filter(tree => tree.projectid == idProject);

            return filteredResult;
        } catch (err) {
            console.log(`Fehler:${err}`);
        }
    }
}
