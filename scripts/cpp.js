
// ==================================On Load==================================
if (localStorage.getItem("last_location") == null) {
    page_open(0);
}
else {
    page_open(localStorage.getItem("last_location"));
}
// ============================================================================



// ==================================Open Page==================================
function page_open(id) {

    localStorage.setItem("last_location", id);

    const elements = document.getElementsByClassName('detail');
    const elementArray = Array.from(elements);
    elementArray.forEach(element => {
        element.style.display = "none";
    });

    document.getElementById(id).style.display = "block";

    const btn_elements = document.getElementsByClassName('topic');
    const btn_elementArray = Array.from(btn_elements);
    btn_elementArray.forEach(element => {

        element.style.backgroundImage = '';
    });

    document.getElementById("page_no").innerText = `Page ${parseInt(id) + 1}`

    document.getElementsByClassName('topic')[id].style.backgroundImage = 'linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)';

    document.getElementsByClassName('topic')[id].scrollIntoView();


    if ((parseInt(localStorage.getItem("last_location"))) == 0) {
        document.getElementsByClassName("nav_button")[0].style.visibility = "hidden";
    }
    else{
        document.getElementsByClassName("nav_button")[0].style.visibility = "visible";
    }

    if((parseInt(localStorage.getItem("last_location")) + 1) == document.getElementById("side_nav").childElementCount){
        document.getElementsByClassName("nav_button")[1].style.visibility = "hidden";  
    }
    else{
        document.getElementsByClassName("nav_button")[1].style.visibility = "visible";
    }

}
// ===============================================================================



// ==================================Previous Button==================================
function previous_btn() {

    document.getElementsByClassName("nav_button")[1].style.visibility = "visible";

    if ((parseInt(localStorage.getItem("last_location")) - 1) > 0) {

        page_open(parseInt(localStorage.getItem("last_location")) - 1);
    }
    else if ((parseInt(localStorage.getItem("last_location")) - 1) == 0) {
        document.getElementsByClassName("nav_button")[0].style.visibility = "hidden";
        page_open(parseInt(localStorage.getItem("last_location")) - 1);
    }

}
// ===============================================================================



// ==================================Next Button==================================
function next_btn() {

    document.getElementsByClassName("nav_button")[0].style.visibility = "visible";

    if ((parseInt(localStorage.getItem("last_location")) + 1) < document.getElementById("side_nav").childElementCount - 1) {

        page_open(parseInt(localStorage.getItem("last_location")) + 1);
    }
    else if ((parseInt(localStorage.getItem("last_location")) + 1) == document.getElementById("side_nav").childElementCount - 1) {

        document.getElementsByClassName("nav_button")[1].style.visibility = "hidden";
        page_open(parseInt(localStorage.getItem("last_location")) + 1);
    }
}
// ===============================================================================



// ==================================Topic Toggle==================================
function topic_toggle() {

    function myFunction(x) {
        if (x.matches) { // If media query matches

            if (document.getElementById("side_nav").style.width == '120px') {
                document.getElementById("side_nav").style.width = '0';
                document.getElementById("checkbox2").checked = false;
            }
            else {
                document.getElementById("side_nav").style.width = '120px';
            }
        }
    }
    var x = window.matchMedia("(max-width: 900px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction)
}
// ===============================================================================