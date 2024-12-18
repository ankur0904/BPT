function Cards({ imageUrl, altText }) {
    return (
      <div className="max-w-md mx-auto bg-white rounded shadow-lg p-4 m-4">
        <img src={imageUrl} alt={altText} className="w-full h-48 object-cover" />
      </div>
    );
  }
  
export default Cards;
  