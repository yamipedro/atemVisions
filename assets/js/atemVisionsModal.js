/*
    Require jQuery and bootstrap 3
*/

var atemModal = new function() {
    this.modalTime = 250;
    this.modalThemes = {
        'atemModal_white' : { back : '#F2F2F2', color : '#696969'},
        'atemModal_blue' : { back : '#00b7ff', color : '#F2F2F2'},
        'atemModal_green' : { back : '#00bd33', color : '#F2F2F2'},
        'atemModal_yellow' : { back : '#FFF100', color : '#696969'},
        'atemModal_red' : { back : '#FF2E2E', color : '#F2F2F2'},
        'atemModal_black' : { back : '#202020', color : '#F2F2F2'},
        'atemModal_purple' : { back : '#8500C9', color : '#F2F2F2'},
        'atemModal_orange' : { back : '#FF9300', color : '#F2F2F2'}
    }
    this.modalTheme = this.modalThemes.atemModal_default;
    this.setTheme = function(theme) {
        if (Object.keys(this.modalThemes).indexOf(theme) != -1) this.modalTheme = this.modalThemes[theme];
    }
    this.getThemes = function() {
        return this.modalThemes;
    }

    this.overlay = '<div id="atemModal_overlay"></div>';
    this.modalHtml = function(title, content) {
        return `
            <div id="atemModal_modal">\
                <div id="atemModal_modal_white">\
                    <div id="atemModal_title" style="background: `+this.modalTheme.back+`; color: `+this.modalTheme.color+`;">
                        `+title+`
                        <span id="atemModal_close" onclick="atemModal.closeModal()" class="glyphicon glyphicon-remove"></span>
                    </div>
                    <div id="atemModal_content">`+content+`</div>
                    <div id="atemModal_buttons"></div>
                </div>\
            </div>\
        `;
    }
    this.closeModal = function() {
        $('#atemModal_overlay').hide(this.modalTime);
        setTimeout(function() {
            $('#atemModal_overlay').remove();
        }, this.modalTime);
    }
    this.addButtons = function(buttons) {
        var b = '';
        buttons.forEach(function(bt, i) {
            $('#atemModal_buttons').append('<button id="atemModal_button_'+i+'" class="atemButton atemButton_'+bt.type+'">'+bt.text+'</button>');
            $('#atemModal_button_'+i).click(bt.onclick);
        });
    }
    this.modal = function(title, content, buttons, close = false) {
        $("#atemModal_overlay").remove();
        $('body').append(this.overlay);
        $('#atemModal_overlay').append(this.modalHtml(title, content, buttons));
        this.addButtons(buttons);
        if (close) {
            $('#atemModal_close').show();
        }
        $('#atemModal_overlay').show(this.modalTime);
    }
}