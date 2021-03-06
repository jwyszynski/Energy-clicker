//
// ZMIENNE:
//
let energia = 0;
let lepszaKorba = 0;
let lepszyGen = 0;
let malyGeneratorWodny = 0;
let malyGeneratorWiatrowy = 0;
let genWegiel = 0;
let zapora = 0;
let atom = 0;

let perClick = 1;
let perSec = 0;
// Koszty:
let kosztKorby = 10;
let kosztGen = 100;
let kosztMalyGenWod = 10;
let kosztMalyGenWiat = 100;
let kosztGenWegiel = 800;
let kosztZapora = 2000;
let kosztAtom = 40000;

function klik() {
  energia += perClick;
  console.log(`Obecna energia: ${energia}`);
}

function addPerSec() {
  perSec =
    malyGeneratorWodny +
    malyGeneratorWiatrowy * 10 +
    genWegiel * 80 +
    zapora * 200 +
    atom * 4000;
  energia += perSec;
}

function odswiez() {
  //ODSWIEŻANIE WARTOŚCI NA INTERFEJSIE GRAFICZNYM
  document.querySelector(".energia").innerHTML = energia;

  document.querySelector("#iloscKorb").innerHTML = lepszaKorba;
  document.querySelector("#iloscGen").innerHTML = lepszyGen;
  document.querySelector("#iloscGenWod").innerHTML = malyGeneratorWodny;
  document.querySelector("#iloscGenWiat").innerHTML = malyGeneratorWiatrowy;
  document.querySelector("#iloscGenWegiel").innerHTML = genWegiel;
  document.querySelector("#iloscZapora").innerHTML = zapora;
  document.querySelector("#iloscAtom").innerHTML = atom;

  document.querySelector("#perClick").innerHTML = perClick;

  document.querySelector("#iloscKosztKorby").innerHTML = kosztKorby;
  document.querySelector("#kosztGen").innerHTML = kosztGen;
  document.querySelector("#kosztMalyGenWod").innerHTML = kosztMalyGenWod;
  document.querySelector("#kosztMalyGenWiat").innerHTML = kosztMalyGenWiat;
  document.querySelector("#kosztGenWegiel").innerHTML = kosztGenWegiel;
  document.querySelector("#kosztZapora").innerHTML = kosztZapora;
  document.querySelector("#kosztAtom").innerHTML = kosztAtom;

  document.querySelector("#perSec").innerHTML = perSec;
  perClick = 1 + lepszaKorba + lepszyGen * 10;
}
//
// ULEPSZENIA
//
function ileEnergii(_potrzeba) {
  //Sprawdza czy jest wystarczająco energii
  if (energia >= _potrzeba) {
    console.log("Yo " + _potrzeba);
    return true;
  } else {
    infobox(`Potrzebujesz ${_potrzeba} energii`);
    console.log("nie ma tyle energii");
    return false;
  }
}

function kupLepszaKorba() {
  //Kupowanie Korby
  if (ileEnergii(kosztKorby)) {
    energia -= kosztKorby;
    lepszaKorba += 1;
    console.log(`Lepsza Korba: ${lepszaKorba}`);
    kosztKorby = (lepszaKorba + 1) * 10;
  }
}

function kupLepszyGen() {
  //Kupowanie Generatora
  if (ileEnergii(kosztGen)) {
    energia -= kosztGen;
    lepszyGen += 1;
    console.log(`Lepszy Gen: ${lepszyGen}`);
    kosztGen = (lepszyGen + 1) * 100;
  }
}

function kupMalyGenWodny() {
  //Kupowanie Elektrowni Wodnej
  if (ileEnergii(kosztMalyGenWod)) {
    energia -= kosztMalyGenWod;
    malyGeneratorWodny += 1;
    console.log(`Mały Generator Wodny: ${malyGeneratorWodny}`);
    kosztMalyGenWod = (malyGeneratorWodny + 1) * 10;
  }
}

