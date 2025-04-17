export default function Daycard({ date, icon, temp, description }) {
  return (
    <div 
      className="p-5 bg-white rounded-2xl shadow-lg text-center" 
      style={{ width: '200px', height: '225px' }} 
    >
      <p className="font-bold">{date}</p>
      <img 
        src={icon} 
        alt="Weather Icon" 
        width={80} 
        height={80} 
        style={{ objectFit: 'contain' }} 
      />
      <p className="text-2xl">{temp}&deg;C</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
