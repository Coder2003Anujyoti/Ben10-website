import React,{useState,useEffect} from "react";
function Navbar(){
  const [count,setCount]=useState(0);
  const [length,setLength]=useState(-1);
  const [subcount,setSubcount]=useState(0);
  const [datas,setDatas]=useState([]);
   const [text,setText]=useState("");
   const [items,setItems]=useState([]);
   const [loads,setLoads]=useState(false);
   const [offset,setOffset]=useState(0);
   const [load,setLoad]=useState(true);
   const [suboffset,setSuboffset]=useState(0);
   const [toggle,setToggle]=useState(false);
   const getaliens=async()=>{
     const res=await fetch(`https://miniature-toma-aliudufu-dfe931ca.koyeb.app/aliens?offset=${offset}&limit=5`);
     const data =await res.json();
     setItems([...items,data.data]);
     setCount(data.length)
     setLoad(false);
     setLoads(false);
   }
   const getname=async()=>{
     const res=await fetch(`https://miniature-toma-aliudufu-dfe931ca.koyeb.app/api?name=${text}&offset=${suboffset}&limit=5`);
     const data =await res.json();
     setLength(data.data.length)
     setDatas([...datas,data.data]);
     setSubcount(data.length)
     setLoad(false);
     setLoads(false);
     setToggle(false)
    
   }
   const press=()=>{
     setLoads(true);
     setOffset(offset+5)
   }
   const subpress=()=>{
     setToggle(true)
     setLoads(true);
     setSuboffset(suboffset+5)
   }
   const go=()=>{
     if(text.trim()===''){
       alert("Please Input text!!!");
     }
     else{
       setToggle(true)
       setDatas([])
       setLoad(true);
       setSuboffset(0);
     }
   }
   useEffect(()=>{
     if(toggle===true)
     getname()
   },[toggle])
   useEffect(()=>{
       getaliens()
   },[offset])
  return(<>
    <div className="w-full h-16 bg-green-600 flex items-center gap-x-6 md:gap-x-64">
      <div>
        <img src="images/Ben.png" className="w-16 h-16 m-2"/>
      </div>
      </div>
<div className="w-full flex flex-row justify-center py-4">
  <input type="text" value={text} onChange={(e)=>{setText(e.target.value)
     setDatas([])
     setLength(-1)
  }} placeholder="Search for aliens..."  className="bg-black font-bold rounded-l-lg text-slate-200 focus:outline-none" />
<button className="text-white font-extrabold text-sm p-2 rounded-r-lg bg-slate-800" onClick={go}>Submit</button>
      </div>
    <div className="my-2">
    {load==true && <>
      <div className=" w-full flex  justify-center align-center my-48  md:my-32">
      <h1 className="font-bold " >Page is Loading...</h1>
      </div>
    </>} 
    {
      load==false && <>
    <div className=" flex justify-around flex-wrap gap-y-4 md:flex md:flex-row md:flex-wrap  md:justify-start md:mx-16 md:gap-x-2">
       {text.trim()!='' &&
        datas.map((alien,index) => {
         return(<>{alien.map((i)=>{return(<>
                   <div className="bg-white rounded-lg text-center p-1 border shadow-lg shadow-green-500/30 hover:scale-105 font-bold hover:ease-in-out duration-300 md:p-4 md:max-h-fit"  key={i.id}>
          <img className="h-40 w-32"
            src={Array.from(i.image).reverse().slice(33).reverse().join("")}
            alt={i.name}
         
          />
          <p className="my-2">{i.name}</p>
        </div>
           
           
         </>)})}
         {index==datas.length-1 && 
         <div className="w-full flex justify-center">
      {suboffset<subcount-5 && loads==false && <img src="images/Blogo.png" className="w-8 h-8 md:w-12 md:h-12" onClick={subpress}></img>}
    {loads==true && <div className="flex items-center font-bold"><p>Items are loading...</p></div> }
         </div>
         }
         </>)

      })}
       {text.trim()=='' && items.map((alien,index) => {
         return(<>{alien.map((i)=>{return(<>
                   <div className="bg-white rounded-lg text-center p-1 border shadow-lg shadow-green-500/30 hover:scale-105 font-bold hover:ease-in-out duration-300 md:p-4 md:max-h-fit"  key={i.id}>
          <img className="h-40 w-32"
            src={Array.from(i.image).reverse().slice(33).reverse().join("")}
            alt={i.name}
         
          />
          <p className="my-2">{i.name}</p>
        </div>
           
           
         </>)})}
         {index==items.length-1 && 
         <div className="w-full flex justify-center">
      {offset<count-5 && loads==false && <img src="images/Blogo.png" className="w-8 h-8 md:w-12 md:h-12" onClick={press}></img>}
    {loads==true && <div className="flex items-center font-bold"><p>Items are loading...</p></div> }
         </div>
         }
         </>)

      })}
    </div>
    </>}
   {length===0  && load==false  &&
   <>
     <div className=" w-full flex  justify-center align-center my-48  md:my-32">
   <h1 className=" font-bold">No Aliens</h1>
  </div>
  </>}
    </div>
  </>);
}
export default Navbar;