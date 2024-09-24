const DizeeInput = ({ onChange, value, placeholder }) => {
  return <input value={value} onChange={onChange} placeholder={placeholder} className="dizee-input text-white" />;
};

export default DizeeInput;
