import React from "react";

interface Props {
    images: File[];
    setImages: (images: File[]) => void;
}

const ReactImageUploader = ({ images, setImages }: Props) => {
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const newImages = files.map((file) => file);
            if (Array.isArray(newImages)) {
                setImages([...images, ...newImages]);
            }
        }
    };

    const handleImageDelete = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-4 mb-4">
                {images.map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            src={URL.createObjectURL(image)}
                            alt={`uploaded-preview-${index}`}
                            className="object-cover w-24 h-24 rounded-lg"
                        />
                        <button
                            onClick={() => handleImageDelete(index)}
                            className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <label className="px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer">
                Seleccionar imágenes
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </label>
        </div>
    );
};

export default ReactImageUploader;
