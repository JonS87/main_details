import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicesStart } from '../../redux/reducers';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Service } from '../../types';
import { RootState } from '../../redux/reducers';

const ServicesList: React.FC = () => {
    const dispatch = useDispatch();
    const services = useSelector((state: RootState) => state.services);
    const loading = useSelector((state: RootState) => state.loading);
    const error = useSelector((state: RootState) => state.error);

    const [hasFetched, setHasFetched] = useState(false);
    
    useEffect(() => {
      if (!hasFetched) {
        setHasFetched(true);
        dispatch(fetchServicesStart());
      }
    }, [dispatch, hasFetched]);

    const handleRetry = () => {
      setHasFetched(false);
      dispatch(fetchServicesStart());
    };

    if (loading) return <Loader />;
    if (error) return <ErrorMessage onRetry={handleRetry} />;

    return (
        <ul>
            {services.map((service: Service) => (
                <li key={service.id}>
                    <a href={`/${service.id}/details`}>{service.name}</a>
                </li>
            ))}
        </ul>
    );
};

export default ServicesList;
