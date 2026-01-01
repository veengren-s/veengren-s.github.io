function correction(){
    // also make note somewhere that these are only considered accurate engouh up to 10,000

    // divs from form
    var ad_alt_div = document.getElementById("ad_alt")
    var ad_temp_div = document.getElementById("ad_temp")
    var alt_div = document.getElementById("alt")

    //number of altitudes to be corrected
    var num_corr = alt_div.children.length



    var result = 0


    //error flag
    var is_error = false

    // verify the entries are correct..........The alt div will need to be looped if want to add custom number of values
    is_error = verify(ad_alt_div, is_error)
    is_error = verify(ad_temp_div, is_error)

    // loops through all of the divs for the altitudes to correct...to verify
    for (var i = 0; i < num_corr; i++){
        is_error = verify(alt_div.children[i], is_error)
    }


    if(!is_error){
        // values from form
        var ad_alt = Number(ad_alt_div.children[1].value)
        var ad_temp = Number(ad_temp_div.children[1].value)

        //loop through all alts to be corrected
        for (var i = 0; i < num_corr; i++){
            if (alt_div.children[i].children[1].value >0){
                var alt = Number(alt_div.children[i].children[1].value)
                var interm = error(ad_alt,ad_temp, alt)
                var msa = alt_div.children[i].children[3].checked
                if(msa){
                    result = msaRound(interm+alt)
                }else{
                    result = round(interm+alt)
                }
                alt_div.children[i].children[5].textContent = "The corrected alttitude is: " + result + "(" + alt + " + " + interm.toFixed(2) + " \u00B1 rounding)"
                // make sure any error message is hidden
                alt_div.children[i].children[4].display = "none"

            }
        }  
    }else{
        // if there is an error wipe all the corrected alltitudes
        for (var i = 0; i < num_corr; i++){
            alt_div.children[i].children[5].textContent = ""
        }
    }
}

function verify(div, is_error){
    //verifies that the number provided is actually a number. displays the error message one screen. takes in the status of the others to if an error in any of them it
    //should pass that on.
    var test = div.children[1].value

    if(isNaN(test)){
        div.children[4].style.display = "inline"
        return true
        
    }else{
        div.children[4].style.display = "none"
       return is_error
    }
}

function error(ad_alt, ad_temp, alt){
    var L0 = 0.00198
    var t0 = ad_temp + (L0*ad_alt)
    var agl = alt-ad_alt

    var correct = agl*((15-t0)/(273+t0-(0.5*L0*alt)))

    //rounding up to nearest 10 this will
    // correct = Math.ceil(correct/10)*10
    return correct
}

function round(alt){
    // There is a slightly different rounding for mdas add later
    var threshold = 21
    var ends_with = alt.toString().slice(-2);

    if(ends_with >= threshold){
        //round up
        return Math.ceil(alt/100)*100
    }
    else{
        // round down
        return Math.floor(alt/100)*100
    }
}

function msaRound(alt){
    var threshold = 21
    var ends_with = alt.toString().slice(-2);

    if(ends_with >= threshold){
        //round up
        return Math.ceil(alt/10)*10
    }
    else{
        // round down
        return Math.floor(alt/10)*10
    }
}

function add(){

    // redo this to align with other formats
    var div = document.getElementById("alt")

    //creat new div
    var new_div = document.createElement("div")

    //text
    var title = document.createElement("label")
    title.textContent = "Altitude to be Corrected"

    //input
    var input = document.createElement("input")
    input.placeholder = "Altitude Above Sea Level"

    //label
    var msaTitle = document.createElement("label")
    msaTitle.textContent = " MDA:"

    //checkbox
    var checkbox = document.createElement("input")
    checkbox.type = "checkbox"

    //error
    var error = document.createElement("span")
    error.textContent = "Error!!!! Please check the entry and try again!"
    error.style.color = "red"
    error.style.display = "none"
    
    //corrected
    var correct = document.createElement("span")

    //assembling div
    new_div.appendChild(title)
    new_div.appendChild(input)
    new_div.appendChild(msaTitle)
    new_div.appendChild(checkbox)
    new_div.appendChild(error)
    new_div.appendChild(correct)

    div.appendChild(new_div)

    //enable remove button
    document.getElementById("remove").disabled = false
}

