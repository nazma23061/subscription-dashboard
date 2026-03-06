import React,{useState,useEffect} from "react";
import "./App.css";

function App(){

const [subscriptions,setSubscriptions] = useState([]);
const [name,setName] = useState("");
const [price,setPrice] = useState("");
const [date,setDate] = useState("");
const [search,setSearch] = useState("");

useEffect(()=>{

const savedData = localStorage.getItem("subscriptions");

if(savedData){
setSubscriptions(JSON.parse(savedData));
}

},[]);

useEffect(()=>{

localStorage.setItem("subscriptions",
JSON.stringify(subscriptions));

},[subscriptions]);

const addSubscription = () => {

if(name==="" || price==="" || date===""){
alert("Enter all details");
return;
}

const newSub = {
name:name,
price:Number(price),
date:date
};

setSubscriptions([...subscriptions,newSub]);

setName("");
setPrice("");
setDate("");

};

const deleteSubscription = (index) => {

const updated = subscriptions.filter((sub,i)=>i!==index);

setSubscriptions(updated);

};

const monthlyTotal = subscriptions.reduce((sum,sub)=>sum+sub.price,0);

const yearlyTotal = monthlyTotal * 12;

const filteredSubscriptions = subscriptions.filter((sub)=>
sub.name.toLowerCase().includes(search.toLowerCase())
);

return(

<div>

<h1 className="title">Smart Subscription Dashboard</h1>

<div className="form">

<input
type="text"
placeholder="Subscription Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="number"
placeholder="Monthly Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<input
type="text"
placeholder="Renewal Date"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

<button onClick={addSubscription}>
Add
</button>

</div>

<br/>

<input
type="text"
placeholder="Search Subscription"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<div className="total">
Total Subscriptions: {subscriptions.length}
</div>

<div className="total">
Monthly Expense: ₹{monthlyTotal}
</div>

<div className="total">
Yearly Expense: ₹{yearlyTotal}
</div>

<div className="container">

{filteredSubscriptions.map((sub,index)=>(

<div className="card" key={index}>

<h3>{sub.name}</h3>

<p>Price: ₹{sub.price}</p>

<p>Renewal: {sub.date}</p>

<button
className="deleteBtn"
onClick={()=>deleteSubscription(index)}
>
Delete
</button>

</div>

))}

</div>

</div>

);

}

export default App;