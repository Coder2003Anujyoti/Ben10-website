import React,{useState,useEffect} from "react";
import Winner from "./Winner.jsx"
const ComputerFirst = ({players,oppositionplayers,subp,subc}) => {
const [playerteam,setPlayerteam]=useState(players)
const [computerteam,setComputerteam]=useState(oppositionplayers)
const [showpl,setShowpl]=useState(true)
const [op,setOp]=useState(subp)
const [oc,setOc]=useState(subc)
const [subplayerteam,setSubplayerteam]=useState([])
const [subcomputerteam,setSubcomputerteam]=useState([])
const [turn,setTurn]=useState("Defend")
const [turns,setTurns]=useState("Defend")
const [substitute,setSubstitute]=useState(false)
const [ep,setEp]=useState([])
const [ec,setEc]=useState([])
const [pselect,setPselect]=useState([])
const [cselect,setCselect]=useState([])
const [show,setShow]=useState(false)
const [ppoint,setPpoint]=useState(0);
const [cpoint,setCpoint]=useState(0);
const [playerpoint,setPlayerpoint]=useState(0)
const [computerpoint,setComputerpoint]=useState(0)
const buttons=[1,2,3,4,5,6]
useEffect(()=>{
const oip=op.map((i)=>{
  i.raids=0;
  i.defends=0;
  return {...i}
})
const oic=oc.map((i)=>{
  i.raids=0;
  i.defends=0;
  return {...i}
})
  const deletep=playerteam.flatMap((i)=>i.name)
  const deletec=computerteam.flatMap((i)=>i.name)
  const ssubp=subp.filter((i)=>!deletep.includes(i.name))
  const ssubc=subc.filter((i)=>!deletec.includes(i.name))
  setSubplayerteam(ssubp)
  setSubcomputerteam(ssubc)
  setOp(oip)
  setOc(oic)
},[])
useEffect(()=>{
  document.body.className="bg-green-400"
})
const choose=(i)=>{
if(showpl===true){
const k=playerteam.filter((it,ind)=>ind==i)
  const y=Math.floor(Math.random()*computerteam.length);
  const r=computerteam.filter((it,ind)=>ind==y)
setTurn(turns)
setPselect(k)
setCselect(r)
setShow(true)
setPpoint(0)
setCpoint(0)
setShowpl(false)
}
}
const check=(i)=>{
  if(turn==="Raid"){
const val=Math.floor(Math.random()*6)+1
if((i+val)%2!=0)
{
const p=op.map((i)=>{
if(i.name===pselect[0].name){
  i.raids+=1;
  }
  return {...i}
})
const c=computerteam.filter((i)=>i.name!=cselect[0].name)
const io=computerteam.filter((i)=>i.name===cselect[0].name)
setEc([{name:io[0].name,image:io[0].image,bid:io[0].bid,matches:io[0].matches,raids:io[0].raids,defends:io[0].defends,team:io[0].team},...ec])
setOp(p)
setComputerteam(c)
setPlayerpoint(playerpoint+1)
setTurns("Defend")
 setCpoint(val)
 setPpoint(i)
 setShow(false)
 setShowpl(true)
  }
if((i+val)%2===0)
{
const p=oc.map((i)=>{
if(i.name===cselect[0].name){
  i.defends+=1;
  }
  return {...i}
})
const c=playerteam.filter((i)=>i.name!=pselect[0].name)
const io=playerteam.filter((i)=>i.name===pselect[0].name)
setEp([{name:io[0].name,image:io[0].image,bid:io[0].bid,matches:io[0].matches,raids:io[0].raids,defends:io[0].defends,team:io[0].team},...ep])
setPlayerteam(c)
setOc(p)
setComputerpoint(computerpoint+1)
setTurns("Defend")
 setCpoint(val)
 setPpoint(i)
 setShow(false)
 setShowpl(true)
  }
  }
  if(turn==="Defend"){
const val=Math.floor(Math.random()*6)+1
if((i+val)%2==0)
{
const p=op.map((i)=>{
if(i.name===pselect[0].name){
  i.defends+=1;
  }
  return {...i}
})
const c=computerteam.filter((i)=>i.name!=cselect[0].name)
const io=computerteam.filter((i)=>i.name===cselect[0].name)
setEc([{name:io[0].name,image:io[0].image,bid:io[0].bid,matches:io[0].matches,raids:io[0].raids,defends:io[0].defends,team:io[0].team},...ec])
setOp(p)
setComputerteam(c)
setPlayerpoint(playerpoint+1)
setTurns("Raid")
 setCpoint(val)
 setPpoint(i)
 setShow(false)
 setShowpl(true)
  }
if((i+val)%2!==0)
{
const p=oc.map((i)=>{
if(i.name===cselect[0].name){
  i.raids+=1;
  }
  return {...i}
})
const c=playerteam.filter((i)=>i.name!=pselect[0].name)
const io=playerteam.filter((i)=>i.name===pselect[0].name)
setEp([{name:io[0].name,image:io[0].image,bid:io[0].bid,matches:io[0].matches,raids:io[0].raids,defends:io[0].defends,team:io[0].team},...ep])
setPlayerteam(c)
setOc(p)
setComputerpoint(computerpoint+1)
setTurns("Raid")
 setCpoint(val)
 setPpoint(i)
 setShow(false)
 setShowpl(true)
  }
  }
}
useEffect(()=>{
if(playerpoint!==0 || computerpoint!==0){
  if(turns==="Defend"){
    if(((ppoint+cpoint)%2!=0) && ep.length>0){
    const k=ep.filter((i,ind)=>ind!==ep.length-1)
      setPlayerteam([...playerteam,{name:ep[ep.length-1].name,image:ep[ep.length-1].image,bid:ep[ep.length-1].bid,matches:ep[ep.length-1].matches,raids:ep[ep.length-1].raids,defends:ep[ep.length-1].defends,team:ep[ep.length-1].team}])
      setEp(k)
    }
 if(((ppoint+cpoint)%2===0) && ec.length>0){
   const k=ec.filter((i,ind)=>ind!==ec.length-1)
      setComputerteam([...computerteam,{name:ec[ec.length-1].name,image:ec[ec.length-1].image,bid:ec[ec.length-1].bid,matches:ec[ec.length-1].matches,raids:ec[ec.length-1].raids,defends:ec[ec.length-1].defends,team:ec[ec.length-1].team}])
      setEc(k)
 }
  }
  if(turns==="Raid"){
      if(((ppoint+cpoint)%2==0) && ep.length>0){
    const k=ep.filter((i,ind)=>ind!==ep.length-1)
      setPlayerteam([...playerteam,{name:ep[ep.length-1].name,image:ep[ep.length-1].image,bid:ep[ep.length-1].bid,matches:ep[ep.length-1].matches,raids:ep[ep.length-1].raids,defends:ep[ep.length-1].defends,team:ep[ep.length-1].team}])
      setEp(k)
    }
 if(((ppoint+cpoint)%2!=0) && ec.length>0){
   const k=ec.filter((i,ind)=>ind!==ec.length-1)
      setComputerteam([...computerteam,{name:ec[ec.length-1].name,image:ec[ec.length-1].image,bid:ec[ec.length-1].bid,matches:ec[ec.length-1].matches,raids:ec[ec.length-1].raids,defends:ec[ec.length-1].defends,team:ec[ec.length-1].team}])
      setEc(k)
 }
    
  }
}
  
},[turns])
  return (
  <>
{ (playerpoint!=10 && computerpoint!=10 && playerteam.length!=0 && computerteam.length!=0) && <>
  <div className="w-full flex flex-col my-2 gap-4">
  <div className="w-full flex justify-center flex-row my-1"><img className="w-16 h-16"  src={`Teams/${playerteam[0].team}1.webp`} /></div>
     <div className="w-full flex flex-wrap flex-row justify-center gap-2 ">
     {
       playerteam.map((i,ind)=>{
         return(<>
    <div onClick={()=>choose(ind)} className="p-2 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-start items-center transition duration-300 ease-in-out transform hover:bg-green-500  hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
           </div>
         </>)
       })
     }
     </div>
  </div>
{ substitute===false && <>
<div className="w-full my-1 gap-x-10 flex justify-center">
<div className="flex flex-col justify-center">
  <div className="w-full flex justify-center flex-row my-1"><img className="w-16 h-16"  src={`Teams/${playerteam[0].team}1.webp`} /></div>
  { pselect.length!=0 && <>
    <div className="p-2 my-1 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-start items-center transition duration-300 ease-in-out transform hover:bg-green-500  hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(pselect[0].image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
    <p className="text-gray-900 text-xs font-bold">{pselect[0].name}</p>
  { ppoint!=0 && <>
  <div className="text-center my-1">
  <h1 className="text-lg font-bold text-gray-900">{ppoint}</h1>
  </div>
  </>
  }
  </div>
  </>
  }
    <div className="text-center my-1">
  <h1 className="text-lg font-bold text-gray-900">{playerpoint}</h1>
  </div>
</div>
<div className="flex justify-center text-center flex-col">
<h1 className="text-base font-bold text-gray-900">V/S</h1>
<h1 className="text-base font-bold text-gray-900">{ turn==="Raid"? "Raid Odd" : "Defend Even"}</h1>
</div>
<div className="flex flex-col justify-center">
  <div className="w-full flex justify-center flex-row my-1"><img className="w-16 h-16"  src={`Teams/${computerteam[0].team}1.webp`} /></div>
  { cselect.length!=0 && <>
    <div className="p-2 my-1 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-start items-center transition duration-300 ease-in-out transform hover:bg-green-500  hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(cselect[0].image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
    <p className="text-gray-900 text-xs font-bold">{cselect[0].name}</p>
    { cpoint!=0 && <>
  <div className="text-center my-1">
  <h1 className="text-lg font-bold text-gray-900">{cpoint}</h1>
  </div>
  </>
  }
   </div>
  </>
  }
<div className="text-center my-1">
  <h1 className="text-lg font-bold text-gray-900">{computerpoint}</h1>
  </div>
</div>
</div>
{ show===true && <>
<div className="w-full  gap-x-4 justify-center flex ">
{
  buttons.map((i)=>{
    return(<>
    <button onClick={()=>check(i)} className="p-4 rounded-full font-bold bg-green-500 text-gray-900">{i}</button>
    </>)
  })
}
</div>
</>
}
</>
}

  <div className="w-full flex flex-col my-2 gap-4 ">
  <div className="w-full flex justify-center flex-row my-1"><img className="w-16 h-16"  src={`Teams/${computerteam[0].team}1.webp`} /></div>
     <div className="w-full flex flex-wrap flex-row justify-center gap-2 ">
     {
       computerteam.map((i)=>{
         return(<>
    <div className="p-2 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-start items-center transition duration-300 ease-in-out transform hover:bg-green-500  hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
           </div>
         </>)
       })
     }
     </div>
  </div>
  </>
  }
  {
    (playerpoint==10 || computerteam.length==0) && <>
      <Winner winner={playerteam[0].team} yourteam={op} opposteam={oc} />
    </>
  }
    {
    (computerpoint==10 || playerteam.length==0) && <>
         <Winner winner={computerteam[0].team} yourteam={op} opposteam={oc} />
    </>
  }
</>
  );
};


export default ComputerFirst;
