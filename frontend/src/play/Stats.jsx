import React,{useState,useEffect} from "react";
import {HashLink} from 'react-router-hash-link'
import {Link} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const Stats = () => {
  const teams=["GG","UY","UMU","TTS","TT","PPN","PP","BB","JPP","BW","DD","HS"];
  const [value,setValue]=useState("")
  const [histruns,setHistruns]=useState({});
  const [histwickets,setHistwickets]=useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = JSON.parse(decodeURIComponent(queryParams.get("data"))) || [];
  const team=JSON.parse(decodeURIComponent(queryParams.get("team"))) || "";
    const fil=data.filter((i)=>i.team===team);
    const filterruns=fil[0].players.slice().sort((a,b)=>b.raids-a.raids).filter((i,ind)=>ind<6);
    const filterwickets=fil[0].players.slice().sort((a,b)=>b.defends-a.defends).filter((i,ind)=>ind<6);
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
const histogramOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: "rgb(31,41,55)", font: { weight: "bold" } },
      grid: { color: "rgb(31,41,55)" }, // Light grid lines
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
  <div className="w-full  my-6 flex justify-center">
    <h1 className="text-xl font-extrabold text-gray-900">Top Raiders</h1>
  </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2 my-4">
     {
       data.map((it)=>{
       if(it.team===team)
         return(<>
      {it.players.slice().sort((a,b)=>b.raids-a.raids).map((i,ind)=>{
        if(ind<6)
        return(<>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-green-500  hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
    <p className="text-gray-900 text-xs font-bold">{i.name}</p>
        <p className="text-gray-900 text-xs font-bold">Raids-:{i.raids}</p>
           </div>
          
        </>)
      })}
         </>)
       })
     }
     </div>
         <div className="bg-green-400 p-6  w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-gray-900 text-xs font-bold mb-4 text-center">Raid Analysis</h2>
      <Bar data={histogramRuns} options={histogramOptions} />
    </div>
      <div className="w-full  flex justify-center">
    <h1 className="text-xl font-extrabold text-gray-900">Top Defenders</h1>
  </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2 my-4">
     {
       data.map((it)=>{
       if(it.team===team)
         return(<>
      {it.players.slice().sort((a,b)=>b.defends-a.defends).map((i,ind)=>{
        if(ind<6)
        return(<>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-green-500 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-green-500  hover:scale-105">
    <div className="flex justify-center items-center"><img src={Array.from(i.image).reverse().slice(33).reverse().join("")} className="w-16 h-16" /></div>
    <p className="text-gray-900 text-xs font-bold">{i.name}</p>
         <p className="text-gray-900 text-xs font-bold">Defends-:{i.defends}</p>
           </div>
          
        </>)
      })}
         </>)
       })
     }
     </div>
     <div className="bg-green-400 p-6  w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-gray-900 text-xs font-bold mb-4 text-center">Defence Analysis</h2>
      <Bar data={histogramWickets} options={histogramOptions} />
    </div>
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



export default Stats;
