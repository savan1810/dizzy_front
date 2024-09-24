import React, { useState } from 'react';
import axios from 'axios';
import { DizeeInput2, DizeeInput3, getContrastColor, maxLength } from '../DixeeInput2';
import { getAccentStyle } from '../../constants/constants';
import Check from '../../svg/Check'; // Assuming Check icon is imported
import { postDataAPI } from '../../utils/fetchData';
import { useParams } from 'react-router';

export default function Form(props) {
    let { userArticle, form, setOverlay, title } = props;
    const { domain: dynamicVar } = useParams();

    const [formData, setFormData] = useState({});
    const [selectedPolls, setSelectedPolls] = useState({});

    const handleInputChange = (e, itemIndex, inputIndex) => {
        const updatedData = { ...formData };
        updatedData[itemIndex] = updatedData[itemIndex] || {};
        updatedData[itemIndex][inputIndex] = e.target.value;
        setFormData(updatedData);
    };

    // Handle poll selection and auto-submit
    const handlePollSelection = async (item, itemIndex, optionIndex) => {
        setSelectedPolls(prevSelectedPolls => ({
            ...prevSelectedPolls,
            [itemIndex]: optionIndex,
        }));

        // Automatically submit the selected poll option
        const selectedPoll = optionIndex;

        try {
            await postDataAPI('analytics/create-poll-analytics', { title: item?.title, domain: dynamicVar, type: item?.type, data: selectedPoll }, null);
        } catch (error) {
            console.error('Error submitting poll:', error);
        }
    };

    // Handle form submission when submit button is clicked
    const handleSubmit = async (item, itemIndex) => {
        const data = {};

        if (item?.type === 0) {
            let isFormValid = false;

            item.inputFields.forEach((inputField, inputIndex) => {
                const userValue = formData[itemIndex]?.[inputIndex] || "";
                data[inputField] = userValue;

                if (userValue.trim() !== "") {
                    isFormValid = true;
                }
            });

            if (!isFormValid) {
                console.log("Form submission blocked: All fields are empty.");
                return;
            }


            try {
                await postDataAPI('analytics/create-form-analytics', { title: item?.title, domain: dynamicVar, type: item?.type, data }, null);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    return (
        <div className='w-[350px] sm:w-[639px] lg:w-[900px] flex flex-col justify-center items-start gap-y-[16px]'>
            {form.map((item, itemIndex) => (
                <div key={itemIndex} className='flex flex-col gap-y-[16px] mt-[60px] w-[350px] item-center justify-between px-4'>
                    <div className='flex justify-between items-center'>
                        <p className='text-white text-[14px] uppercase'
                            style={getAccentStyle(userArticle?.accent)}>
                            {maxLength(item?.title, 30)}
                        </p>

                        {/* Show Submit button for form types */}
                        {item?.type === 0 && (
                            <button
                                className="cursor-pointer text-white py-2 px-4 rounded"
                                onClick={() => handleSubmit(item, itemIndex)}
                                style={getAccentStyle(userArticle?.accent)}

                            >
                                Submit
                            </button>
                        )}
                    </div>

                    {item?.type === 0 ? (
                        <div className='flex flex-col gap-y-[10px]'>
                            {item?.inputFields?.length > 0 && item?.inputFields?.map((inputField, inputIndex) => (
                                <DizeeInput3
                                    color={userArticle?.accent || 'white'}
                                    key={inputIndex}
                                    label="Link"
                                    placeholder={inputField}
                                    className="dizee-input w-full text-white placeholder-custom"
                                    value={formData[itemIndex]?.[inputIndex] || ""}
                                    onChange={(e) => handleInputChange(e, itemIndex, inputIndex)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='flex justify-between gap-y-[10px]'>
                            {item?.inputFields?.length > 0 && item?.inputFields?.map((option, optionIndex) => (
                                <div key={optionIndex} className='flex items-center'>
                                    {/* Click handler for poll option */}
                                    <label htmlFor={`option-${optionIndex}`}
                                        onClick={() => handlePollSelection(item, itemIndex, optionIndex)}
                                        className='text-white text-[12px] cursor-pointer'
                                        style={getAccentStyle(userArticle?.accent)}>
                                        {maxLength(option, 40)}
                                    </label>

                                    <div
                                        className='cursor-pointer inline-block'
                                        style={{ width: '20px', height: '20px', marginLeft: '10px' }}>
                                        {selectedPolls[itemIndex] === optionIndex && (
                                            <Check className="h-[12px] w-[18px] mt-[6px] text-green-500" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
