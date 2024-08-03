import { $, $$, createElement, createElementWithText } from "./util.js";
import { initNavigation } from "./navigation.js";
import ProjectPresenter from "./projectPresenter.js";
import ProjectView from "./projectView.js";
import ProjectModel from "./projectModel.js";

// Liste mit 'Tupel' für "Seiten": Seiten-Id und Seiten-Name (wird in Navigation angezeigt)
let pages = [];
// Alle Views
pages.push(["start", "Start", "view"]);
pages.push(["project", "Projekte", "view"]);
pages.push(["items", "Items", "view"]);
pages.push(["admin", "Administration", "view"]);
pages.push(["help", "Hilfe", "view"]);
// Alle Dialoge
pages.push(["login", "Login", "dialog"]);

const includeTemplates = async () => {
  let divElems = document.querySelectorAll("[include-html]");
  divElems.forEach((divElem) => {
    let template = divElem.getAttribute("include-html");
    fetch(template)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        divElem.innerHTML = data;
      });
  });

  let event = new CustomEvent("includeTemplates");
  document.dispatchEvent(event);

  return true;
};

const initContentNavigation = (pages) => {
  let elemNavList = document.querySelector("#nav_list");

  pages.forEach((page) => {
    if (page[2] == "view") {
      let elemNavListItem = createElement("li", { class: "nav_link" });
      let elemNavListLink = createElementWithText(
        "a",
        { href: page[0] },
        page[1]
      );
      elemNavListItem.appendChild(elemNavListLink);
      elemNavList.appendChild(elemNavListItem);
    }
  });
};

const initContentMain = (pages) => {
  let elemMain = document.querySelector(".site-content");

  pages.forEach((page) => {
    let elemPageDiv;
    let id = page[0];

    let isView = (page[2]=='view')
    // ersten View sichtbar machen!
   if (isView)  
    {
      if (page === pages[0])
        elemPageDiv = createElement("div", { id: id, class: "virtualpage" });
      else
        elemPageDiv = createElement("div", {
          id: id,
          class: "virtualpage hideDiv",
        });
        let includeValue = "./includes/" + id + "_template_main.html";
        let elemIncludeDiv = createElement("div", { "include-html": includeValue });
    elemPageDiv.appendChild(elemIncludeDiv);
    elemMain.append(elemPageDiv);
    }    
    else
    {
      let includeValue = "./includes/" + id + "_template_dialog.html";
      let elemIncludeDiv = createElement("div", { "include-html": includeValue });
      elemPageDiv = createElement("div", { id: id});
      elemPageDiv.appendChild(elemIncludeDiv);
      elemMain.append(elemPageDiv);
    }
  });
};

const initContent = (pages) => {
  initContentNavigation(pages);
  initContentMain(pages);
};

const initMVP = () => {
  let projectPresenter = new ProjectPresenter(
    new ProjectView("#viewProject"),
    new ProjectModel()
  );
};

const showLogin = () => {
  document.getElementById('dialogLogin').style.display='block';
};

const main = async () => {
  initContent(pages);
  initNavigation();
  await includeTemplates();
  // initMVP muss mit Verzögerung aufgerufen werden!
  setTimeout(initMVP, 500);
  setTimeout(showLogin, 550);
};

// "Main"-Funktion aufrufen
// Event-Listener: Event feuert, wenn DOM-Baum vollständig geladen ist
document.addEventListener("DOMContentLoaded", main);
