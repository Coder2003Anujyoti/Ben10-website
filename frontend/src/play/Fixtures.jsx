import React,{useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link'
const LocalFixtures=()=>{
  const lists=localStorage.getItem('pklfixtures');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return "";
}
}
const Fixtures = () => {
  const teams=["GG","UY","UMU","TTS","TT","PPN","PP","BB","JPP","BW","DD","HS"];
  const [fixture,setFixture]=useState(()=>LocalFixtures()||[])
  const [index,setIndex]=useState(0)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = JSON.parse(decodeURIComponent(queryParams.get("data"))) || [];
  const team = JSON.parse(decodeURIComponent(queryParams.get("team"))) || "";
    useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  useEffect(()=>{
  document.body.className="bg-green-400"
})
  return (
   <>
    <div className="w-full h-16 bg-green-600 flex items-center gap-x-6 md:gap-x-64">
   <img src="images/Ben.png" className="w-16 h-16 m-2"/>
      </div>
{
  data.length===0 && <>

      <div className="flex justify-center items-center py-60">
  <h1 className="text-gray-900 text-xl font-bold">No Matches</h1>
</div>
</>
}
{ data.length>0 && <>
<div className="w-full flex flex-row py-6 justify-center gap-12">
   <div className="w-full flex  justify-center  gap-12" >

       <div className="flex w-16 justify-center items-center border-b border-b-green-700"> <p className="text-sm font-bold text-gray-900">Player</p></div>
      <div className="flex w-24  justify-center items-center border-b border-b-green-700 "><p className="text-sm font-bold text-gray-900">Computer</p></div>
    <div className="flex w-16 justify-center items-center border-b border-b-green-700"> <p className="text-sm font-bold text-gray-900">Result</p></div>
   </div>
   </div>
  <div className="w-full flex flex-row flex-wrap justify-center items-center my-2 gap-y-8 gap-x-8">
       {data.map((i,ind)=>{
    if(i.player===team || i.computer===team)
      return(<>
    <div className=" flex flex-row flex-wrap justify-center items-center gap-x-16 border-b border-b-green-700 p-5">

      <div className="w-16 flex text-center justify-center items-center"><img src={`teams/${team}.webp`} className="w-16 h-16" /></div>
      <div className="w-16 flex text-center justify-center items-center">   <img src={(i.computer!=team)?`teams/${i.computer}.webp`:`teams/${i.player}.webp`} className="w-16 h-16" /></div>
   {i.winner!='Draw' && i.winner!='' && <> <div className="w-16 flex text-center justify-center items-center">   <img src={`teams/${i.winner}.webp`} className="w-16 h-16" /></div> </>}
    {i.winner==='Draw' && <div className="w-16 flex text-center justify-center items-center">   <img src={`teams/${i.winner}.png`} className="w-16 h-16" /></div>}
    {i.winner==='' && <div className="w-16 flex text-center justify-center items-center">   <img src="Icons/faq.png" className="invisible w-16 h-16" /></div>}
      </div>
      </>)
    })}
  </div>
  </>
  }
      <footer className="bg-black text-white">
      <div className="w-full flex justify-center  text-center flex-col p-4 mt-4">
        <h2 className="text-xl font-semibold">Quick Links</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-12">
    <HashLink smooth to='/#about'> <li className="text-gray-400">
       About Us</li></HashLink>
     <HashLink smooth to='/#services'> <li className="text-gray-400">Services</li></HashLink>
     <HashLink smooth to='/#gallery'><li className="text-gray-400">Gallery</li></HashLink>
        </ul>
     </div>
      <div className="w-full flex justify-center  text-center flex-col mt-4">
        <h2 className="text-xl font-semibold">Teams</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-6 gap-y-4">
        {teams.map((i)=>{
          return(<>
         <li><img className="w-12 h-12" src={`teams/${i}.webp`}/></li>
          </>)
        })}
        </ul>
      </div>
            <div className="w-full flex justify-center gap-y-2  text-center flex-col p-4 mt-4">
    <h2 className="text-xl font-semibold">Sponsors</h2>
    <div className="mt-4 flex flex-row flex-wrap justify-center gap-x-6 gap-y-4 ">
  {new Array(4).fill("").map((i,ind)=>{
  return(
  <div className="text-center">
    <img src={`sponsor/sponsor${ind+1}.png`} className="w-22 h-12"></img>
    </div>
    )
  })}
</div>
    </div>
    <div class="border-t border-gray-700 mt-4 p-2 text-center text-gray-400">
      © 2025 Coder2003Anujyoti All rights reserved.
    </div>
</footer>
   </>
  );
};



export default Fixtures;
