import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigates back to the previous page
    };

    return (
        <button 
            onClick={handleGoBack}
            className="flex items-center text-blue-500 hover:text-blue-700"
        >
            <FaArrowLeft className="mr-2" />
            Back
        </button>
    );
};

export default BackButton;
