"use strict"

$(document).ready(function(){

    $(function(){
        $('.bank_txt').on('click', function(){
            var bank_txt = $('.bank_txt_com', this).text() + ' ' + $('.bank_txt_num', this).text()
            if (bank_txt.length > 1) {
                clipboard_copy(bank_txt)
                $("#notification_copy").fadeIn();
                setTimeout(() => {
                    $("#notification_copy").fadeOut();
                }, 2000)
            }
        })
    })
    
    $(window).scroll(function(){
        let scrT = $(window).scrollTop();
        if(scrT > 200) {
            $(".only_m").css("display", "block");
        } else {
            $(".only_m").css("display", "none");
        }
    })

    let musicOnOff = false;
    let musicButton = document.getElementById('musicOnOff');
    musicButton.addEventListener("click", function(){
        if(musicOnOff == false){
            document.getElementById('play_music').play();
            musicOnOff = true;
            $('#music_button_img').attr("src","img/pause.png");
        } else {
            document.getElementById('play_music').pause();
            musicOnOff = false;
            $('#music_button_img').attr("src","img/icon_music.png");
        }
    })

    if ($(location).attr('pathname').split('/')[2] == 'gallery.html') {
        setTimeout(() => {
            $("#notification_music").fadeIn();
        }, 2000)
        setTimeout(() => {
            $("#notification_music").fadeOut();
        }, 5000)
    } else if($(location).attr('pathname').split('/')[2] == 'message.html'){
        loadComments();

        const commentRegistration = document.getElementById("comment-registration");
        commentRegistration.addEventListener("click", function(){
            registerComment();
        });
    }

    $(".contact_button").on("click", function(){
        $(".dim").css("display", "block");
        let popup_type = $(this).data("type");
        $(`#contact_${popup_type}`).css("display", "block");
    })
    
    $(".form_close_button").on("click", function(){
        $(".dim").css("display", "none");
        $(".popup").css("display", "none");
    })

    $(".top_button").on("click", function(){
        $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
	    return false;
    })
})

function clipboard_copy(str) {
    window.navigator.clipboard.writeText(str);
}

 
const no = "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";
 
let cip = btoa(no.substring(0,13));
let her = btoa(no.substring(13,26));
let text = btoa(no.substring(26,40));

// let bytes  = atob(cip)+atob(her)+atob(text);
// console.log("token " + bytes);

function loadComments() {
let bytes  = atob(cip)+atob(her)+atob(text);
  fetch("https://api.github.com/repos/junghee11/myWeddingCard/issues", {
    method: "GET",
    headers: {
      Authorization: "token " + bytes
    },
  })
    .then((response) => response.json())
    .then((comments) => {
        let $commentList = document.getElementById("comment-list");
        for (let i in comments) {
            $commentList.innerHTML += `<li><p>${comments[i].title}<small>${comments[i].created_at.replace("T", "  ").replace("Z", "").slice(0, -3)}</small></p><p>${comments[i].body}</p></li>`;
        }
    });
}

function registerComment() {
    let nickname = document.getElementById("nickname");
    let commentInput = document.getElementById("comment_input");
    if (!nickname.value) {
        alert("닉네임을 입력해주세요!");
    } else if (!commentInput.value) {
        alert("내용을 입력해주세요!");
    } else {
        let bytes  = atob(cip)+atob(her)+atob(text);
        fetch(
            "https://api.github.com/repos/junghee11/myWeddingCard/issues",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "token " + bytes
                },
                body: JSON.stringify({
                    title: nickname.value,
                    body: commentInput.value,
                })
            }
        ).then(() => {
            sendMail(nickname.value, commentInput.value);
            nickname.value = "";
            commentInput.value = "";
        });
    }
}

function sendMail(nickname, comment) {
    let templateParams = {
      nickname: nickname,
      comment: comment,
    };
    emailjs
      .send("service_2syktss", "template_4nk0rnw", templateParams)
      .then(() => window.location.reload());
  }