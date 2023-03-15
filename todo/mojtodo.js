function rysujWykres(element, s1, s2) {
    const dzieci = element.children;
    for(let i=0;i<element.children;i++) {
        element.children[i].remove;
    }
    const slupek1 = zrobElement("div","");
    const slupek2 = zrobElement("div","");
    slupek1.style.width = '20px';
    slupek2.style.width = '20px';
    slupek1.style.display = 'inline-block';
    slupek2.style.display = 'inline-block';
    slupek1.style.backgroundColor = "#ff0000";
    slupek2.style.backgroundColor = "#00ff00";
    element.appendChild(slupek1);
    element.appendChild(slupek2);

    const wysokoscWykresu = element.getBoundingClientRect().height;
    let max = s1;
    if (s1 < s2) {
        max = s2;
    }

    const wspolczynnik = wysokoscWykresu/max;

    slupek1.style.height = (s1 * wspolczynnik) + "px";
    slupek2.style.height = (s2 * wspolczynnik) + "px";
}


// querySelctor w tym All one przyjmuja selektor css

function znajdzElementy(selektor) {
    return document.querySelectorAll(selektor);
}

function znajdzElement(selektor) {
    return document.querySelector(selektor);
}

function zrobElement(nazwa,tekst, opcje = {}) {
    const element = document.createElement(nazwa, opcje);
    // createElement - jest nam w stanie utorzyc znacznik
    element.innerText=tekst;
    if (opcje){
        element.setAttribute(opcje.nazwaAtr, opcje.wartoscAtr);
    }
    return element;
}


function pokazKomunikat(tekst, waga) {
    const potwierdzenie = zrobElement('div', tekst);
    for (let i=0 ; i<bledy.children.length; i++){
        bledy.children[i].remove();
    }
    potwierdzenie.setAttribute("class", "waga"+waga);
    bledy.appendChild(potwierdzenie);
    window.setTimeout( () => {
        for (let i=0 ; i<bledy.children.length; i++){
            bledy.children[i].remove();
        }
    } , 2000);
}

const lista = znajdzElement("ul");
const dodaj = znajdzElement("button");
const input = znajdzElement("input[name='rzecz']");
const bledy = znajdzElement("#bledy");
// # oznacza id
//. oznacza klasę

dodaj.addEventListener("click", () => {
    const rzecz = input.value;
    if (input.value !== ""){
        input.value = "";
        const elLi = zrobElement("li", rzecz);
        const elUsun = zrobElement("button","usun");
        const elGora = zrobElement("button","Góra");
        const elGotowe = zrobElement("input","Gotowe", 
        {nazwaAtr: 'type', wartoscAtr: 'checkbox'})

        lista.appendChild(elLi);
        elLi.appendChild(elUsun);
        elLi.appendChild(elGora);
        elLi.appendChild(elGotowe)

        elUsun.onclick = (evt) => {
            //target mowi, ze mamy usunac to,
            // co właśnie kliknięto
            evt.target.parentElement.remove(); 
            //- uwuwamy element
        }

        elGotowe.onclick = (evt) => {
            const stan = evt.target.checked;
            if (stan== true){
                evt.target.parentElement.style.textDecoration = "line-through"
            }else
            evt.target.parentElement.style.textDecoration = "none"
        }

        elGora.onclick = (evt) => {
            const liKlikniete = evt.target.parentElement;
            const liPoprzedzajacy = liKlikniete.previousElementSibling;
            const ul = liKlikniete.parentElement;
            ul.insertBefore(liKlikniete, liPoprzedzajacy);
        }



        pokazKomunikat('dodano czynnosc', 0);
    }
    else {
        pokazKomunikat('nie można dodoać pustego pola', 2);
    }
})

rysujWykres(document.getElementById("wykres"), 0.400, 0.23);
