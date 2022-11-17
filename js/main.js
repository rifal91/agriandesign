// Popup
  var poBrief = document.getElementById('brief');
  var lb = document.getElementById('lightbox');
  var popup = document.getElementById('popup');
  var poFeeds = document.getElementById('popupFeeds');
  var poCrea = document.getElementById('popupCreations');
  var poBanner = document.getElementById('popupBanner');
  var form = document.getElementById('form');

function showPopup(){
  lb.style.left = "0vw";
}

function showPopupFeeds() {
  poFeeds.style.left = "10vw";
  poCrea.style.left = "-350vw";
  poBanner.style.left = "-350vw";
  poBrief.style.left = "100vw";
    form.style.left = "100vw";
}

function showPopupBanner() {
  poBanner.style.left = "10vw";
  poCrea.style.left = "-350vw";
  poFeeds.style.left = "-350vw";
  poBrief.style.left = "100vw";
  form.style.left = "100vw";
}

function showPopupCreations() {
  poCrea.style.left = "10vw";
  poBanner.style.left = "-350vw";
  poFeeds.style.left = "-350vw";
  poBrief.style.left = "100vw";
  form.style.left = "100vw";
}

function nextForm() {
  if(waName.value == "" || waEmail.value == "" || waNumber.value == "" || waUrl.value == ""){
  form.style.left = "5vw";
}

  else {
  poBrief.style.left = "5vw";
  form.style.left = "100vw";    
  }
  poBanner.style.left = "-350vw";
  poFeeds.style.left = "-350vw";
  poCrea.style.left = "-350vw";
}

function backForm() {
  poBrief.style.left = "100vw";
  form.style.left = "5vw";
  poBanner.style.left = "-350vw";
  poFeeds.style.left = "-350vw";
  poCrea.style.left = "-350vw";
}

var waName = document.getElementById('wa_name');
var waEmail = document.getElementById('wa_email');
var waNumber = document.getElementById('wa_number');
var waUrl = document.getElementById('wa_url');

function showPopupBrief() {
  poBrief.style.left = "100vw";
  form.style.left = "5vw";

}


function closePopup(){
  lb.style.left = "-200vw";
  poBanner.style.left = "-350vw";
  poCrea.style.left = "-350vw";
  poFeeds.style.left = "-350vw";
  poBrief.style.left = "100vw";
  form.style.left = "100vw";
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

