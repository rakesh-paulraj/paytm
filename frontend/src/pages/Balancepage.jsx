
import axios from "axios";
import {Balance} from "../components/Balance";
import { Button } from "../components/Button";
import { useState } from 'react';
 

export const Balancepage=()=>{
    const fetchbalance=async ()=>{
       try{ const response= await axios.get("http://localhost:3000/api/v1/account/balance");
            Setvalue(response.data.balance);
        }catch(error){
            console.error('Error fetching balance',error)
        }
    }
    const [value,Setvalue]=useState(0);
    return   <div className="bg-slate-300 h-screen flex justify-center items-center">
        
    
     <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Balance value={value} />
        <Button onClick={fetchbalance} label={"Check balance"}></Button>
        </div>
   
    </div>
}