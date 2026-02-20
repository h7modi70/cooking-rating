const cooks = ["أفراح","خديجة","أمور","فضول","زناب","زهراء","زوزو","أمل"];

// إنشاء أيام 30 يوم (إذا موجود في rate.html)
const daySelect = document.getElementById("day");
if(daySelect){
  for(let i=1;i<=30;i++){
    let op=document.createElement("option");
    op.text="Day "+i;
    daySelect.add(op);
  }
}

// إنشاء خانات التقييم في rate.html
const ratingsDiv = document.getElementById("ratings");
if(ratingsDiv){
  cooks.forEach(c=>{
    ratingsDiv.innerHTML+=`
      <p>${c}</p>
      <input type="number" min="1" max="10" id="${c}">
    `;
  });
}

// دالة حفظ التقييم
async function save(){
  let person = document.getElementById("person").value;
  let day = document.getElementById("day").value;

  for(const c of cooks){
    let val = document.getElementById(c).value;
    if(!val) val = 0;
    await setDoc(
      doc(db, "ratings", `${day}-${person}-${c}`),
      { cook: c, person, day, rating: Number(val) }
    );
  }

  alert("تم حفظ التقييم ✅");
}

// دالة تحميل النتائج
async function loadResults(){
  const snap = await getDocs(collection(db, "ratings"));

  const totals = {};
  const counts = {};
  cooks.forEach(c => { totals[c]=0; counts[c]=0; });

  snap.forEach(d=>{
    const data = d.data();
    totals[data.cook] += data.rating;
    counts[data.cook]++;
  });

  const res = document.getElementById("results");
  if(res){
    res.innerHTML = ""; // نظف النتائج قبل العرض
    cooks.forEach(c=>{
      let avg = (totals[c]/counts[c] || 0).toFixed(2);
      let img = "";
      if(avg >=0 && avg <=4) img="0-4.png";
      else if(avg >=5 && avg <=7) img="5-7.png";
      else if(avg >=8 && avg <=9) img="8-9.png";
      else if(avg ==10) img="10.png";

      res.innerHTML += `
        <p>${c} ⭐ ${avg}</p>
        <img src="${img}" style="width:100px; margin:10px;">
      `;
    });
  }
}

// إذا صفحة النتائج موجودة، استدعِ loadResults تلقائي
if(document.getElementById("results")){
  loadResults();
}
