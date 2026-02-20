const cooks=[
"أفراح","خديجة","أمور","فضول",
"زناب","زهراء","زوزو","أمل"
];

// إنشاء أيام 30
const day=document.getElementById("day");
if(day){
for(let i=1;i<=30;i++){
let op=document.createElement("option");
op.text="Day "+i;
day.add(op);
}
}

// إنشاء خانات التقييم
const ratings=document.getElementById("ratings");
if(ratings){
cooks.forEach(c=>{
ratings.innerHTML+=`
<p>${c}</p>
<input type="number" min="1" max="10" id="${c}">
`;
});
}

// حفظ التقييم
async function save(){

let person=document.getElementById("person").value;
let day=document.getElementById("day").value;

for(const c of cooks){

let val=document.getElementById(c).value;

await setDoc(
doc(db,"ratings",`${day}-${person}-${c}`),
{cook:c,person,day,rating:Number(val)}
);
}

alert("تم حفظ التقييم ✅");
}

// عرض النتائج
async function loadResults(){

let snap=await getDocs(collection(db,"ratings"));

let totals={},counts={};

cooks.forEach(c=>{
totals[c]=0;
counts[c]=0;
});

snap.forEach(d=>{
let data=d.data();
totals[data.cook]+=data.rating;
counts[data.cook]++;
});

const res=document.getElementById("results");

if(res){
cooks.forEach(c=>{
let avg=(totals[c]/counts[c]||0).toFixed(2);
res.innerHTML+=`<p>${c} ⭐ ${avg}</p>`;
});
}
}

loadResults();
