/* const minigalItems = document.querySelectorAll(
  ".detail > .minigal > .items_img "
);

const minigal = document.querySelectorAll(".detail > .minigal");

const bigshow = document.getElementsByClassName("BigShow");
 */
function select(x) {
  minigalItems[x].onmouseover = function () {
    bigshow[0].src = minigalItems[x].src;
  };
}
select(0);
select(1);
select(2);
select(3);

function Diselect() {
  minigal[0].onmouseout = function () {
    bigshow[0].src = "Media/Store_recommended/gallery/01_1.png";
  };
}
Diselect();
