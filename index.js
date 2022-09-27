"use strict"

$(document).ready(function(){
    $(function(){
        $('.bank_txt').on('click', function(){
            var bank_txt = $('.bank_txt_com', this).text() + ' ' + $('.bank_txt_num', this).text()
            if (bank_txt.length > 1) {
                clipboard_copy(bank_txt)
                alert(bank_txt + ' 복사되었습니다')
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