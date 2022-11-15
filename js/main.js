var nav = document.getElementById('nav'),
                        i = document.getElementById('i'),
                        c1 = document.getElementsByTagName('div')[2],
                        c2 = document.getElementsByTagName('div')[3],
                        c3 = document.getElementsByTagName('div')[4];
                    i.addEventListener('click', function() {
                        if (nav.className.match(/\bopen\b/)) {
                            nav.classList.remove('open');
                            c1.classList.remove('close-c1');
                            c2.classList.remove('close-c2');
                            c3.classList.remove('close-c3');
                        } else {
                            nav.classList.add('open');
                            c1.classList.add('close-c1');
                            c2.classList.add('close-c2');
                            c3.classList.add('close-c3');
                        }
                    });
                    nav.addEventListener('click', function() {
                        nav.classList.remove('open');
                        c1.classList.remove('close-c1');
                        c2.classList.remove('close-c2');
                        c3.classList.remove('close-c3');
                    });




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
 
}

function showPopupBanner() {
  var poFeeds = document.getElementById('popupFeeds');
  var poCrea = document.getElementById('popupCreations');
  var poBanner = document.getElementById('popupBanner');
  poBanner.style.left = "10vw";
  poCrea.style.left = "350vw";
}

function showPopupCreations() {
  var poFeeds = document.getElementById('popupFeeds');
  var poCrea = document.getElementById('popupCreations');
  var poBanner = document.getElementById('popupBanner');
  poCrea.style.left = "10vw";
  poBanner.style.left = "350vw";

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