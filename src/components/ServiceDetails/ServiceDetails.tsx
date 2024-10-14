import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchServiceDetailsStart } from '../../redux/reducers';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { RootState } from '../../redux/reducers';
// import { Service } from '../../types';

const ServiceDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const selectedService = useSelector((state: RootState) => state.selectedService);
    const loading = useSelector((state: RootState) => state.loading);
    const error = useSelector((state: RootState) => state.error);

    useEffect(() => {
        if (id && !loading && !selectedService) {
            dispatch(fetchServiceDetailsStart(Number(id)));
        }
    }, [dispatch, id, loading, selectedService]);

    const handleRetry = () => {
        if (id) {
            dispatch(fetchServiceDetailsStart(Number(id)));
        }
    };

    if (loading) return <Loader />;
    if (error) return <ErrorMessage onRetry={handleRetry} />;

    if (!selectedService) return null;

    return (
        <div>
            <h1>{selectedService.name}</h1>
            <p>{selectedService.description}</p>
        </div>
    );
};

export default ServiceDetails;
