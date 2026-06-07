var CITY='南昌',running=false,attempts=0,timer=null;

// 面板
var sac=document.createElement('div');
sac.id='_sac';
sac.style.cssText='position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:99999;background:#d63031;color:#fff;padding:12px 24px;border-radius:20px;font-size:16px;font-weight:900;text-align:center;cursor:pointer';
var t=document.createElement('span');t.id='_t';t.textContent='点我开始抢';sac.appendChild(t);
document.body.appendChild(sac);

function log(msg){document.getElementById('_t').textContent=msg;console.log(msg)}

function findInAllDocs(sel){
var all=[];
document.querySelectorAll(sel).forEach(function(e){all.push(e)});
// 检查iframe
var iframes=document.querySelectorAll('iframe');
iframes.forEach(function(fr){
try{var d=fr.contentDocument||fr.contentWindow.document;if(d){d.querySelectorAll(sel).forEach(function(e){all.push(e)})}}catch(e){}
});
return all;
}

function clickInAllDocs(sel,textMatch){
var found=false;
var els=findInAllDocs(sel);
for(var i=0;i<els.length;i++){
var e=els[i];
if(e.disabled||e.style.display==='none')continue;
var tx=(e.textContent||e.value||'').trim();
if(!textMatch||tx.indexOf(textMatch)>=0||tx===textMatch){
e.click();found=true;log('clicked:'+tx.slice(0,20));
break;
}}
return found;
}

function selectCityInPopup(){
// 尝试多种方式找南昌
var done=false;

// 方法1: 找包含南昌的可点击元素
var all=findInAllDocs('label,td,span,div,option,a,li,button');
for(var i=0;i<all.length;i++){
if(done)break;
var tx=(all[i].textContent||'').trim();
if(tx.indexOf(CITY)>=0&&tx.length<30){
var radio=all[i].querySelector('input[type=radio],input[type=checkbox]');
if(radio){radio.checked=true;radio.dispatchEvent(new Event('change',{bubbles:true}))}
all[i].click();done=true;log('选中:'+CITY);
}}

// 方法2: 找select下拉
if(!done){
var sels=findInAllDocs('select');
sels.forEach(function(sel){
if(done)return;
var opts=sel.querySelectorAll('option');
for(var j=0;j<opts.length;j++){
if(opts[j].textContent.indexOf(CITY)>=0){sel.value=opts[j].value;sel.dispatchEvent(new Event('change',{bubbles:true}));done=true;log('下拉选:'+CITY);break;}
}});
}

// 选完点确认
setTimeout(function(){
clickInAllDocs('button,a,input[type=submit],input[type=button]','确定')||
clickInAllDocs('button,a,input[type=submit],input[type=button]','确认')||
clickInAllDocs('button,a,input[type=submit],input[type=button]','提交')||
clickInAllDocs('button,a,input[type=submit],input[type=button]','OK');
log('confirmed');
},500);
}

function doLoop(){
if(!running)return;attempts++;

// 找选择按钮
var selBtns=[];
findInAllDocs('button,a,input[type=button],input[type=submit]').forEach(function(b){
var tx=(b.textContent||b.value||'').trim();
if(tx==='选择')selBtns.push(b);
});

if(selBtns.length>0){
log('['+attempts+'] clicking '+selBtns.length+' select btns');
selBtns.forEach(function(b){b.click()});
setTimeout(selectCityInPopup,1000);
setTimeout(function(){doLoop()},3500);
return;
}

// 找下一步
var hasNext=clickInAllDocs('button,a,input[type=submit],input[type=button]','下一步');
if(hasNext){log('clicked next step');setTimeout(function(){doLoop()},2000);return;}

// 找提交
var hasSubmit=clickInAllDocs('button,a,input[type=submit],input[type=button]','提交');
if(hasSubmit){log('clicked submit')}

log('['+attempts+'] waiting...');
if(running)timer=setTimeout(doLoop,2000);
}

document.getElementById('_sac').onclick=function(){
if(running){running=false;clearTimeout(timer);document.getElementById('_sac').style.background='#d63031';log('stopped');return}
running=true;document.getElementById('_sac').style.background='#00b894';doLoop();
};
