/*
	Copyright (c) 2004-2007, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/book/dojo-book-0-9/introduction/licensing
*/


if(!dojo._hasResource["dijit._base.popup"]){dojo._hasResource["dijit._base.popup"]=true;dojo.provide("dijit._base.popup");dojo.require("dijit._base.focus");dojo.require("dijit._base.place");dojo.require("dijit._base.window");dijit.popup=new function(){var _1=[],_2=1000,_3=1;this.open=function(_4){var _5=_4.popup,_6=_4.orient||{"BL":"TL","TL":"BL"},_7=_4.around,id=(_4.around&&_4.around.id)?(_4.around.id+"_dropdown"):("popup_"+_3++);var _9=dojo.doc.createElement("div");_9.id=id;_9.className="dijitPopup";_9.style.zIndex=_2+_1.length;_9.style.visibility="hidden";if(_4.parent){_9.dijitPopupParent=_4.parent.id;}dojo.body().appendChild(_9);_5.domNode.style.display="";_9.appendChild(_5.domNode);var _a=new dijit.BackgroundIframe(_9);var _b=_7?dijit.placeOnScreenAroundElement(_9,_7,_6,_5.orient?dojo.hitch(_5,"orient"):null):dijit.placeOnScreen(_9,_4,_6=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);_9.style.visibility="visible";var _c=[];function getTopPopup(){for(var pi=_1.length-1;pi>0&&_1[pi].parent===_1[pi-1].widget;pi--){}return _1[pi];};_c.push(dojo.connect(_9,"onkeypress",this,function(_e){if(_e.keyCode==dojo.keys.ESCAPE&&_4.onCancel){_4.onCancel();}else{if(_e.keyCode==dojo.keys.TAB){dojo.stopEvent(_e);var _f=getTopPopup();if(_f&&_f.onCancel){_f.onCancel();}}}}));if(_5.onCancel){_c.push(dojo.connect(_5,"onCancel",null,_4.onCancel));}_c.push(dojo.connect(_5,_5.onExecute?"onExecute":"onChange",null,function(){var _10=getTopPopup();if(_10&&_10.onExecute){_10.onExecute();}}));_1.push({wrapper:_9,iframe:_a,widget:_5,parent:_4.parent,onExecute:_4.onExecute,onCancel:_4.onCancel,onClose:_4.onClose,handlers:_c});if(_5.onOpen){_5.onOpen(_b);}return _b;};this.close=function(_11){while(dojo.some(_1,function(_12){return _12.widget==_11;})){var top=_1.pop(),_14=top.wrapper,_15=top.iframe,_16=top.widget,_17=top.onClose;if(_16.onClose){_16.onClose();}dojo.forEach(top.handlers,dojo.disconnect);if(!_16||!_16.domNode){return;}dojo.style(_16.domNode,"display","none");dojo.body().appendChild(_16.domNode);_15.destroy();dojo._destroyElement(_14);if(_17){_17();}}};}();dijit._frames=new function(){var _18=[];this.pop=function(){var _19;if(_18.length){_19=_18.pop();_19.style.display="";}else{if(dojo.isIE){var _1a="<iframe src='javascript:\"\"'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";_19=dojo.doc.createElement(_1a);}else{var _19=dojo.doc.createElement("iframe");_19.src="javascript:\"\"";_19.className="dijitBackgroundIframe";}_19.tabIndex=-1;dojo.body().appendChild(_19);}return _19;};this.push=function(_1b){_1b.style.display="";if(dojo.isIE){_1b.style.removeExpression("width");_1b.style.removeExpression("height");}_18.push(_1b);};}();if(dojo.isIE&&dojo.isIE<7){dojo.addOnLoad(function(){var f=dijit._frames;dojo.forEach([f.pop()],f.push);});}dijit.BackgroundIframe=function(_1d){if(!_1d.id){throw new Error("no id");}if((dojo.isIE&&dojo.isIE<7)||(dojo.isFF&&dojo.isFF<3&&dojo.hasClass(dojo.body(),"dijit_a11y"))){var _1e=dijit._frames.pop();_1d.appendChild(_1e);if(dojo.isIE){_1e.style.setExpression("width","document.getElementById('"+_1d.id+"').offsetWidth");_1e.style.setExpression("height","document.getElementById('"+_1d.id+"').offsetHeight");}this.iframe=_1e;}};dojo.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);delete this.iframe;}}});}