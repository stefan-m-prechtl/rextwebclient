import { $, $$, createElement, createElementWithText } from './util.js';
import { initNavigation } from './navigation.js'
import ProjectPresenter from './projectPresenter.js';
import ProjectView from './projectView.js';
import ProjectModel from './projectModel.js';


// Liste mit 'Tupel' für "Seiten": Seiten-Id und Seiten-Name (wird in Navigation angezeigt)
let pages = [];
pages.push(['start', 'Start']);
pages.push(['project', 'Projekte']);
pages.push(['items', 'Items']);
pages.push(['admin', 'Administration']);
pages.push(['help', 'Hilfe']);

const includeTemplates = async () => {
    let divElems = document.querySelectorAll('[include-html]');
    divElems.forEach(divElem => {

        let template = divElem.getAttribute('include-html');
        fetch(template)
            .then(response => {
                return response.text()
            })
            .then(data => {
                divElem.innerHTML = data;
            });
    });

    let event = new CustomEvent("includeTemplates");
    document.dispatchEvent(event);

    return true;
}



const initContentNavigation = (pages) => {

    let elemNavList = document.querySelector('#nav_list')

    pages.forEach(page => {
        let elemNavListItem = createElement('li', { 'class': 'nav_link' });
        let elemNavListLink = createElementWithText('a', { 'href': page[0] }, page[1]);
        elemNavListItem.appendChild(elemNavListLink);
        elemNavList.appendChild(elemNavListItem);
    });
}

const initContentMain = (pages) => {

    let elemMain = document.querySelector('.site-content');

    pages.forEach(page => {
        let elemPageDiv;
        let id = page[0]

        // erste Seite sichtbar machen!
        if (page === pages[0])
            elemPageDiv = createElement('div', { 'id': id, 'class': 'virtualpage' })
        else
            elemPageDiv = createElement('div', { 'id': id, 'class': 'virtualpage hideDiv' })

        let includeValue = './includes/' + id + '_template_main.html';
        let elemIncludeDiv = createElement('div', { 'include-html': includeValue })
        elemPageDiv.appendChild(elemIncludeDiv);
        elemMain.append(elemPageDiv);
    });
}

const initContent = (pages) => {
    initContentNavigation(pages);
    initContentMain(pages)
}

const main = async () => {
    initContent(pages);
    initNavigation();
    await includeTemplates();
};


// "Main"-Funktion aufrufen
// Event-Listener: Event feuert, wenn DOM-Baum vollständig geladen ist
document.addEventListener('DOMContentLoaded', main);


let projectPresenter = undefined;

document.addEventListener("pageChanged", (event) => {
    let pageName = event.detail.data;
    console.log(pageName);

    if (pageName === 'project') {
        if (projectPresenter === undefined) {
            projectPresenter = new ProjectPresenter(new ProjectView("#viewProject"), new ProjectModel());
        }
    }


});






