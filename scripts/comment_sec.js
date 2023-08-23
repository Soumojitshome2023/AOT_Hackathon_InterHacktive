
let bcode = -1;


// =====================================Button Disabled====================================
document.getElementById("submit-btn").style.display = "none";

document.getElementById("cmnt").addEventListener("input", () => {

    if (document.getElementById("cmnt").value.trim() != "") {
        document.getElementById("submit-btn").style.display = "block";
    }
    else {
        document.getElementById("submit-btn").style.display = "none";
    }

});

// ========================================================================================



// ==========================================Wait==========================================

function wait() {

    if (localStorage.getItem("user_name") != null && localStorage.getItem("user_photoURL") != null) {

        data_submit();
        document.getElementById("submit-btn").style.display = "none";
        document.getElementById("wait_mess").style.display = "block";

        setTimeout(() => {

            document.getElementById("cmnt").value = ""
            document.getElementById("wait_mess").style.display = "none";

        }, 2000);
    }
    else {
        sign_in_and_cmnt_box();
        document.getElementById("submit-btn").style.display = "none";
    }


}

// ========================================================================================


// =======================================Reply box========================================

function click_on_reply(ind, nam) {

    let inrtxt;
    let chld = document.querySelectorAll(".reply_box")[ind].childElementCount;
    if (chld < 2) {
        inrtxt = `${chld} Reply`;
    }
    else {
        inrtxt = `${chld} Replies`;
    }

    if (document.querySelectorAll(".reply_box")[ind].style.display == "block") {

        bcode = -1;
        document.getElementsByClassName("heading")[0].innerHTML = "<p>Comment your thoughts</p>";
        document.querySelectorAll(".reply_box")[ind].style.display = "none";
        document.getElementsByClassName("reply_btn")[ind].innerText = inrtxt;

    }
    else {
        bcode = ind;
        document.getElementsByClassName("heading")[0].innerHTML = `<p>Replies to ${nam}'s Comment</p>`;
        document.querySelectorAll(".reply_box").forEach(function (ele, index) {

            let tmp;
            let chld = document.querySelectorAll(".reply_box")[index].childElementCount;
            if (chld < 2) {
                tmp = `${chld} Reply`;
            }
            else {
                tmp = `${chld} Replies`;
            }
            document.querySelectorAll(".reply_box")[index].style.display = "none";
            document.getElementsByClassName("reply_btn")[index].innerText = tmp;
        });

        setTimeout(() => {

            document.querySelectorAll(".comment")[ind].scrollIntoView();
        }, 500);

        document.querySelectorAll(".reply_box")[ind].style.display = "block";
        document.getElementsByClassName("reply_btn")[ind].innerText = "Click here to close";
    }
}


// ========================================================================================
// ========================================================================================




// ======================================Data Submit ======================================

function data_submit() {

    let pname = localStorage.getItem("user_name");
    let cmnt = document.getElementById("cmnt").value;
    let datetime = new Date().toString().slice(0, 21);
    let user_pic_url = localStorage.getItem("user_photoURL")

    // Add new data without changing the old data
    var newData = {
        sender_name: pname,
        message: cmnt,
        bcode: bcode,
        date_time: datetime,
        user_pic_url: user_pic_url,
    };

    firebase.database().ref(`comments${comment_section_special_code}`).push(newData);
}


// ========================================================================================



// =======================================Data Load========================================


setInterval(() => {
    load();
}, 2000);

let old_len = 0;
let j = 1;
let length;
let sender_name;
let message;
let get_bcode;
let user_pic_url;

setTimeout(() => {
    document.querySelectorAll(".all_comments")[0].innerHTML = "";
}, 3000);

function load() {
    firebase.database().ref(`comments${comment_section_special_code}`).once("value", function (snapshot) {

        length = snapshot.numChildren();

        if (length > old_len) {

            let temp = 1;

            snapshot.forEach(function (childSnapshot) {
                var userData = childSnapshot.val();
                // console.log("run 0 ")
                sender_name = userData.sender_name;
                message = userData.message;
                get_bcode = userData.bcode;
                date_time = userData.date_time;
                user_pic_url = userData.user_pic_url;

                if (temp > old_len) {
                    // console.log("run 1 ")

                    if (get_bcode == '-1') {
                        // console.log("run 2 ")

                        let b = `
                            <div class="comment">
                                <div class="sndr_name"><img src="${user_pic_url}" alt="pic">${sender_name}&emsp;${date_time}
                                </div>

                                <span class="comment_message">${message}</span>

                                <button class="reply_btn" onclick="click_on_reply(${j - 1},'${sender_name}')">0 Reply
                                </button>

                                <div class="reply_box">

                                </div>
                            </div>
                                `

                        document.querySelectorAll(".all_comments")[0].innerHTML += b
                        j++;
                    }


                    else if (get_bcode != '-1') {
                        // console.log("run 3 ")

                        let c = ` 
                            <div class="reply_msg">
                                <div class="sndr_name"><img src="${user_pic_url}" alt="pic">${sender_name}&emsp;${date_time}
                                </div>

                                <span class="comment_message replymsg">${message}</span>
                            </div>
                                `

                        document.querySelectorAll(".reply_box")[get_bcode].innerHTML += c

                        if (document.querySelectorAll(".reply_box")[get_bcode].style.display != "block") {

                            let chld = document.querySelectorAll(".reply_box")[get_bcode].childElementCount;
                            if (chld < 2) {
                                document.querySelectorAll(".reply_btn")[get_bcode].innerText = `${chld} Reply`;
                            }
                            else {
                                document.querySelectorAll(".reply_btn")[get_bcode].innerText = `${chld} Replies`;
                            }
                        }
                    }

                }
                temp++;
            });

            old_len = length;
        }

    });

}


// ========================================Sign In================================================
sign_in_and_cmnt_box();

function sign_in_and_cmnt_box() {

    if (localStorage.getItem("user_name") != null && localStorage.getItem("user_photoURL") != null) {
        document.getElementById("cmnt").style.display = "block";
        document.getElementById("sing_in_btn").style.display = "none";
        
    }
    else {
        document.getElementById("cmnt").style.display = "none";
        document.getElementById("sing_in_btn").style.display = "block";

    }

}

function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            var user = result.user;

            localStorage.setItem("user_uid", user.uid);
            localStorage.setItem("user_name", user.email.split("@")[0]);
            localStorage.setItem("user_email", user.email);
            localStorage.setItem("user_photoURL", user.photoURL);

            sign_in_and_cmnt_box();
        })
        .catch(function (error) {
            console.log("Sign in with Google error:", error);

        });
}



// ========================================================================================