/* show modalfunction: */

/* for remove all of localstorage: */
/* localStorage.removeItem("basket"); */

function ShowGamesInWishListBT() {
  bas_WishList = JSON.parse(localStorage.getItem("basket_WishList"));
  Bas_WishList_Quantity = bas_WishList.length;
  OpenWishListBT.innerHTML = "WishList(" + Bas_WishList_Quantity + ")";
}

/* I call upper function for first time: */
ShowGamesInWishListBT();

function AddToWishListAnim() {
  AddWishListBT.style.transition = "0.4s";
  AddWishListBT.style.color = "transparent";

  AddToWishListAnimInterval = setInterval(() => {
    OpenWishListBT.style.scale = "1.5";
    setTimeout(() => {
      OpenWishListBT.style.scale = "1";
    }, 300);
  }, 600);

  setTimeout(() => {
    clearInterval(AddToWishListAnimInterval);
  }, 3000);

  setTimeout(() => {
    AddWishListBT.innerHTML = "Added To WishList";
    AddWishListBT.style.color = "white";
    AddWishListBT.style.backgroundColor = "green";

    setTimeout(() => {
      AddWishListBT.style.backgroundColor = "#67c1f546";
      AddWishListBT.style.color = "#67c1f5";
    }, 2000);
  }, 1000);
}

AddWishListBT.onclick = function () {
  let cid = this.getAttribute("data-id");

  let curEL = GamesData.find((el) => el.numberOfgame == cid);

  let elId = cid;
  let elName = curEL.GameName;
  let elPic = curEL.GameImages[0];
  let elPrice = curEL.PriceWithDiscount;

  let bas = JSON.parse(localStorage.getItem("basket_WishList"));

  if (!bas) {
    bas = [];
  }

  basIndex = bas.findIndex((el) => el.elId == cid);

  if (basIndex == -1) {
    bas.push({ elId, elPic, elPrice, elName });
  }

  localStorage.setItem("basket_WishList", JSON.stringify(bas));

  ShowGamesInWishListBT();

  AddToWishListAnim();
};

OpenWishListBT.onclick = function () {
  OpenWishList();
  OpenWishListAnim();
};

function DeleteWishListAnim() {
  ShowingGridWishList.style.transform = "translateY(-10px)";
  ShowingGridWishList.style.opacity = "0";

  setTimeout(() => {
    ShowingGridWishList.style.transform = "translateY(0px)";
    ShowingGridWishList.style.opacity = "1";
  }, 1000);
}

/* Main fucnction for WishList: */
function CloseWishList() {
  CloseWishListAnim();
}

function OpenWishList() {
  /* OpenWishListAnim(); */

  let bas = JSON.parse(localStorage.getItem("basket_WishList"));

  function emptyWishListAlert() {
    if (bas.length == 0) {
      noting_wish = document.createElement("p");
      noting_wish.innerHTML = "You'r WishList Is Empty !";
      ShowingGridWishList.appendChild(noting_wish);
    }
  }

  ShowingGridWishList.innerHTML = "";

  emptyWishListAlert();

  for (i = 0; i < bas.length; i++) {
    items = document.createElement("div");
    items.className = "items";
    ShowingGridWishList.appendChild(items);

    img = document.createElement("img");
    img.src = "Media/Store_recommended/gallery/" + bas[i].elPic;
    items.appendChild(img);

    Onvan = document.createElement("h1");
    Onvan.innerHTML = bas[i].elName;
    items.appendChild(Onvan);

    Price = document.createElement("span");
    Price.className = "Price";
    Price.innerHTML = bas[i].elPrice + "€";
    items.appendChild(Price);

    Delete = document.createElement("span");
    Delete.className = "DeleteBT";
    Delete.innerHTML = "Delete";
    items.appendChild(Delete);

    /* I set an attribute to delete bottom for using to delete it: */
    Delete.setAttribute("current-game-id", bas[i].elId);

    Delete.onclick = function () {
      /* alert(this.getAttribute("current-game-id")); */

      /* this code is for removing from bascket: */
      for (let [x, game] of bas.entries()) {
        if (game.elId == this.getAttribute("current-game-id")) {
          bas.splice(x, 1);
        }
      }

      localStorage.setItem("basket_WishList", JSON.stringify(bas));

      DeleteWishListAnim();
      setTimeout(() => {
        OpenWishList();
      }, 1000);
    };
  }

  /* for set bottom number too: */
  ShowGamesInWishListBT();
}

/* Animations for WishList: */
function OpenWishListAnim() {
  WishList.style.zIndex = "999";
  WishList.style.transform = " translateX(0px) translateY(0px)";
  WishList.style.opacity = "1";
  WishList.style.width = "100%";
  WishList.style.height = "100%";

  HolderWishList.style.height = "50px";
  HolderWishList.style.width = "50px";
  HolderWishList.style.transform = "translateX(450px) translateY(-400px) ";
  HolderWishList.style.opacity = "0";

  setTimeout(() => {
    HolderWishList.style.transform = "translateX(450px) translateY(200px) ";
    HolderWishList.style.opacity = "1";
    setTimeout(() => {
      setTimeout(() => {
        HolderWishList.style.transform = "translateX(450px) translateY(0px)";
        setTimeout(() => {
          HolderWishList.style.height = "80%";
          setTimeout(() => {
            HolderWishList.style.width = "40%";
            HolderWishList.style.transform =
              "translateX(150px) translateY(0px)";
            setTimeout(() => {
              CloseWishListBT.style.opacity = "1";
              CloseWishListBT.style.transform = "translateY(0px)";
            }, 1000);
          }, 500);
        }, 500);
      }, 100);
    }, 500);
  }, 500);
}
function CloseWishListAnim() {
  CloseWishListBT.style.opacity = "0";
  CloseWishListBT.style.transform = "translateY(-200px)";

  HolderWishList.style.width = "50px";
  HolderWishList.style.transform = "translateX(450px) ";

  setTimeout(() => {
    HolderWishList.style.height = "50px";
    HolderWishList.style.transform = "translateX(450px) translateY(200px) ";

    setTimeout(() => {
      HolderWishList.style.transform = "translateX(450px) translateY(-200px) ";
      HolderWishList.style.opacity = "0";
      setTimeout(() => {
        WishList.style.transform = " translateX(1140px) translateY(105px)";
        setTimeout(() => {
          WishList.style.opacity = "0";
        }, 200);
        WishList.style.width = "75px";
        WishList.style.height = "20px";
        WishList.style.zIndex = "1";
      }, 200);
    }, 500);
  }, 500);
}