function kupMalyGenWiatrowy() {
  //Kupowanie Elektrowni Wiatrowej
  if (ileEnergii(kosztMalyGenWiat)) {
    energia -= kosztMalyGenWiat;
    malyGeneratorWiatrowy += 1;
    console.log(`Lepszy Gen: ${malyGeneratorWiatrowy}`);
    kosztMalyGenWiat = (malyGeneratorWiatrowy + 1) * 100;
  }
}

function kupGenWegiel() {
  //Kupowanie Generatora na węgiel
  if (ileEnergii(kosztGenWegiel)) {
    energia -= kosztGenWegiel;
    genWegiel += 1;
    console.log(`Lepszy Gen: ${genWegiel}`);
    kosztGenWegiel = (genWegiel + 1) * 800;
  }
}

function kupZapora() {
  //Kupowanie Zapory
  if (ileEnergii(kosztZapora)) {
    energia -= kosztZapora;
    zapora += 1;
    console.log(`Lepszy Gen: ${zapora}`);
    kosztZapora = (zapora + 1) * 2000;
  }
}

function kupAtom() {
  //Kupowanie Elektrowni Atomowej
  if (ileEnergii(kosztAtom)) {
    energia -= kosztAtom;
    atom += 1;
    console.log(`Lepszy Gen: ${atom}`);
    kosztAtom = (atom + 1) * 40000;
  }
}

// WYWOŁYWANE FUNKCJE

setInterval(odswiez, 100);
setInterval(addPerSec, 1000);
setInterval(checkAchievements, 1000);

//INFOBOX - Wyświetla daną wiadomość w oknie
let infoboxTimeout;
function infobox(_info) {
  if (infoboxTimeout != undefined) clearTimeout(infoboxTimeout);
  document.querySelector("#infobox").innerHTML = _info;
  document.querySelector("#infobox").classList.add("infoboxblink");
  infoboxTimeout = setTimeout(function() {
    document.querySelector("#infobox").classList.remove("infoboxblink");
  }, 1500);
}

////////////////////////////////////////
// Achievements
////////////////////////////////////////

function for_2_Achievement() {
  let wynik = 0;
  if (malyGeneratorWiatrowy > 0) wynik++;
  if (malyGeneratorWodny > 0) wynik++;
  if (genWegiel > 0) wynik++;
  if (zapora > 0) wynik++;
  if (atom > 0) wynik++;
  if (wynik >= 2) return true;
  return false;
}

function checkAchievements(params) {
  let conditions = [];
  conditions[0] = achievements.Table[0].used != true && energia >= 10;
  conditions[1] =
    achievements.Table[1].used != true &&
    (malyGeneratorWiatrowy > 0 ||
      malyGeneratorWodny > 0 ||
      zapora > 0 ||
      atom > 0);
  conditions[2] =
    achievements.Table[2].used != true && for_2_Achievement() == true;
  conditions[3] = achievements.Table[3].used != true && atom >= 3;
  conditions[4] =
    achievements.Table[4].used != true && (lepszaKorba > 0 || lepszyGen > 0);
  conditions[5] =
    achievements.Table[5].used != true && malyGeneratorWodny >= 100;
  conditions[6] =
    achievements.Table[6].used != true && malyGeneratorWodny >= 10000;
  conditions[7] = achievements.Table[7].used != true && genWegiel > 0;
  conditions[8] = achievements.Table[8].used != true && genWegiel >= 1000;
  conditions[9] = achievements.Table[9].used != true && zapora > 0;

  for (let i = 0; i < conditions.length; i++) {
    if (conditions[i]) {
      addAchievement(i);
      achievements.Table[i].used = true;
    }
  }
}

function addAchievement(achNumber) {
  let achSection = document.querySelector("#achievements");

  var div = document.createElement("div");
  var icon = document.createElement("div");
  var title = document.createElement("h2");
  title.innerText = achievements.Table[achNumber].title;
  var spanLine = document.createElement("hr");
  var description = document.createElement("h3");
  description.innerText = achievements.Table[achNumber].description;

  icon.classList.add("achievement-icon");
  icon.style.backgroundImage =
    'url("img/achievements/' + achievements.Table[achNumber].icon + '")';
  div.classList.add("achievement");

  div.append(icon);
  div.append(title);
  div.append(spanLine);
  div.append(description);
  achSection.prepend(div);
}

//END
