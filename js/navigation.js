import { $, $$ } from './util.js';
import ProjectPresenter from './projectPresenter.js';
import ProjectView from './projectView.js';
import ProjectModel from './projectModel.js';

// "Basis"-URL (d.h. ohne queryString mit Seitenangabe) für Routing speichern
const originHref = window.location.origin + window.location.pathname;

export function initNavigation() {
    let navigationButton = $('#nav_button');
    navigationButton.on('click', (e) => {
        handleNavButtonClick(e);
    })

    let navigationLinks = $$(".nav_link");
    navigationLinks.forEach(link => {
        link.on("click", (e) => {
            handleNavClick(e);
        });
    });
}


function handleNavButtonClick(e) {
    let ulElem = $(".site-nav ul")
    let displayStyle = ulElem.style['display'];
    if (displayStyle === 'block') {
        ulElem.style['display'] = 'none';
        e.target.innerHTML = '&#9776; Menü';
    }
    else {
        ulElem.style['display'] = 'block';
        e.target.innerHTML = '&#x2716; Menü';
    }
}

function handleNavClick(e) {

    let pageName = e.target.getAttribute('href');
    history.pushState(
        {},
        pageName,
        originHref + '?page=' + pageName
    )
    showPage(pageName);
    return e.preventDefault();
}

function showPage(pageName) {



    let virtualPages = $$(".virtualpage");
    virtualPages.forEach(page => page.classList.add('hideDiv'));

    let selector = '[href=\'' + pageName + '\']';
    let navLink = $(selector);
    navLink.focus();

    let currentPage = $('#' + pageName);
    currentPage.classList.remove('hideDiv');

    let event = new CustomEvent("pageChanged", {
        detail: {
            data: pageName
        }
    });
    document.dispatchEvent(event);

}