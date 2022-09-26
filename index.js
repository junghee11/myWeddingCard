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
    
    if(window.innerWidth < 1100) {
        $(window).scroll(function(){
            let scrT = $(window).scrollTop();
            if(scrT > 300) {
                $(".only_m").css("display", "block");
            } else {
                $(".only_m").css("display", "none");
            }
        })
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
})

function clipboard_copy(str) {
    window.navigator.clipboard.writeText(str);
}