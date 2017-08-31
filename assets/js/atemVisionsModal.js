/*
    Require jQuery and bootstrap 3
*/

var atemModal = new function() {
    this.modalTime = 250;
    this.modalThemes = {
        'atemModal_white' : { back : '#F2F2F2', color : '#696969', name : 'white'},
        'atemModal_blue' : { back : '#00b7ff', color : '#F2F2F2', name : 'blue'},
        'atemModal_green' : { back : '#00bd33', color : '#F2F2F2', name : 'green'},
        'atemModal_yellow' : { back : '#FFF100', color : '#696969', name : 'yellow'},
        'atemModal_red' : { back : '#FF2E2E', color : '#F2F2F2', name : 'red'},
        'atemModal_black' : { back : '#202020', color : '#F2F2F2', name : 'black'},
        'atemModal_purple' : { back : '#8500C9', color : '#F2F2F2', name : 'purple'},
        'atemModal_orange' : { back : '#FF9300', color : '#F2F2F2', name : 'orange'}
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
            <div id="atemModal_modal">
                <div id="atemModal_modal_white" class="atemModal_modal_white atemBorder_`+this.modalTheme.name+`">
                    <div id="atemModal_title" style="background: `+this.modalTheme.back+`; color: `+this.modalTheme.color+`;">
                        `+title+`
                        <i id="atemModal_expand" onclick="atemModal.expand()" class="fa fa-arrows-alt" aria-hidden="true"></i>
                        <i id="atemModal_minimize" onclick="atemModal.minimize()" class="fa fa-minus" aria-hidden="true"></i>
                        <i id="atemModal_close" class="fa fa-times" aria-hidden="true" onclick="atemModal.closeModal()"></i>
                    </div>
                    <div id="atemModal_content">`+content+`</div>
                    <div id="atemModal_buttons"></div>
                </div>
            </div>
        `;
    }
    this.closeModal = function() {
        $('#atemModal_modal').hide(this.modalTime);
        setTimeout(function() {
            $('#atemModal_modal').remove();
        }, this.modalTime);
    }
    this.expand = function() {
        if (!$('#atemModal_modal_white').hasClass('atemModal_expand')) {
            $('#atemModal_modal_white').removeClass('atemModal_minimize');
            $('#atemModal_modal').css('position', 'inherit');
            $('#atemModal_minimize').removeClass('fa-window-maximize');
            $('#atemModal_minimize').addClass('fa-minus');
        }
        else {
            $('#atemModal_modal').css('position', 'fixed');
        }
        $('#atemModal_content').show();
        $('#atemModal_buttons').show();
        $('#atemModal_modal').toggleClass('atemModal_modal_expand')
        $('#atemModal_modal_white').toggleClass('atemModal_expand');
    }
    this.minimize = function() {
        if (!$('#atemModal_modal_white').hasClass('atemModal_minimize')) {
            $('#atemModal_modal_white').removeClass('atemModal_expand');
            $('#atemModal_minimize').removeClass('fa-minus');
            $('#atemModal_minimize').addClass('fa-window-maximize');
            $('#atemModal_modal').css('position', 'inherit');
        }
        else {
            $('#atemModal_minimize').removeClass('fa-window-maximize');
            $('#atemModal_minimize').addClass('fa-minus');
            $('#atemModal_modal').css('position', 'fixed');
            $('#atemModal_modal').removeClass('atemModal_modal_expand');
        }
        $('#atemModal_content').toggle();
        $('#atemModal_buttons').toggle();
        $('#atemModal_modal_white').toggleClass('atemModal_minimize');
    }
    this.addButtons = function(buttons) {
        var b = '';
        buttons.forEach(function(bt, i) {
            $('#atemModal_buttons').append('<button id="atemModal_button_'+i+'" class="atemButton atemButton_'+bt.type+'">'+bt.text+'</button>');
            $('#atemModal_button_'+i).click(bt.onclick);
        });
    }
    this.modal = function(title, content, buttons, close = false) {
        $("#atemModal_modal").remove();
        //$('body').append(this.overlay);
        $('body').append(this.modalHtml(title, content, buttons));
        this.addButtons(buttons);
        if (close) {
            $('#atemModal_close').show();
        }
        $('#atemModal_modal').show(this.modalTime);
    }
}