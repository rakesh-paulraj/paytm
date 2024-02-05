import React from 'react';
import { Appbar } from "../components/Appbar";
import { Button } from "../components/Button";
import { Users } from "../components/Users";
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate(); 
  return (
    <div>
      <Appbar user={"admin"} />
      <div className="m-8">
        <Button onClick={() => { navigate('/balance'); }} label="Balance"></Button>
        <Users />
      </div>
    </div>
  );
}
