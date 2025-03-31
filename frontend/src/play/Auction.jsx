import React,{useState,useEffect} from "react";
import Home from "./Home.jsx"
const LocalData=()=>{
  const lists=localStorage.getItem('pkluser');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const Localget=()=>{
  const lists=localStorage.getItem('pklteam');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return "";
}
}
const LocalFixtures=()=>{
  const lists=localStorage.getItem('pklfixtures');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const LocalVersus=()=>{
  const lists=localStorage.getItem('pkloppos');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const LocalPlayers=()=>{
  const lists=localStorage.getItem('pklretain');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const Auction= () => {
const [fixture,setFixture]=useState(()=>LocalFixtures()||[])
const [retains,setRetains]=useState(()=>LocalPlayers()||[]);
const [venue,setVenue]=useState([])
const [start,setStart]=useState(false)
  const [versus,setVersus]=useState(()=>LocalVersus()||[])
  const [going,setGoing]=useState(false)
  const [original,setOriginal]=useState(false)
  const [open,setOpen]=useState(false)
  const [retaincount,setRetaincount]=useState(0);
  const [load,setLoad]=useState(true);
  const [value,setValue]=useState([]);
  const [playerteam,setPlayerteam]=useState(()=>Localget()||"");
  const [computerteam,setComputerteam]=useState("");
  const [names,setNames]=useState([])
  const [show,setShow]=useState(true)
  const [amount,setAmount]=useState(0)
  const [bid,setBid]=useState(0);
  const [turn,setTurn]=useState("");
  const [display,setDisplay]=useState(true);
  const [sold,setSold]=useState("");
  const [off,setOff]=useState(false);
  const [index,setIndex]=useState(0);
  const [purse,setPurse]=useState(50000)
  const [players,setPlayers]=useState([]);
  const [playing,setPlaying]=useState(false);
  const [team,setTeam]=useState("");
  const [store,setStore]=useState(()=>LocalData()||[]);
  const [computers,setComputers]=useState([{team:"GG",players:[]},{team:"UY",players:[]},{team:"UMU",players:[]},{team:"TTS",players:[]},{team:"TT",players:[]},{team:"PPN",players:[]},{team:"PP",players:[]},{team:"JPP",players:[]},{team:"DD",players:[]},{team:"BB",players:[]},{team:"BW",players:[]},{team:"HS",players:[]}])
  var teams=["GG","UY","UMU","TTS","TT","PPN","PP","JPP","DD","BB","BW","HS"];
  var setteams=["GG","UY","UMU","TTS","TT","PPN","PP","JPP","DD","BB","BW","HS"];
  var details=[{team:"GG",players:[]},{team:"UY",players:[]},{team:"UMU",players:[]},{team:"TTS",players:[]},{team:"TT",players:[]},{team:"PPN",players:[]},{team:"PP",players:[]},{team:"JPP",players:[]},{team:"DD",players:[]},{team:"BB",players:[]},{team:"BW",players:[]},{team:"HS",players:[]}]
  const get_data=async()=>{
const response=await fetch("http://localhost:8000/aliens/");
  const item= await response.json();
  const k=item.data.length
 const m= Math.floor(Math.random()*k)
  setValue(item.data)
  setAmount(Math.floor(Math.random()*100)+1)
  setIndex(m)
  setTimeout(()=>{setLoad(false)},1000)
}
useEffect(()=>{
    document.body.className="bg-green-400"
   })
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
useEffect(()=>{
  if(store.length===0){
    setPlaying(false)
  }
  else{
    setPlaying(true)
  }
},[store])
 const add=()=>{
   if(bid==0){
  if(purse>=amount){
   setTurn(playerteam);
   setBid(amount);
   setDisplay(false)
  }
  else{
    alert("Your Low budget")
    window.location.href="https://coder2003anujyoti.github.io/Ben10-website/"
  }
   }
   if(bid!=0){
       if(purse>=bid+5){
     setTurn(playerteam);
   setBid(bid+5);
   setDisplay(false)
   setOff(false)
   setShow(false)
       }
       else{
    alert("Your Low budget")
    window.location.href="https://coder2003anujyoti.github.io/Ben10-website/"
  }
   }
 }
 const localremove=()=>{
   localStorage.removeItem('pkluser');
   localStorage.removeItem('pklstandings');
   localStorage.removeItem('pklfixtures');
   localStorage.removeItem('pklteam');
   localStorage.removeItem('pkloppos');
   localStorage.removeItem('pklwinlist');
   localStorage.removeItem('pklwinnerlist');
   window.location.reload();
   setVersus([])
   setFixture([])
   setPlaying(false)
   setStore([]);
   setLoad(true);
 }
 const go=()=>{
   if(bid!==0){
       const store=value.find((i,ind)=>{
         return ind==index
       });
     setComputers((prevTeams) =>
      prevTeams.map((team) =>
        team.team === computerteam
          ? { ...team, players: [...team.players,{name:store.name,image:store.image,bid:bid>0?bid:amount,matches:0,raids:0,defends:0,team:computerteam}] }
          : team
      )
    );
      setNames([...names,store.name])
      setSold(computerteam)
      setOff(true)
      setDisplay(false)
   }
   if(bid===0){
     const k=computers.filter((i)=>i.team!==playerteam)
     const empty=k.every((i)=>i.players.length===6);
    if(empty===false){
    let rand_int=Math.floor(Math.random()*100);
    if(rand_int%2===0){
      const store=value.find((i,ind)=>{
      return ind==index
      });
    const m=computers.filter((i)=>i.players.length<6 && i.team!=playerteam);
    const k=m[Math.floor(Math.random()*m.length)].team;
      setComputers((prevTeams) =>
      prevTeams.map((team) =>
        team.team === k
          ? { ...team, players: [...team.players,{name:store.name,image:store.image,bid:bid>0?bid:amount,matches:0,raids:0,defends:0,team:k}] }
          : team
      )
    );
      setNames([...names,store.name])
      setSold(k)
      setOff(true)
      setDisplay(false)
    }
    else{
     setSold("Unsold")
      setOff(true)
      setDisplay(false)
    }
    }
    else{
     setSold("Unsold")
      setOff(true)
      setDisplay(false)
    }
   }
 }
 
 const next=()=>{
   if(sold!=="Unsold"){
   const val=value.filter((i,ind)=>{
   return ind!=index
   });
   const len=val.length;
   const ra=Math.floor(Math.random()*len);
   console.log(len+" "+ra);
   setValue(val);
  setAmount(Math.floor(Math.random()*100)+1)
  setIndex(ra);
  setOff(false);
  setShow(true)
  setDisplay(true)
  setBid(0);
  setTurn("")
  setSold("")
   }
   else{
     const len=value.length;
   setValue(value);
  setAmount(Math.floor(Math.random()*100)+1)
  setIndex((index+1)%len);
  setOff(false);
  setShow(true)
  setDisplay(true)
  setBid(0);
  setTurn("")
  setSold("")
   }
 }
 const play=()=>{
   window.scrollTo({ top: 0, behavior: "smooth" });
 const k=computers.filter((i)=>i.team!==playerteam)
   const empty=k.every((i)=>i.players.length===6);
   if(empty===false){
    setComputers((prevTeams) => {
  let assigned = []; // Keep track of assigned players globally

  let updatedTeams = prevTeams.map((team) => {
    if (team.team === playerteam) return team; // Skip player's team

    let newPlayers = [...team.players];

    value.sort((a,b)=>(Math.random() > 0.5 ? a.name.localeCompare(b.name) :
  b.name.localeCompare(a.name))).forEach((player) => {
      if (!names.includes(player.name) && !assigned.includes(player.name) && newPlayers.length < 6) {
        newPlayers.push({
          name: player.name,
          image: player.image,
          bid: Math.floor(Math.random()*50)+1,
          matches:0,
          raids: 0,
          defends: 0,
          team: team.team,
        });
        assigned.push(player.name); // Track assigned players globally
      }
    });

    return { ...team, players: newPlayers };
  });

  // Remove assigned players **after** teams are updated
  setValue(value.filter((player) => !assigned.includes(player.name)));

  return updatedTeams;
});
    setPlaying(true)
    setStore([...store,computers]);
    setStart(true)
   }
   else{
     setComputers(computers)
     setPlaying(true);
     setStore([...store,computers]);
     setStart(true)
   }
 }
 const sets=(tea)=>{
  teams=teams.filter((it)=>it!=tea);
   const matches=generateMatches(setteams).map((i)=>{
  if(i.player===tea || i.computer===tea){
    i.winner=""
  }
  return {...i}
});
  const vs=matches.filter((i)=>i.winner==="").map((i)=>{
  if(i.player===tea){
    return i.computer
  }
  if(i.computer===tea){
    return i.player;
  }
})
setFixture(matches)
      setVenue(matches)
      setVersus(vs)
   setPlayerteam(tea);
 }
 useEffect(()=>{
  const k=computers.filter((i)=>i.team!==playerteam)
     const empty=k.every((i)=>i.players.length===6);
  if(turn!='' && empty==false){
  if(turn===playerteam){
    setTimeout(function() {
let rand=Math.floor(Math.random()*100);
    if(rand%7==0){
    const store=value.find((i,ind)=>{
      return ind==index});
      setComputers((prevTeams) =>
      prevTeams.map((team) =>
        team.team === playerteam
          ? { ...team, players: [...team.players,{name:store.name,image:store.image,bid:bid>0?bid:amount,matches:0,raids:0,defends:0,team:playerteam}] }
          : team
      )
    );
    setNames([...names,store.name])
    setPlayers([...players,store.name])
      setSold(playerteam);
      setPurse(purse-bid);
      setDisplay(false);
      setOff(true)
    }
    else{
    const m=computers.filter((i)=>i.players.length<6 && i.team!=playerteam);
    const k=m[Math.floor(Math.random()*m.length)].team;
      setBid(bid+5);
      setComputerteam(k);
      setTurn(k);
      setOff(false)
      setTimeout(()=>{
      setDisplay(true)},1000);
    }
    },1000)
  }
  
  if(turn===computerteam){
    setTimeout(function() {
      setDisplay(true);
      setOff(false);
      setShow(true);
    },1000);
  }
 }
   if(turn!='' && empty===true){
  if(turn===playerteam){
    setTimeout(function() {
    const store=value.find((i,ind)=>{
      return ind==index});
       setComputers((prevTeams) =>
      prevTeams.map((team) =>
        team.team === playerteam
          ? { ...team, players: [...team.players,{name:store.name,image:store.image,bid:bid>0?bid:amount,matches:0,raids:0,defends:0,team:playerteam}] }
          : team
      )
    );
      setPlayers([...players,store.name])
    setNames([...names,store.name])
      setSold(playerteam);
      setPurse(purse-bid);
      setDisplay(false);
      setOff(true)
    },1000);
  }
   }
 },[turn])
  useEffect(()=>{
    get_data();
  },[])
  
  const generateMatches = (teams) => {
  let matches = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({
        player: teams[i],
        computer: teams[j],
        winner: Math.random() < 0.5 ? teams[i] : teams[j], 
      });
    }
  }
  matches = matches.sort(() => Math.random() - 0.5);
  return matches;
};
useEffect(()=>{
  if(start===true){
const updatedValue=computers.map((it)=>{
if(it.team!=playerteam){
it.players.map((i)=>{
 fixture.map((item,ind)=>{
    if(it.team!=playerteam && (item.player===it.team || item.computer===it.team)){
 i.matches+=1;
 i.raids+=Math.floor(Math.random()*70);
 i.defends+=Math.floor(Math.random()*70);
    }
  })
  })
  }
  return {...it}
})
      setComputers(updatedValue)
      setStore(updatedValue)
      
  }
},[start])
  useEffect(()=>{
    const empty=computers.every((i)=>i.players.length===6);
    if(empty===true){
       localStorage.removeItem('pklretain');
      localStorage.setItem('pklretain', 
      JSON.stringify(computers));
      localStorage.setItem('pklfixtures', 
      JSON.stringify(fixture));
      localStorage.setItem('pkloppos', 
      JSON.stringify(versus));
      localStorage.setItem('pkluser', 
      JSON.stringify(computers));
      localStorage.setItem('pklteam',JSON.stringify(playerteam));
    }
  },[computers])
  const clears=()=>{
   window.scrollTo({ top: 0, behavior: "smooth" });
    localStorage.removeItem('pklretain');
   localStorage.removeItem('pkluser');
   localStorage.removeItem('pklteam');
   localStorage.removeItem('pklstandings');
   localStorage.removeItem('pklfixtures');
   localStorage.removeItem('pkloppos');
   localStorage.removeItem('pklwinlist');
   localStorage.removeItem('pklwinnerlist');
   window.location.reload();
   setRetains([])
   setPlaying(false)
   setVersus([])
   setFixture([])
   setStore([]);
   setLoad(true);
  }
  const add_retain=(x)=>{
    const drdata=value.filter((i)=>i.name!=x.name)
    setComputers((prevTeams) =>
      prevTeams.map((team) =>
        team.team === x.team
          ? { ...team, players: [...team.players,{name:x.name,image:x.image,bid:0,matches:0,raids:0,defends:0,team:x.team}] }
          : team
      )
    );
    setValue(drdata);
    setPlayers([...players,x.name])
    setAmount(Math.floor(Math.random()*100)+1)
  setIndex(Math.floor(Math.random()*drdata.length))
  setRetaincount(-1)
  }
  useEffect(()=>{
  if(retaincount===-1){
      setComputers((prevTeams) => {
  let assigned = []; // Keep track of assigned players globally

  let updatedTeams = prevTeams.map((team) => {
    if (team.team === playerteam) return team; // Skip player's team

    let newPlayers = [...team.players];
    const iota=Math.floor(Math.random()*3)+1;
    retains.flatMap((i)=>i.players).slice().sort((a,b)=>(Math.random() > 0.5 ? a.name.localeCompare(b.name) :
  b.name.localeCompare(a.name))).forEach((player) => {
      if (!players.includes(player.name) && player.team===team.team && newPlayers.length < 1) {
        newPlayers.push({
          name: player.name,
          image: player.image,
          bid: 0,
          matches:0,
          raids: 0,
          defends: 0,
          team:player.team,
        });
        assigned.push(player.name); // Track assigned players globally
      }
    });

    return { ...team, players: newPlayers };
  });

  // Remove assigned players **after** teams are updated
  setValue(value.filter((player) => !assigned.includes(player.name)));

  return updatedTeams;
});
setRetaincount(2)
  }
  if(retaincount===2){
    setAmount(Math.floor(Math.random()*100)+1)
  setIndex(Math.floor(Math.random()*value .length))
  setValue(value)
  setRetaincount(1)
  }
    
  },[retaincount])
  return (
  <>
      {load==true && <>
  <div className="w-full flex flex-col items-center justify-center my-40 gap-y-6 bg-green-400">
    <img src="images/Ben.png" className="w-36 h-36" />
    <img src="images/CN.png" className="w-36 h-36" />
    </div>
  </>}

{
  load===false && playing==false && store.length===0 && <>
    {playerteam===''  && <>
    <div className="w-full flex-col mt-2 flex text-center justify-center">
  <div className="w-full mt-2 flex justify-center">
 <h1 className="text-gray-900 text-2xl font-bold shadow-green-400">Select your Team</h1></div>
<div className="w-full mt-4 flex flex-wrap gap-x-6 gap-y-4 items-center justify-center  p-2 flex-row">
  {teams.map((i)=>{
  return(
  <div className="text-center rounded-lg  bg-green-500" onClick={()=>sets(i)}>
    <img src={`teams/${i}.webp`} className="w-24 h-24"></img>
    <h4 className="text-lg text-gray-900 font-bold">{i.toUpperCase()}</h4>
    </div>
    )
  })}
</div>
</div>
</>}
{
  playerteam!='' && retains.length>0 && retaincount===0 && <>
       <div className="flex p-4  flex-col justify-center items-center text-center gap-4">
     <h1 className="text-lg text-gray-900 font-bold">Pick 1 player as Retention</h1>
       <img src={`teams/${playerteam}.webp`} className="w-24 h-24" />
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2 my-4">
     {
       retains.flatMap((i)=>i.players).map((i)=>{
       if(i.team===playerteam)
         return(<>
    <div onClick={()=>add_retain(i)} className="p-4 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-green-500 hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
    <p className="text-gray-900 text-xs font-bold">{i.name}</p>
           </div>
         </>)
       })
     }
     </div>
         <div className="w-full py-2 flex-col  flex justify-center items-center text-center">
    <div className="rounded-lg p-2 w-24 bg-green-500 flex items-center justify-center"><button onClick={clears} className="font-bold text-base text-gray-900">Restart</button></div>
  </div>
  </>
}
{ playerteam!=='' && (retains.length===0 || retaincount==1) && <>
<div className="w-full flex flex-row items-center gap-y-2 my-2 justify-end">
   <img src="Icons/wallet.png" className="w-10 h-10"/>
     <p className="text-base font-bold text-gray-900">{purse+""+"L"}</p>
  </div>

<div className="w-full flex flex-col items-center gap-y-2 justify-center">
  {value.map((i,ind)=>{
    if(ind===index){
      return(<>
        <img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-64 h-64"/>
 <div className="w-full flex flex-col items-center justify-center">
     <p className="text-base font-bold text-gray-900">{i.name}</p>
  <p className="text-base font-bold text-gray-900">Price-:{amount} lakhs</p>
   </div>
      </>)
    }
  })}
</div>
{turn!='' && <>
<div className="w-full flex flex-row items-center gap-x-2 my-6 justify-center">
   <img src={`teams/${turn}.webp`} className="w-16 h-16"/>
     <p className="text-base font-bold text-gray-900">Bid-:{bid} lakhs</p>
</div>
</>}
{
  sold!='' && <>
    <div className="w-full flex flex-row items-center gap-x-2 my-6 justify-center">
  {sold!=="Unsold" && <>
     <p className="text-base font-bold text-gray-900">Sold to-: </p>
   <img src={`teams/${sold}.webp`} className="w-16 h-16"/>
   </>}
   {sold==="Unsold" && <>
          <p className="text-base font-bold text-gray-900">Unsold</p>
   </>}
</div>
  </>
}
{ display===true && <>
<div className="w-full my-4 gap-x-4 flex items-center flex-row flex-wrap justify-center">
 <div className="p-2 rounded-full bg-green-500 flex items-center justify-center" onClick={add}>
   <img src={`teams/${playerteam}.webp`} className="w-14 h-14" />
 </div>
 {show===true &&
    <div className="p-4 rounded-full bg-green-500 flex items-center justify-center" onClick={go}> 
       <img src={`Icons/dislikes.png`} className="w-10 h-10" />
  </div>
 }
</div>
</>}
</>
}
{off===true && <>
  <div className="w-full my-4 flex flex-row gap-x-8 items-center justify-center">
  {players.length<6
  && <>
   <div className="rounded-lg p-2 w-24 bg-green-500 flex items-center justify-center" onClick={next}>
  <button className="font-bold text-base text-gray-900">
    Next</button>
    </div>
    </>}
    {players.length>=6 && <> <div className="rounded-lg p-2 w-24 bg-green-500 flex items-center justify-center" onClick={play}>
  <button className="font-bold text-base text-gray-900">
    Play</button>
    </div>
    </>}
    </div>
</>
}
{playerteam!=''  && (retains.length===0 || retaincount==1)  && <>
<div className="w-full  flex flex-wrap gap-x-6 gap-y-4 items-center justify-center py-10 flex-row">
  {teams.map((i)=>{
  return(
  <div className="text-center w-30 bg-green-500 rounded-full" onClick={()=>setTeam(i)}>
    <div className="w-full p-2 flex justify-center">
    <img src={`teams/${i}.webp`} className="w-14 h-14"></img>
    </div>
    </div>
    )
  })}
</div>
</>
}
{
  team!='' && <>
       <div className="flex p-4 flex-row justify-center border-t border-green-500 gap-4">
       <img src={`teams/${team}.webp`} className="w-16 h-16" />
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2">
     {
       computers.map((it)=>{
       if(it.team===team)
         return(<>
      {it.players.map((i)=>{
        return(<>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-green-500  hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
    <p className="text-gray-900 text-xs font-bold">{i.name}</p>
           </div>
          
        </>)
      })}
         </>)
       })
     }
     </div>
  </>
}
  </>
}
{
  playing==true && load===false && <>{
    names.length>0 ?     <Home store={computers} localremove={localremove} playerteam={playerteam} fixture={fixture}/> :    <Home store={store} localremove={localremove} playerteam={playerteam} fixture={fixture}/>
  }

    </>
}

  </>
  );
};
export default Auction;