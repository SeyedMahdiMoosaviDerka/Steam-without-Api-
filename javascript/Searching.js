function selecting(x) {
  a = document.querySelectorAll("#SteamMainMenu > a");

  a[0].className = "DiSelectedMenu";
  a[1].className = "DiSelectedMenu";
  a[2].className = "DiSelectedMenu";
  a[3].className = "DiSelectedMenu";

  a[x].className = "SelectedMenu";
}

function Going_SearchingSection() {
  StoreSection.style.display = "block";
  StoreSection.style.height = "60px";
  ShortCutsTitles.style.display = "none";
  otherholder.style.display = "none";

  StoreMenuBackgroundVideo.src = "";

  SearchingHolder.className = "show";

  clearInterval(StoreMenuBackVideoInterval);

  //CloseModalFunction();
  selecting(1);
}

function Going_StoreSection() {
  StoreSection.style.display = "block";
  ShortCutsTitles.style.display = "block";
  otherholder.style.display = "block";

  StoreMenuBackgroundVideo.src = "Media/StoreMenu/webm_page_bg_english.mp4";

  SearchingHolder.className = "hide";

  StoreMenuBackVideoInterval = setInterval(() => {
    StoreMenuBackgroundVideo.play();
  }, 1);

  //CloseModalFunction();
  selecting(0);
}

function Going_AboutSection() {
  StoreSection.style.display = "none";
  SearchingHolder.className = "hide";

  clearInterval(StoreMenuBackVideoInterval);

  //CloseModalFunction();
  selecting(2);
}

function Going_SupportSection() {
  StoreSection.style.display = "none";
  SearchingHolder.className = "hide";

  clearInterval(StoreMenuBackVideoInterval);

  //CloseModalFunction();
  selecting(3);
}

/* default postition => */
Going_StoreSection();

/* Going_SearchingSection(); */
MainSearch.onclick = function () {
  Going_SearchingSection();
  selecting(1);
};

MainSearch.onkeyup = function () {
  searchedvalue.innerHTML =
    "Searching for :    " + '"' + MainSearch.value + '"';
  if (MainSearch.value == "") {
    searchedvalue.innerHTML = "ALL PRODUCTS";
  }

  KeyUpSearch();
};

picerSelected = false;

SSISPicker = document.querySelectorAll(
  ".sortINshow > .SelectingSortInShow > ul"
);
SSISPickerItems = document.querySelectorAll(
  ".sortINshow > .SelectingSortInShow > ul > li"
);
SSISPickerText = document.querySelectorAll(
  ".sortINshow > .SelectingSortInShow > span"
);

SSISPicker[0].style.height = "0";

function SelectingSortInShowSelected() {
  SelectingSortInShow.style.color = "white";
  SelectingSortInShow.style.backgroundColor = "#67c1f59b";
}
function SelectingSortInShowDiSelected() {
  SelectingSortInShow.style.color = "#67c1f5";
  SelectingSortInShow.style.backgroundColor = "#67c1f522";
}

SelectingSortInShow.onmouseenter = function () {
  SelectingSortInShowSelected();
};
SelectingSortInShow.onmouseleave = function () {
  if (picerSelected == false) {
    SelectingSortInShow.style.color = "#67c1f5";
    SelectingSortInShow.style.backgroundColor = "#67c1f522";
  }
};

document.onclick = function () {
  if (picerSelected == true) {
    SelectingSortInShowDiSelected();
    SSISPicker[0].style.height = "0px";
    picerSelected = false;
  }
};

function SSISPickerClicked() {
  switch (picerSelected) {
    case false:
      setTimeout(() => {
        SelectingSortInShowSelected();
        SSISPicker[0].style.height = "130px";
        picerSelected = true;
      }, 100);
      break;
    case true:
      SelectingSortInShowDiSelected();
      SSISPicker[0].style.height = "0px";
      picerSelected = false;
      break;
  }
}

SelectingSortInShow.onclick = function () {
  SSISPickerClicked();
};

function SSISPickerItemsClicked(i) {
  SSISPickerText[0].innerHTML = SSISPickerItems[i].innerHTML;

  switch (i) {
    case 0:
      SortingAllByRelevence();
      break;
    case 1:
      SortingAllByReleaseDate();
      break;
    case 2:
      SortingAllByName();
      break;
    case 3:
      SortingAllByHighPrice();
      break;
    case 4:
      SortingAllByLowPrice();
      break;
  }

  filter_data();
}

function inputONchange() {
  if (PriceRangeInput.value == "0") {
    HideFreeLable.style.opacity = "0.2";
    HideFree.type = "text ";
    price_range.innerHTML = "Free";
    HideFree.checked = false;
    Offer.checked = false;
  } else {
    HideFree.type = "checkbox";
    HideFreeLable.style.opacity = "0.7";
    switch (PriceRangeInput.value) {
      case "13":
        price_range.innerHTML = "Any Price";
        break;
      case "12":
        price_range.innerHTML = "Under 60,--€";
        break;
      case "11":
        price_range.innerHTML = "Under 55,--€";
        break;
      case "10":
        price_range.innerHTML = "Under 50,--€";
        break;
      case "9":
        price_range.innerHTML = "Under 45,--€";
        break;
      case "8":
        price_range.innerHTML = "Under 40,--€";
        break;
      case "7":
        price_range.innerHTML = "Under 35,--€";
        break;
      case "6":
        price_range.innerHTML = "Under 30,--€";
        break;
      case "5":
        price_range.innerHTML = "Under 25,--€";
        break;
      case "4":
        price_range.innerHTML = "Under 20,--€";
        break;
      case "3":
        price_range.innerHTML = "Under 15,--€";
        break;
      case "2":
        price_range.innerHTML = "Under 10,--€";
        break;
      case "1":
        price_range.innerHTML = "Under 5,--€";
        break;
    }
  }
}

inputONchange();

NarroPriceSection.style.height = "220";
NarroPriceSectionOpened = true;

NarroTagSection.style.height = "30";
NarroTagSectionOpened = false;

NarroOSSection.style.height = "150";
NarroOSSectionOpened = true;

NarroPriceSectionName.onclick = function () {
  switch (NarroPriceSectionOpened) {
    case true:
      NarroPriceSection.style.height = 30 + "px";
      NarroPriceSectionMore.className = "lessArrow";
      NarroPriceSectionOpened = false;
      break;
    case false:
      NarroPriceSection.style.height = 220 + "px";
      NarroPriceSectionMore.className = "MoreArrow";
      NarroPriceSectionOpened = true;
      break;
  }
};
NarroTagSectionName.onclick = function () {
  switch (NarroTagSectionOpened) {
    case true:
      NarroTagSection.style.height = 30 + "px";
      NarroTagSectionMore.className = "lessArrow";
      NarroTagSectionOpened = false;
      break;
    case false:
      NarroTagSection.style.height = 290 + "px";
      NarroTagSectionMore.className = "MoreArrow";
      NarroTagSectionOpened = true;
      break;
  }
};
NarroOSSectionName.onclick = function () {
  switch (NarroOSSectionOpened) {
    case true:
      NarroOSSection.style.height = 30 + "px";
      NarroOSSectionMore.className = "lessArrow";
      NarroOSSectionOpened = false;
      break;
    case false:
      NarroOSSection.style.height = 150 + "px";
      NarroOSSectionMore.className = "MoreArrow";
      NarroOSSectionOpened = true;
      break;
  }
};
