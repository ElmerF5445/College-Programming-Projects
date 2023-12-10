var Slideshow_SlideNumber = 0;
var Slideshow_Speed = 6500;
var AutoStart_Slideshow = true;


window.addEventListener('load', function(){
    if (AutoStart_Slideshow == true){
        document.querySelectorAll(".Home_Latest_Item")[0].style.opacity = "100%";
        Slideshow_Start();
    }
})

function Slideshow_Start(){
    Slideshow_TotalSlides = document.querySelectorAll(".Home_Latest_Item").length;
    //document.querySelectorAll(".Home_Latest_Item")[0].style.opacity = "100%";
    Slideshow_Clear_Carousel();
    Slideshow_Change_Image(0);
    Slideshow_Control = setInterval(Slideshow_Loop, Slideshow_Speed);
    Slideshow_Clear_Carousel();
}

function Slideshow_Stop(){
    clearInterval(Slideshow_Control);
}

var Slideshow_TotalSlides;
function Slideshow_Loop(){
    Slideshow_TotalSlides = document.querySelectorAll(".Home_Latest_Item").length;
    Slideshow_Change_Image(Slideshow_SlideNumber);
}

var Slideshow_PreviousSlideNumber;

function Slideshow_Change_Image(Number){
    if (Number >= Slideshow_TotalSlides){
        Slideshow_SlideNumber = 0;
        Number = 0;
    }  

    if (Number < Slideshow_PreviousSlideNumber){
        //console.log("Ain't");
        Slideshow_Clear_Carousel();
    }

    document.querySelectorAll(".Home_Latest_Item")[Number].style.opacity = "100%";

    for (a = 0; a != document.querySelectorAll(".Home_Latest_Carousel_Selector_Item").length; a++){
        document.querySelectorAll(".Home_Latest_Carousel_Selector_Item")[a].setAttribute('data-id', null);
    }
    if (document.querySelectorAll(".Home_Latest_Carousel_Selector_Item")[Number] != null){
        document.querySelectorAll(".Home_Latest_Carousel_Selector_Item")[Number].setAttribute('data-id', 'Selected');
    }
    Slideshow_SlideNumber++;
    Slideshow_PreviousSlideNumber = Number;
    //console.log(Number);
}

function Slideshow_Clear_Carousel(){
    for (a = 0; a != Slideshow_TotalSlides; a++){
        document.querySelectorAll(".Home_Latest_Item")[a].style.opacity = "0%";
    }
}
