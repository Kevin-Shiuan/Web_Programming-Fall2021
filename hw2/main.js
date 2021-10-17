//alert("This alert box was called with the onload event");

let mainImg = document.getElementById("mainImg"),
    mainImageWrapper = document.getElementById("mainImageWrapper"),
    albumsList  = document.getElementById("albumsList"),
    albumsInAlbumsList = document.getElementsByClassName("albums"),
    nameOfSelectedAlbum = document.getElementById("nameOfSelectedAlbum"),
    photosList = document.getElementById("photosList"),
    photosInPhotosList = document.getElementsByClassName("photos"),
    nameOfSelectedPhoto = document.getElementById("nameOfSelectedPhoto"),
    totalNum = document.getElementById("totalNum"),
    tag = document.getElementById("tag"),
    moreInfo = document.getElementById("moreInfo"),
    activeAlbum = document.getElementById("selectedAlbum"),
    deleteAlbumButton = document.getElementById("deleteAlbum"),
    deletePhotoButton = document.getElementById("deletePhoto"),
    newAlbumButton = document.getElementById("newAlbum");

class album{
    constructor(name, data) {
        this.nameOfAlbum = name;
        this.dataList = data;
        this.index = 0;
    }
    numOfPhotos(){
        return this.dataList.length;
    }
    name(){
        return this.nameOfAlbum;
    }
    cover(){
        if(this.dataList.length){
            return this.dataList[0];
        }
    }
    setPhotoList(){
        nameOfSelectedAlbum.innerHTML=this.name();
        deletePhotoButton.setAttribute('onclick',`deletePhoto(${this.name()})`);
        tag.innerHTML=`${this.index+1} / ${this.numOfPhotos()} photos`;
        for(var i=0;i<this.dataList.length;i++){
            let photoNode = document.createElement("div"),
                previewImg = document.createElement("img");
            previewImg.src = this.dataList[i];
            photoNode.appendChild(previewImg);
            photoNode.setAttribute('class',"photos default");
            photosList.appendChild(photoNode);
        }
        this.setAddButton();
    }
    setAddButton(){
        let addButton = document.createElement("div"),
        div = document.createElement("div"),
        icon = document.createElement("img"),
        buttonText = document.createElement("p");
        icon.src = "resources/add.svg";
        buttonText.innerHTML="ADD PHOTO";
        buttonText.setAttribute('class',"button");
        div.appendChild(icon);
        div.appendChild(buttonText);
        addButton.appendChild(div);
        addButton.setAttribute('class',"photos add");
        photosList.appendChild(addButton);
    }
    initialize(){
        while(photosList.firstChild){
            photosList.removeChild(photosList.firstChild);
        }
        if(this.dataList.length){
            this.setPhotoList();
            for(var i=0;i<this.dataList.length;i++){
                photosInPhotosList[i].setAttribute('onclick',`setImg(${this.name()}, ${i})`);
            }
            if(this.dataList.length){
                setMainImg(this.dataList[this.index]);
                nameOfSelectedPhoto.innerHTML = `${this.name()} ${this.index} (name of photo)`;
                moreInfo.innerHTML = "October 09, 2021 at Tainan, Taiwan";
                photosInPhotosList[this.index].classList.toggle("default");
                photosInPhotosList[this.index].classList.toggle("selectedPhoto");
            }
        }
        else {
            //to-to imgWrapper
            this.setAddButton();
            clearMainImg();
            nameOfSelectedAlbum.innerHTML=this.name();
            nameOfSelectedPhoto.innerHTML="&nbsp";
            moreInfo.innerHTML = "&nbsp";
            tag.innerHTML="0 / 0} photos";
            alert("This album is empty, add photos to make it awesome!");
        }
    }
}

function setImg(albumName, n){
    setMainImg(albumName.dataList[n]);
    photosInPhotosList[albumName.index].classList.toggle("default");
    photosInPhotosList[albumName.index].classList.toggle("selectedPhoto");
    photosInPhotosList[n].classList.toggle("default");
    photosInPhotosList[n].classList.toggle("selectedPhoto");
    albumName.index = n;
    nameOfSelectedPhoto.innerHTML = `${albumName.name()} ${n} (name of photo)`;
    moreInfo.innerHTML = "October 09, 2021 at Tainan, Taiwan";
    tag.innerHTML=`${n+1} / ${albumName.numOfPhotos()} photos`;
 }
 function setMainImg(url){
    while(mainImageWrapper.firstChild){
        mainImageWrapper.removeChild(mainImageWrapper.firstChild);
    }
    let img = document.createElement("img");
        img.setAttribute('id',"mainImg");
        img.setAttribute('src',url);
        mainImageWrapper.appendChild(img);
 }
 function clearMainImg(){
    while(mainImageWrapper.firstChild){
        mainImageWrapper.removeChild(mainImageWrapper.firstChild);
    }
 }

