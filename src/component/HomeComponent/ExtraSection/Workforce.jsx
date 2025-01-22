import img1 from '../../../assets/workforce1.jpg'
import img2 from '../../../assets/workforce2.jpg'
import img3 from '../../../assets/workforce3.jpg'

const Workforce = () => {
    return (
        <div className="md:flex justify-end min-w-full md:px-20">
            {/* text */}
            <div className="md:w-1/2 ">
            <div >
               <h1 class=" text-gray-800  font-semibold text-sm md:text-md">
                  TRANSFORMING WORKFORCE MANAGEMENT
                    </h1>
                  <hr class="tracking-widest border-t-2 border-purple-900 md:w-7/12 " />
                 </div>
              <div>
                 <h1 className="font-bold text-md md:text-5xl text-gray-400 md:mt-5">
                 Connecting you to  success and <br /> unleashing the <br />  potential
                 </h1>
                 <p className="text-xs md:text-xl font-normal md:mt-5">
                 Whether you’re a job seeker or a business looking for <br /> top talent, join our network to access a world of <br /> opportunities and resources.
                 </p>
                 <p className="text-xs md:text-xl font-normal md:mt-5">
                 Whether you’re a job seeker or a business looking for <br /> top talent, join our network to access a world of <br /> opportunities and resources.
                 </p>
             </div>
            </div>
            {/* img */}
            <div className="w-1/2 border-2">
              <div className='h-1/2'>
                <img src={img1} className='h-60 min-w-full'  alt="" />
              </div>
              <div className='flex '>
                <div>
                <img src={img2} className='h-60 w-72' alt="" />  
                </div>
                <div>
                <img src={img3} className='h-60 w-72' alt="" />
                </div>
              </div>
            </div>
        </div>
    );
};


export default Workforce;