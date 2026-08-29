let txType='income';
let transactions=[
  {type:'income',desc:'Freelance - React Dashboard',cat:'💻 Freelance',amt:850,date:'Jun 4'},
  {type:'expense',desc:'Monthly Groceries',cat:'🍔 Food',amt:120,date:'Jun 3'},
  {type:'income',desc:'Upwork Project Payment',cat:'💻 Freelance',amt:430,date:'Jun 2'},
  {type:'expense',desc:'Internet & Electricity',cat:'💡 Utilities',amt:65,date:'Jun 2'},
  {type:'expense',desc:'Uber Rides',cat:'🚗 Transport',amt:38,date:'Jun 1'},
  {type:'income',desc:'Part-time Teaching',cat:'💼 Salary',amt:300,date:'Jun 1'},
  {type:'expense',desc:'Online Course',cat:'🎓 Education',amt:49,date:'May 31'},
  {type:'expense',desc:'Dinner & Cafe',cat:'🍔 Food',amt:42,date:'May 30'},
];

const budgets=[
  {cat:'🍔 Food',limit:200,emoji:'🍔',color:'#F59E0B'},
  {cat:'🛍️ Shopping',limit:150,emoji:'🛍️',color:'#8B5CF6'},
  {cat:'🚗 Transport',limit:80,emoji:'🚗',color:'#3B82F6'},
  {cat:'🎮 Entertainment',limit:60,emoji:'🎮',color:'#EC4899'},
  {cat:'💡 Utilities',limit:100,emoji:'💡',color:'#10B981'},
];

const monthlyData=[
  {m:'Jan',inc:900,exp:620},{m:'Feb',inc:1100,exp:750},{m:'Mar',inc:850,exp:580},
  {m:'Apr',inc:1300,exp:890},{m:'May',inc:1050,exp:710},{m:'Jun',inc:0,exp:0},
];

function calcSummary(){
  const inc=transactions.filter(t=>t.type==='income').reduce((a,b)=>a+b.amt,0);
  const exp=transactions.filter(t=>t.type==='expense').reduce((a,b)=>a+b.amt,0);
  monthlyData[5].inc=inc; monthlyData[5].exp=exp;
  document.getElementById('balVal').textContent='$'+(inc-exp).toLocaleString();
  document.getElementById('incVal').textContent='$'+inc.toLocaleString();
  document.getElementById('expVal').textContent='$'+exp.toLocaleString();
  document.getElementById('savVal').textContent=inc>0?Math.round(((inc-exp)/inc)*100)+'%':'0%';
}

function renderTx(){
  document.getElementById('txCount').textContent=transactions.length+' transactions';
  const catColors={'💻 Freelance':'#1F6FEB','💼 Salary':'#2EA043','🍔 Food':'#F59E0B','🚗 Transport':'#3B82F6','🛍️ Shopping':'#8B5CF6','💡 Utilities':'#10B981','🎓 Education':'#EC4899','🎮 Entertainment':'#EF4444','🏥 Health':'#06B6D4'};
  document.getElementById('txList').innerHTML=transactions.slice(0,8).map(t=>`
    <div class="tx-item">
      <div class="tx-icon" style="background:${catColors[t.cat]||'#30363D'}22">${t.cat.split(' ')[0]}</div>
      <div class="tx-info"><div class="tx-name">${t.desc}</div><div class="tx-cat">${t.cat}</div></div>
      <div style="text-align:right"><div class="tx-amt ${t.type==='income'?'inc':'exp'}">${t.type==='income'?'+':'-'}$${t.amt}</div><div class="tx-date">${t.date}</div></div>
    </div>`).join('');
}

function renderBudget(){
  const expByCat={};
  transactions.filter(t=>t.type==='expense').forEach(t=>{expByCat[t.cat]=(expByCat[t.cat]||0)+t.amt;});
  document.getElementById('budgetList').innerHTML=budgets.map(b=>{
    const spent=expByCat[b.cat]||0;
    const pct=Math.min((spent/b.limit)*100,100);
    const over=spent>b.limit;
    return `<div class="budget-item">
      <div class="budget-row">
        <div class="budget-name">${b.emoji} ${b.cat.split(' ').slice(1).join(' ')}</div>
        <div class="budget-vals" style="color:${over?'#F85149':'#8B949E'}">$${spent} / $${b.limit}</div>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${over?'#F85149':b.color}"></div></div>
    </div>`;}).join('');
}

function renderChart(){
  const maxVal=Math.max(...monthlyData.map(d=>Math.max(d.inc,d.exp)),100);
  document.getElementById('barChart').innerHTML=monthlyData.map(d=>`
    <div class="bar-col">
      <div class="bar-val" style="font-size:9px">${d.inc>0?'$'+Math.round(d.inc/100)/10+'k':''}</div>
      <div style="display:flex;gap:2px;align-items:flex-end;flex:1;width:100%">
        <div class="bar" style="height:${(d.inc/maxVal)*120}px;background:#2EA043;flex:1"></div>
        <div class="bar" style="height:${(d.exp/maxVal)*120}px;background:#F85149;flex:1"></div>
      </div>
      <div class="bar-label">${d.m}</div>
    </div>`).join('');
}

function renderCatBreakdown(){
  const expByCat={};
  transactions.filter(t=>t.type==='expense').forEach(t=>{expByCat[t.cat]=(expByCat[t.cat]||0)+t.amt;});
  const total=Object.values(expByCat).reduce((a,b)=>a+b,0)||1;
  const colors=['#F59E0B','#8B5CF6','#3B82F6','#EC4899','#10B981','#EF4444','#06B6D4'];
  const entries=Object.entries(expByCat).sort((a,b)=>b[1]-a[1]);
  document.getElementById('catBreakdown').innerHTML=entries.map(([cat,amt],i)=>`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
      <div style="width:10px;height:10px;border-radius:3px;background:${colors[i%colors.length]};flex-shrink:0"></div>
      <div style="flex:1;font-size:12px;color:#E6EDF3">${cat}</div>
      <div style="font-size:12px;font-weight:600;color:#E6EDF3">$${amt}</div>
      <div style="font-size:11px;color:#8B949E">${Math.round((amt/total)*100)}%</div>
    </div>`).join('')||'<div style="color:#8B949E;font-size:13px;text-align:center;padding:1rem">No expenses yet</div>';
}

function setType(t){
  txType=t;
  document.getElementById('incBtn').className='type-btn'+(t==='income'?' active-inc':'');
  document.getElementById('expBtn').className='type-btn'+(t==='expense'?' active-exp':'');
}

function openModal(){document.getElementById('modal').classList.add('open');}
function closeModal(){document.getElementById('modal').classList.remove('open');}

function addTransaction(){
  const desc=document.getElementById('txDesc').value.trim();
  const amt=parseFloat(document.getElementById('txAmt').value);
  const cat=document.getElementById('txCat').value;
  if(!desc||!amt||amt<=0)return;
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const d=new Date();
  transactions.unshift({type:txType,desc,cat,amt,date:months[d.getMonth()]+' '+d.getDate()});
  document.getElementById('txDesc').value='';document.getElementById('txAmt').value='';
  closeModal();renderAll();
}

function renderAll(){calcSummary();renderTx();renderBudget();renderChart();renderCatBreakdown();}
renderAll();