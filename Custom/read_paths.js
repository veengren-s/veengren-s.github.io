var photo_paths = [
    "Photos\\DSC00178-Enhanced-NR.jpg", "Photos\\DSC00200-HDR-Edit.jpg",
    "Photos\\DSC00506-Enhanced-NR.png", "Photos\\DSC00522-Enhanced-NR.png",
    "Photos\\DSC00538-Enhanced-NR.png", "Photos\\DSC00551-Enhanced-NR.png", 
    "Photos\\DSC00553-Enhanced-NR.png", "Photos\\DSC00581-Pano-topaz-denoise-sharpen.png",
    "Photos\\DSC00589-Pano-topaz-denoise-sharpen.png", "Photos\\DSC00666.png"
]

var gallery = document.getElementById("gallery").children
for (var i = 0; i < gallery.length; i++){  
    gallery[i].onclick = function click(e, img){
        var id = e.target.id
        gallery[id].style.width="75%"
        gallery[id].style.height="75%"
    }
}
