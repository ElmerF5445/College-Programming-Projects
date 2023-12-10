/*
	UI
*/

// document.addEventListener('DOMContentLoaded', function() {
//   const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
//   const baseElement = document.getElementById('pageElement_Base');

//   if (isLocalhost) {
//       baseElement.href = '/';
//   } else {
//       baseElement.href = '/Website/';
//   }
// });

var fullPath = window.location.href;
var PageName = fullPath.split("/").pop();
console.log(PageName);

function Load_Template(templateId) {
  fetch("ES_Template_4.html")
    .then((response) => response.text())
    .then((template) => {
      const templateElement = document.createElement("div");
      templateElement.innerHTML = template;
      const templateContent = templateElement
        .querySelector(`#${templateId}`)
        .content.cloneNode(true);
      const bodyElement = document.getElementById("pageElement_Body");
      bodyElement.appendChild(templateContent);

      if (bodyElement.getAttribute("Access_Restrict") == "true"){
        Access_Restrict();
      }
      if (bodyElement.getAttribute("Branch_BackToParent") == "true"){
        Branch_BackToParent_AddButton(bodyElement.getAttribute("Branch_BackToParent_URL"));
      }
      if (bodyElement.getAttribute("ShortenedLinks_HasShortenedLink") == "true"){
        ShortenedLinks_GetShortenedLink(PageName);
      }
      if (bodyElement.getAttribute("Header_HasCustomHeaderTitle") == "true"){
        Header_Change_HeaderTitle(bodyElement.getAttribute("Header_CustomHeaderTitle"));
      }
    })
    .catch((error) => console.log(error));
}

var UI_Sidebar_isOpen = false;
function toggle_Sidebar() {
  var UI_Sidebar = document.getElementById("pageElement_Sidebar");
  if (UI_Sidebar_isOpen == false) {
    UI_Sidebar.style.transform = "translateX(0px)";
    UI_Sidebar_isOpen = true;
  } else {
    UI_Sidebar.style.transform = "translateX(-100%)";
    UI_Sidebar_isOpen = false;
  }
}

function scrollToPosition(direction) {
  if (direction == "bottom") {
    document
      .getElementById("pageElement_Content")
      .scrollTo(0, document.getElementById("pageElement_Content").scrollHeight);
  } else if (direction == "top") {
    document.getElementById("pageElement_Content").scrollTop = 0;
  }
}

var CopyURL = window.location.href;

function copyURLLink() {
  // Get the current URL
  const currentUrl = CopyURL;

  // Create a temporary input element to hold the URL
  const tempInput = document.createElement("input");

  // Set the input value to the current URL
  tempInput.value = currentUrl;

  // Append the input element to the DOM
  document.body.appendChild(tempInput);

  // Select the input element's contents
  tempInput.select();

  // Copy the selected contents to the clipboard
  document.execCommand("copy");

  // Remove the input element from the DOM
  document.body.removeChild(tempInput);
  if (CopyURL != window.location.href){
    document.getElementById("Header_Toast_Share_Link_Text").innerHTML = "Link copied as " + CopyURL + "!";
  }
  toast_Popup_Animate("Header_Toast_Share_Link");
}

function toast_Popup_Animate(toast_ID){
  var toast_Element = document.getElementById(toast_ID);
  toast_Element.style.animationName = "toast_Popup_Open";
	toast_Element.style.animationDuration = "0.3s";
	toast_Element.style.animationFillMode = "forwards";
  setTimeout( function() {
    toast_Element.style.animationName = "toast_Popup_Close";
    toast_Element.style.animationDuration = "0.3s";
    toast_Element.style.animationFillMode = "forwards";
  }, 3000);
}

function Subwindows_Open(ID){
  document.getElementById("pageElement_Subwindows").style.opacity = "100%";
  document.getElementById("pageElement_Subwindows").style.display = "flex";
  document.getElementById("pageElement_Subwindows").style.opacity = "100%";
  var subwindowElement = document.getElementById("subwindow_"+ID);
  subwindowElement.style.display = "block";
  subwindowElement.style.animationFillMode = "forwards";
  subwindowElement.style.animationName = "opening_Subwindow";
  subwindowElement.style.animationDuration = "0.3s";
  subwindow_activeSubwindow = ID;
  if (ID == "ImageView"){
    subwindowElement.style.display = "grid";
  }
}

