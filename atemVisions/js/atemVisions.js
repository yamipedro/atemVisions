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
    this.modalTheme = this.modalThemes.atemModal_white;
    this.setTheme = function(theme) {
        if (Object.keys(this.modalThemes).indexOf(theme) != -1) this.modalTheme = this.modalThemes[theme];
    }
    this.getThemes = function() {
        return this.modalThemes;
    }

    this.overlay = '<div id="atemModal_overlay"></div>';
    this.modalHtml = function(title, content) {
        return `
            <div id="atemModal_modal" class="atemBorder_`+this.modalTheme.name+`">
                <div id="atemModal_title" style="background: `+this.modalTheme.back+`; color: `+this.modalTheme.color+`;">`+title+`</div>
                <div id="atemModal_content">`+content+`</div>
                <div id="atemModal_buttons"></div>
            </div>
        `;
    }
    this.closeModal = function() {
        $('#atemModal_modal').hide(this.modalTime);
        setTimeout(function() {
            $('#atemModal_modal').remove();
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
        $("#atemModal_modal").remove();
        //$('body').append(this.overlay);
        $('body').append(this.modalHtml(title, content, buttons));
		if (close) {
            buttons.push({
				text: 'Fechar',
				type: this.modalTheme.name,
				onclick: function() { atemModal.closeModal() }
			});
        }
        this.addButtons(buttons);
        $('#atemModal_modal').css('left', ($(window).width() / 2 -  $('#atemModal_modal').width() / 2));
        $('#atemModal_modal').css('visibility', 'inherit');
        $('#atemModal_modal').show(this.modalTime);
    }
}