function calculatePrices() {
  for (i = 0; i < GamesData.length; i++) {
    FPrice = GamesData[i].Price;
    DiPrice = GamesData[i].Discount / 100;

    GamesData[i].PriceWithDiscount = FPrice - DiPrice * FPrice;
  }
}

calculatePrices();

function CreatSearchingView(jsonDataItem) {
  items = document.createElement("div");
  items.className = "items";
  ShowingGrid.appendChild(items);

  items.addEventListener("click", function () {
    showModal(jsonDataItem.numberOfgame);
  });

  img = document.createElement("img");
  img.src = "Media/Store_recommended/gallery/" + jsonDataItem.GameImages[0];
  items.appendChild(img);

  NameAndSystem = document.createElement("div");
  NameAndSystem.className = "NameAndSystem";
  items.appendChild(NameAndSystem);

  Name = document.createElement("h3");
  Name.className = "Name";
  Name.innerHTML = jsonDataItem.GameName;
  NameAndSystem.appendChild(Name);

  System = document.createElement("div");
  System.className = "System";
  NameAndSystem.appendChild(System);

  if (jsonDataItem.Systems.indexOf("macOS") != -1) {
    mac = document.createElement("span");
    mac.className = "macOS";
    System.appendChild(mac);
  }
  if (jsonDataItem.Systems.indexOf("windows") != -1) {
    win = document.createElement("span");
    win.className = "Windows";
    System.appendChild(win);
  }
  if (jsonDataItem.Systems.indexOf("linux") != -1) {
    lin = document.createElement("span");
    lin.className = "SteamOSLinux";
    System.appendChild(lin);
  }

  ReleaseDate = document.createElement("div");
  ReleaseDate.className = "ReleaseDate";
  ReleaseDate.innerHTML =
    jsonDataItem.ReleaseDate[0] +
    "\xa0" +
    jsonDataItem.ReleaseDate[1] +
    "," +
    "\xa0" +
    jsonDataItem.ReleaseDate[2];
  items.appendChild(ReleaseDate);

  Review = document.createElement("div");
  Review.className = "Review";
  items.appendChild(Review);
  /* Choosing Review: */
  if (jsonDataItem.Review == "positive") {
    Review.className = "Review positive";
  }
  if (jsonDataItem.Review == "negative") {
    Review.className = "Review negative";
  }
  if (jsonDataItem.Review == "mixed") {
    Review.className = "Review mixed";
  }

  Discount_pct = document.createElement("div");
  Discount_pct.className = "Discount_pct";
  Discount_pct.innerHTML = "-" + jsonDataItem.Discount + "%";
  items.appendChild(Discount_pct);

  ShowingPrice = document.createElement("div");
  ShowingPrice.className = "ShowingPrice";
  items.appendChild(ShowingPrice);

  FirstPrice = document.createElement("span");
  FirstPrice.className = "FirstPrice";
  FirstPrice.innerHTML = jsonDataItem.Price + "€";
  ShowingPrice.appendChild(FirstPrice);

  PriceWithDiscount = document.createElement("span");
  PriceWithDiscount.className = "PriceWithDiscount";
  PriceWithDiscount.innerHTML = jsonDataItem.PriceWithDiscount + "€";
  ShowingPrice.appendChild(PriceWithDiscount);

  if (jsonDataItem.Price == 0) {
    FirstPrice.style.display = "none";
    Discount_pct.style.display = "none";

    PriceWithDiscount.style.marginLeft = "50px";
    PriceWithDiscount.style.marginTop = "5px";
    PriceWithDiscount.innerHTML = "Free";

    jsonDataItem.PriceWithDiscount = "0";
  }

  if (jsonDataItem.Discount == 0) {
    FirstPrice.style.display = "none";
    Discount_pct.style.display = "none";

    PriceWithDiscount.style.marginLeft = "50px";
    PriceWithDiscount.style.marginTop = "5px";
  }
}

/* CreatSearchingView(GamesData[0]); */

function demas(jsonData, i) {
  e = CreatSearchingView(jsonData[i]);
}

function fill_grid(jsonData) {
  ShowingGrid.innerHTML = "";

  for (let i = 0; i < jsonData.length; i++) {
    demas(jsonData, i);
  }

  ShowResualt.innerHTML = jsonData.length + " resualt match you'r search";

  if (jsonData.length == 0) {
    Nothing = document.createElement("div");
    Nothing.className = "nothingF";
    Nothing.innerHTML =
      "No games were found according to what you are looking for ))):";
    ShowingGrid.appendChild(Nothing);
  }
}

fill_grid(GamesData);

/* FilterData Instructions: */

function Quantification_InputPriceRange() {
  switch (PriceRangeInput.value) {
    case "13":
      PriceRangeInputUnder = 1000;
      break;
    case "12":
      PriceRangeInputUnder = 60;
      break;
    case "11":
      PriceRangeInputUnder = 55;
      break;
    case "10":
      PriceRangeInputUnder = 50;
      break;
    case "9":
      PriceRangeInputUnder = 45;
      break;
    case "8":
      PriceRangeInputUnder = 40;
      break;
    case "7":
      PriceRangeInputUnder = 35;
      break;
    case "6":
      PriceRangeInputUnder = 30;
      break;
    case "5":
      PriceRangeInputUnder = 25;
      break;
    case "4":
      PriceRangeInputUnder = 20;
      break;
    case "3":
      PriceRangeInputUnder = 15;
      break;
    case "2":
      PriceRangeInputUnder = 10;
      break;
    case "1":
      PriceRangeInputUnder = 5;
      break;
    case "0":
      PriceRangeInputUnder = 0;
      break;
  }
}

