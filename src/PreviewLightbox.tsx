import {Button} from "react-admin";
import Lightbox from "yet-another-react-lightbox";
import React from "react";
import {useFetchPreviews} from "./useFetchPreviews";

interface PreviewLightboxProps {
    id: string | number;
}

const PreviewLightbox: React.FC<PreviewLightboxProps> = ({ id }) => {
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [slides, setSlides] = React.useState<{ src: string }[]>([]);
    const fetchSlides = useFetchPreviews();

    const handlePreviewClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        try {
            const newSlides = await fetchSlides(id);
            setSlides(newSlides);
            setPreviewOpen(true);
        } catch (error) {
            console.error("Error fetching slides:", error);
        }
    };

    return (
        <>
            <Button type="button" onClick={handlePreviewClick}>Preview</Button>
            <Lightbox
                open={previewOpen}
                close={() => setPreviewOpen(false)}
                slides={slides}
                carousel={{ finite: true }}
            />
        </>
    );
};

export default PreviewLightbox;