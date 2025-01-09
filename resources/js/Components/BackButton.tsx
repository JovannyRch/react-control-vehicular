import { IoMdArrowBack } from "react-icons/io";
import Button from "./Button";

const BackButton = () => {
    const goBack = () => {
        window.history.back();
    };

    return (
        <Button
            onClick={goBack}
            className="flex items-center gap-2"
            style="main"
        >
            Regresar
            <IoMdArrowBack />
        </Button>
    );
};

export default BackButton;