function Search_Pricr_Tag_System_SortingSystem_Condition_Controller(el) {
  Condition_default =
    el.PriceWithDiscount <= PriceRangeInputUnder &&
    el.GameName.toUpperCase().indexOf(MainSearch.value.toUpperCase()) !=
      -1 /* &&
    el.Discount >= 20 */;

  if (HideFree.checked == true) {
    Condition_Hide_Free = el.PriceWithDiscount != 0;
  } else {
    Condition_Hide_Free = Condition_default;
  }

  if (Offer.checked == true) {
    Condition_Hide_Special_Offer = el.Discount >= 20;
  } else {
    Condition_Hide_Special_Offer = Condition_default;
  }

  /* Tags Sorting */

  if (ActionTag.checked == true) {
    Condition_ActionTag = el.GameTags.indexOf("Action") != -1;
  } else {
    Condition_ActionTag = Condition_default;
  }

  if (PVPTag.checked == true) {
    Condition_PVPTag = el.GameTags.indexOf("PvP") != -1;
  } else {
    Condition_PVPTag = Condition_default;
  }

  if (Team_basedTag.checked == true) {
    Condition_Team_basedTag = el.GameTags.indexOf("Team-based") != -1;
  } else {
    Condition_Team_basedTag = Condition_default;
  }

  if (shooterTag.checked == true) {
    Condition_shooterTag = el.GameTags.indexOf("shooter") != -1;
  } else {
    Condition_shooterTag = Condition_default;
  }

  if (Online_Co_opTag.checked == true) {
    Condition_Online_Co_opTag = el.GameTags.indexOf("Online Co-op") != -1;
  } else {
    Condition_Online_Co_opTag = Condition_default;
  }

  if (FPSTag.checked == true) {
    Condition_FPSTag = el.GameTags.indexOf("FPS") != -1;
  } else {
    Condition_FPSTag = Condition_default;
  }

  if (Battle_RoyaleTag.checked == true) {
    Condition_Battle_RoyaleTag = el.GameTags.indexOf("Battle Royale") != -1;
  } else {
    Condition_Battle_RoyaleTag = Condition_default;
  }

  /* System Sorting */

  if (Windows_OS.checked == true) {
    Condition_Windows_OS = el.Systems.indexOf("windows") != -1;
  } else {
    Condition_Windows_OS = Condition_default;
  }

  if (macOS_OS.checked == true) {
    Condition_macOS_OS = el.Systems.indexOf("macOS") != -1;
  } else {
    Condition_macOS_OS = Condition_default;
  }

  if (Linux_OS.checked == true) {
    Condition_Linux_OS = el.Systems.indexOf("linux") != -1;
  } else {
    Condition_Linux_OS = Condition_default;
  }
}

/* Sorting in show instructions => */

function SortingAllByName() {
  /* alert("sorting by name ....."); */
  GamesData = GamesData.sort(function (a, b) {
    if (a.GameName.toUpperCase() < b.GameName.toUpperCase()) {
      return -1;
    }
    if (a.GameName.toUpperCase() > b.GameName.toUpperCase()) {
      return 1;
    }
    return 0;
  });
}

function SortingAllByRelevence() {
  /* alert(); */
  GamesData = GamesData.sort(function (a, b) {
    return a.numberOfgame - b.numberOfgame;
  });
}

function SortingAllByReleaseDate() {
  /* alert(); */
  GamesData = GamesData.sort(function (a, b) {
    return b.ReleaseDate[2] - a.ReleaseDate[2];
  });
}

function SortingAllByHighPrice() {
  /* alert(); */
  GamesData = GamesData.sort(function (a, b) {
    return b.PriceWithDiscount - a.PriceWithDiscount;
  });
}

function SortingAllByLowPrice() {
  /* alert(); */
  GamesData = GamesData.sort(function (a, b) {
    return a.PriceWithDiscount - b.PriceWithDiscount;
  });
}

function filter_data() {
  KeyUpSearchAnimation();

  Quantification_InputPriceRange();

  var filteredData = GamesData.filter((el) => {
    Search_Pricr_Tag_System_SortingSystem_Condition_Controller(el);

    return (
      /* Search_Price: */
      Condition_default &&
      Condition_Hide_Free &&
      Condition_Hide_Special_Offer &&
      /* Tags: */
      Condition_ActionTag &&
      Condition_PVPTag &&
      Condition_Team_basedTag &&
      Condition_shooterTag &&
      Condition_Online_Co_opTag &&
      Condition_FPSTag &&
      Condition_Battle_RoyaleTag &&
      /* Systems: */
      Condition_Windows_OS &&
      Condition_macOS_OS &&
      Condition_Linux_OS
    );
  });

  setTimeout(() => {
    fill_grid(filteredData);
  }, 1000);
}

/*  */

/* onclick or onchange functions: */

PriceRangeInput.onchange = function () {
  filter_data();
};

CheckBoxes = document.querySelectorAll(".checkboxHolder > input");
for (i = 0; i < CheckBoxes.length; i++) {
  CheckBoxes[i].onclick = function () {
    filter_data();
  };
}

HideFree.onclick = function () {
  if (PriceRangeInput.value != "0") {
    filter_data();
  }
};

/*  */

/* KeyUp Instructions : */

SearchingPossibility = true;

function KeyUpSearchAnimation() {
  SearchingPossibility = false;

  ShowingGrid.style.transition = "1s";

  ShowingGrid.style.transform = "translateY(-10px)";
  ShowingGrid.style.opacity = "0";

  setTimeout(() => {
    ShowingGrid.style.transform = "translateY(0px)";
    ShowingGrid.style.opacity = "1";
  }, 1000);

  setTimeout(() => {
    SearchingPossibility = true;
  }, 200);
}

function KeyUpSearch() {
  if (SearchingPossibility == true) {
    filter_data();

    KeyUpSearchAnimation();
  }
}

/*  */
