import React,{useState,useEffect} from "react";
import Fire from './Fire';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const LocalUser=()=>{
  const lists=localStorage.getItem('pkluser');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const LocalWin=()=>{
  const lists=localStorage.getItem('pklwinlist');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const LocalWinner=()=>{
  const lists=localStorage.getItem('pklwinnerlist');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const LocalData=()=>{
  const lists=localStorage.getItem('pkloppos');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return ["GG","UY","UMU","TTS","TT","PPN","PP","JPP","DD","BB","BW","HS"];
}
}
const Winner = ({winner,yourteam,opposteam}) => {
  const [update,setUpdate]=useState(()=>LocalUser()||[]);
  const [histruns,setHistruns]=useState({});
  const [histwickets,setHistwickets]=useState({});
  const [winnerarray,setWinnerarray]=useState(()=>LocalWinner()||[]);
  const [load,setLoad]=useState(true);
  const [winarray,setWinarray]=useState(()=>LocalWin()||[]);
  const [teams,setTeams]=useState(()=>LocalData()|| ["GG","UY","UMU","TTS","TT","PPN","PP","JPP","DD","BB","BW","HS"]);
  const array=yourteam.concat(opposteam);
  const playerdata=yourteam;
const computerdata= opposteam;
const playertotal=playerdata.reduce((total,i)=>{
  total+=(i.raids+i.defends);
  return total;
},0)
const computertotal=computerdata.reduce((total,i)=>{
  total+=(i.raids+i.defends);
  return total;
},0)
  
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  useEffect(()=>{
  document.body.className="bg-green-400"
})
  useEffect(()=>{
  if(winner===yourteam[0].team){
    const m=teams.filter((i)=>i!=opposteam[0].team);
    const roy=update.map((i)=>{
    if(i.team===yourteam[0].team || i.team===opposteam[0].team){
    i.players.map((it)=>{
      array.map((item)=>{
    if(item.name===it.name){
        it.matches+=1;
        it.raids+=item.raids;
        it.defends+=item.defends;
    }
      })
    })
    }
    return {...i}
  })
  localStorage.setItem('pkluser',JSON.stringify(roy));
    localStorage.setItem('pklwinlist',JSON.stringify([...winarray,{win:winner,player:yourteam[0].team,computer:opposteam[0].team}]))
    localStorage.setItem('pklwinnerlist',JSON.stringify([...winnerarray,{win:winner,player:yourteam[0].team,computer:opposteam[0].team}]))
    localStorage.setItem('pkloppos',JSON.stringify(m));
   setLoad(false)
  }
 else if(winner===opposteam[0].team){
   const m=teams.filter((i)=>i!=opposteam[0].team);
   const roy=update.map((i)=>{
    if(i.team===yourteam[0].team || i.team===opposteam[0].team){
    i.players.map((it)=>{
      array.map((item)=>{
    if(item.name===it.name){
        it.matches+=1;
        it.raids+=item.raids;
        it.defends+=item.defends;
    }
      })
    })
    }
    return {...i}
  })
  localStorage.setItem('pkluser',JSON.stringify(roy));
    localStorage.setItem('pklwinlist',JSON.stringify([...winarray,{win:winner,player:yourteam[0].team,computer:opposteam[0].team}]))
    localStorage.setItem('pklwinnerlist',JSON.stringify([...winnerarray,{win:winner,player:yourteam[0].team,computer:opposteam[0].team}]))
    localStorage.setItem('pkloppos',JSON.stringify(m));
   setLoad(false)
  }
  else{
    if(winarray.length<11){
    const m=teams.filter((i)=>i!=opposteam[0].team);
    const roy=update.map((i)=>{
    if(i.team===yourteam[0].team || i.team===opposteam[0].team){
    i.players.map((it)=>{
      array.map((item)=>{
    if(item.name===it.name){
        it.matches+=1;
        it.raids+=item.raids;
        it.defends+=item.defends;
    }
      })
    })
    }
    return {...i}
  })
  localStorage.setItem('pkluser',JSON.stringify(roy));
    localStorage.setItem('pklwinlist',JSON.stringify([...winarray,{win:winner,player:yourteam[0].team,computer:opposteam[0].team}]))
    localStorage.setItem('pklwinnerlist',JSON.stringify([...winnerarray,{win:winner,player:yourteam[0].team,computer:opposteam[0].team}]))
    localStorage.setItem('pkloppos',JSON.stringify(m));
    setLoad(false)
    }
    else{
      const m=teams.filter((i)=>i!=opposteam[0].team);
    const roy=update.map((i)=>{
    if(i.team===yourteam[0].team || i.team===opposteam[0].team){
    i.players.map((it)=>{
      array.map((item)=>{
    if(item.name===it.name){
        it.matches+=1;
        it.raids+=item.raids;
        it.defends+=item.defends;
    }
      })
    })
    }
    return {...i}
  })
  localStorage.setItem('pkluser',JSON.stringify(roy));
    localStorage.setItem('pklwinlist',JSON.stringify([...winarray,{win:winner,player:yourteam[0].team,computer:opposteam[0].team}]))
    localStorage.setItem('pkloppos',JSON.stringify(m));
    setLoad(false)
    }
  }
  },[])
  const histogramOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: "rgb(31,41,55)", font: { weight: "bold" } },
      grid: { color: "rgba(31,41,55)" }, // Light grid lines
    },
    x: {
      ticks: { color: "rgb(31,41,55)", font: { weight: "bold" } },
      grid: { display: false }, // Hide vertical grid lines
    },
  },
  plugins: {
    legend: { display: false }, 
        datalabels: {
          color: "transparent",
      font: { weight: "bold", size: 14 },
    },
          
  },
};
useEffect(()=>{
    const filterruns=array.sort((a,b)=>b.raids-a.raids).filter((i,ind)=>ind<6);
    const filterwickets=array.sort((a,b)=>b.defends-a.defends).filter((i,ind)=>ind<6);
    const histogramRuns = {
  labels: filterruns.map((batter)=> batter.name),
  datasets: [
    {
      label: "Raids Scored",
      data: filterruns.map((batter) => batter.raids),
      backgroundColor: "#3b82f6", // Blue color
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
};
const histogramWickets = {
  labels: filterwickets.map((batter) => batter.name),
  datasets: [
    {
      label: "Defends Scored",
      data: filterwickets.map((batter) => batter.defends),
      backgroundColor: "#3b82f6", // Blue color
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
};
  setHistruns(histogramRuns);
  setHistwickets(histogramWickets);
},[])
  return (
    <>
{ load==false && <>
      { winnerarray.length===11 && <>
        <div className="w-full flex flex-col justify-center text-center gap-y-6 py-6">
          <h1 className="font-bold text-gray-900 ml-2 mr-2">Semi-final</h1>
        </div>
</>}
      { winnerarray.length===12 && <>
        <div className="w-full flex flex-col justify-center text-center gap-y-6 py-6">
          <h1 className="font-bold text-gray-900 ml-2 mr-2">Final</h1>
        </div>
</>}
    {winner!=='Draw' && 
  <>
  <div className="w-full py-4 flex justify-center">
     <h1 className="text-sm font-extrabold text-gray-900">Winner</h1> 
    </div>
      <div className="w-full py-4 flex justify-center">
<img src={`Teams/${winner}1.webp`} className="w-24 h-24" />
    </div>
    </>
  }
  {
    winner==="Draw" && <>
        <div className="w-full py-20 flex justify-center">
     <h1 className="text-xl font-extrabold text-gray-900">Draw</h1> 
    </div>
    </>
  }
 <div className="w-full flex justify-center items-center py-12">
     <button className="p-4 rounded-lg text-lg text-gray-900 font-bold bg-green-500">Match Summary</button>
   </div>
  <div className="w-full flex justify-center items-center">
   <h1 className="text-lg font-bold text-gray-900">Scorecard</h1>
   </div>
   <div className="w-full flex flex-row justify-center gap-4">
     <div className="flex p-4 flex-row gap-4">
       <img src={`Teams/${playerdata[0].team}1.webp`} className="w-16 h-16" />
     <div className="flex justify-center items-center text-center"><p className="text-lg font-bold text-gray-900">{playertotal}</p></div>
     </div>
          <div className="flex p-4 flex-row gap-4">
     <div className="flex justify-center items-center text-center"><p className="text-lg font-bold text-gray-900">{computertotal}</p></div>
     <img src={`Teams/${computerdata[0].team}1.webp`} className="w-16 h-16" />
     </div>
   </div>

     <div className="w-full flex justify-center items-center">
   <h1 className="text-lg font-bold text-gray-900">Performance</h1>
   </div>
   <div className="flex p-4 flex-row justify-center gap-4">
       <img src={`Teams/${playerdata[0].team}1.webp`} className="w-16 h-16" />
     <div className="flex justify-center items-center text-center"><p className="text-lg font-bold text-gray-900">{playertotal}</p></div>
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2">
     {
       playerdata.map((i)=>{
         return(<>
           <div className="p-4 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-green-500 hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
    <p className="text-gray-900 text-xs font-bold">{i.name}</p>
  <p className="text-gray-900 text-xs font-bold">Raids-:{i.raids}</p>
  <p className="text-gray-900 text-xs font-bold">Defends-:{i.defends}</p>
           </div>
         </>)
       })
     }
     </div>
  <div className="flex p-4 flex-row justify-center gap-4">
       <img src={`Teams/${computerdata[0].team}1.webp`} className="w-16 h-16" />
     <div className="flex justify-center items-center text-center"><p className="text-lg font-bold text-gray-900">{computertotal}</p></div>
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2">
     {
       computerdata.map((i)=>{
         return(<>
           <div className="p-4 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-green-500 hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
    <p className="text-gray-900 text-xs font-bold">{i.name}</p>
  <p className="text-gray-900 text-xs font-bold">Raids-:{i.raids}</p>
  <p className="text-gray-900 text-xs font-bold">Defends-:{i.defends}</p>
           </div>
         </>)
       })
     }
     </div>
  <div className="w-full py-4 flex justify-center">
    <h1 className="text-xl font-extrabold text-gray-900">Top Raiders</h1>
  </div>
  <div className="w-full flex flex-row flex-wrap justify-center gap-4 ">
    
    {
      array.sort((a,b)=>b.raids-a.raids).map((i,ind)=>{
      if(ind<6)
        return(<>
 <div className="p-4 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-green-500  hover:scale-105">
   <img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16"/>
  <div className="flex justify-center items-center"><h2 className="text-xs font-extrabold text-gray-900 ">{i.name}</h2></div>
    <div className="flex justify-center items-center"> <h2 className="text-xs font-extrabold text-gray-900">Raids-:{i.raids}</h2></div>
   </div>
        </>)
      })
    }
    </div>
         <div className="bg-green-400 p-6  w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-gray-900 text-xs font-bold mb-4 text-center">Raiders Analysis</h2>
      <Bar data={histruns} options={histogramOptions} />
    </div>
    <div className="w-full py-4 flex justify-center">
    <h1 className="text-xl font-extrabold text-gray-900">Top Defenders</h1>
  </div>
  <div className="w-full flex flex-row flex-wrap justify-center gap-4 ">
    {
      array.sort((a,b)=>b.defends-a.defends).map((i,ind)=>{
      if(ind<6)
        return(<>
 <div className="p-4 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-green-500  hover:scale-105">
   <img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16"/>
  <div className="flex justify-center items-center"><h2 className="text-xs font-extrabold text-gray-900 ">{i.name}</h2></div>
    <div className="flex justify-center items-center"> <h2 className="text-xs font-extrabold text-gray-900">Defends-:{i.defends}</h2></div>
   </div>
        </>)
      })
    }
    </div>
      <div className="bg-green-400 p-6  w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-gray-900 text-xs font-bold mb-4 text-center">Defenders Analysis</h2>
      <Bar data={histwickets} options={histogramOptions} />
    </div>
 <Fire  show={true} />
</>
}
  </>
  );
};


export default Winner;