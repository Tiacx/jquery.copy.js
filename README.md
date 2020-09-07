# jquery.copy.js
jquery bootstrap 复制文本到剪切板插件（非flash）


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