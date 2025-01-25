import React, { useEffect, useMemo, useState } from "react";
import CourseCards from "./CourseCards";
import { GET } from "../../ApiFunction/ApiFunction";
import Course from "./Course";

const MyCourse = ({}) => {
  const userId = sessionStorage.getItem("id");
    const [coursedata, setCoursedata] = useState([]);
    const [filterText, setFilterText] = useState([]);
  
    useEffect(() => {
      getData();
    }, []);

    useMemo(()=>{
      if(userId){
      const filteredData = coursedata.filter(course => course.boughtBy.includes(userId));
      setFilterText(filteredData)}
    },[userId])

    const getData = async () => {
      const result = await GET("http://localhost:3000/getallcourse");
      if (result) {
        setCoursedata(result.filter(course => course.boughtBy.includes(userId)));
      } else {
        setCoursedata([]);
      }
    };
    console.log(coursedata,"del");
  return (
    <Course my/>
  );
};

export default MyCourse;
