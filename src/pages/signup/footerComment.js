// const footerComment = ({ comment }) => {
//   return (
//     <div className="absolute bottom-[30px]">
//       <div className="font-[400] text-[12px] leading-[14.32px] max-w-[300px] pr-[25px]">{comment}</div>
//       <div className="font-[410] text-[10px] leading-[11.8px] tracking-[3px] mt-[60px]">
//         DIZEE
//       </div>
//     </div>
//   );
// };
const footerComment = ({ comment }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 font-default  mb-4 max-w-[300px]">
      <div className="flex flex-col gap-y-[50px]">
        <p className=" ">{comment}</p>
        <p className="uppercase text-[10px] leading-[11.8px] tracking-[3px]">DIZEE</p>
      </div>
    </div>
  );
};

export default footerComment;
