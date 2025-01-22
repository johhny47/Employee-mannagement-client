import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAdmin from "../hook/useAdmin";
import Banner from "../component/HomeComponent/Banner/Banner";
import Service from "../component/HomeComponent/Service/Service";
import Testimonial from "../component/HomeComponent/Testimonial/Testimonial";
import Workforce from "../component/HomeComponent/ExtraSection/Workforce";
import Proccess from "../component/HomeComponent/ExtraSection/Proccess";
import { Helmet} from 'react-helmet-async';





const Home = () => {
    
  
   
    return (
        <div>
             <Helmet>
        <title>Home</title>
      
          </Helmet>
           <Banner></Banner>
           <Service></Service>
           <div className="my-14 md:px-20">
            <h1 className="text-center font bold text-2xl md:text-3xl lg:text-4xl  my-14 md:px-10">Testimonial</h1>
           <Testimonial></Testimonial>
           </div>
          <Workforce></Workforce>
          <Proccess></Proccess>
           
        </div>
    );
};

export default Home;