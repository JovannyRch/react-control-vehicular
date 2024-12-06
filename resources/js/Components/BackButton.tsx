import { IoMdArrowBack } from "react-icons/io";
import Button from "./Button";

const BackButton = () => {
    return (
        <Button
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
            style="main"
        >
            Regresar
            <IoMdArrowBack />
        </Button>
    );
};

export default BackButton;
