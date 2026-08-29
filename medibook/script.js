const doctors=[
  {id:1,name:'Dr. Ayesha Tariq',spec:'General Physician',exp:'8 yrs',emoji:'👩‍⚕️',bg:'#EFF6FF',fee:'$25',rating:'4.9 ★ (142)',tags:['Checkups','Fever','Diabetes']},
  {id:2,name:'Dr. Bilal Raza',spec:'Dermatologist',exp:'6 yrs',emoji:'👨‍⚕️',bg:'#FFF7ED',fee:'$40',rating:'4.8 ★ (98)',tags:['Acne','Eczema','Skin']},
  {id:3,name:'Dr. Sana Malik',spec:'Cardiologist',exp:'12 yrs',emoji:'👩‍⚕️',bg:'#FFF1F2',fee:'$55',rating:'5.0 ★ (201)',tags:['Heart','ECG','BP']},
  {id:4,name:'Dr. Omar Farooq',spec:'Pediatrician',exp:'9 yrs',emoji:'👨‍⚕️',bg:'#F0FDF4',fee:'$30',rating:'4.7 ★ (87)',tags:['Children','Vaccines','Growth']},
  {id:5,name:'Dr. Hina Baig',spec:'Neurologist',exp:'10 yrs',emoji:'👩‍⚕️',bg:'#FAF5FF',fee:'$60',rating:'4.9 ★ (115)',tags:['Migraines','Nerve','Brain']},
  {id:6,name:'Dr. Kashif Ali',spec:'General Physician',exp:'5 yrs',emoji:'👨‍⚕️',bg:'#ECFDF5',fee:'$20',rating:'4.6 ★ (64)',tags:['Flu','Checkups','Diet']},
];

const slots=['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM'];
const takenSlots=['09:30 AM','10:30 AM','02:00 PM','04:00 PM'];
let selectedSlot=null, selectedDoc=null;

function renderDocs(list){
  document.getElementById('docCount').textContent=`Showing ${list.length} doctors`;
  document.getElementById('doctorsGrid').innerHTML=list.map(d=>`
    <div class="doctor-card">
      <div class="doc-top">
        <div class="doc-avatar" style="background:${d.bg}">${d.emoji}</div>
        <div>
          <div class="doc-name">${d.name}</div>
          <div class="doc-spec">${d.spec}</div>
          <div class="doc-exp">${d.exp} experience</div>
        </div>
      </div>
      <div class="available-badge"><div class="available-dot"></div>Available Today</div>
      <div class="doc-info">${d.tags.map(t=>`<span class="doc-tag">${t}</span>`).join('')}</div>
      <div class="doc-footer">
        <div><div class="doc-fee">${d.fee} / visit</div><div class="doc-rating">${d.rating}</div></div>
        <button class="book-doc-btn" onclick="openModal(${d.id})">Book Now</button>
      </div>
    </div>`).join('');
}

function filterDocs(){
  const q=document.getElementById('searchInput').value.toLowerCase();
  renderDocs(q?doctors.filter(d=>d.name.toLowerCase().includes(q)||d.spec.toLowerCase().includes(q)):doctors);
}

function openModal(id){
  selectedDoc=doctors.find(d=>d.id===id);
  selectedSlot=null;
  document.getElementById('bookingForm').style.display='block';
  document.getElementById('successView').style.display='none';
  document.getElementById('modalDocHeader').innerHTML=`
    <div class="doc-avatar" style="background:${selectedDoc.bg};width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${selectedDoc.emoji}</div>
    <div><div class="modal h3" style="font-size:16px;font-weight:700;color:#0F172A">${selectedDoc.name}</div><div class="modal-spec">${selectedDoc.spec}</div><div style="font-size:12px;color:#64748B;margin-top:2px">Consultation Fee: ${selectedDoc.fee}</div></div>`;
  document.getElementById('slotsGrid').innerHTML=slots.map(s=>`
    <div class="slot ${takenSlots.includes(s)?'taken':''}" onclick="selectSlot(this,'${s}')">${s}</div>`).join('');
  document.getElementById('modal').classList.add('open');
}

function selectSlot(el,slot){
  if(el.classList.contains('taken'))return;
  document.querySelectorAll('.slot').forEach(s=>s.classList.remove('selected'));
  el.classList.add('selected');selectedSlot=slot;
}

function closeModal(){document.getElementById('modal').classList.remove('open');}

function confirmBooking(){
  if(!selectedSlot){alert('Please select a time slot.');return;}
  const name=document.getElementById('ptName').value.trim()||'Patient';
  const reason=document.getElementById('ptReason').value;
  document.getElementById('bookingForm').style.display='none';
  document.getElementById('successView').style.display='block';
  const today=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
  document.getElementById('confirmCard').innerHTML=`
    <div class="confirm-row"><span>Doctor</span><span>${selectedDoc.name}</span></div>
    <div class="confirm-row"><span>Specialty</span><span>${selectedDoc.spec}</span></div>
    <div class="confirm-row"><span>Date</span><span>${today}</span></div>
    <div class="confirm-row"><span>Time</span><span>${selectedSlot}</span></div>
    <div class="confirm-row"><span>Patient</span><span>${name}</span></div>
    <div class="confirm-row"><span>Reason</span><span>${reason}</span></div>
    <div class="confirm-row"><span>Fee</span><span>${selectedDoc.fee}</span></div>`;
}

renderDocs(doctors);