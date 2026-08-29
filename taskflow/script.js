const colors=['#6366F1','#EC4899','#10B981','#F59E0B','#EF4444','#06B6D4'];
const columns=[
  {id:'todo',title:'To Do',dot:'#64748B',cards:[
    {id:1,title:'Set up MongoDB Atlas cluster and configure env variables',priority:'High',tags:['Backend','DB'],due:'Jun 5',color:'#6366F1'},
    {id:2,title:'Design login and register UI with form validation',priority:'Medium',tags:['Frontend'],due:'Jun 6',color:'#EC4899'},
    {id:3,title:'Create user authentication API endpoint (JWT)',priority:'High',tags:['API','Auth'],due:'Jun 7',color:'#10B981'},
  ]},
  {id:'inprogress',title:'In Progress',dot:'#3B82F6',cards:[
    {id:4,title:'Build job listing page with filter sidebar',priority:'High',tags:['Frontend','React'],due:'Jun 4',color:'#F59E0B'},
    {id:5,title:'Write Postman tests for /jobs endpoints',priority:'Medium',tags:['SQA','Postman'],due:'Jun 5',color:'#6366F1'},
  ]},
  {id:'review',title:'In Review',dot:'#A855F7',cards:[
    {id:6,title:'Implement job application form and submission flow',priority:'Medium',tags:['Frontend','UX'],due:'Jun 3',color:'#EC4899'},
  ]},
  {id:'done',title:'Done',dot:'#22C55E',cards:[
    {id:7,title:'Project setup: Vite + React + Tailwind configured',priority:'Low',tags:['Setup'],due:'Jun 1',color:'#10B981'},
    {id:8,title:'Create Express server with basic routing structure',priority:'Low',tags:['Backend'],due:'Jun 2',color:'#6366F1'},
  ]},
];

let dragCard=null,dragFrom=null;

function pClass(p){return p==='High'?'p-high':p==='Medium'?'p-med':'p-low';}

function render(){
  const board=document.getElementById('board');
  board.innerHTML=columns.map((col,ci)=>`
    <div class="column">
      <div class="col-header">
        <div class="col-title"><div class="col-dot" style="background:${col.dot}"></div>${col.title}<span class="col-count">${col.cards.length}</span></div>
        <button class="add-card-btn" onclick="openAddModalCol(${ci})">+</button>
      </div>
      <div class="col-body" id="col-${ci}" ondragover="dragOver(event,${ci})" ondrop="drop(event,${ci})">
        ${col.cards.map(c=>`
          <div class="card" draggable="true" id="card-${c.id}" ondragstart="dragStart(event,${c.id},${ci})" ondragend="dragEnd()">
            <div class="card-priority ${pClass(c.priority)}">${c.priority}</div>
            <div class="card-title">${c.title}</div>
            <div class="card-tags">${c.tags.map(t=>`<span class="card-tag">${t}</span>`).join('')}</div>
            <div class="card-footer">
              <div class="card-due">📅 ${c.due}</div>
              <div class="card-assignee" style="background:${c.color}">NN</div>
            </div>
          </div>`).join('')}
        <div class="drop-zone" id="dz-${ci}">Drop here</div>
      </div>
    </div>`).join('');
}

function dragStart(e,cardId,colIdx){dragCard=cardId;dragFrom=colIdx;e.dataTransfer.effectAllowed='move';}
function dragEnd(){dragCard=null;dragFrom=null;document.querySelectorAll('.drop-zone').forEach(d=>d.classList.remove('drag-over'));}
function dragOver(e,ci){e.preventDefault();document.getElementById('dz-'+ci).classList.add('drag-over');}
function drop(e,ci){
  e.preventDefault();
  if(dragCard===null||dragFrom===ci)return;
  const card=columns[dragFrom].cards.find(c=>c.id===dragCard);
  columns[dragFrom].cards=columns[dragFrom].cards.filter(c=>c.id!==dragCard);
  columns[ci].cards.push(card);
  render();
}

let addToCol=0;
function openAddModal(){addToCol=0;document.getElementById('modal').classList.add('open');}
function openAddModalCol(ci){addToCol=ci;document.getElementById('taskCol').value=ci;document.getElementById('modal').classList.add('open');}
function closeModal(){document.getElementById('modal').classList.remove('open');}
function addTask(){
  const title=document.getElementById('taskTitle').value.trim();
  if(!title)return;
  const ci=parseInt(document.getElementById('taskCol').value);
  const priority=document.getElementById('taskPriority').value;
  const tag=document.getElementById('taskTag').value||'Task';
  const due=document.getElementById('taskDue').value||'TBD';
  const newId=Date.now();
  columns[ci].cards.unshift({id:newId,title,priority,tags:[tag],due,color:colors[Math.floor(Math.random()*colors.length)]});
  closeModal();render();
  document.getElementById('taskTitle').value='';document.getElementById('taskTag').value='';
}

render();