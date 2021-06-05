import React from 'react';
import { useParams } from 'react-router';

const Detail = () => {
    const {id} = useParams();

    return (
        <div>
            <h1>책 ID : {id}</h1>
        </div>
    );
};

export default Detail;