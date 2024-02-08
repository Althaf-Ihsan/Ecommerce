import React from "react";
import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";

const DropDown = ({ catogoriesData, setDropDown }) => {
    const navigate=useNavigate()
    const handleSubmit=(i)=>{
        navigate(`/products?category=${i.title}`)
        setDropDown(false)
        window.location.reload();
    }
  return (
    <div className=" pb-4 w-[270px] bg-#fff absolute z-30 rounded-md shadow-sm">
      {catogoriesData &&
        catogoriesData.map((i, index) => {
          return (
            <div key={index} className={`${styles.normalFlex}`} onClick={()=>handleSubmit(i)}>
              <img
                alt=""
                src={i.image_Url}
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  userSelect: "none",
                }}
              />
              <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default DropDown;
