

function removeActiveClass(){
  const activeButton = document.getElementsByClassName("active");

  for(let btn of activeButton){
    btn.classList.remove("active");
  }
  // console.log(activeButton);
}




function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));
}



function displayCategories(categories) {

    const categoryContainer = document.getElementById("category-container");

    for (let cat of categories) {
        // console.log(cat)

        const categoryDiv = document.createElement("div");


        categoryDiv.innerHTML = `
         <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})"    class="btn btn-sm hover:bg-red-600 hover:text-white">${cat.category}</button>
        `;


        categoryContainer.append(categoryDiv);
    }

}


function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response)=>response.json())
    .then((data)=> {
       removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}


const loadCategoriesVideos=(id)=>{
    console.log(id)
    const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `;
    console.log(url);
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
      removeActiveClass()
      const clickedButton= document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
     
      displayVideos(data.category)
    });
}




const displayVideos=(Videos)=>{

const videoContainer= document.getElementById("video-container");

videoContainer.innerHTML= "";

if(Videos.length==0){
  videoContainer.innerHTML=`
   <div class="col-span-full flex flex-col text-center justify-center items-center py-20">
            <img class="w-[120px]" src="./asset/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Opps sorry there is no content here</h2>
        </div>
  `
  
  return;
}

Videos.forEach((video)=>{
    console.log(video);

    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
       <div class="card bg-base-100">
  <figure class="relative">
    <img class="w-full h-[150px] object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
     <span class="absolute bottom-2 right-2 text-white bg-black px-2 text-sm rounded ">3hrs 56 min ago</span>
  </figure>
  <div class="flex gap-3 px-1 py-5">
    <div class="profile">
        <div class="avatar">
  <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
    <img src="${video.authors[0].profile_picture}" />
  </div>
</div>
    </div>
    <div class="intro">
        <h2 class="text-sm font-semibold">Midnight Serenade</h2>
        <p class="text-sm text-gray-400 flex gap-1"> 
        ${video.authors[0].profile_name}
        <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png" alt=""></p>
        <p class="text-sm text-gray-400">${video.others.views}</p>
    </div>
    
    
   
  </div>
  <button onclick="loadVideoDetails" class="btn btn-block">Show Details</button>
</div>
     `
     videoContainer.append(videoCard)
})


}


loadCategories();
// loadVideos();