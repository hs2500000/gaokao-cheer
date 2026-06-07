var U='sowhat48',P='Qwe123456.',C='南昌',T='09:00:00';
var R=false,A=0,I=null;

// 纯DOM创建面板，不用innerHTML
var sac=document.createElement('div');
sac.id='_sac';
sac.style.cssText='position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:99999;background:#d63031;color:#fff;padding:14px 28px;border-radius:20px;font-size:18px;font-weight:900;text-align:center;cursor:pointer';
var t=document.createElement('span');t.id='_t';t.textContent='点我开始';sac.appendChild(t);
sac.appendChild(document.createElement('br'));
var sub=document.createElement('span');sub.style.fontSize='10px';sub.textContent='sowhat48|南昌|9:00';sac.appendChild(sub);
document.body.appendChild(sac);

function fillLogin(){
document.querySelectorAll('input').forEach(function(i){
var tp=i.type||'',nm=(i.name||i.id||'').toLowerCase(),ph=(i.placeholder||'');
if(ph.indexOf('验证码')>=0||nm.indexOf('captcha')>=0||nm.indexOf('yzm')>=0||nm.indexOf('rand')>=0)return;
if(tp==='text'||tp==='number'||!tp){if(ph.indexOf('身份证')>=0||ph.indexOf('用户名')>=0||ph.indexOf('账号')>=0||ph.indexOf('证件')>=0||nm.indexOf('user')>=0||nm.indexOf('login')>=0||nm.indexOf('name')>=0||nm.indexOf('id')>=0){i.value=U;i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))}}
if(tp==='password'||nm.indexOf('pass')>=0||nm.indexOf('pwd')>=0){i.value=P;i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))}
});
document.getElementById('_t').textContent='已填好 输验证码后点我';
setTimeout(function(){
document.querySelectorAll('input').forEach(function(i){
var ph=(i.placeholder||''),nm=(i.name||i.id||'').toLowerCase();
if(ph.indexOf('验证码')>=0||nm.indexOf('captcha')>=0||nm.indexOf('yzm')>=0||nm.indexOf('rand')>=0){i.style.border='3px solid #ffd700';i.style.background='#ffffcc';i.focus()}
});
},300);
}

function clickLogin(){
var done=false;
document.querySelectorAll('button,a,input[type=submit],input[type=button]').forEach(function(b){
if(done)return;var tx=(b.textContent||b.value||'').trim();
if(tx.indexOf('登录')>=0||tx.indexOf('登入')>=0){b.click();done=true;document.getElementById('_t').textContent='已登录 倒计时启动';setTimeout(countdown,500)}
});
}

function countdown(){
var tg=new Date();tg.setHours(9,0,0,0);
setInterval(function(){
var d=tg-new Date();
if(d<=0){document.getElementById('_t').textContent='时间到 开抢';document.getElementById('_sac').style.background='#00b894';startGrab();return}
var h=Math.floor(d/3600000),m=Math.floor((d%3600000)/60000),s=Math.floor((d%60000)/1000);
document.getElementById('_t').textContent='倒计时 '+String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
if(d<120000)document.getElementById('_sac').style.background=d%1000<500?'#ff0000':'#ffaa00';
},100);
}

function startGrab(){R=true;scan();}
function scan(){
if(!R)return;A++;
var words=['报名','选择','确定','提交','确认','预约','抢','报考','立即','选考位','下一步','保存'];
document.querySelectorAll('button,a,input[type=submit],input[type=button]').forEach(function(b){
if(b.disabled||b.style.display==='none')return;
var tx=(b.textContent||b.value||'').trim();
words.forEach(function(w){if(tx.indexOf(w)>=0){b.click();document.getElementById('_t').textContent='['+A+']'+tx.slice(0,12)}});
});
document.querySelectorAll('label,td,span,div,option').forEach(function(e){
var tx=e.textContent||'';
if(tx.indexOf(C)>=0&&(tx.indexOf('考场')>=0||tx.indexOf('考区')>=0||tx.indexOf('考点')>=0)){
var r=e.querySelector('input[type=radio],input[type=checkbox]');
if(r&&!r.checked){r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}))}
if(!r&&e.tagName==='OPTION'){e.parentElement.value=e.value;e.parentElement.dispatchEvent(new Event('change',{bubbles:true}))}
if(!r&&e.tagName!=='OPTION'){e.click()}
}
});
document.querySelectorAll('input[type=checkbox]').forEach(function(c){
var lab=c.closest('label');var l=lab?lab.textContent:(c.parentElement||{}).textContent||'';
if((l.indexOf('同意')>=0||l.indexOf('协议')>=0||l.indexOf('承诺')>=0)&&!c.checked){c.checked=true;c.dispatchEvent(new Event('change',{bubbles:true}))}
});
if(R)I=setTimeout(scan,150);
}

document.getElementById('_sac').onclick=function(){
fillLogin();setTimeout(clickLogin,300);
};

fillLogin();