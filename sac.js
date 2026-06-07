var CITY='南昌',running=false,attempts=0,timer=null;

// 面板
var sac=document.createElement('div');
sac.id='_sac';
sac.style.cssText='position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:99999;background:#d63031;color:#fff;padding:14px 28px;border-radius:20px;font-size:18px;font-weight:900;text-align:center;cursor:pointer';
var t=document.createElement('span');t.id='_t';t.textContent='点我开始自动抢';sac.appendChild(t);
sac.appendChild(document.createElement('br'));
var sub=document.createElement('span');sub.style.fontSize='10px';sub.textContent=CITY+' | 自动选考区考场';sac.appendChild(sub);
document.body.appendChild(sac);

// 找弹窗中的确认按钮
function findConfirmBtn(){
var all=document.querySelectorAll('button,a,input[type=submit],input[type=button]');
for(var i=0;i<all.length;i++){
var tx=(all[i].textContent||all[i].value||'').trim();
if(tx==='确定'||tx==='确认'||tx==='提交'||tx==='OK'||tx==='是'){return all[i]}
}return null;
}

// 选城市和场次
function selectInPopup(){
var t=document.getElementById('_t');
// 先找南昌并点击
var found=false;
var all=document.querySelectorAll('label,td,span,div,option,a,li');
for(var i=0;i<all.length;i++){
var tx=(all[i].textContent||'');
if(tx.indexOf(CITY)>=0){
var radio=all[i].querySelector('input[type=radio],input[type=checkbox]');
if(radio&&!radio.checked){radio.checked=true;radio.dispatchEvent(new Event('change',{bubbles:true}));radio.dispatchEvent(new Event('click',{bubbles:true}))}
all[i].click();found=true;t.textContent='选中'+CITY;break;
}}
if(!found){
// 如果没找到南昌，尝试找第一个可选城市
all.forEach(function(e){if(found)return;var tx=e.textContent||'';var r=e.querySelector('input[type=radio]');if(r&&!r.checked&&tx.length<20){r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}));found=true;t.textContent='选中默认城市'}});
}
// 等弹窗更新后点确认
setTimeout(function(){
var btn=findConfirmBtn();
if(btn){btn.click();t.textContent='已确认选择'}else{t.textContent='未找到确认按钮'}
},600);
}

// 主循环
function doLoop(){
if(!running)return;attempts++;
var t=document.getElementById('_t');

// 步骤1: 找所有选择按钮并点击
var selectBtns=[];
document.querySelectorAll('button,a,input[type=button],input[type=submit]').forEach(function(b){
var tx=(b.textContent||b.value||'').trim();
if(tx==='选择')selectBtns.push(b);
});

if(selectBtns.length>0){
t.textContent='['+attempts+']点击'+selectBtns.length+'个选择按钮';
selectBtns.forEach(function(b){b.click()});
// 等弹窗出来后选城市
setTimeout(function(){selectInPopup()},800);
// 继续处理下一个选择按钮
setTimeout(function(){doLoop()},3000);
return;
}

// 步骤2: 没有选择按钮了，找下一步
var nextFound=false;
document.querySelectorAll('button,a,input[type=submit],input[type=button]').forEach(function(b){
if(nextFound)return;
var tx=(b.textContent||b.value||'').trim();
if(tx.indexOf('下一步')>=0){b.click();nextFound=true;t.textContent='点击了下一步'}else if(tx==='提交'||tx==='确定'){b.click();nextFound=true;t.textContent='点击了提交'}
});

if(!nextFound){t.textContent='['+attempts+']等待...'}
if(running)timer=setTimeout(doLoop,2000);
}

document.getElementById('_sac').onclick=function(){
if(running){running=false;clearTimeout(timer);document.getElementById('_t').textContent='已停止';document.getElementById('_sac').style.background='#d63031';return}
running=true;
document.getElementById('_sac').style.background='#00b894';
document.getElementById('_t').textContent='自动抢报中...';
doLoop();
};
