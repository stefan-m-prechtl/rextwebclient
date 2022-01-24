/**
 * Modellklasse (MVP-Pattern) für Projekt 
 */
export default class ProjectModel {
    constructor() {
        this.reset();
    }

    reset() {
        this.listProjects = [];
        this.currentProject = undefined;
    }

}