import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import search from '../../../../assets/images/components/search.png';
import SelectionCard from '../../../../components/SelectionCard';
import LayoutHeader from '../../../../layout/LayoutHeader';

export default function AddEvent() {

    return (
        <LayoutHeader>

            <div className="w-[390px] h-auto bg-black flex flex-col justify-start items-center relative">

                <div className='px-4 my-[50px] flex  w-full justify-between'>
                    <p className='text-white' style={{ fontSize: '12px' }}>Add Event</p>
                    <Link to="/add-section">
                        <p className='text-white cursor-pointer ' style={{ fontSize: '12px' }}>Go Back</p>
                    </Link>
                </div>


                <SelectionCard txt="Bulk import events" dotimgclss={false} link={'/add-section/bulk-import-events'} />
                <SelectionCard txt="Manual event entry" dotimgclss={false} link={'/add-section/import-single-event'} />
                {/* <SelectionCard txt="Custom event link" dotimgclss={false} link={'/add-section/custom-event-link'} /> */}



            </div>
        </LayoutHeader>

    )
}
