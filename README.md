# jquery.copy.js
纯js复制文本到剪切板插件（非flash）


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
	        afterCopy: function(res){
	            if(res==true){
	                alert('Copied text to clipboard。');
	            }else{
	                alert('Copy failed！');
	            }
	        }
	    });