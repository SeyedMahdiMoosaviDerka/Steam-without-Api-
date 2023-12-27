/* show modalfunction: */

/* for remove all of localstorage: */
/* localStorage.removeItem("basket"); */

function ShowGamesInCartBT() {
  bas_Cart = JSON.parse(localStorage.getItem("basket"));
  BasQuantity = bas_Cart.length;
  OpenCartBT.innerHTML = "CART(" + BasQuantity + ")";
}
/* I call upper function for first time: */
ShowGamesInCartBT();

function AddToCartAnim() {
  AddCartBT.style.transition = "0.4s";
  AddCartBT.style.color = "transparent";

  AddToCartAnimInterval = setInterval(() => {
    OpenCartBT.style.scale = "1.5";
    setTimeout(() => {
      OpenCartBT.style.scale = "1";
    }, 300);
  }, 600);

  setTimeout(() => {
    clearInterval(AddToCartAnimInterval);
  }, 3000);

  setTimeout(() => {
    AddCartBT.innerHTML = "Added To Cart";
    AddCartBT.style.color = "white";
    AddCartBT.style.backgroundColor = "green";

    setTimeout(() => {
      AddCartBT.style.backgroundColor = "#67c1f546";
      AddCartBT.style.color = "#67c1f5";
    }, 2000);
  }, 1000);
}

AddCartBT.onclick = function () {
  let cid = this.getAttribute("data-id");

  let curEL = GamesData.find((el) => el.numberOfgame == cid);

  let elId = cid;
  let elName = curEL.GameName;
  let elPic = curEL.GameImages[0];
  let elPrice = curEL.PriceWithDiscount;
  let elQuantity = 1;

  let bas = JSON.parse(localStorage.getItem("basket"));

  if (!bas) {
    bas = [];
  }

  basIndex = bas.findIndex((el) => el.elId == cid);

  if (basIndex == -1) {
    bas.push({ elId, elPic, elPrice, elQuantity, elName });
  } else {
    bas[basIndex].elQuantity++;
  }

  localStorage.setItem("basket", JSON.stringify(bas));

  ShowGamesInCartBT();

  AddToCartAnim();
};

OpenCartBT.onclick = function () {
  OpenCart();
  OpenCartAnim();
};

function DeleteCartAnim() {
  ShowingGridCart.style.transform = "translateY(-10px)";
  ShowingGridCart.style.opacity = "0";

  setTimeout(() => {
    ShowingGridCart.style.transform = "translateY(0px)";
    ShowingGridCart.style.opacity = "1";
  }, 1000);
}

/* Main fucnction for cart: */
function CloseCart() {
  CloseCartAnim();
}

function OpenCart() {
  /* OpenCartAnim(); */

  let bas = JSON.parse(localStorage.getItem("basket"));

  ShowingGridCart.innerHTML = "";

  CurrentGameTotalPrice = 0;

  function emptyCartAlert() {
    if (bas.length == 0) {
      TotalPrice.innerHTML = 0 + "€";

      noting = document.createElement("p");
      noting.innerHTML = "You'r Cart Is Empty !";
      ShowingGridCart.appendChild(noting);
    }
  }

  for (i = 0; i < bas.length; i++) {
    items = document.createElement("div");
    items.className = "items";
    ShowingGridCart.appendChild(items);

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

    Quantity = document.createElement("span");
    Quantity.className = "Quantity";
    Quantity.innerHTML = bas[i].elQuantity;
    items.appendChild(Quantity);

    /*  Making Total Price: */
    CurrentGameTotalPrice =
      CurrentGameTotalPrice + bas[i].elPrice * bas[i].elQuantity;

    TotalPrice.innerHTML = CurrentGameTotalPrice + "€";

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

      localStorage.setItem("basket", JSON.stringify(bas));

      DeleteCartAnim();
      setTimeout(() => {
        OpenCart();
        emptyCartAlert();
      }, 1000);

      /* for set bottom number too: */
    };
  }

  ShowGamesInCartBT();
  emptyCartAlert();
}

/* Animations for Cart: */
function OpenCartAnim() {
  Cart.style.zIndex = "999";
  Cart.style.transform = " translateX(0px) translateY(0px)";
  Cart.style.opacity = "1";
  Cart.style.width = "100%";
  Cart.style.height = "100%";

  HolderCart.style.height = "50px";
  HolderCart.style.width = "50px";
  HolderCart.style.transform = "translateX(450px) translateY(-400px) ";
  HolderCart.style.opacity = "0";

  setTimeout(() => {
    HolderCart.style.transform = "translateX(450px) translateY(200px) ";
    HolderCart.style.opacity = "1";
    setTimeout(() => {
      setTimeout(() => {
        HolderCart.style.transform = "translateX(450px) translateY(0px)";
        setTimeout(() => {
          HolderCart.style.height = "80%";
          setTimeout(() => {
            HolderCart.style.width = "60%";
            HolderCart.style.transform = "translateX(0) translateY(0px)";
            setTimeout(() => {
              CloseCartBT.style.opacity = "1";
              CloseCartBT.style.transform = "translateY(0px)";
            }, 1000);
          }, 500);
        }, 500);
      }, 100);
    }, 500);
  }, 500);
}
function CloseCartAnim() {
  CloseCartBT.style.opacity = "0";
  CloseCartBT.style.transform = "translateY(-200px)";

  HolderCart.style.width = "50px";
  HolderCart.style.transform = "translateX(450px) ";

  setTimeout(() => {
    HolderCart.style.height = "50px";
    HolderCart.style.transform = "translateX(450px) translateY(200px) ";

    setTimeout(() => {
      HolderCart.style.transform = "translateX(450px) translateY(-200px) ";
      HolderCart.style.opacity = "0";
      setTimeout(() => {
        Cart.style.transform = " translateX(1140px) translateY(105px)";
        setTimeout(() => {
          Cart.style.opacity = "0";
        }, 200);
        Cart.style.width = "75px";
        Cart.style.height = "20px";
        Cart.style.zIndex = "1";
      }, 200);
    }, 500);
  }, 500);
}

/* Payment BT */

function PayIsSucssess() {
  PayMentBT.style.color = "transparent";
  setTimeout(() => {
    PayMentBT.innerHTML = "";
  }, 100);

  PayMentBT.style.zIndex = "999";

  setTimeout(() => {
    PayMentBT.style.transform = "translateY(-100px)";
    PayMentBT.style.width = "100%";
    PayMentBT.style.height = "100%";
    PayMentBT.style.lineHeight = "140px";
    PayMentBT.style.fontSize = "26px";
    PayMentBT.style.opacity = "1";
    setTimeout(() => {
      PayMentBT.innerHTML = "Thank You!";
      PayMentBT.style.color = "white";

      setTimeout(() => {
        CloseCart();
      }, 500);

      setTimeout(() => {
        PayMentBT.innerHTML = "PAYMENT";
        PayMentBT.style.opacity = "0.9";
        PayMentBT.style.transform = "translateY(0px)";
        PayMentBT.style.width = "100px";
        PayMentBT.style.height = "30px";
        PayMentBT.style.lineHeight = "30px";
        PayMentBT.style.fontSize = "16px";
      }, 2000);
    }, 500);
  }, 500);
}

/*  */
