const INITIAL_GALLERY_INFO = [
  {
    src: "./img/img_forest.jpg",
    description: "Красивый зеленый лес"
  },
  { src: "./img/img_5terre.jpg",
    description: "Великолепный приморский город" 
  },
  {
    src: "./img/img_lights.jpg",
    description: "Фантастическое северное сияние"
  },
  {
    src: "./img/img_mountains.jpg",
    description: "Завораживающие Карпатские горы"
  },
  { src: "./img/img_forest.jpg",
    description: "Красивый зеленый лес" 
  },
  { src: "./img/img_5terre.jpg",
    description: "Великолепный приморский город"
  },
  {
    src: "./img/img_lights.jpg",
    description: "Фантастическое северное сияние"
  },
  {
    src: "./img/img_mountains.jpg",
    description: "Завораживающие Карпатские горы"
  }
];

const GALLERY = "GALLERY_ITEMS";

let galleryList;

const getItemFromStorage = () => {
  const item = localStorage.getItem(GALLERY);
  return JSON.parse(item);
};

const setItemInStorage = value => {
  localStorage.setItem(GALLERY, JSON.stringify(value));
  return getItemFromStorage(GALLERY);
};

const removeImageFromGallery = index => {
  let clearedGalleryList = [...galleryList];
  clearedGalleryList.splice(index, 1);
  galleryList = setItemInStorage(clearedGalleryList);
  renderGallery();
};

function initApp() {
  galleryList = getItemFromStorage();
  if (!galleryList) {
    galleryList = setItemInStorage(INITIAL_GALLERY_INFO);
  }
  renderGallery();
}

let gallery = document.querySelector("#gallery");

function renderGallery() {
  gallery.innerHTML = "";
  galleryList.forEach((element, index) => addImageToGallery(element, index));
}

function search(inputValue) {
  let response;
  if (inputValue) {
    response = galleryList.filter(item => {
      for (let key in item) {
        if (item[key].toLowerCase().includes(inputValue.toLowerCase())) {
          return item;
        }
      }
    });
  }
  if (response.length === 0) {
    alert("No matches found");
  } else {
    gallery.innerHTML = null;
    response.forEach((element, index) => addImageToGallery(element, index));
  }
}

let searchInput = document.getElementById("searchImage");

searchInput.addEventListener("keydown", function() {
  if (event.keyCode === 13) {
    inputValue = searchInput.value;
    search(inputValue);
  }
});

document.querySelector("#myGallery").addEventListener("click", function() {
  gallery.innerHTML = null;
  renderGallery();
});

let imageLink = document.querySelector("#link");
let imageDescription = document.querySelector("#disc");
let uploadButton = document.querySelector("#sendImage");

const addImageToGallery = (galleryItem, index) => {
  let galleryElement = document.createElement("div");
  galleryElement.className = "galleryElement";
  let picture = document.createElement("img");
  picture.src = galleryItem.src;
  let description = document.createElement("p");
  description.textContent = galleryItem.description;
  let deleteButton = document.createElement("i");
  deleteButton.addEventListener("click", () => {
    removeImageFromGallery(index);
  });
  deleteButton.textContent = "delete";
  deleteButton.className = "material-icons deleteButton";
  galleryElement.appendChild(picture);
  galleryElement.appendChild(description);
  galleryElement.appendChild(deleteButton);
  gallery.appendChild(galleryElement);
};

function saveImage(imageLink, imageDescription) {
  galleryList = setItemInStorage([
    ...galleryList,
    { src: imageLink, description: imageDescription }
  ]);
  addImageToGallery(
    { src: imageLink, description: imageDescription },
    galleryList.length - 1
  );
}

let imageLoaderPlaceholder = "";
let imageLoader = document.querySelector("#imageLoader");

uploadButton.addEventListener("click", function() {
  imageDescription = imageDescription.value;
  if (!imageLink.value && !imageLoader.value) {
    alert('Choose your photo')
  }
  else if (imageLink.value) {
    imageLink = imageLink.value;
    saveImage(imageLink, imageDescription);
  }
  else if (imageLoader.value) {
  readURL(imageLoader);
  }
  document.querySelector('#close').click(); 
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      imageLoaderPlaceholder = e.target.result;
      saveImage(imageLoaderPlaceholder, imageDescription);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

initApp();
