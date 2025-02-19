

const Card = ({ card }) => {
    return (
      <div className="group relative h-[450px] w-[450px] overflow-hidden  shadow-lg"
        key={card.id}
      >
       
        <div
          style={{
            backgroundImage: `url(${card?.url})`,
          }}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        ></div>
  
      </div>
    );
  };
  
export default Card;