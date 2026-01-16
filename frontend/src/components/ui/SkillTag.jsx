import React from "react";
import { X } from "lucide-react";
import { deleteSkill } from "../../api/axios";

const SkillTag = ({skillname}) => {


  const handleClick=async(skillname)=>{
   try{
    const res=deleteSkill(skillname);
    console.log(res+" skill :"+skillname+" deleted");
   }catch(err){
    console.log(err);
   }
  }


  return (
    <div className="bg-blue-400 text-black  px-2 py-1 rounded-lg inline-block mr-2 mb-2 relative">
       {skillname}
      <div className="p-1">
        <X className="h-3 w-3 absolute right-0 top-0 bg-white rounded-2xl hover:bg-pink-400"
           onClick={()=>{handleClick(skillname)}}
        ></X>
      </div>
    </div>
  );
};

export default SkillTag;
