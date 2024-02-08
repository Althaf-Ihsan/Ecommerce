import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { productData,categoriesData } from"../../static/static"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import styles from "../../styles/styles";
 import {BiMenuAltLeft} from 'react-icons/bi'
import DropDown from "./DropDown";
import Navbar from "./Navbar";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState(``);
  const [searchData, setSearchData] = useState(null);
 const [active,setActive]=useState(false)
 const[dropdown,setDropDown]=useState(false)
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setSearchData(filteredProducts);
    console.log(filteredProducts)
  };
  window.addEventListener("scroll",()=>{
    if(window.scrollY > 70)
    {
        setActive(true)
    }
    else{
      setActive(false)
    }
})
  return (
    <>
   <div className={styles.section}>
    <div className="h-50 my-10 flex items-center justify-between lg:h-800 lg:my-3">
      <div>
        <Link to="/">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
      </div>
      {/* search box*/}
      <div className="w-[50%] relative">
        <input
          type="text"
          placeholder="Search Product"
          value={searchTerm}
          onChange={handleSearchChange}
          className="h-[40px] w-full px-2 border-[#ebf21e] border-[2px] rounded-md"
        />
        <AiOutlineSearch
          size={30}
          className="absolute right-2 top-1.5 cursor-pointer"
        />
        {searchData && searchData.length !== 0 ? (
          <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-9 p-4">
            {searchData &&
              searchData.map((i, index) => {
                const d = i.name;
                const product_name = d.replace(/\s+/g, "-");
                return (
                  <Link to={`/products/${product_name}`}>
                      <div className="w-full flex items-start py-3">
                        <img src={i.image_Url[0].url} alt="" className="w-[40px] h-[40px] mr-[10px]"/>
                      </div>
                      <h1>{i.name}</h1>
                  </Link>
                );
              })}
          </div>
        ) : null}
      </div>
      <div className={`${styles.button}`}>
        <Link to="/seller">
          <h1 className="text-[#fff] flex items-center">
            Become Seller
            <IoIosArrowForward className="ml-1" />
          </h1>
        </Link>
      </div>
      </div>
    </div>
    <div
        className={`${
          active === true ? "shadow-sm fixed  top-0 left-0 z-10" : null
        } hidden lg:flex items-center justify-between w-full bg-[#ebf21e] h-[70px]`}>
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
         
          <div>
            <div className="relative h-[60px] mt-[10px] w-[270px] 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans font-[500] text-lg select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown size={20} className='absolute right-2 top-4 cursor-pointer' onClick={()=>setDropDown(!dropdown)}/>
              {dropdown ?(<DropDown catogoriesData={categoriesData} setDropDown={setDropDown}/>):null}
            </div>
          </div>
          {/* nav-items */}
          <div className={`${styles.normalFlex}`}>
            <Navbar/>
          </div>
        </div>
      </div>
   </>
  );
};
 
export default Header;