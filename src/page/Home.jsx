import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAdmin from "../hook/useAdmin";
import Banner from "../component/HomeComponent/Banner/Banner";
import Service from "../component/HomeComponent/Service/Service";
import Testimonial from "../component/HomeComponent/Testimonial/Testimonial";






const Home = () => {
    
  
   
    return (
        <div>
           <Banner></Banner>
           <Service></Service>
           <div className="my-14">
            <h1 className="text-center font bold text-2xl md:text-3xl lg:text-4xl  my-14 px-10">Testimonial</h1>
           <Testimonial></Testimonial>
           </div>
          
           
        </div>
    );
};

export default Home;