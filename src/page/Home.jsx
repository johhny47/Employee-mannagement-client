import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAdmin from "../hook/useAdmin";
import Banner from "../component/HomeComponent/Banner/Banner";
import Service from "../component/HomeComponent/Service/Service";






const Home = () => {
    
  
   
    return (
        <div>
           <Banner></Banner>
           <Service></Service>
           
        </div>
    );
};

export default Home;