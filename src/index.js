'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const fetchImages = fetchDogs();
  const dogBreeds = fetchDogs("https://dog.ceo/api/breeds/list/all");
  
  dogImages(fetchImages);
  dogTypes(dogBreeds)
  
});

function fetchDogs(url = "https://dog.ceo/api/breeds/image/random/4") {
  return fetch(url).then((response) => response.json());
}

function dogImages(promise) {
  promise
    .then(({ message }) => {
      message.forEach((dogUrl) => {
        const img = createElement("img", { src: dogUrl });
        const dogContainerDiv = document.querySelector("#dog-image-container");
        dogContainerDiv.append(img);
      });
    })
    .catch((error) => console.error(error.message));
}
function liHandler(event){
  this.hasAttribute('style') ? this.removeAttribute('style') : this.setAttribute('style', 'color: #565857;')   
    
}

function dogTypes(promise) {
  promise
  .then(({message}) => {
    displayListOfDogs(message)
    const allListItems = document.querySelectorAll('li')   
    Array.from(allListItems).forEach(li => li.addEventListener('click', liHandler))

  });
}
function displayListOfDogs(dogsObj){
    const ulDogBreeds = document.querySelector('#dog-breeds')
    
    for(const breed in dogsObj){
        const li = createElement('li')
        li.textContent = breed
        if(dogsObj[breed].length ){
            const ulNested = createElement('ul')
            for(const subreed of dogsObj[breed]){
                const liNested = createElement('li')
                liNested.textContent = subreed
                ulNested.append(liNested)
            }
            li.append(ulNested)
        }else{
            continue
        }
        ulDogBreeds.append(li)

    }
    


}
function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  if (Object.keys(attributes).length > 0) {
    for (const attr in attributes) {
      element.setAttribute(attr, attributes[attr]);
    }
    return element;
  }
  return element;
}
//console.log('%c HI', 'color: firebrick')
