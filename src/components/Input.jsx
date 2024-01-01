import React from "react";



const Input = ({id, onChange, value, label, name, type, disabled})=>{
    return(
        <div className="relative">
             <input 
              id={id}
              name={name}
              value={value}
              type={type}
              onChange={onChange}
              autoComplete="none"
               disabled={disabled}
             className="
             block
             rounded-md
             px-6
             pt-6
             pb-1
             w-full
             text-md
           text-neutral-700
           border
           border-black-100
           bg-white
             appearance-none
             focus:outline-none
             focus:ring-0
            
             peer
             invalid:border-b-1
             "
             placeholder=" " />
        <label htmlFor={id} className="
             absolute 
             text-md
           text-zinc-400
             duration-150 
             transform 
             -translate-y-3 
             scale-75 
             top-4 
             z-10 
             origin-[0] 
             left-6
             peer-placeholder-shown:scale-100 
             peer-placeholder-shown:translate-y-0 
             peer-focus:scale-75
             peer-focus:-translate-y-3
        ">{label}</label>
        </div>
        
    )
}

export default Input