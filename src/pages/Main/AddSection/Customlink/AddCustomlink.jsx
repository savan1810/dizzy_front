import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../../layout/LayoutHeader';
import { DizeeInput2, } from '../../../../components/DixeeInput2';
import CopyLink from '../../../../svg/CopyLink';
import ImageSelectionCard from '../../../../components/ImageSelectionCard';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../../../utils/upload';
import { clearAlerts, setErrorAlert, setLoader } from '../../../../store/alert/alertSlice';
import { addCustomLinkToSectionThunk, getCustomLinkThunk, getProductThunk } from '../../../../store/addsection/addsectionThunk';
import SectionOverlay from '../../../../components/AddSection/Customlink/SectionOverlay';
import { clearCustomLinkData, updateImage, updateLink, updateTitle } from '../../../../store/customlinkData/customlinkDataSlice';
import AddedCustomLink from '../../../../components/AddSection/Customlink/AddedCustomLink';
import CustomLinkOverlay from '../../../../components/AddSection/Customlink/CustomLinkOverlay';


export default function AddCustomlink() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const [selectedImage, setSelectedImage] = useState(null);
    const [sectionOverlay, setSectionOverlay] = useState(false);

    const customlink = useSelector((state) => state.addsection.customlink);

    const title = useSelector((state) => state.customlinkdata.title);
    const image = useSelector((state) => state.customlinkdata.image);
    const link = useSelector((state) => state.customlinkdata.link);
    const section = useSelector((state) => state.customlinkdata.section);
    const previousUrl = useSelector((state) => state.customlinkdata.previousUrl);

    const dispatch = useDispatch();

    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [itemForBackend, setItemForBackend] = useState('');

    // const section = location?.state?.section;


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        dispatch(updateImage(URL.createObjectURL(file)))
        // setImagePreview(URL.createObjectURL(file));
    };

    const resetImage = () => {
        setSelectedImage(null);
        dispatch(updateImage(null))
    };
    useEffect(() => {
        dispatch(clearAlerts())
        dispatch(getCustomLinkThunk({ token }))
    }, [dispatch, token])

    const filterLink = (link) => {
        if (customlink?.length > 0) {
            for (let m of customlink) {
                for (let musicLink of m.links) {
                    if (musicLink.url === link) {
                        return true;
                    }
                }
            }
        }
        return false;
    };



    const handleAddProduct = async () => {
        const isExistLink = filterLink(link);
        dispatch(clearAlerts());
        if (!previousUrl) {
            if (isExistLink) {
                dispatch(setErrorAlert('Link already exist'));
                return;
            }
        }


        if (!title || !link || (!selectedImage && !image) || !section) {
            dispatch(setErrorAlert('Please fill all the fields'))
            return
        }
        dispatch(setLoader(true))
        let url = '';
        if (selectedImage) {
            url = await uploadImage(selectedImage)
            if (!url) {
                dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                return

            }
        }
        let payload = {
            type: 0,
            title: title,
            section: section,
            image: url ? url : image,
            links: [
                {
                    url: link
                }
            ]
        }

        dispatch(addCustomLinkToSectionThunk({ token: token, payload: payload, previousUrl: previousUrl })).then(() => {
            dispatch(getCustomLinkThunk({ token: token }))
            dispatch(clearCustomLinkData())
            setSelectedImage(null)
        })
    }

    return (
        <LayoutHeader>
            <div className="w-[390px] h-[80vh] flex flex-col items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <div className='flex items-center gap-x-[16px]'>

                        <span className='text-white'>Custom link</span>
                    </div>
                    <div className='flex gap-[30px]'>
                        <button onClick={() => handleAddProduct()} className='text-white cursor-pointer' >Confirm</button>
                        <p onClick={() => navigate('/add-section')} className='text-white cursor-pointer'>Go back</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-y-[50px]" >
                    <div className='w-full'>
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Add a title"
                                    className="dizee-input w-full"
                                    value={title}
                                    onChange={(e) => dispatch(updateTitle(e.target.value))}
                                />
                            </div>
                        </div>
                        <ImageSelectionCard
                            txt="Add cover image"
                            dotimgclss={false}
                            onImageChange={handleImageChange}
                            imagePreview={image}
                            resetImage={resetImage}
                        />
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Enter a link"
                                    className="dizee-input w-full"
                                    value={link}
                                    onChange={(e) => dispatch(updateLink(e.target.value))}
                                />
                            </div>
                            <CopyLink className='h-[14px] w-[14px] mx-1' />
                        </div>


                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row justify-between text-white w-full'>
                                <button onClick={() => setSectionOverlay(true)} className=''>Select a section</button>
                                {section && <p>{section}</p>}
                            </div>
                        </div>

                    </div>
                    {customlink?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <p>Added Custom links</p>
                            </div>
                        </div>
                        {
                            customlink?.length > 0 && customlink?.map((item, index) => <AddedCustomLink key={index} item={item} setOverlayVisible={setOverlayVisible} setItemForBackend={setItemForBackend} />)
                        }
                    </div>}
                </div>
            </div>
            {isOverlayVisible && <CustomLinkOverlay setOverlayVisible={setOverlayVisible} previousUrl={previousUrl} itemForBackend={itemForBackend} />}

            {sectionOverlay && <SectionOverlay setSectionOverlay={setSectionOverlay} />}

        </LayoutHeader>
    );
}
