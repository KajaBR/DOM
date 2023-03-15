let elementyTd = document.querySelectorAll("td");
let pierwszyElementTd = elementyTd[0];
let ostatniElementTd = elementyTd[elementyTd.length-1];
console.log("Beżący dokument zawierz "+ elementyTd.length + " elementów td");
console.log("Pierwszy element to: ", pierwszyElementTd);
console.log("Ostatni elemnt to: ", ostatniElementTd)

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
    console.log('kliknieto na set');
    //.setAttribute
    el.setAttribute("class","wazne");
});

przyciskDel.addEventListener("click", function () { 
    console.log('kliknieto na del');
    //.removeAttribute
    el.removeAttribute("class", "wazne");
});

const hasloWidget = document.getElementsByName("haslo")[0];
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
    
});

// geerujemy losowe liczby od 0 do 256
// w inserBerfore mozemy podac przed, ktorym elementem chcecmy dodac lejny element

const dodajEl = document.getElementsByName("dodaj")[0];



//Przykład optymalizacji ilosci event listenenerow. Wykorzystujemy technike event bubblingu.
//Czyli element nasluchujacy dostanei od swoich dzieci informacje o zajsciu zdarzenia
//a nastepnie dzieki evt.target.tagName mozemy rozpoznac na jakiego typu dziecku zaszlo zdarzenie
//i podjac odpowiednia decyzje

// nic sie nie zmienia na stronie, ale w konsoli widzimy, który element został kilknięy - eve.target
//jeśli byłby obok target.innerText = "...", to wtedy na tym elemencie widzimy ten napis "..."
// w tym miejscu mam do czynienia z calym divem, a nie dla poszczegolnych dzieci
document.getElementById("kontener").addEventListener("click", function(evt){
    // aby zmieniało się tylko dziecko, a nie caly div muszimy  sprawdzić czy evt.taget.tagName
    // bedzie rowny spanowi, to wtedy go zmieniamy
    if(evt.target.tagName == 'SPAN'){ // to co bedzie w miejscu tagName mozemy sprawdzic breakpointcie w narzedziach dev
    console.log(evt.target.innerText = "Trafiony!")}
    // jesli mamy  jeden warunek nie musimy dwac {}, ale lepiej go dowac, bo jesli wiecej 
    // dodamy warunkow, bo pozniej bedzie wiecej bledow
    // bubling - bąbelkowanie czyli jak nalozymy listenera wysoko, to jesli klinniemy na jego potomka, to ta 
    //  informacja jest przekazwyana wyzej do listenera, tak jak bąbelki idą do góry tak idą informacje
    evt.target.style.backgroundColor ="#000000" 


    // drugi sposób
    // Alternatywna metoda rejestrowania event handlera:

    // document.getEventById("kontener").onclick = fuction (evt){
        //evt.target..... - postepowanie wewnatrz funkcji obslugujacej jak w przypadku addEventListener
    // }
})


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


    // evt - od event
    // nowyElement.addEventListener('click', function(evt){
    //     console.log('kilknieto na span-ie', evt);
    //     // evt - podaje informacje dot. elementu, na którym zaszło zdarznie 
    //     evt.target.innerText='trafiony!';
        // to wyzej sprawia, że jesli wczesniej kilknelisy i zrobimy to drufi raz to wyswietli nam sie napis trafiony
    //     // evt.target.remove() - usuwa wczesniej wygenerowane zdarzeni, po klinieciu na to zdarzenie
    // })
    //nowyElement.style.
    // backgroung-color => backgroundColor
    // padding => padding
    // margin-top => marginTop
    // font-family => fontFamily
 //DO PKAZANIA - removeChild(), insertBefore() - zamiana
});

// https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event

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



// // pokazwyanie w nieskończoność - sam zegar
// function biezacyCzas(){
//     const teraz = new Date();
//     return teraz.getHours() + ':' + teraz.getMinutes() + ':' + teraz.getSeconds();
// }
// const zegarekDiv = document.getElementById("zegarek");
// // setInterval - wiazana jest z oknem
// // po przecinku podajemy co ile chcemy wywoluwac funkcje, czyli co sekunde
// // tu podajemy w mili sekundach czyli 1000, bo 1000ms = 1s
// // tutaj mam sam zegar
// setInterval( function() {
//     zegarekDiv.innerText = biezacyCzas()
// }, 1000)

function biezacyCzas() {
    const teraz = new Date();
    const iloscPozycji = 2;
    return formatuj(teraz.getHours(),iloscPozycji) + ":" 
    + formatuj(teraz.getMinutes(),iloscPozycji) + ":" 
    + formatuj(teraz.getSeconds(),iloscPozycji);
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

// dodajemy zera przed pojedyncze liczby w zegarze
function formatuj(liczba, iloscPozycji) {
    const liczbaLancuch = liczba.toString(10);
    const dlugoscLiczby = liczbaLancuch.length;
    const iloscZer = iloscPozycji - dlugoscLiczby;
    const zero = "0";
    const wynik = zero.repeat(iloscZer) + liczbaLancuch;
    return wynik;
}

consol.log(formatuj(69,4));
