import { useOutletContext } from 'react-router-dom';

export const useSafeOutletContext = () => {
    try {
        return useOutletContext();
    } catch (e) {
        return null;
    }
}