import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom'
import {HashLink} from 'react-router-hash-link'
const Site = () => {
  const teams=["GG","UY","UMU","TTS","TT","PPN","PP","BB","JPP","BW","DD","HS"];
  const [load,setLoad]=useState(true);
  const [value,setValue]=useState([]);
  const [toggle,setToggle]=useState(false);
const get_data=async()=>{
  const response=await fetch("https://miniature-toma-aliudufu-dfe931ca.koyeb.app/aliens");
  const item= await response.json();
  setValue(item.data)
  setTimeout(()=>setLoad(false),1000)
}
  useEffect(()=>{
  document.body.className="bg-green-400"
    get_data();
  },[])
  return (
    <>
  {load==true && <>
    <div className="w-full flex flex-col items-center justify-center my-40 gap-y-6 bg-green-400">
    <img src="images/Ben.png" className="w-36 h-36" />
    <img src="images/CN.png" className="w-36 h-36" />
    </div>
  </>}
  {load==false && <>
      <div className="w-full h-16 bg-green-600 flex items-center gap-x-6 md:gap-x-64">
        <img src="images/Ben.png" className="w-16 h-16 m-2"/>
      </div>
    <div className="w-full  flex flex-col justify-center">
  <div id='about' className="w-88 p-2 flex-col flex justify-center border-b border-b-green-600 border-l-transparent border-r-transparent border-t-transparent items-center text-center">
    <h3 className="text-lg text-gray-900 font-bold">About</h3>
    <div className="flex-row items-center flex-wrap flex text-center  justify-center"> <p className="text-xs text-gray-900 ml-2 mr-2 font-bold">Ben 10 Kabaddi Challenge brings an exciting mix of alien powers and kabaddi action! Use the search system to find and unlock powerful Ben 10 aliens like Four Arms, XLR8, Heatblast, and Diamondhead, each with unique abilities suited for kabaddi. Engage in intense 1v1 or team matches, where you can dodge, tackle, and raid using special alien powers. XLR8’s super speed, Four Arms’ immense strength, and Heatblast’s agility add a thrilling twist to traditional kabaddi.Step into the Omnitrix, master kabaddi with alien abilities, and prove yourself as the ultimate kabaddi champion in the Ben 10 universe!</p></div>
</div>
</div>
<div id="services" className="w-full flex-col mt-2 flex text-center justify-center border-b border-b-green-600">
      <h3 className="text-lg text-gray-900 font-bold">Services</h3>
 <div className="w-full py-4 flex flex-wrap gap-x-6 gap-y-4 items-center justify-center">
 <HashLink smooth to='/navbar'>
    <div className="text-center w-36 h-36 flex justify-center rounded-lg  bg-green-500 flex flex-col gap-y-2 ">
   <div className="w-full  flex justify-center"><img src="Icons/search.png" className="w-20 h-20"></img></div>
    <h4 className="text-lg text-gray-900 font-bold">Search</h4>
    </div>
    </HashLink>
    <HashLink smooth to="/auction">
    <div className="text-center w-36 h-36 flex justify-center bg-green-500 rounded-lg bg flex flex-col gap-y-2 ">
   <div className="w-full  flex justify-center"><img src="Icons/game.png" className="w-20 h-20"></img></div>
    <h4 className="text-lg text-gray-900 font-bold">Game</h4>
    </div>
    </HashLink>
    </div>
    </div>
      <div id="gallery" className="w-full py-2 my-4 flex-col flex justify-center  items-center text-center p-2 gap-2">
    <h3 className="text-lg text-gray-900 font-bold">Gallery</h3>
    <div className="w-full  flex flex-wrap gap-x-6 gap-y-4 items-center justify-center  p-2 flex-row ">
  {new Array(6).fill("").map((i,ind)=>{
  return(
  <div className="text-center rounded-lg  bg-green-500 transition duration-300 ease-in-out transform hover:bg-green-500 hover:scale-105">
    <img src={`Gallery/${ind+100}.jpg`} className="w-36 h-24 rounded-md shadow-green-500"></img>
    </div>
    )
  })}
</div>
    </div>
        <footer className="bg-black text-white">
      <div className="w-full flex justify-center  text-center flex-col">
        <h2 className="text-xl mt-2 font-semibold">Quick Links</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-12">
     <HashLink smooth to='#about'>   <li className="text-gray-400">
       About Us</li></HashLink>
      <HashLink smooth to='#services'>   <li className="text-gray-400">Services</li></HashLink>
        <HashLink smooth to='#gallery'> <li className="text-gray-400">Gallery</li></HashLink>
        </ul>
     </div>
          <div className="w-full flex justify-center  text-center flex-col mt-4">
        <h2 className="text-xl font-semibold">Teams</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-6 gap-y-4">
        {teams.map((i,ind)=>{
          return(<>
          <li>
         <img className="w-12 h-12" src={`teams/${i}.webp`}/></li>
          </>)
        })}
        </ul>
      </div>
    <div className="w-full flex justify-center gap-y-2  text-center flex-col mt-4">
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
  }
</>
  );
};
export default Site;
