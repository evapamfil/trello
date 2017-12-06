//MENU
var btnMenu = document.querySelector('#btn-burger');

function menuOpen() {
    var menu = document.querySelector('.menu-burger');
    menu.classList.toggle('menu-open');

    var overlay = document.querySelector('.overlay');
    overlay.classList.toggle('display-block');
};
btnMenu.addEventListener('click', menuOpen, false);

// CREATE COLUMN
var btnCreate = document.querySelector('#btn-create');

function createColumn() {

    var newColumn = document.createElement('div');
    newColumn.classList.add('column');
    var container = document.querySelector('.container');
    var headerColumn = document.querySelector('.header-column');
    var footerColumn = document.querySelector('.footer-column');


    headerColumn_prime = headerColumn.cloneNode(true);
    footerColumn_prime = footerColumn.cloneNode(true);


    container.appendChild(newColumn);
    newColumn.appendChild(headerColumn_prime);
    newColumn.appendChild(footerColumn_prime);


   // document.body.insertBefore(container, newColumn);

};

btnCreate.addEventListener('click', createColumn, false);

//CREATE CARD
var btnCard = document.querySelector('.footer-column button');

function createCard() {
    var newCard = document.createElement('div');
    newCard.classList.add('card');
    var column = document.querySelector('.column');

    column.appendChild(newCard);
}
btnCard.addEventListener('click', createCard, false);

// DRAG AND DROP
(function() {

    var dndHandler = {

        draggedElement: null, // Propriété pointant vers l'élément en cours de déplacement

        applyDragEvents: function(element) {

            element.draggable = true;

            var dndHandler = this; // Cette variable est nécessaire pour que l'événement « dragstart » ci-dessous accède facilement au namespace « dndHandler »

            element.addEventListener('dragstart', function(e) {
                dndHandler.draggedElement = e.target; // On sauvegarde l'élément en cours de déplacement
                e.dataTransfer.setData('text/plain', ''); // Nécessaire pour Firefox
            });

        },

        applyDropEvents: function(dropper) {

            dropper.addEventListener('dragover', function(e) {
                e.preventDefault(); // On autorise le drop d'éléments
                this.className = 'dropper'; // Et on applique le style adéquat à notre zone de drop quand un élément la survole
            });

            dropper.addEventListener('dragleave', function() {
                this.className = 'column dropper'; // On revient au style de base lorsque l'élément quitte la zone de drop
            });

            var dndHandler = this; // Cette variable est nécessaire pour que l'événement « drop » ci-dessous accède facilement au namespace « dndHandler »

            dropper.addEventListener('drop', function(e) {

                var target = e.target,
                    draggedElement = dndHandler.draggedElement, // Récupération de l'élément concerné
                    clonedElement = draggedElement.cloneNode(true); // On créé immédiatement le clone de cet élément

                while (target.className.indexOf('dropper') == -1) { // Cette boucle permet de remonter jusqu'à la zone de drop parente
                    target = target.parentNode;
                }

                target.className = 'dropper'; // Application du style par défaut

                clonedElement = target.appendChild(clonedElement); // Ajout de l'élément cloné à la zone de drop actuelle
                dndHandler.applyDragEvents(clonedElement); // Nouvelle application des événements qui ont été perdus lors du cloneNode()

                draggedElement.parentNode.removeChild(draggedElement); // Suppression de l'élément d'origine

            });

        }

    };

    var elements = document.querySelectorAll('.draggable'),
        elementsLen = elements.length;

    for (var i = 0; i < elementsLen; i++) {
        dndHandler.applyDragEvents(elements[i]); // Application des paramètres nécessaires aux éléments déplaçables
    }

    var droppers = document.querySelectorAll('.dropper'),
        droppersLen = droppers.length;

    for (var i = 0; i < droppersLen; i++) {
        dndHandler.applyDropEvents(droppers[i]); // Application des événements nécessaires aux zones de drop
    }

})();
