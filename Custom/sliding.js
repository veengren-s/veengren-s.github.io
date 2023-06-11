var photo_paths = [
    "https://i.postimg.cc/dtNnHjnF/DSC00178-Enhanced-NR.jpg",
    "https://i.postimg.cc/BvnD1Xdv/DSC00200-HDR-Edit.jpg",
    "https://i.postimg.cc/5NT1cGmN/DSC00506-Enhanced-NR.jpg",
    "https://i.postimg.cc/JhcWkhCG/DSC00522-Enhanced-NR.jpg",
    "https://i.postimg.cc/qMz050y5/DSC00538-Enhanced-NR.jpg",
    "https://i.postimg.cc/jq8tcCwf/DSC00551-Enhanced-NR.jpg",
    "https://i.postimg.cc/ZnDm5DtH/DSC00553-Enhanced-NR.jpg",
    "https://i.postimg.cc/zBzYS1qp/DSC00581-Pano-topaz-denoise-sharpen.jpg",
    "https://i.postimg.cc/kGZrm6Kh/DSC00666.jpg"
]
var thum_id=[0,1,2,3,4]

var big = document.getElementById("big")
var index = 0
var tind = 0

var thumbnails = document.getElementById("thumb")
console.log(thumbnails)

//set big on
big.src = photo_paths[index]

//set little bois
var t1 = document.getElementById("0")
var t2 = document.getElementById("1")
var t3 = document.getElementById("2")
var t4 = document.getElementById("3")
var t5 = document.getElementById("4")

t1.src = photo_paths[tind]
t2.src = photo_paths[tind+1]
t3.src = photo_paths[tind+2]
t4.src = photo_paths[tind+3]
t5.src = photo_paths[tind+4]

thumbnails.onclick = function thumbs(e){
    if(e.target.id != "lbuttonlower" && e.target.id !="rbuttonlower"){
        index = e.target.id
        console.log(e.target.id)
        big.src = photo_paths[index]
    }
}

//setting up buttons
var left = document.getElementById("lbutton")
left.onclick = function leftC(){
    index--;
    if(index < 0)
        index += 10

    big.src = photo_paths[index]
}

var right = document.getElementById("rbutton")
right.onclick = function rightC(){
    index++;
    if(index >= photo_paths.length)
        index -= 10
    big.src = photo_paths[index]
    
}

var l = document.getElementById("lbuttonlower")
l.onclick = function lc(){
    window.alert("832")
}

var r = document.getElementById("rbuttonlower")
r.onclick = function lc(){
    window.alert("ASDAS")
}


function shuffleLeft(){
    //t1=t2
    t1.src = t2.src
    //t2=t3
    t2.src = t3.src
    //t3==t4
    t3.src = t4.src
    //t4=t5
    t4.src = t5.src
    //t5=new
    t5.src = photo_paths[tind+5]
    
}