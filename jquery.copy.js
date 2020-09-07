/*!
 * jQuery Copy Plugin
 * version: 2.0.0-2020.09.07
 * Requires jQuery v1.5 or later && Bootstrap
 * Copyright (c) 2018 Tiac
 * http://www.cnblogs.com/tujia/p/8336671.html
 */

// AMD support
(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define(['jquery'], factory);
    } else {
        // no AMD; invoke directly
        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
    }
}

(function($) {
"use strict";

/*
    Basic Usage:
    -----------

    Html:
        <button type="button" class="btn-copy" data-clipboard-text="Copy Me!">Copy</button>
    JS:
        $('.btn-copy').copy();

    
    Html:
        <div class="input-group">
            <input type="text" class="form-control inp-link">
            <span class="input-group-btn">
                <button class="btn btn-primary btn-copy" type="button">Copy</button>
            </span>
        </div>
    JS:
        $('.btn-copy').copy({
            copy: function(_this){
                return _this.parents('div').find('.inp-link').val();
            },
            afterCopy: function(res, _this){
                if(res==true){
                    alert('Copied text to clipboard。');
                }else{
                    alert('Copy failed！');
                }
            }
        });


    Tooltip Options:
    -----------

    Html:
        <button type="button" class="demo1" data-clipboard-text="Copy Me!">Copy</button>
        <span class="demo2">something</span>
    JS:
        $('.demo1').copy({tooltip:false});
        $('.demo2').copy({
            tooltip: {
                title: 'click to copy',
                afterCopyText: 'copied!!',
                .....
            }
        });
*/

var clipboard_text = '';

function copyTextToClipboard(_this, text) {
    var oTa = jQuery('<textarea style="position:fixed;left:0;top:0;z-index:9999999999"></textarea>');
    oTa.val(text);

    _this.after(oTa);

    oTa.select();

    try {
        var result = document.execCommand('copy');
        oTa.remove();
        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}

$.fn.copy = function(options) {
    if(options===undefined) options = {};

    var defaults = {};
    defaults.copy = function(_this){
        clipboard_text = _this.data('clipboard-text');
        return clipboard_text;
    };

    if (navigator.language && navigator.language.toLowerCase() == 'zh-cn') {
        defaults.tooltip = {title: '点击复制', afterCopyText: '复制成功!!'};
    } else {
        defaults.tooltip = {title: 'copy', afterCopyText: 'copied!!'};
    }

    defaults.afterCopy = function(res, _this){
        if(res){
            console.log('Copied text to clipboard: ' + clipboard_text);
        }else{
            console.log('Copy failed！');
        }

        if (options.tooltip != false) {
            _this.next('.tooltip').find('.tooltip-inner').html(options.tooltip.afterCopyText);
        }
    };

    options = $.extend(defaults, options);

    if (options.tooltip != false) {
        this.tooltip(options.tooltip);
    }

    this.on('click', function(){
        clipboard_text = options.copy($(this));
        var res = copyTextToClipboard($(this), clipboard_text);
        options.afterCopy(res, $(this));
    });
};

}));
