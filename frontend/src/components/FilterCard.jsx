import { RadioGroup } from '@radix-ui/react-radio-group'
import React, { useEffect, useState } from 'react'
import { RadioGroupItem } from './ui/radio-group'
import { Label } from '@radix-ui/react-label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Indore", "Gujrat", "Uttar Pradesh", "Pune", "Banglore"]
    },
    {
        filterType: "Industry",
        array: ["MERN Stack Developer",
            "MEAN Stack Developer",
            "PHP DEVELOPER",
            "Frontend Developer",
            "Backend Developer",
            "FullStack Developer",
            "Python"]
    },
    {
        filterType: "Salary",
        array: ["8-40k", "42-1lakh", "1lakh to 5lakh"]
    }
]
const FilterCard = () => {
    const [selectedValue, setSelectedValue]= useState('');
    const dispatch = useDispatch();
    const changeHandler =(value)=>{
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue))
    },[selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={index} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={item}/>
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard