let posts=[
  {id:1,title:'Building a REST API with Node.js and Express in 2025',excerpt:'A practical guide to structuring your backend with proper routing, middleware, and error handling for production apps.',cat:'Node.js',emoji:'🟢',bg:'#F0FDF4',color:'#16A34A',author:'Noreen Naqvi',date:'Jun 4, 2025',views:1240,readTime:'8 min',tags:['Node.js','Express','REST API','Backend'],comments:[{author:'Ali R.',color:'#3B82F6',text:'Really clear explanation! Helped me understand middleware properly.'}],body:`<h2>Why REST APIs with Express?</h2><p>Express.js remains the most popular Node.js framework in 2025 for good reason — it's minimal, flexible, and has a massive ecosystem. In this guide we'll build a production-ready REST API from scratch.</p><h2>Setting Up Your Project</h2><p>Start by initializing your project and installing dependencies:</p><p><code>npm init -y && npm install express mongoose dotenv cors</code></p><h2>Structuring Your Routes</h2><p>A clean folder structure is essential for maintainable APIs. Separate your routes, controllers, models, and middleware into dedicated folders.</p><ul><li>routes/ — URL definitions</li><li>controllers/ — Business logic</li><li>models/ — Mongoose schemas</li><li>middleware/ — Auth, validation, error handling</li></ul><h2>Error Handling Done Right</h2><p>Always use a centralized error handling middleware in Express. This prevents code duplication and gives your API consistent error responses.</p>`},
  {id:2,title:'SQA Best Practices: Writing Test Cases That Actually Work',excerpt:'How to write effective test cases that catch real bugs, not just check obvious happy paths.',cat:'SQA',emoji:'🧪',bg:'#FFF7ED',color:'#D97706',author:'Noreen Naqvi',date:'Jun 2, 2025',views:876,readTime:'6 min',tags:['SQA','Testing','QA','JIRA'],comments:[{author:'Sara K.',color:'#8B5CF6',text:'The negative test case section was exactly what I needed!'}],body:`<h2>Why Most Test Cases Fail to Find Bugs</h2><p>The most common mistake in QA is writing test cases that only cover the "happy path" — the expected user flow. Real bugs live in edge cases, boundary values, and error states.</p><h2>The 3 Types of Test Cases You Need</h2><ul><li><strong>Positive test cases</strong> — Does the feature work as expected?</li><li><strong>Negative test cases</strong> — What happens with invalid inputs?</li><li><strong>Boundary test cases</strong> — What happens at the edge values?</li></ul><h2>Writing a Good Test Case</h2><p>Every test case should have: a unique ID, clear preconditions, step-by-step actions, expected result, and actual result. Vague test cases lead to inconsistent execution.</p><h2>API Testing with Postman</h2><p>For backend testing, Postman collections are your best friend. Write <code>pm.test()</code> assertions to validate response codes, body structure, and response time automatically.</p>`},
  {id:3,title:'React State Management: Context API vs Redux Toolkit',excerpt:'When to use Context API and when to bring in Redux — a practical comparison for real projects.',cat:'React',emoji:'⚛️',bg:'#EFF6FF',color:'#1D4ED8',author:'Noreen Naqvi',date:'May 30, 2025',views:2100,readTime:'10 min',tags:['React','Redux','State Management','Frontend'],comments:[{author:'Hamza T.',color:'#10B981',text:'Finally a clear comparison! Going with Redux Toolkit for my next project.'},{author:'Maryam F.',color:'#F59E0B',text:'Context API has been enough for my small apps, good to know the limits.'}],body:`<h2>The State Management Dilemma</h2><p>Every React developer faces this question at some point: do I need Redux, or will Context API be enough? The honest answer depends on your app's complexity and team size.</p><h2>Context API — Best For</h2><ul><li>Small to medium apps with minimal global state</li><li>Sharing theme, auth status, or language settings</li><li>Teams that want to avoid additional dependencies</li></ul><h2>Redux Toolkit — Best For</h2><ul><li>Large apps with complex state interactions</li><li>Frequent state updates that affect many components</li><li>Teams that need powerful dev tools and time-travel debugging</li></ul><h2>My Recommendation</h2><p>Start with Context API. If you notice performance issues or state logic getting complex, migrate to Redux Toolkit. The <code>createSlice</code> API makes it much less boilerplate-heavy than old Redux.</p>`},
  {id:4,title:'From Student to Junior Dev: My First Year at a Tech Company',excerpt:'Honest lessons from my first year working as a junior developer — what nobody tells you before you start.',cat:'Career',emoji:'🚀',bg:'#FAF5FF',color:'#7C3AED',author:'Noreen Naqvi',date:'May 25, 2025',views:3400,readTime:'7 min',tags:['Career','Junior Dev','Tips','Personal'],comments:[{author:'Zainab A.',color:'#EC4899',text:'This is so relatable! The part about code reviews hit home.'},{author:'Usman M.',color:'#3B82F6',text:'Thank you for being so honest — most people only share success stories.'}],body:`<h2>The First Week Feeling</h2><p>Nothing prepares you for the first week at a real tech company. You'll feel like everyone around you knows ten times more than you. That's normal, and it passes.</p><h2>Lesson 1: Ask Questions Early</h2><p>The biggest mistake junior devs make is staying stuck for hours trying to figure something out alone. Ask after 30 minutes of being stuck — your seniors expect it and respect it.</p><h2>Lesson 2: Git Workflow is Not Optional</h2><p>In university, Git means push to main and hope for the best. At work, you'll deal with feature branches, pull requests, merge conflicts, and code reviews. Learn proper Git flow before your first day.</p><h2>Lesson 3: QA Is Your Friend</h2><p>I started as both a developer and QA, and it made me a significantly better coder. Understanding how testers think helps you write code with fewer bugs from the start.</p>`},
];

const cats=['All','Tech','React','Node.js','SQA','Career'];
let activeCat='All';

function showView(v){
  document.getElementById('blogView').style.display=v==='blog'?'block':'none';
  document.getElementById('articleView').style.display=v==='article'?'block':'none';
  document.getElementById('writeView').style.display=v==='write'?'block':'none';
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  if(v==='blog')document.querySelectorAll('.tab-btn')[0].classList.add('active');
  if(v==='write')document.querySelectorAll('.tab-btn')[1].classList.add('active');
  if(v==='blog'){renderPosts();renderStats();}
}

function renderStats(){
  document.getElementById('totalPosts').textContent=posts.length;
  document.getElementById('totalViews').textContent=(posts.reduce((a,b)=>a+b.views,0)/1000).toFixed(1)+'k';
  document.getElementById('totalCats').textContent=new Set(posts.map(p=>p.cat)).size;
}

function renderFilters(){
  const allCats=['All',...new Set(posts.map(p=>p.cat))];
  document.getElementById('filterRow').innerHTML=allCats.map(c=>`<button class="cat-pill ${c===activeCat?'active':''}" onclick="filterCat('${c}')">${c}</button>`).join('')+`<input type="text" class="search-input" placeholder="Search posts..." oninput="searchPosts(this.value)">`;
}

function filterCat(c){activeCat=c;renderFilters();renderPosts();}
function searchPosts(q){
  const filtered=q?posts.filter(p=>p.title.toLowerCase().includes(q.toLowerCase())||p.cat.toLowerCase().includes(q.toLowerCase())):posts;
  renderPostCards(filtered);
}

function renderPosts(){
  const filtered=activeCat==='All'?posts:posts.filter(p=>p.cat===activeCat);
  renderPostCards(filtered);
}

