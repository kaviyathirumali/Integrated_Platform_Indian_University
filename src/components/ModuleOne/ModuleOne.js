import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "./ModuleOne.css";


function ModuleOne() {
    const [selectedDegree, setSelectedDegree] = useState('');
    const [Data, setData] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [distinctCities, setdistinctCities] = useState([]);
    const [distinctUni, setdistinctUni] = useState([]);
    const handleDegreeChange = (event) => {
        setSelectedDegree(event.target.value);
    };
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/institution/')
            .then((res) => res.json())
            .then((res) => {
                setData(res.institution);
            })
            .catch(error => console.error(error));
        document.title = "UniHub";

    }, []);
    useEffect(() => {
        if (Data.length > 0) {
            const distinctCityValues = [...new Set(Data.map(item => item.institution_city))];
            setdistinctCities(distinctCityValues);
            const distinctUniValues = [...new Set(Data.map(item => item.institution_univertity_type))];
            setdistinctUni(distinctUniValues);
        }
    }, [Data]);
    const settings =
    {
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false,
        accessibility: false
    };
    const handleSubmit = () => {
        const filtered = Data.filter(item => {
            return (
                (selectedDegree === '' || item.institution_univertity_type.trim() === selectedDegree) &&
                (selectedCity === '' || item.institution_city.trim() === selectedCity)
            );
        });
        setData(filtered);
    };
    return (
        <>
            <div className=''>
                <Slider {...settings}>
                    <div className=''>
                        <img alt='' src='/2.png'></img>
                    </div>
                    <div className=''>
                        <img alt='' src='/1.png'></img>
                    </div>
                    <div className=''>
                        <img alt='' src='/3.png'></img>
                    </div>
                </Slider>
            </div>
            <div className='module_one_main_div w-11/12 mx-auto pt-9'>
                <div className='flex justify-between gap-5 my-20'>
                    <div className='flex gap-5'>
                        <select onChange={handleDegreeChange} value={selectedDegree}>
                            <option value="" hidden>Select University</option>
                            {distinctUni.map((item, index) => {
                                return (<option value={item} key={index}>{item}</option>)
                            })}
                        </select>
                        <select onChange={handleCityChange} value={selectedCity}>
                            <option value="" hidden>Select City</option>
                            {distinctCities.map((item, index) => {
                                return (<option value={item} key={index}>{item}</option>)
                            })}
                        </select>
                    </div>
                    <div className='flex gap-5'>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>

                </div>
                <div className='cards_div grid-cols-2 md:grid-cols-3 xl:grid-cols-5'>
                    {Data.map((item, index) => (
                        <Link to={`/institution/${item.id}`} key={index}>
                            <div className='card'>
                                <img alt='' src={item.institution_logo}></img>
                                <p className='institution_name'>{item.institution_name}</p>
                                <p className='institution_city'>{item.institution_city}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ModuleOne;
