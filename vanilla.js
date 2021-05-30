// function authenticate() {
//   return gapi.auth2.getAuthInstance()
//       .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
//       .then(function() { 
//         console.log("Sign-in successful");
//         subscriptions();
//        },
//             function(err) { console.error("Error signing in", err); });
// }
// function loadClient() {
//   gapi.client.setApiKey("AIzaSyCVF2o3ai9GNNkiNBChrj1s-lXk4qzlX5Q");
//   return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//       .then(function() { console.log("GAPI client loaded for API"); },
//             function(err) { console.error("Error loading GAPI client for API", err); });
// }
// // Make sure the client is loaded and sign-in is complete before calling this method.
// function subscriptions() {
//   return gapi.client.youtube.subscriptions.list({
//     "part": [
//       "snippet,contentDetails"
//     ],
//     "mine": true
//   })
//       .then(function(response) {
//               // Handle the results here (response.result has the parsed body).
//               console.log("Response", response);
//             },
//             function(err) { console.error("Execute error", err); });
// }
// function SearchByKeyword(userKeyword) {
//   return gapi.client.youtube.search.list({
//     "part": [
//       "snippet"
//     ],
//     "maxResults": 25,
//     "q": userKeyword
//   })
//       .then(function(response) {
//               // Handle the results here (response.result has the parsed body).
//               console.log("Response", response);
//             },
//             function(err) { console.error("Execute error", err); });
// }
// gapi.load("client:auth2", function() {
//   gapi.auth2.init({client_id: "991356972821-i9san2lgmk39rjd93m3f4mivs6mecugt.apps.googleusercontent.com"});
// });




async function SearchByKeyword(keyWord) {
  let response_json = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyWord}&key=AIzaSyCVF2o3ai9GNNkiNBChrj1s-lXk4qzlX5Q`);
  let response_obj = response_json.json();
  return response_obj;
}

//1. question Channel Info :
async function channelInfo(channelId) {
  let response_json = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=AIzaSyCVF2o3ai9GNNkiNBChrj1s-lXk4qzlX5Q`);
  let response_obj = await response_json.json();
  return response_obj;
}
async function bannerFounder(channelId) {
  let response_json = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=AIzaSyCVF2o3ai9GNNkiNBChrj1s-lXk4qzlX5Q`);
  let response_obj = await response_json.json();
  return response_obj;
}

// <><><><><><><><><<><><><><><><><><><>< For Banner Creation <><><><><><><><><><><>
function seperateBanner(url) {
  let bannerImage = document.createElement("img");
  bannerImage.setAttribute("src" , url);
  return bannerImage;
}
// <><><><><><><><><<><><><><><><><><><>< For Banner Creation <><><><><><><><><><><>

// <><><><><><><><><<><><><><><><><><><>< For Description Creation <><><><><><><><><><><>
function descriptionBox(content , subArray) {

  let mainBox = document.createElement("div");
  mainBox.setAttribute("class" , "descriptionBox");


  //Description:
  let descriptionDiv = document.createElement("div");
  descriptionDiv.setAttribute("class" , "descriptionDiv");

  let tittleH4 = document.createElement("h4");
  tittleH4.textContent = "Description";

  let descriptionH4 = document.createElement("h4");
  descriptionH4.textContent = content;

  descriptionDiv.append(tittleH4 , descriptionH4);



  //Subscribersdeatails :
  let subDiv = document.createElement("div");
  subDiv.setAttribute("class" , "subDiv");

  let s_tittleH4 = document.createElement("h4");
  s_tittleH4.textContent = "Stats";

  let s_viewsH4 = document.createElement("h4");
  s_viewsH4.textContent = "Total Views      " + subArray[0];

  let s_subH4 = document.createElement("h4");
  s_subH4.textContent = "Subscribers      " + subArray[1];

  let s_videoH4 = document.createElement("h4");
  s_videoH4.textContent = "Videos     " + subArray[2]

  subDiv.append(s_tittleH4 , s_viewsH4 , s_subH4 , s_videoH4);



  mainBox.append(descriptionDiv , subDiv);
  return mainBox;

}
// <><><><><><><><><<><><><><><><><><><>< For Description Creation <><><><><><><><><><><>

// <><><><><><><><><<><><><><><><><><><>< For name Creation <><><><><><><><><><><>
function nameBoxCreator(url , name) {
  console.log(name);
  console.log(url);
  let mainBox2 = document.createElement("div");
  mainBox2.setAttribute("class" , "nameBox");

 
  let ownerImage = document.createElement("img");
  ownerImage.setAttribute("src" , url);
  let ownerName = document.createElement("h3");
  ownerName.textContent = name +  " " + "✅";

  mainBox2.append(ownerImage , ownerName);
  return mainBox2;

}
// <><><><><><><><><<><><><><><><><><><>< For name Creation <><><><><><><><><><><>




// <><><><><><><>><><><><><><><><><><><><><><><><><><><><
function uiForChannelInfo(myArray) {
  // console.log("IAm called from uichannel");
  //First we want to clear the preLoaded channel 


  
  
  let bannerDiv = document.createElement("div");
  bannerDiv.setAttribute("class" , "bannerDiv");
  // 1 . first bannerImage :
  bannerDiv.append(seperateBanner(myArray[0]));
  // 2 . name :
  let row2 = nameBoxCreator(myArray[myArray.length - 1] , myArray[1]);

  let row3 = descriptionBox(myArray[2] , myArray[3]);
  videoSectionDiv.append(bannerDiv ,row2, row3);
  console.log(videoSectionDiv);
  
}








//WE WANT TO EXCUTE THIS PROCESS : 
//FOR THE WE WANT TO LISTEN THE SERACH BUTON :
//1 . fro ques1:
let videoSectionDiv = document.querySelector(".videoSection");
let channelInfoArray = [];
let mainForm = document.querySelector("form");
mainForm.addEventListener(('submit') , (event) => {
  channelInfoArray = [];
  event.preventDefault();
  let userKeyword = document.querySelector("#serchVideo_id").value;
  SearchByKeyword(userKeyword)
  .then((response => {
    //console.log(response);
    let channelId = response["items"][0]["id"]["channelId"];
    //By using this response we are getting the channel Info :
    return channelInfo(channelId);
  }))
  .then((response) => {
    console.log("Channel Information :::");
    console.log(response);
    //Snipet -> info:
    let title = response["items"][0]["snippet"]["localized"]["title"];
    let description = response["items"][0]["snippet"]["localized"]["description"];
    let subsDetail = [];
    let viewsCount = response["items"][0]["statistics"]["viewCount"];
    let subCount = response["items"][0]["statistics"]["subscriberCount"];
    let videoCount = response["items"][0]["statistics"]["videoCount"];
    
    let ownwerImage = response["items"][0]["snippet"]["thumbnails"]["high"]["url"];

    subsDetail.push(viewsCount , subCount , videoCount );
    channelInfoArray.push(title , description , subsDetail , ownwerImage);


    

    let channelId2 = response["items"][0]["id"];
    return bannerFounder(channelId2);
    //here we want also the channel banner :
  })
  .then((response) => {
    
    console.log("banner Image ::::");
    let bannerImage = response["items"][0]["brandingSettings"]["image"]["bannerExternalUrl"];
    channelInfoArray.unshift(bannerImage);
    videoSectionDiv.innerHTML = "";
    uiForChannelInfo(channelInfoArray);
  })
  .catch((error) => {
    console.log("Something went Wrong");
  })
});










