function showModal(pid) {
  /* scrolling with transition: */
  window.scrollTo({
    top: 100,
    behavior: "smooth",
  });

  ShowingModal.className = "showingModal_Search";

  /* for entering Madal from StoreSection SlideShow */
  StoreSection.style.height = "80px";
  ShortCutsTitles.style.display = "none";
  otherholder.style.display = "none";
  /*  */

  setTimeout(() => {
    DetailHolderSearching.style.display = "none";
  }, 500);

  searchingBackground.style.transition = "1s";
  searchingBackground.style.opacity = 0;

  curEL = GamesData.find((el) => {
    return el.numberOfgame == pid;
  });

  AddCartBT.setAttribute("data-id", curEL.numberOfgame);
  AddWishListBT.setAttribute("data-id", curEL.numberOfgame);

  Modal_BigPic.src = "Media/Store_recommended/gallery/" + curEL.GameImages[1];
  Modal_Pic1.src = "Media/Store_recommended/gallery/" + curEL.GameImages[1];
  Modal_Pic2.src = "Media/Store_recommended/gallery/" + curEL.GameImages[2];
  Modal_Pic3.src = "Media/Store_recommended/gallery/" + curEL.GameImages[3];
  Modal_Pic4.src = "Media/Store_recommended/gallery/" + curEL.GameImages[0];

  onvanPic.src = "Media/Store_recommended/gallery/" + curEL.GameImages[0];

  Modal_GameName.innerHTML = curEL.GameName;

  AddCartBT.innerHTML = 'Add To Cart "' + curEL.PriceWithDiscount + '€"';
  AddWishListBT.innerHTML = "Add To WishList";
}

function CloseModalFunction() {
  ShowingModal.className = "hidingModal_Search";

  DetailHolderSearching.style.display = "flex";

  searchingBackground.style.transition = "1s";
  searchingBackground.style.opacity = 1;

  if (EnteringFromSore_Slider == true) {
    EnteringFromSore_Slider = false;
    Going_StoreSection();

    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  }
}

Modal_Pic1.onclick = function () {
  Modal_BigPic.src = Modal_Pic1.src;
};

Modal_Pic2.onclick = function () {
  Modal_BigPic.src = Modal_Pic2.src;
};

Modal_Pic3.onclick = function () {
  Modal_BigPic.src = Modal_Pic3.src;
};

Modal_Pic4.onclick = function () {
  Modal_BigPic.src = Modal_Pic4.src;
};

closeModal.onclick = function () {
  CloseModalFunction();
};
