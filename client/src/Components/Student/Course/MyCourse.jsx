import React, { useEffect, useMemo, useState } from "react";
import CourseCards from "./CourseCards";
import { GET } from "../../ApiFunction/ApiFunction";
import Course from "./Course";
import { action } from "../../Url/url";

const MyCourse = ({}) => {
  const userId = sessionStorage.getItem("id");
  const [coursedata, setCoursedata] = useState([]);
  const [filterText, setFilterText] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useMemo(() => {
    if (userId) {
      const filteredData = coursedata.filter((course) =>
        course.boughtBy.includes(userId)
      );
      setFilterText(filteredData);
    }
  }, [userId]);

  const getData = async () => {
    const result = await GET(action.GET_ALL_COURSE);
    if (result) {
      setCoursedata(
        result.filter((course) => course.boughtBy.includes(userId))
      );
    } else {
      setCoursedata([]);
    }
  };
  return <Course my={true} />;
};

export default MyCourse;
