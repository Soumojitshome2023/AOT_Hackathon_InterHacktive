

// ==============================Sign In With Google Btn===============================
function signInWithGoogle_btn() {
    if (localStorage.getItem("user_name") == null && localStorage.getItem("user_photoURL") == null) {
        signInWithGoogle();
    }
    else if (document.getElementsByClassName("user_card")[0].style.display == "block") {
        document.getElementsByClassName("user_card")[0].style.display = "none";
    }
    else {
        document.getElementsByClassName("user_card")[0].style.display = "block";
    }
}
// =====================================================================================


// ==================================Sign Out==================================
function sign_out() {
    localStorage.clear();
    location.reload();
}
// =============================================================================


// ==============================Sign In With Google===============================
function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            var user = result.user;

            localStorage.setItem("user_uid", user.uid);
            localStorage.setItem("user_name", user.email.split("@")[0]);
            localStorage.setItem("user_email", user.email);
            localStorage.setItem("user_photoURL", user.photoURL);

            document.getElementById("nav_sign_in_btn").innerHTML = `<img src='${localStorage.getItem("user_photoURL")}' alt="">`
            document.getElementById("nav_sign_in_btn").style.padding = "10px";

            location.reload();
        })
        .catch(function (error) {
            console.log("Sign in with Google error:", error);

        });
}
// =============================================================================


// ==================================Sign In Btn==================================
if (localStorage.getItem("user_name") != null && localStorage.getItem("user_photoURL") != null) {

    document.getElementById("nav_sign_in_btn").innerHTML = `<img src='${localStorage.getItem("user_photoURL")}' alt="">`
    document.getElementById("nav_sign_in_btn").style.padding = "10px";

    document.getElementById("user_box_img").innerHTML = `<img src='${localStorage.getItem("user_photoURL")}' alt="">`
    document.getElementById("user_box_name").innerText = localStorage.getItem("user_name");
}
// =============================================================================