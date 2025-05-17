
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Bookings() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/profile/bookings");
  }, [navigate]);
  
  return null;
}
