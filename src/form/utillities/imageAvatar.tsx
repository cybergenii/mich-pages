import { CloudDownload, View } from "lucide-react";
import { useState } from "react";
import { Modal } from "./modals";
import { mergeCssClass } from "./utils";


export function ImageAvatar({
  height,
  imageUrl,
  round = true,
  showDownload = false,
  showView = false,

}: {
  imageUrl: string;
  height: number;
  round?: boolean;
  showDownload?: boolean;
  showView?: boolean;
  modalId?: string;
}) {

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  function handleModal () {
    setIsModalOpen(!isModalOpen);
  }
  const downloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a temporary link element and trigger a click event
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "downloaded_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL after the download
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={
        (mergeCssClass(round ? "elevated-paper-round" : "elevated-paper"),
        "p-2 overflow-hidden relative")
      }
    >
      {" "}
      {
        <Modal
          isOpen={isModalOpen}
          onClose={handleModal}
          title="Delete Confirmation"
          size="md"
          children={<ImagePreview image={imageUrl} />}
        />
      }
      <img
        srcSet={imageUrl}
        style={{
          height: `${height}px`,
          width: `${height}px`,
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: round ? "50%" : "12px",
        }}
        alt={imageUrl}
      />{" "}
      {isHovered && (showDownload || showView) && (
        <div
          style={{
            height: round ? `${height / 2}px` : `${height / 3}px`,
            width: round ? `${height / 2}px` : `${height}px`,
            top: round ? `-${height / 1.4}px` : `-${height / 3}px`,
            left: round ? `${height / 4}px` : "0px",
            borderBottomLeftRadius: round ? "50%" : "12px",
            borderBottomRightRadius: round ? "50%" : "12px",
            borderTopLeftRadius: round ? "50%" : "0px",
            borderTopRightRadius: round ? "50%" : "0px",

            background: "linear-gradient(315deg, #ffffff, #e6e6e6)",
            boxShadow: " -2px -2px 4px #666666, 2px 2px 4px #ffffff",
            overflow: "hidden",
          }}
          className={mergeCssClass(
            "relative     flex items-center justify-around p-1",
            round ? "bg-opacity-100" : "bg-opacity-100"
          )}
        >
          {showView && (
            <span
              className="h-4 w-4 text-[--accent-1] animate-pulse "
              onClick={(e) => {
                e.stopPropagation();
               handleModal()
              }}
            >
             <View/>
            </span>
          )}
          {showDownload && (
            <span
              className="h-4 w-4 text-[--accent-2] animate-bounce"
              onClick={() => downloadImage(imageUrl)}
            >
             <CloudDownload/>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function ImagePreview({ image }: { image: string }) {
  return (
    <>
      <img
        src={image}
        alt="Preview"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </>
  );
}
