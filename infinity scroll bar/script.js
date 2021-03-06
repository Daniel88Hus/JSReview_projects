const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
  
  
  // unsplash API 
  const count = 30;
  const apiKey = 'YOUR_ACCESS_KEY'; 
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

  // check if all images were loaded
  function imageLoaded(){
    // console.log('image loaded');
    imagesLoaded++;
    // console.log('imagesLoaded: ', imagesLoaded)
    if (imagesLoaded === totalImages) {
      ready = true ;
      loader.hidden = true;
      // console.log('ready = ', ready); 
    }
  }

//  helper function to set Attributes on DOM elements
function setAttributes(element, attributes){
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}
  // create Elements and add to DOM
  function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
      const item = document.createElement('a');
      // item.setAttribute('href', photo.links.html);
      // item.setAttribute('target', '_blank');
      // create img tag for photo
      setAttributes(item, {
        href : photo.links.html,
        target : '_blank',
        
      });
      const img = document.createElement('img');
      // img.setAttribute('src', photo.urls.regular);
      // img.setAttribute('alt', photo.alt_description);
      // img.setAttribute('title', photo.alt_description);
      setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      });
      //  Event Listener, check when each is finished loading
      img.addEventListener('load',imageLoaded);
      item.appendChild(img);
      imageContainer.appendChild(item);
    });
  }


  // GET Photos from unsplash API 
  async function getPhotos(){
    try{
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
      // console.log(photosArray);
    }catch (error) {

    }
  }

  //  check to see if scrolling near bottom of page, load more pictures
  window.addEventListener('scroll',() => {
    // console.log('scrolled');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
      // console.log(ready)
      // console.log('load more');
      getPhotos();

    }
  })
  // on load
  getPhotos();