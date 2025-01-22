

import banner1 from "../../../assets/BannerImg2.avif"

const Banner = () => {

  return (
    <div className='h-[450px] md:h-[600px] lg:h-[600px]'>
      <img src={banner1} alt="" className="h-full min-w-full" />
    
    </div>
  );
};

export default Banner;