function correction(data){
    // also make note somewhere that these are only considered accurate engouh up to 10,000
    data.preventDefault()

    // divs from form
    var ad_alt_div = document.getElementById("ad_alt")
    var ad_temp_div = document.getElementById("ad_temp")
    var alt_div = document.getElementById("alt")



    var result = 0


    //error flag
    var is_error = false

    // verify the entries are correct..........The alt div will need to be looped if want to add custom number of values
    is_error = verify(ad_alt_div, is_error)
    is_error = verify(ad_temp_div, is_error)
    is_error = verify(alt_div, is_error)



    if(!is_error){
        // values from form
        var ad_alt = Number(ad_alt_div.children[0].children[0].value)
        var ad_temp = Number(ad_temp_div.children[0].children[0].value)
        var alt = Number(alt_div.children[0].children[0].value)

        var interm = error(ad_alt,ad_temp, alt)
        result = round(interm+alt)

        
        alt_div.children[2].textContent = "The corrected alttitude is: " + result + "(" + alt + " + " + interm + " + rounding)"
    }




}

function verify(div, is_error){
    //verifies that the number provided is actually a number. displays the error message one screen. takes in the status of the others to if an error in any of them it
    //should pass that on.
    var test = div.children[0].children[0].value

    if(isNaN(test)){
        div.children[1].style.visibility = "visible"
        return true
        
    }else{
        div.children[1].style.visibility = "hidden"
       return is_error
    }
}

function error(ad_alt, ad_temp, alt){
    var L0 = 0.00198
    var t0 = ad_temp + (L0*ad_alt)
    var agl = alt-ad_alt

    var correct = agl*((15-t0)/(273+t0-(0.5*L0*alt)))

    //rounding up to nearest 10
    correct = Math.ceil(correct/10)*10
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