const elementyTd = document.querySelectorAll("td");
const pierwszyElementTd = elementyTd[0];
const ostatniElementTd = elementyTd[elementyTd.length-1];
console.log("Bieżący dokument zawiera " + elementyTd.length + " elementów td");
console.log("Pierwszy element to: ", pierwszyElementTd);
console.log("Ostatni element to: ", ostatniElementTd);

const pierwszyTd = document.querySelector("td");
console.log("Pierwszy element to: ", pierwszyTd);

//document.getElementById("element1");
//document.getElementsByTagName("table");
//document.getElementsByName("nazwisko");
//document.getElementsByClassName("tekscik");
//....getElements.... zawsze zwroci nam tablice/kolekcje, 
// a getElementById zawsze pojedynczy element

const el = document.getElementsByName("nazwisko")[0];

console.log('element o name=nazwisko ma nastepujace atrybuty', el.attributes);

const maType = el.hasAttribute("type");
console.log('element o name=nazwisko ' + (maType?' ma atrybut type':'nie ma atrybutu type') );

const przyciskSet = document.getElementById("set");
const przyciskDel = document.getElementById("del");

przyciskSet.addEventListener("click", function () { 
    //console.log('kliknieto na set');
    //.setAttribute
    el.setAttribute("class","wazne");
});

przyciskDel.addEventListener("click", function () { 
    console.log('kliknieto na del');
    //.removeAttribute
    el.removeAttribute("class");
});

const hasloWidget = document.getElementsByName("haslo")[0];
const sila = document.getElementById("sila");
hasloWidget.addEventListener("keyup", function () { 
    console.log('nacisnieto klawisz');
    //.getAttribute
    //const obecnaWartosc = hasloWidget.getAttribute("value");
    const komplikacja = hasloWidget.value.length / 8 ;
    let kolor = "extra";
    if (komplikacja < 0.25) {
        kolor = "weak";
    } else if (komplikacja < 0.5) {
        kolor = "medium";
    } else if (komplikacja < 0.75) {
        kolor = "almost";
    } else if (komplikacja < 1) {
        kolor = "close";
    } else if (komplikacja < 1.5) {
        kolor = "ok";
    } else if (komplikacja < 2) {
        kolor = "super";
    } 
    console.log('komplikacja=' + komplikacja);
    hasloWidget.setAttribute("class", kolor);
    sila.innerText = "sila hasła=" + komplikacja;

});

const dodajEl = document.getElementsByName("dodaj")[0];

/*

//Przykład optymalizacji ilosci event listenenerow. Wykorzystujemy technike event bubblingu.
//Czyli element nasluchujacy dostanei od swoich dzieci informacje o zajsciu zdarzenia
//a nastepnie dzieki evt.target.tagName mozemy rozpoznac na jakiego typu dziecku zaszlo zdarzenie
//i podjac odpowiednia decyzje

document.getElementById("kontener").addEventListener("click", function(evt) {
    //console.log(evt.target.tagName);
    if (evt.target.tagName == 'SPAN') {
        evt.target.innerText = 'trafiony';
        evt.target.style.backgroundColor="#444444";
    }

});
*/

/*
Alternatywna metoda rejestrowania event handlera:

document.getElementById("kontener").onclick = function (evt) {
    //postepowanie wewnatrz funkcji obslugujacej jak w przypadku addEventListener
}
*/



dodajEl.addEventListener("click", function () {
    const kontener = document.getElementById("kontener");
    const nowyElement = document.createElement("span");
    nowyElement.innerText = 'nowyspan id='+Math.floor((Math.random()*100));
    // bardziej uniwersalny - drugi parametr wskazuje na dziecko przed ktorym dodac element
    kontener.insertBefore(nowyElement, kontener.firstChild);
    // mniej uniwersalny - zawsze doda na koncu
    //kontener.appendChild(nowyElement);
    const kolorR = 127 + Math.floor((Math.random()*128));
    const kolorG = 16 + Math.floor((Math.random()*128));
    const kolorB = 16 + Math.floor((Math.random()*128));
    console.log(kolorR, kolorG, kolorB);
    const kolorSzesnastkowy = "#" + kolorR.toString(16) + kolorG.toString(16) + kolorB.toString(16);
    nowyElement.style.backgroundColor = kolorSzesnastkowy;
    
    nowyElement.addEventListener("click", function (evt) {
        console.log('klinieto na span-ie', evt);

        //zmiana inner tkstu elementu w ktory kliknieto:
        evt.target.innerText='trafiony!';
        
        //usuwanie elementu na ktory kliknieto:
        //evt.target.remove();

        // usuwanie poprzednika:
        /*if (evt.target.previousElementSibling) {
            console.log('usuwam poprzednika:', evt.target.previousElementSibling);
            evt.target.previousElementSibling.remove();
        }*/
    });
    
    //nowyElement.style.
    // backgroung-color => backgroundColor
    // padding => padding
    // margin-top => marginTop
    // font-family => fontFamily

    //DO POKAZANIA - removeChild(), insertBefore() - zamiana
});

document.getElementById("powierzchniaTestowa").addEventListener("mouseenter" , function () {
    console.log("mouseenter");
});

document.getElementById("powierzchniaTestowa").addEventListener("mouseout" , function () {
    console.log("mouseout");
})

document.getElementById("powierzchniaTestowa").addEventListener("mousemove" , function () {
    console.log("mousemove");
})

document.getElementById("powierzchniaTestowa").addEventListener("mouseleave" , function () {
    console.log("mouseleave");
})

document.getElementById("powierzchniaTestowa").addEventListener("mouseover" , function () {
    console.log("mouseover");
})

function biezacyCzas() {
    const teraz = new Date();
    const iloscPozycji = 2;
    return formatuj(teraz.getHours(),iloscPozycji) + 
    ":" + formatuj(teraz.getMinutes(),iloscPozycji) + ":" + 
    formatuj(teraz.getSeconds(),iloscPozycji);
}

const zegarekDiv = document.getElementById("zegarek");

let uchwytInterval = window.setInterval(function() {
    zegarekDiv.innerText = biezacyCzas();
}, 1000);

//setTimeout - w odroznieniu do setInterval odpala funkcję tylko raz po uplywie zsdanego czasu

document.getElementById("zegarstop").onclick = function () {
    window.clearInterval(uchwytInterval);
    //window.clearTimeout - dla setTimeout
};

document.getElementById("zegarstart").onclick = function () {
    uchwytInterval = window.setInterval(function() {
        zegarekDiv.innerText = biezacyCzas();
    }, 1000);
};

function formatuj(liczba, iloscPozycji) {
    const liczbaLancuch = liczba.toString(10);
    const dlugoscLiczby = liczbaLancuch.length;
    const iloscZer = iloscPozycji - dlugoscLiczby;
    const zero = "0";
    const wynik = zero.repeat(iloscZer) + liczbaLancuch;
    return wynik;
} 


