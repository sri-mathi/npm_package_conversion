import React from "react";
import "./ConnectionPopup.css";
interface ConnectionPopupProps {
    setIsModalOpen: (isOpen: boolean) => void;
    setConnectionStatus: (status: string) => void;
}
declare const ConnectionPopup: React.FC<ConnectionPopupProps>;
export default ConnectionPopup;
