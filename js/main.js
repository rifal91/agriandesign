




// Popup
function showPopup(){
  var lb = document.getElementById('lightbox');
  var popup = document.getElementById('popup');
  lb.style.left = "0vw";
}

function showPopupFeeds() {
  var poFeeds = document.getElementById('popupFeeds');
  var poCrea = document.getElementById('popupCreations');
  var poBanner = document.getElementById('popupBanner');
  poFeeds.style.left = "10vw";
  poCrea.style.left = "-350vw";
  poBanner.style.left = "-350vw";
}

function showPopupBanner() {
  var poFeeds = document.getElementById('popupFeeds');
  var poCrea = document.getElementById('popupCreations');
  var poBanner = document.getElementById('popupBanner');
  poBanner.style.left = "10vw";
  poCrea.style.left = "-350vw";
  poFeeds.style.left = "-350vw";
}

function showPopupCreations() {
  var poFeeds = document.getElementById('popupFeeds');
  var poCrea = document.getElementById('popupCreations');
  var poBanner = document.getElementById('popupBanner');
  poCrea.style.left = "10vw";
  poBanner.style.left = "-350vw";
  poFeeds.style.left = "-350vw";
}

function closePopup(){
  var lb = document.getElementById('lightbox');
  var popup = document.getElementById('popup');
  var cpopup = document.getElementById('closePopup');

  lb.style.left = "-200vw";
  var poBanner = document.getElementById('popupBanner');
  var poCrea = document.getElementById('popupCreations');
  var poFeeds = document.getElementById('popupFeeds');


  poBanner.style.left = "350vw";
  poCrea.style.left = "350vw";
  poFeeds.style.left = "350vw";

}

var elem = document.documentElement;
var awal = document.getElementById('awal');
function openFullscreen() {
    awal.style.left = '-200vh';
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function openNavMobile (){
  var lbm = document.getElementById('lightboxMobile');
  var iconNav = document.getElementById('iconNav');
  var navMobile = document.getElementById('navMobile');

  lbm.style.left = "0vh";
  navMobile.style.top = "20vh";
}

function closeNav (){
  var lbm = document.getElementById('lightboxMobile');
  var iconNav = document.getElementById('iconNav');
  var navMobile = document.getElementById('navMobile');
  lbm.style.left = "-200vh";
  navMobile.style.top = "100vh";
}