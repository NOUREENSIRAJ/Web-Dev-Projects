const jobs = [
  {title:"Frontend Developer (React)",company:"Techdots Inc.",logo:"#3B82F6",abbr:"TD",type:"Full Time",location:"Remote",exp:"Junior",salary:"$1,200–1,800/mo",tags:["React","JavaScript","Tailwind CSS"],time:"2 hours ago",featured:true},
  {title:"MERN Stack Developer",company:"BuildFast Agency",logo:"#8B5CF6",abbr:"BF",type:"Full Time",location:"Hybrid",exp:"Junior",salary:"$1,500–2,200/mo",tags:["MongoDB","Express","React","Node.js"],time:"5 hours ago",featured:false},
  {title:"Junior Backend Developer",company:"CloudNine Solutions",logo:"#10B981",abbr:"CN",type:"Full Time",location:"Remote",exp:"Junior",salary:"$1,000–1,400/mo",tags:["Node.js","Express","REST APIs"],time:"1 day ago",featured:false},
  {title:"QA Engineer / Tester",company:"SoftVerify Ltd.",logo:"#F59E0B",abbr:"SV",type:"Contract",location:"Remote",exp:"Junior",salary:"$800–1,200/mo",tags:["Manual Testing","Postman","JIRA"],time:"1 day ago",featured:true},
  {title:"React Native Developer",company:"AppWorks Studio",logo:"#EF4444",abbr:"AW",type:"Freelance",location:"Remote",exp:"Mid",salary:"$2,000–3,000/mo",tags:["React Native","JavaScript","Firebase"],time:"2 days ago",featured:false},
  {title:"Full Stack Developer",company:"NexaDigital",logo:"#06B6D4",abbr:"ND",type:"Full Time",location:"On-site",exp:"Mid",salary:"$2,500–3,500/mo",tags:["MERN Stack","AWS","Docker"],time:"3 days ago",featured:false},
];

function renderJobs(list){
  const el=document.getElementById('jobsList');
  document.getElementById('jobsCount').textContent=`Showing ${list.length} jobs`;
  el.innerHTML=list.map((j,i)=>`
    <div class="job-card ${j.featured?'featured':''}">
      ${j.featured?'<div class="featured-badge">⭐ Featured</div>':''}
      <div class="company-row">
        <div class="company-logo" style="background:${j.logo}">${j.abbr}</div>
        <div><div style="font-weight:600;font-size:14px;color:#1E293B">${j.company}</div><div class="company-name">${j.location}</div></div>
      </div>
      <div class="job-title">${j.title}</div>
      <div class="job-meta">
        <span class="job-tag green">${j.type}</span>
        <span class="job-tag blue">${j.exp}</span>
        ${j.tags.map(t=>`<span class="job-tag">${t}</span>`).join('')}
      </div>
      <div class="job-footer">
        <div><div class="job-salary">${j.salary}</div><div class="job-time">Posted ${j.time}</div></div>
        <button class="apply-btn" onclick="openModal('${j.title}','${j.company}')">Apply Now</button>
      </div>
    </div>`).join('');
}

function filterJobs(){
  const q=document.getElementById('searchInput').value.toLowerCase();
  const filtered=jobs.filter(j=>j.title.toLowerCase().includes(q)||j.company.toLowerCase().includes(q)||j.tags.some(t=>t.toLowerCase().includes(q)));
  renderJobs(filtered);
}

function openModal(title,company){
  document.getElementById('modalTitle').textContent=title;
  document.getElementById('modalCompany').textContent=company;
  document.getElementById('applyForm').style.display='block';
  document.getElementById('successMsg').style.display='none';
  document.getElementById('modal').classList.add('open');
}

function closeModal(){document.getElementById('modal').classList.remove('open');}
function submitApp(){
  document.getElementById('applyForm').style.display='none';
  document.getElementById('successMsg').style.display='block';
}

renderJobs(jobs);