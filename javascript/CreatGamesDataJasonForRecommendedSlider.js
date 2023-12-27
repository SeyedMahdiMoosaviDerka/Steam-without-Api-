var RecommendedSlideShow_galleryTop = 0;
RecommendedSlideShow_gallery.style.top = RecommendedSlideShow_galleryTop + "px";

function RecommendedSlideShow_Click_Anim() {
  RecommendedSlideShow_gallery.style.animation =
    "nextSlide 0.5s linear" /* some custom animation */;
  setTimeout(() => {
    RecommendedSlideShow_gallery.style.animation = "";
  }, 500);
}

BigImgDefualt = "";
CurrentStatu = 0;
EnteringFromSore_Slider = false;

function Fill_SlideShow_StoreMenu(i) {
  StoreMenu_Slider_BigShow.src =
    "Media/Store_recommended/gallery/" + GamesData[i].GameImages[0];
  BigImgDefualt =
    "Media/Store_recommended/gallery/" + GamesData[i].GameImages[0];
  StoreMenu_Slider_GameName.innerHTML = GamesData[i].GameName;
  StoreMenu_Slider_MiniGal_Img1.src =
    "Media/Store_recommended/gallery/" + GamesData[i].GameImages[1];
  StoreMenu_Slider_MiniGal_Img2.src =
    "Media/Store_recommended/gallery/" + GamesData[i].GameImages[2];
  StoreMenu_Slider_MiniGal_Img3.src =
    "Media/Store_recommended/gallery/" + GamesData[i].GameImages[3];
  StoreMenu_Slider_MiniGal_Img4.src =
    "Media/Store_recommended/gallery/" + GamesData[i].GameImages[4];
  StoreMenu_Slider_GameTitle.innerHTML = GamesData[i].title;
  StoreMenu_Slider_GamePrice.innerHTML = GamesData[i].Price + " €";
  if (GamesData[i].Price == 0) {
    StoreMenu_Slider_GamePrice.innerHTML = "Free";
  }

  RecommendedSlideShow_gallery.onclick = function () {
    Going_SearchingSection();
    showModal(GamesData[i].numberOfgame);
    EnteringFromSore_Slider = true;
  };
}

Fill_SlideShow_StoreMenu(CurrentStatu);

function MiniGalHovering(i) {
  function LoadBigImgAnim() {
    StoreMenu_Slider_BigShow.style.opacity = "0";
    setTimeout(() => {
      StoreMenu_Slider_BigShow.style.opacity = "1";
    }, 100);
  }

  switch (i) {
    case 0:
      LoadBigImgAnim();
      setTimeout(() => {
        StoreMenu_Slider_BigShow.src = BigImgDefualt;
      }, 100);
      break;
    case 1:
      LoadBigImgAnim();
      setTimeout(() => {
        StoreMenu_Slider_BigShow.src = StoreMenu_Slider_MiniGal_Img1.src;
      }, 100);
      break;
    case 2:
      LoadBigImgAnim();
      setTimeout(() => {
        StoreMenu_Slider_BigShow.src = StoreMenu_Slider_MiniGal_Img2.src;
      }, 100);
      break;
    case 3:
      LoadBigImgAnim();
      setTimeout(() => {
        StoreMenu_Slider_BigShow.src = StoreMenu_Slider_MiniGal_Img3.src;
      }, 100);
      break;
    case 4:
      LoadBigImgAnim();
      setTimeout(() => {
        StoreMenu_Slider_BigShow.src = StoreMenu_Slider_MiniGal_Img4.src;
      }, 100);
      break;
  }
}

function RecommendedSlideShow_RightBottomClick() {
  RecommendedSlideShow_Click_Anim();
  if (CurrentStatu < GamesData.length - 1) {
    CurrentStatu++;
    setTimeout(() => {
      Fill_SlideShow_StoreMenu(CurrentStatu);
    }, 200);
  } else {
    CurrentStatu = 0;
    setTimeout(() => {
      Fill_SlideShow_StoreMenu(CurrentStatu);
    }, 200);
  }
  // console.log(CurrentStatu);
}

function RecommendedSlideShow_LeftBottomClick() {
  RecommendedSlideShow_Click_Anim();
  if (CurrentStatu > 0) {
    CurrentStatu--;
    setTimeout(() => {
      Fill_SlideShow_StoreMenu(CurrentStatu);
    }, 200);
  } else {
    CurrentStatu = GamesData.length - 1;
    setTimeout(() => {
      Fill_SlideShow_StoreMenu(CurrentStatu);
    }, 200);
  }
  // console.log(CurrentStatu);
}

function AutoMoveRecommendSlider() {
  if (StoreSection.style.display == "block") {
    function SliderInterval() {
      i = setInterval(() => {
        RecommendedSlideShow_RightBottomClick();
      }, 3000);
    }
    SliderInterval();
    RecommendedSlideShow.onmouseover = function () {
      clearInterval(i);
    };
    RecommendedSlideShow.onmouseleave = function () {
      SliderInterval();
    };
  } else clearInterval(i);
}
AutoMoveRecommendSlider();
