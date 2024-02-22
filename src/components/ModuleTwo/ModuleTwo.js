import React, { useState, useEffect } from 'react';
import './ModuleTwo.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ModuleTwo = () => {
  const { id } = useParams();
  const [Data, setData] = useState([]);
  const [AllData, setAllData] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/degree/institution/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.error(error));
    fetch(`http://127.0.0.1:8000/api/institution/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setAllData(res);
      })
      .catch(error => console.error(error));
    document.title = AllData.institution_name;
  }, [id,AllData.institution_name]);

  const departmentValues = [...new Set(Data.map(item => item.degree_department))];
  const typeValues = ["UG", "PG", "PhD"];

  const filterData = () => {
    return Data.filter(item => {
      const departmentMatch = selectedDepartments.length === 0 || selectedDepartments.includes(item.degree_department);
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(item.degree_type);
      return departmentMatch && typeMatch;
    });
  };

  return (
    <div className='module_two_main_div w-full mx-auto h-screen flex justify-between'>
      <div className='w-[20%] border-r-2 border-[#094067] p-6 flex flex-col gap-6 overflow-scroll'>
        <div className='filters_div_col'>
          <h2>Degree Type</h2>
          {typeValues.map((type, index) => (
            <label key={index}>
              <input type="checkbox" value={type} checked={selectedTypes.includes(type)}
                onChange={(e) => {
                  const selected = e.target.value;
                  setSelectedTypes(prevSelected => {
                    if (prevSelected.includes(selected)) {
                      return prevSelected.filter(item => item !== selected);
                    } else {
                      return [...prevSelected, selected];
                    }
                  });
                }}
              />
              {type}
            </label>
          ))}
        </div>
        <div className='filters_div_col'>
          <h2>Department</h2>
          {departmentValues.map((department, index) => (
            <label key={index}>
              <input type="checkbox" value={department} checked={selectedDepartments.includes(department)}
                onChange={(e) => {
                  const selected = e.target.value;
                  setSelectedDepartments(prevSelected => {
                    if (prevSelected.includes(selected)) {
                      return prevSelected.filter(item => item !== selected);
                    } else {
                      return [...prevSelected, selected];
                    }
                  });
                }}
              />
              {department}
            </label>
          ))}
        </div>
      </div>
      <div className='w-[75%] mx-auto overflow-scroll'>
        {filterData().map((item, index) => (
          <Link to={`/degree/${item.id}`} key={index}>
            <div className='full_card'>
              <img alt='' className='w-[50px] h-[50px] mr-10' src={AllData.institution_logo}></img>
              <div className='text-left'>
                <p>Name:   {item.degree_name}</p>
                <p>Degree:   {item.degree_type}</p>
                <p>Department:    {item.degree_department}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ModuleTwo;