function renderPostCards(list){
  document.getElementById('postsGrid').innerHTML=list.map(p=>`
    <div class="post-card" onclick="openPost(${p.id})">
      <div class="post-thumb" style="background:${p.bg}">
        <span class="post-cat-badge" style="background:${p.color}">${p.cat}</span>
        ${p.emoji}
      </div>
      <div class="post-body">
        <div class="post-title">${p.title}</div>
        <div class="post-excerpt">${p.excerpt}</div>
        <div class="post-meta">
          <div class="post-author"><div class="author-dot">NN</div>${p.author} · ${p.date}</div>
          <div class="post-stats"><span>👁 ${p.views.toLocaleString()}</span><span>⏱ ${p.readTime}</span></div>
        </div>
      </div>
    </div>`).join('');
}

function openPost(id){
  const p=posts.find(x=>x.id===id);
  p.views++;
  document.getElementById('articleContent').innerHTML=`
    <span class="article-cat" style="background:${p.color}">${p.cat}</span>
    <div class="article-title">${p.title}</div>
    <div class="article-meta">
      <div class="article-author">
        <div class="article-author-img">NN</div>
        <div><div class="article-author-name">${p.author}</div><div class="article-date">${p.date} · ${p.readTime} read · 👁 ${p.views.toLocaleString()} views</div></div>
      </div>
    </div>
    <div class="article-thumb" style="background:${p.bg}">${p.emoji}</div>
    <div class="article-body">${p.body}</div>
    <div class="article-tags">${p.tags.map(t=>`<span class="a-tag">#${t}</span>`).join('')}</div>
    <div class="comment-section">
      <h3>💬 ${p.comments.length} Comment${p.comments.length!==1?'s':''}</h3>
      ${p.comments.map(c=>`<div class="comment"><div class="comment-avatar" style="background:${c.color}">${c.author[0]}</div><div class="comment-bubble"><div class="comment-author">${c.author}</div><div class="comment-text">${c.text}</div></div></div>`).join('')}
      <div class="comment-input-row">
        <input type="text" id="newComment" placeholder="Add a comment...">
        <button class="comment-submit" onclick="addComment(${p.id})">Post</button>
      </div>
    </div>`;
  showView('article');
}

function addComment(id){
  const input=document.getElementById('newComment');
  const text=input.value.trim();
  if(!text)return;
  const p=posts.find(x=>x.id===id);
  const colors=['#3B82F6','#8B5CF6','#EC4899','#10B981','#F59E0B'];
  p.comments.push({author:'You',color:colors[Math.floor(Math.random()*colors.length)],text});
  openPost(id);
}

function publishPost(){
  const title=document.getElementById('newTitle').value.trim();
  const excerpt=document.getElementById('newSubtitle').value.trim();
  const body=document.getElementById('newBody').value.trim();
  const cat=document.getElementById('newCat').value;
  if(!title||!body){alert('Please add a title and content.');return;}
  const emojis={'Tech':'💡','React':'⚛️','Node.js':'🟢','SQA':'🧪','Career':'🚀'};
  const bgs={'Tech':'#F0F9FF','React':'#EFF6FF','Node.js':'#F0FDF4','SQA':'#FFF7ED','Career':'#FAF5FF'};
  const colors={'Tech':'#0369A1','React':'#1D4ED8','Node.js':'#16A34A','SQA':'#D97706','Career':'#7C3AED'};
  posts.unshift({id:Date.now(),title,excerpt:excerpt||body.slice(0,120)+'...',cat,emoji:emojis[cat],bg:bgs[cat],color:colors[cat],author:'Noreen Naqvi',date:'Just now',views:1,readTime:'3 min',tags:[cat],comments:[],body:`<p>${body.replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>')}</p>`});
  document.getElementById('newTitle').value='';document.getElementById('newSubtitle').value='';document.getElementById('newBody').value='';
  const s=document.getElementById('pubSuccess');s.style.display='block';
  setTimeout(()=>{s.style.display='none';showView('blog');},2000);
}

renderStats();renderFilters();renderPosts();