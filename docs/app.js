
document.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('on'));
  b.classList.add('on');
  const t=b.dataset.t; document.querySelectorAll('[data-panel]').forEach(p=>{
    p.style.display = p.dataset.panel===t ? '' : 'none';
  });
  if (window.__redraw) window.__redraw();
}));

function barChart(id, data, color){
  const c=document.getElementById(id); if(!c) return;
  const x=c.getContext('2d'), W=c.width, H=c.height;
  x.clearRect(0,0,W,H);
  const padL=54, padB=34, padT=10, padR=10;
  const maxV=Math.max(...data.map(d=>d.v));
  const n=data.length, gap=10, bw=(W-padL-padR-gap*(n-1))/n;
  x.strokeStyle='#22304F'; x.lineWidth=1;
  for(let i=0;i<=4;i++){ const y=padT+(H-padT-padB)*i/4; x.beginPath(); x.moveTo(padL,y); x.lineTo(W-padR,y); x.stroke(); }
  x.font='11px ui-monospace,monospace'; x.fillStyle='#6C7C9B';
  data.forEach((d,i)=>{
    const bh=(H-padT-padB)*d.v/maxV, bx=padL+i*(bw+gap), by=H-padB-bh;
    const g=x.createLinearGradient(0,by,0,H-padB); g.addColorStop(0,color[0]); g.addColorStop(1,color[1]);
    x.fillStyle=g; x.beginPath(); x.roundRect(bx,by,bw,bh,5); x.fill();
    x.fillStyle='#E8EEF9'; x.textAlign='center'; x.fillText(d.k,(bx+bw/2).toFixed(0),by-8);
    x.fillStyle='#6C7C9B'; x.fillText(d.l,(bx+bw/2).toFixed(0),H-padB+18);
  });
  x.textAlign='left';
}
function lineChart(id, data, color){
  const c=document.getElementById(id); if(!c) return;
  const x=c.getContext('2d'), W=c.width, H=c.height;
  x.clearRect(0,0,W,H);
  const padL=44,padB=26,padT=12,padR=10;
  const vals=data.map(d=>d.v), mn=Math.min(...vals), mx=Math.max(...vals);
  x.strokeStyle='#22304F';
  for(let i=0;i<=3;i++){const y=padT+(H-padT-padB)*i/3; x.beginPath(); x.moveTo(padL,y); x.lineTo(W-padR,y); x.stroke();}
  const X=i=>padL+(W-padL-padR)*i/(data.length-1);
  const Y=v=>H-padB-(H-padT-padB)*(v-mn)/((mx-mn)||1);
  x.beginPath(); data.forEach((d,i)=> i?x.lineTo(X(i),Y(d.v)):x.moveTo(X(i),Y(d.v)));
  x.strokeStyle=color; x.lineWidth=2.5; x.stroke();
  x.lineTo(X(data.length-1),H-padB); x.lineTo(X(0),H-padB); x.closePath();
  const g=x.createLinearGradient(0,padT,0,H-padB); g.addColorStop(0,color+'44'); g.addColorStop(1,color+'00');
  x.fillStyle=g; x.fill();
  x.fillStyle='#6C7C9B'; x.font='11px ui-monospace,monospace';
  data.forEach((d,i)=>{ x.fillText(d.k, X(i)-12, H-padB+18); });
}
const deepData=[{k:'01',l:'g1',v:.06},{k:'02',l:'g2',v:.08},{k:'03',l:'g3',v:.11},{k:'04',l:'g4',v:.09},
 {k:'05',l:'g5',v:.07},{k:'06',l:'g6',v:.05},{k:'07',l:'g7',v:.06},{k:'08',l:'g8',v:.04},
 {k:'09',l:'g9',v:.03},{k:'10',l:'g10',v:.03},{k:'11',l:'g11',v:.04},{k:'12',l:'g12',v:.02},
 {k:'13',l:'g13',v:.02},{k:'14',l:'g14',v:.29}];
const passData=[{k:'Q1',v:10},{k:'Q2',v:14},{k:'Q3',v:17},{k:'Q4',v:21},{k:'Q5',v:19},{k:'Q6',v:23},{k:'Q7',v:26}];
const failData=[{k:'Q1',v:8},{k:'Q2',v:7},{k:'Q3',v:5},{k:'Q4',v:6},{k:'Q5',v:4},{k:'Q6',v:5},{k:'Q7',v:3}];
const riskData=[{k:'Lend',l:'Lending',v:.21},{k:'Stable',l:'Stables',v:.06},{k:'Perps',l:'Perps',v:.44},
 {k:'DEX',l:'DEX',v:.29},{k:'Bridge',l:'Bridges',v:.34},{k:'LST',l:'Liquid staking',v:.18},
 {k:'RWA',l:'RWA',v:.27},{k:'Yield',l:'Yield strategies',v:.23}];
barChart('deep',deepData,['#7CC4FF','#5EE7C4']);
lineChart('fpass',passData,'#5EE7A0');
lineChart('ffail',failData,'#FF7B8A');
barChart('risk',riskData,['#FFB86B','#FF7B8A']);
