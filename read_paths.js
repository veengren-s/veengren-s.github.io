var photo_paths = [
    "https://i.postimg.cc/HWhHVVXZ/DSC00055-HDR.jpg",
    "https://i.postimg.cc/W1J420yw/DSC00001-HDR.jpg",
    "https://i.postimg.cc/Fz8QqBh5/DSC00083-HDR.jpg",
    "https://i.postimg.cc/KcqcB9S5/DSC00178-Enhanced-NR.jpg",
    "https://i.postimg.cc/JhMC9JCn/DSC00200-HDR-Edit.jpg",
    "https://i.postimg.cc/hvfB2BW1/DSC00506-Enhanced-NR.jpg",
    "https://i.postimg.cc/zGn1t7M6/DSC00522-Enhanced-NR.jpg",
    "https://i.postimg.cc/rmhTGpbp/DSC00538-Enhanced-NR.jpg",
    "https://i.postimg.cc/Jh5Mnx5Z/DSC00551-Enhanced-NR.jpg",
    "https://i.postimg.cc/wjKpQZWD/DSC00553-Enhanced-NR.jpg",
    "https://i.postimg.cc/vmQCPs5x/DSC00581-Pano-topaz-denoise-sharpen.jpg",
    "https://i.postimg.cc/y8hwXd3z/DSC00589-Pano-topaz-denoise-sharpen.jpg",
    "https://i.postimg.cc/KjK6nDB9/DSC00666.jpg",
    "https://i.postimg.cc/DZzkzTZ3/DSC00702.jpg",
    "https://i.postimg.cc/DzBHHMcj/DSC00749-Pano.jpg",
    "https://i.postimg.cc/kMz37LPL/DSC00793.jpg",
    "https://i.postimg.cc/8Pv8cw1c/DSC00814.jpg",
    "https://i.postimg.cc/8zD1VxhN/DSC00820-Pano-2.jpg",
    "https://i.postimg.cc/TYnRFT5t/DSC00840-Pano-2.jpg",
    "https://i.postimg.cc/9XRXPdm5/DSC00924.jpg",
    "https://i.postimg.cc/WtLH0L23/DSC00926.jpg",
    "https://i.postimg.cc/SxrmQVr8/DSC01084-Edit.jpg",
    "https://i.postimg.cc/PfgXSCJL/DSC01162-HDR.jpg",
    "https://i.postimg.cc/W41TdrWy/DSC01187-HDR.jpg",
    "https://i.postimg.cc/zf25KB4G/DSC01222-HDR.jpg",
    "https://i.postimg.cc/vB1yzydL/DSC01232-HDR.jpg",
    "https://i.postimg.cc/rmvkZHV6/DSC01253-HDR.jpg",
    "https://i.postimg.cc/cCwNpcCv/DSC01262-HDR.jpg"
]

var window_w = window.innerWidth
var col_size = Math.ceil(photo_paths.length/4)

function load(){
    for(var i = 0; i < photo_paths.length; i++){
        var temp = document.createElement("img")
        temp.src = photo_paths[i]
        temp.id = i
        temp.onclick = function(temp){
            console.log(temp.target.id)
            window.location.replace("sliding_gallery.html#" + temp.target.id)
        }

        var div_id = "c" + (Math.floor(i/col_size)+1)
        var div = document.getElementById(div_id)
        div.appendChild(temp)
    }
}

