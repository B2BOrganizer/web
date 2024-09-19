import * as React from "react";
import Lightbox from "yet-another-react-lightbox";

// interface Slide {
//     src: string;
// }
//
// interface PreviewLightboxProps {
//     previewOpen: boolean;
//     setPreviewOpen: (open: boolean) => void;
//     slides: Slide[];
// }
//
// export const PreviewLightbox: React.FC<PreviewLightboxProps> = ({ previewOpen, setPreviewOpen, slides }) => {
//     return (
//         <Lightbox
//             open={previewOpen}
//             close={() => setPreviewOpen(false)}
//             slides={slides}
//             carousel={{
//                 finite: true
//             }}
//         />
//     );
// };

interface Slide {
    src: string;
}

export const PreviewLightbox: React.FC = () => {
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [slides, setSlides] = React.useState<Slide[]>([]);

    const handlePreview = (previews: any[]) => {
        const newSlides = previews.map(item => ({
            src: `data:${item}`
            // src: `data:image/jpeg;base64,${item.contentInBase64}`
        }));
        setSlides(newSlides);
        setPreviewOpen(true);
    };

    return (
        <Lightbox
            open={previewOpen}
            close={() => setPreviewOpen(false)}
            slides={slides}
            carousel={{
                finite: true
            }}
        />
    );
};