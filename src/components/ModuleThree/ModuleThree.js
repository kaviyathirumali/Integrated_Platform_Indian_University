import React, { useState, useEffect } from "react";
import "./ModuleThree.css";
import { useParams } from 'react-router-dom';

function ModuleThree() {
  const { id } = useParams();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/degree/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData1(res);
        fetch(`http://127.0.0.1:8000/api/institution/${res.institution_id}`)
          .then((res) => res.json())
          .then((res) => {
            setData2(res);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, [setData1, setData2, id]);
  const tabs = [
    {
      label: 'Overview',
      content: {
        name: data1.degree_name,
        location: data2.institution_city,
        department: data1.degree_department,
      },
    },
    {
      label: 'Fees',
      content: {
        tuitionFees: data1.degree_fees,
        degree_shift_timinings: data1.degree_shift_timinings,
        degree_duration: data1.degree_duration
      },
    },
    {
      label: 'University Details',
      content: {
        institution_name: data2.institution_name,
        institution_address: data2.institution_address,
        institution_city: data2.institution_city,
        institution_univertity_type: data2.institution_univertity_type,
        institution_website: <a href={data2.institution_website} target="_blank" rel="noopener noreferrer">{data2.institution_website}</a>
      },
    },
  ];
  let combinedContent = [];
  if (activeTab === 0) {
    combinedContent = tabs
      .slice(1)
      .reduce((combined, tab) => combined.concat(tab.content), []);
  }
  document.title = data2.institution_name;
  return (
    <div className="w-11/12 mx-auto pt-9">
      <div className="title_div flex items-center gap-4">
        <img alt='' src={data2.institution_logo}></img>
        <h1>{data2.institution_name}</h1>
      </div>
      <div className="tab-buttons w-full md:w-fit overflow-x-scroll md:overflow-x-auto">
        {tabs.map((tab, index) => (
          <button key={index} className={index === activeTab ? "active" : ""} onClick={() => handleTabClick(index)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content pt-[62px]">
        <div className="teams-cards-section">
          <div className="tab" key={activeTab}>
            {Object.keys(tabs[activeTab].content).map((key, i) => (
              <table key={i} className="flex">
                <tbody>
                  <tr>
                    <td className="keys_span">{key.replace(/_/g, " ")}: </td>
                    <td className="values_span">{tabs[activeTab].content[key]}</td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleThree;
