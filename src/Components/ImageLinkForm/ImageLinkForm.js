import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({OnInputChange , OnSubmitButton}) =>{
return (
    <div >
        <p className='f3 center'>
            This Magic Brain Detect will detect face in your picture .Git it a try
        </p>
        <div className='center'>
            <div className='form center  pa4 br3 shadow-5'>
            <input className='f4 pa2 w-70 center' type='tec' onChange={OnInputChange} />
            <button className='w-30 grow f4 link ph3 pv2 black bg-dark-green' onClick={OnSubmitButton}>
                Detect</button>
            </div>
        </div>

    </div>
)

}

export default ImageLinkForm;