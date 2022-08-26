"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const fetchImages = fetchDogs();
  const dogBreeds = fetchDogs("https://dog.ceo/api/breeds/list/all"); 
  dogImages(fetchImages);
  dogTypes(dogBreeds);

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
function liHandler(event) {
  this.hasAttribute("style")
    ? this.removeAttribute("style")
    : this.setAttribute("style", "color: #565857;");
}

function dogTypes(promise) {
  promise.then(({ message }) => {
    displayListOfDogs(message);
    const allListItems = document.querySelectorAll("li");
    const select = document.querySelector('select')
    Array.from(allListItems).forEach((li) =>
      li.addEventListener("click", liHandler)
    );
    select.addEventListener('change',onchangeHandler.bind(message))
  });
}
function displayListOfDogs(dogsObj) {
  const ulDogBreeds = document.querySelector("#dog-breeds");
  ulDogBreeds.textContent = ''

  for (const breed in dogsObj) {   
    
    if (dogsObj[breed].length) {      
      for (const subreed of dogsObj[breed]) {
        const li = createElement("li");       
        li.textContent = `${breed} - ${subreed}`;
        ulDogBreeds.append(li);
      }      
      
    } else {
      const li = createElement("li");       
        li.textContent = `${breed} `;
        ulDogBreeds.append(li);
    }
    
  }
}

function onchangeHandler(event){
  const { target } = event
  const filteredDogs = filterDog(this,target.value)
  console.log(filteredDogs)
  displayListOfDogs(filteredDogs)
}

function filterDog(dogObj, q=''){
  //console.log(dogObj)
  if(q){
    //use query to filter and return the results
    const newObj = {}
    const dogStartWithQuery = Object.keys(dogObj).filter(dog => dog.toLowerCase().startsWith(q.toLowerCase()))
    for(const dog of dogStartWithQuery){
      
      if(Array.isArray(dogObj[dog])){
        const listSubbreed = [...dogObj[dog]]
        newObj[dog] = listSubbreed
      }
      else{
        newObj[dog] = []
      }
    }
    return newObj  

  }
  return dogObj

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
