import React,{useState,useEffect} from "react";
function Navbar(){
  const [count,setCount]=useState(0);
  const [datas,setDatas]=useState([]);
   const [text,setText]=useState("");
   const [items,setItems]=useState([]);
   const [loads,setLoads]=useState(false);
   const [offset,setOffset]=useState(0);
   const [load,setLoad]=useState(false);
   const api=async()=>{
     const res=await fetch(`https://ben10-website.onrender.com/aliens?name=${text}`);
     const data =await res.json();
     setDatas(data);
     setLoad(true);
     setCount(count+1);
   }
   const getaliens=async()=>{
     const res=await fetch(`https://ben10-website.onrender.com/api/aliens?offset=${offset}&limit=5`);
     const data =await res.json();
     setItems([...items,data]);
     setLoad(true);
     setLoads(false);
   }
   useEffect(()=>{
     if(text!=''){
     api();
     }
   },[text])
   useEffect(()=>{
     if(text=='' && offset<66){
       getaliens()
     }
   },[offset])
   const press=()=>{
     setLoads(true);
     setOffset(offset+5)
   }
  return(<>
    <div className="w-full h-16 bg-green-600 flex items-center gap-x-6 md:gap-x-64">
      <div>
        <img src="images/Ben.png" className="w-16 h-16 m-2"/>
      </div>
      <div>
        <input type="text" value={text} onChange={(e)=>{
        setLoad(false)
        setText(e.target.value)}} placeholder="Search for aliens..." className="m-4 md:w-96 bg-black rounded-md text-slate-100" />
      </div>
    </div>
    <div className="my-2">
    {load==false && text!='' && <>
      <div className=" w-full flex  justify-center align-center my-48  md:my-32">
      <h1 className="font-bold " >Page is Loading...</h1>
      </div>
    </>}  
        {load==false && count==0 && text=='' && <>
      <div className=" w-full flex  justify-center align-center my-48  md:my-32">
      <h1 className="font-bold " >Page is Loading...</h1>
      </div>
    </>}  
    <div className=" flex justify-around flex-wrap gap-y-4 md:flex md:flex-row md:flex-wrap  md:justify-start md:mx-16 md:gap-x-2">
      {text!='' && datas.map((alien) => {
       return(<>
        <div className="bg-white rounded-lg text-center p-1 border shadow-lg shadow-green-500/30 hover:scale-105 font-bold hover:ease-in-out duration-300 md:p-4 md:max-h-fit"  key={alien.id}>
          <img className="h-40 w-32"
            src={Array.from(alien.image).reverse().slice(33).reverse().join("")}
            alt={alien.name}
         
          />
          <p className="my-2">{alien.name}</p>
        </div>
        </>)
      })}
       {text=='' && items.map((alien,index) => {
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
      {offset<65 && loads==false && <img src="images/Blogo.png" className="w-8 h-8 md:w-12 md:h-12" onClick={press}></img>}
    {loads==true && <div className="flex items-center font-bold"><p>Items are loading...</p></div> }
         </div>
         }
         </>)

      })}
    </div>
   {datas.length==0 && text!="" && load==true &&
   <>
     <div className=" w-full flex  justify-center align-center my-48  md:my-32">
   <h1 className=" font-bold">No Aliens</h1>
  </div>
  </>}
    </div>
  </>);
}
export default Navbar;