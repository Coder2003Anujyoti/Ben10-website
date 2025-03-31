import React,{useState,useEffect} from "react";
import { motion } from "framer-motion";
import {useSearchParams} from "react-router-dom"
import PlayerFirst from './PlayerFirst.jsx';
import ComputerFirst from './ComputerFirst.jsx';
import { useLocation } from "react-router-dom";
const LocalData=()=>{
  const lists=localStorage.getItem('pkloppos');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const LocalWin=()=>{
  const lists=localStorage.getItem('pklwinnerlist');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const LocalMatch=()=>{
  const lists=localStorage.getItem('pklwinlist');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const LocalStand=()=>{
  const lists=localStorage.getItem('pklstandings');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const Game = () => {
  const [searchParams] = useSearchParams();
  const [oppositionteam,setOppositionteam]=useState("")
  const [choose,setChoose]=useState(false)
  const [toggle,setToggle]=useState("");
  const [standing,setStanding]=useState(()=>LocalStand()||[])
  const [win,setWin]=useState(()=>LocalWin()||[])
  const [matches,setMatches]=useState(()=>LocalMatch()||[])
  const [load,setLoad]=useState(false);
  const [items,setItems]=useState([]);
  const [oppositionplayers,setOppositionplayers]=useState([])
  const [players,setPlayers]=useState([]);
  const [id,setId]=useState([]);
    const [toss,setToss]=useState("");
  const [playerfirst,setPlayerfirst]=useState(false);
  const [computerfirst,setComputerfirst]=useState(false);
  const teamId = searchParams.get("team"); 
  const [teams,setTeams]=useState(()=>LocalData()||[])
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = JSON.parse(decodeURIComponent(queryParams.get("data"))) || [];
  const team=JSON.parse(decodeURIComponent(queryParams.get("team"))) || "";
  const playerteam=data.filter((i)=>i.team===team);
  const computerteam=data.filter((i)=>i.team===oppositionteam)
  const add_Players=(i)=>{
    setPlayers([...players,i]);
    setId([...id,i.name]);
  }
    useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  useEffect(()=>{
  document.body.className="bg-green-400"
})
  const get_Toss=()=>{
   let options=Math.floor(Math.random()*2);
    if(options==0){
      let computer_options=Math.floor(Math.random()*2);
      if(computer_options===0){
        setToss("Computer Raid");
      }
      else{
        setToss("Computer Defend");
      }
    }
    if(options===1){
      setToss("Player");
    }
  }
  useEffect(()=>{
    if(win.length===11){
      if(matches.length===11){
      const knockteam=standing.slice().sort((a,b)=>b.win-a.win).filter((i,ind)=>ind<4);
      const pos_team=knockteam.findIndex((i)=>i.name===team);
      if(pos_team==0){
        setOppositionteam(knockteam[3].name)
      }
   if(pos_team==1){
        setOppositionteam(knockteam[2].name)
      }
      if(pos_team==2){
        setOppositionteam(knockteam[1].name)
      }
      if(pos_team==3){
        setOppositionteam(knockteam[0].name)
      }
      }
      if(matches.length>11){
              setOppositionteam(matches[matches.length-1].computer)
      }
    }
        if(win.length===12){
          if(matches[matches.length-1].win!=="Draw"){
      const knockteam=standing.slice().sort((a,b)=>b.win-a.win).filter((i,ind)=>ind<4);
      const pos_team=knockteam.findIndex((i)=>i.name===team);
      if(pos_team==0){
        setOppositionteam(knockteam[1].name)
      }
   if(pos_team==1){
        setOppositionteam(knockteam[3].name)
      }
      if(pos_team==2){
        setOppositionteam(knockteam[0].name)
      }
      if(pos_team==3){
        setOppositionteam(knockteam[2].name)
      }
          }
           if(matches[matches.length-1].win==="Draw"){
              setOppositionteam(matches[matches.length-1].computer)
      }
    }
  },[matches])
  useEffect(()=>{
    if(win.length>=0 && win.length<11){
      setOppositionteam(teams[0])
    }
  },[win])
  return (
    <>
{ oppositionteam!='' && <>
   {
      id.length<10 && choose===false && <>
      { win.length===11 && <>
        <div className="w-full flex flex-col justify-center text-center gap-y-6 my-2">
          <h1 className="font-bold text-gray-900 ml-2 mr-2">Semi-final</h1>
        </div>
</>}
    { win.length===12 && <>
        <div className="w-full flex flex-col justify-center text-center gap-y-6 my-2">
          <h1 className="font-bold text-gray-900 ml-2 mr-2">Final</h1>
        </div>
</>}
  <div className="flex flex-col gap-y-6 my-32">
   <div className="w-full flex flex-col justify-center text-center gap-y-6 my-2">
   <h1 className="font-bold text-gray-900 ml-2 mr-2">Welcome to PKL 2025</h1>
        </div>
<div className="flex flex-wrap gap-y-14  justify-center items-center text-white gap-x-10">
<div className="flex flex-col items-center gap-y-4">
  <img src={`Teams/${team}1.webp`}  className="w-28 h-28" />
 <img src={`teams/${team}.webp`} className="w-16 h-16" />
</div>
<motion.span
  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
  transition={{ repeat: Infinity, duration: 1.2 }}
  className="text-xl font-bold bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent"
>
  V/S
</motion.span>
  <div className="flex flex-col items-center gap-y-4">
 <img src={`Teams/${oppositionteam}1.webp`} loading="lazy"  className="w-28 h-28" />
  <img src={`teams/${oppositionteam}.webp`}  className="w-16 h-16" />
 </div>
  <button onClick={()=>setChoose(true)} className="text-sm text-white font-extrabold p-4 bg-orange-600 rounded-bl-lg rounded-tl-lg rounded-tr-lg">Start Playing</button>
 </div>
 </div>
      </>
    }
{load==false && id.length<4 && choose===true && <>
      { win.length===11 && <>
        <div className="w-full flex flex-col justify-center text-center gap-y-6 my-2">
          <h1 className="font-bold text-gray-900 ml-2 mr-2">Semi-final</h1>
        </div>
</>}
    { win.length===12 && <>
        <div className="w-full flex flex-col justify-center text-center gap-y-6 my-2">
          <h1 className="font-bold text-gray-900 ml-2 mr-2">Final</h1>
        </div>
</>}
  <div className="w-full py-8 flex justify-center">
    <h1 className="text-gray-900 text-2xl font-bold shadow-gray-900">Choose Your Playing &#73;&#86;</h1>
  </div>
  <div className="flex justify-center flex-row flex-wrap gap-4">
    {playerteam[0].players.map((i)=>{
    if(!id.includes(i.name))
      return(
      <>
        <div className="text-center rounded-md bg-green-500  transition duration-300 ease-in-out transform   hover:scale-105" onClick={()=>add_Players(i)}>
       <div className="flex justify-center items-center"> <img className="w-16 h-16" src={Array.from(i.image).reverse().slice(33).reverse().join("")} /></div>
        <p className="text-xs font-bold text-gray-900">{i.name}</p>
        </div>
      </>
      )
    })}
  </div>
    {id.length>0 && <>
     <div className="flex my-6 p-2 border-t border-t-green-700 flex-col justify-center items-center text-center gap-4">
     <h1 className="text-lg text-slate-900 font-bold">Your Team</h1>
       <img src={`teams/${team}.webp`} className="w-24 h-24" />
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2 ">
     {
       players.map((i)=>{
         return(<>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-green-500  hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
    <p className="text-gray-900 text-xs font-bold">{i.name}</p>
           </div>
         </>)
       })
     }
     </div>
  </>}
</>
}
  </>
}
{ id.length===4 && toggle=="" && playerfirst===false && computerfirst===false && <>
    { win.length===11 && <>
        <div className="w-full flex flex-col justify-center text-center gap-y-6 py-6">
          <h1 className="font-bold text-gray-900 ml-2 mr-2">Semi-final</h1>
        </div>
</>}
    { win.length===12 && <>
        <div className="w-full flex flex-col justify-center text-center gap-y-6 py-6">
          <h1 className="font-bold text-gray-900 ml-2 mr-2">Final</h1>
        </div>
</>}

 <div className="flex p-4  flex-col justify-center items-center text-center gap-4">
     <h1 className="text-lg text-gray-900 font-bold">Your Team</h1>
       <img src={`teams/${team}.webp`} className="w-24 h-24" />
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2 my-4">
     {
       players.map((i)=>{
         return(<>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-green-500  hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
    <p className="text-gray-900 text-xs font-bold">{i.name}</p>
           </div>
         </>)
       })
     }
     </div>
      <div className="flex p-4 border-t border-t-green-700 flex-col justify-center items-center text-center gap-4">
     <h1 className="text-lg text-gray-900 font-bold">Opposition Team</h1>
       <img src={`teams/${oppositionteam}.webp`} className="w-24 h-24" />
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2 my-4">
     {
      computerteam[0].players.slice(0,4).map((i)=>{
         return(<>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-green-500 hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
    <p className="text-gray-900 text-xs font-bold">{i.name}</p>
           </div>
         </>)
       })
     }
     </div>
      <div className="w-full flex justify-center items-center">
      <button className="p-4 font-extrabold text-gray-900 rounded-lg bg-green-500" onClick={()=>{
            window.scrollTo({ top: 0, behavior: "smooth" });
      setToggle("Go")}}>Submit</button>
    </div>
     </>}
{ id.length==4 && toggle==="Go" && playerfirst===false && computerfirst===false && <>
  
  {
    toss==='' && <>
    <div className="w-full py-8 flex justify-center">
      <h1 className="text-gray-900 text-2xl font-bold shadow-gray-900">Toss the coin</h1>
    </div>
      <div className="py-6 flex w-full justify-center">
        <img src="Icons/coins.png" className="w-28 h-28" onClick={get_Toss} />
      </div>
    </>
  }
  {
    toss=="Computer Raid" && <>
      <div className="w-full py-20 flex justify-center text-center"><h1 className="text-gray-900 text-2xl font-bold shadow-gray-900 ml-2 mr-2">
      {oppositionteam.toUpperCase()} won toss and elected to Raid first 
      </h1></div>
    <div className="w-full flex justify-center items-center">
      <button className="p-4 font-extrabold text-gray-900 rounded-lg bg-green-500" onClick={()=>{
      window.scrollTo({ top: 0, behavior: "smooth" });
      setComputerfirst(true)}}>Submit</button>
    </div>
    </>
  }
    {
    toss=="Computer Defend" && <>
      <div className="w-full py-20 flex justify-center text-center"><h1 className="text-gray-900 text-2xl font-bold shadow-gray-900 ml-2 mr-2">
      {oppositionteam.toUpperCase()} won toss and elected to Defend first 
      </h1></div>
    <div className="w-full flex justify-center items-center">
      <button className="p-4 font-extrabold text-gray-900 rounded-lg bg-green-500" onClick={()=>{
      window.scrollTo({ top: 0, behavior: "smooth" });
      setPlayerfirst(true)}}>Submit</button>
    </div>
    </>
  }
  {
    toss=="Player" && <>
     <div className="w-full flex-col my-12 gap-6 flex justify-center font-bold text-center"><h1 className="text-gray-900 text-2xl font-bold shadow-gray-900">
      {team.toUpperCase()} won toss 
      </h1>
      <div className="w-full flex justify-center items-center flex-row gap-10">
  <div className="text-center text-gray-900 p-4 rounded-lg bg-green-500" onClick={()=>{
  window.scrollTo({ top: 0, behavior: "smooth" });
  setPlayerfirst(true)}}>Raid</div>
  <div className="text-center p-4 rounded-lg bg-green-500 text-gray-900" onClick={()=>{
  window.scrollTo({ top: 0, behavior: "smooth" });
  setComputerfirst(true)}}>Defence</div>
      </div>
      </div>
    </>
  }
</>
}
{
  playerfirst===true && <PlayerFirst players={players} oppositionplayers={computerteam[0].players.slice(0,4)} subp={playerteam[0].players} subc={computerteam[0].players} />
}
{
  computerfirst===true && <ComputerFirst players={players} oppositionplayers={computerteam[0].players.slice(0,4)} subp={playerteam[0].players} subc={computerteam[0].players} />
}

</>
  );
};



export default Game;