function remove(){
    var div=document.getElementById("alt")
    var num_children = div.children.length

    //remove child
    div.removeChild(div.children[num_children-1])

    // disable the remove button
    if (num_children-1 == 1){
        document.getElementById("remove").disabled = true
    }
}

// not pretty but works (Kind of)function glidePath(){
    var div = document.getElementById("gp")
    // if is already table remove
    if(div.children.length > 14){
        div.removeChild(div.children[div.children.length-1])
    }

    var table = document.createElement("table")

    var headers = document.createElement("tr")
    var trUncorrected = document.createElement("tr")
    var trCorrected = document.createElement("tr")

    //adding labels
    var lbl = document.createElement("th")
    var lbl2 = document.createElement("th")
    var lbl3 = document.createElement("th")


    lbl.textContent = "Uncorrected"
    trUncorrected.appendChild(lbl)
    
    lbl2.textContent = "Corrected"
    trCorrected.appendChild(lbl2)

    lbl3.textContent = ""
    headers.appendChild(lbl3)



    var angle = div.children[1].value
    var angle_rad = angle * (Math.PI / 180)
    var alt = Number(div.children[3].value)
    var tch = Number(div.children[7].value)
    var temp = Number(div.children[5].value)
    var start = Number(div.children[9].value)
    var end = Number(div.children[11].value)


    var fin = Math.floor(end)

    for(var i = start; i <= fin; i++){
        var th = document.createElement("td")
        var tca = alt + tch
        th.textContent = Math.round((tca + Math.tan(angle_rad)*i*6076.115)/10)*10
        trUncorrected.appendChild(th)
        var tit = document.createElement("th")
        tit.textContent = i
        headers.appendChild(tit)

        // if is first on floor it. wil then get the ++ applied to it
        if ( i == start){
            i = Math.floor(i)
        }

        // if is the last one do the final number
        if ( i == fin) {
            i = end
            var th = document.createElement("td")
            var tca = alt + tch
            th.textContent = Math.round((tca + Math.tan(angle_rad)*i*6076.115)/10)*10
            trUncorrected.appendChild(th)
            var tit = document.createElement("th")
            tit.textContent = i
            headers.appendChild(tit)
        }
        
    }



    for(var i = start; i <= fin; i++){
        var th = document.createElement("td")
        var height = Math.round((tca + Math.tan(angle_rad)*i*6076.115))

        var interm = error(alt, temp, height)

        th.textContent = round(interm + height)
        trCorrected.appendChild(th)

        // if i is the firs floor it (will be ++'d after)
        if ( i == start){
            i = Math.floor(i)
        }

        // if is the last one do the final number
        if ( i == fin) {
            i = end
            var th = document.createElement("td")
            var height = Math.round((tca + Math.tan(angle_rad)*i*6076.115))

            var interm = error(alt, temp, height)
    
            th.textContent = round(interm + height)
            trCorrected.appendChild(th)

        }
    }

    //add rows
    table.appendChild(headers)
    table.appendChild(trUncorrected)
    table.appendChild(trCorrected)

    div.appendChild(table)


}

function todCalcs(){
    var div = document.getElementById("dec")
    console.log(div.children.length)

    if(div.children.length > 8){
        div.removeChild(div.children[div.children.length-1])
    }

    var altitude = Number(div.children[1].value)
    var ad_alt = Number(div.children[3].value)
    var angle = Number(div.children[5].value)

    var angle_rad = angle * (Math.PI / 180)
    var delta = altitude-ad_alt

    var res = document.createElement("p")
    var temp = delta/Math.tan(angle_rad)*0.0001645788
    res.textContent = "Start your decent " + temp.toFixed(2) + "NM out!"

    div.appendChild(res)
}