class gallery{
    constructor(name, data) {
        this.name = name;
        this.dataList = data;
        this.index = 0;
        this.initialize();
    }
    numOfAlbums(){
        return dataList.length;
    }
    setAlbumsList(){
        let totalNumOfPhotos=0;
        for(var i=0;i<this.dataList.length;i++){
            totalNumOfPhotos+=this.dataList[i].numOfPhotos();
            let albumNode = document.createElement("div"),
                albumCover = document.createElement("img"),
                albumDescription = document.createElement("div"),
                albumName = document.createElement("h5"),
                captions = document.createElement("h6");
            albumNode.setAttribute('class',"albums default");
            if(!this.dataList[i].cover()){
                albumCover.src="https://source.unsplash.com/random";
            }
            else albumCover.src = this.dataList[i].cover();
            albumNode.appendChild(albumCover);
            albumDescription.setAttribute('class',"albumDescription");
            albumName.innerHTML=this.dataList[i].name();
            captions.innerHTML=`${this.dataList[i].numOfPhotos()} photos`;
            albumDescription.appendChild(albumName);
            albumDescription.appendChild(captions);
            albumNode.appendChild(albumDescription);
            albumsList.appendChild(albumNode);
        }
        totalNum.innerHTML = `${this.dataList.length} albums, ${totalNumOfPhotos} photos`;
    }
    clear(){
        while(photosList.firstChild){
            photosList.removeChild(photosList.firstChild);
        }
        //todo mainImageWrapper
        clearMainImg();
    }
    initialize(){
        deleteAlbumButton.setAttribute('onclick',`deleteAlbum(${this.name})`);
        newAlbumButton.setAttribute('onclick', `createNewAlbum(${this.name})`)
        while(albumsList.firstChild){
            albumsList.removeChild(albumsList.firstChild);
        }
        if(this.dataList.length){
            this.setAlbumsList();
            this.dataList[this.index].initialize();
            albumsInAlbumsList[this.index].classList.toggle("default");
            albumsInAlbumsList[this.index].classList.toggle("selectedAlbum");
            for(var i=0;i<this.dataList.length;i++){
                albumsInAlbumsList[i].setAttribute('onclick',`setAlbum(${this.name}, ${i})`);
            }
        }
        else this.clear();
    }
}

function setAlbum(gallery, n){
    albumsInAlbumsList[gallery.index].classList.toggle("default");
    albumsInAlbumsList[gallery.index].classList.toggle("selectedAlbum");
    albumsInAlbumsList[n].classList.toggle("default");
    albumsInAlbumsList[n].classList.toggle("selectedAlbum");
    gallery.dataList[n].initialize();
    gallery.index = n;
 }

function deleteAlbum(gallery){
    var alert = confirm("Are you sure you want to delete this album?");
    if (alert) {
        gallery.dataList.splice(gallery.index, 1);
        gallery.index--;
        if(gallery.index<0){gallery.index=0;}// to be modified
        gallery.initialize();
    }
 }
function deletePhoto(album){
    var alert = confirm("Are you sure you want to delete this photo?");
    if (alert) {
        album.dataList.splice(album.index, 1);
        album.index--;
        if(album.index<0){album.index=0;}// to be modified
        album.initialize();
    }
 }
 function createNewAlbum(gallery){
    let name,
        input = prompt("Please enter new album name", "New Album");
    if (input == null || input == "") {
      name = "New Album";
    } else {
      name = input;
    }
    gallery.dataList.push(new album(name,[]));
    gallery.initialize();
 }




// main

var Surf = new album("Surf", [  "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                                "https://images.unsplash.com/photo-1455729552865-3658a5d39692?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                                "https://images.unsplash.com/photo-1520443240718-fce21901db79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
                                "https://images.unsplash.com/photo-1519789110007-0e751882be76?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                                "https://images.unsplash.com/uploads/141219200475673afcb68/f5bd8360?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                                "https://images.unsplash.com/photo-1530870110042-98b2cb110834?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                                "https://images.unsplash.com/photo-1579374358521-7b4fa4b276d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                            ]),
    Skate = new album("Skate", [    "https://images.unsplash.com/photo-1520796738119-1bae68104970?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                                    "https://images.unsplash.com/photo-1566796195789-d5a59f97235b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                                    "https://images.unsplash.com/photo-1478427433968-28045906c1dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
                                    "https://images.unsplash.com/photo-1542531365-8cedfed02b04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                                    "https://images.unsplash.com/photo-1542299642-a194ad3a7199?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                                    "https://images.unsplash.com/photo-1534531304203-b830551771b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
                                    "https://images.unsplash.com/photo-1445251836269-d158eaa028a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
                                    "https://images.unsplash.com/photo-1564245739699-b5112ea665fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                                 ]),
    Buildings = new album("Buildings",[ "https://images.unsplash.com/photo-1634274641199-ff7262c61d1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                                        "https://images.unsplash.com/photo-1634274637395-5380b2dbdf28?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                                        ]),
    EmptyAlbum = new album("EmptyAlbum",[]);

 var Gallery = new gallery("Gallery",[Surf, Skate, Buildings, EmptyAlbum]);