function Subwindows_Close(ID){
  var subwindowElement = document.getElementById("subwindow_" + ID);
  subwindowElement.style.animationName = "closing_Subwindow";
  subwindowElement.style.animationDuration = "0.3s";
  subwindowElement.style.animationFillMode = "forwards";

  setTimeout(function() {
    subwindowElement.style.opacity = "0";
  }, 0);

  setTimeout(function() {
    subwindowElement.style.display = "none";
    document.getElementById("pageElement_Subwindows").style.display = "none";
  }, 300);

  subwindow_activeSubwindow = "none";
}

function scrollToPosition(direction){
	if (direction == "bottom"){
    console.log("Bottom");
		document.querySelectorAll(".Main_Content_Container").scrollTo(0, document.getElementById("pageElement_Body").scrollHeight);
	} else if (direction == "top"){
    console.log("Top");
		document.querySelectorAll(".Main_Content_Container").scrollTop = 0;
	}
}

function Header_Hide(){
  document.getElementById("pageElement_Header").style.transform = "translateY(-50px)";
  document.querySelector(".Main_Content_Container").style.marginTop = "0px";
  document.querySelector(".Main_Content_Container").style.height = "100%";

  if (document.querySelector(".Main_Subwindows_Container") != null){
    document.querySelector(".Main_Subwindows_Container").style.marginTop = "0px"
    document.querySelector(".Main_Subwindows_Container").style.height = "100%"
  }
}

function Header_Show(){
  document.getElementById("pageElement_Header").style.transform = "translateY(0px)";
  document.querySelector(".Main_Content_Container").style.marginTop = "50px";
  document.querySelector(".Main_Content_Container").style.height = "calc(100% - 50px)";

  if (document.querySelector(".Main_Subwindows_Container") != null){
    document.querySelector(".Main_Subwindows_Container").style.marginTop = "50px"
    document.querySelector(".Main_Subwindows_Container").style.height = "calc(100% - 50px)"
  }
}

function Access_Restrict(){
  document.getElementById("pageElement_Sidebar").style.display = "none";
  document.getElementById("pageElement_Header").querySelector(".UI_Header_Hamburger").style.display = "none";
  document.getElementById("pageElement_Header").querySelector(".UI_Header_Title").style.justifyContent = "left";
  document.getElementById("pageElement_Header").style.gridTemplateColumns = "1fr 50px";
}

function Branch_BackToParent_AddButton(ParentURL){
  document.getElementById("UI_Header_Branch_BackToParent").style.display = "grid";
  document.getElementById("Branch_BackToParent_Anchor").setAttribute("href", ParentURL);
}

function ShortenedLinks_GetShortenedLink(PageName){
  const request = new XMLHttpRequest();
  request.open("GET", "Assets/ShortenedLinks.txt", false);
  request.send();
  var messages = request.responseText.split("\n");
  console.log(messages);
  File_Data = messages;
  var ShortenedLinks_Line_Data;
  var ShortenedLinks_Line_Data_WebURL = [];
  var ShortenedLinks_Line_Data_ShortURL = [];
  for (a = 5; a != File_Data.length; a++){
    ShortenedLinks_Line_Data = File_Data[a].split("%&");
    ShortenedLinks_Line_Data_WebURL[a] = ShortenedLinks_Line_Data[0];
    ShortenedLinks_Line_Data_ShortURL[a] = ShortenedLinks_Line_Data[1].split("\r")[0];
  }
  // console.log(ShortenedLinks_Line_Data_WebURL);
  // console.log(ShortenedLinks_Line_Data_ShortURL);
  for (a = 5; a < ShortenedLinks_Line_Data_WebURL.length; a++){
    if (ShortenedLinks_Line_Data_WebURL[a] == PageName){
      CopyURL = ShortenedLinks_Line_Data_ShortURL[a];
      break;
    }
  }
}

function Header_Change_HeaderTitle(Title){
  Header_CustomHeaderTitle = Title;
  document.getElementById("UI_Header_Title_Text").innerText = Header_CustomHeaderTitle;
}