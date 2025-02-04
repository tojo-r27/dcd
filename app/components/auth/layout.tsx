import { useEffect } from "react";
import Footer from "./footer";

export default function Auth({ children }) {
    const bodyCss = ['nk-body', 'bg-white', 'npc-default', 'pg-auth'];
    
    useEffect(() => {
        // Add class to body when component mounts
        document.body.classList.add(...bodyCss);
    
        // Clean up function to remove the class when component unmounts
        return () => {
            document.body.classList.remove(...bodyCss);
        };
    }, []);
    
    return (
        <>
            <div className="nk-wrap nk-wrap-nosidebar">
                <div className="nk-wrap nk-wrap-nosidebar">
                    <div className="nk-content">
                        <div className="nk-split nk-split-page nk-split-lg">
                            <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
                                <div className="absolute-top-right d-lg-none p-3 p-sm-5">
                                    <a href="#" className="toggle btn-white btn btn-icon btn-light" data-target="athPromo"><em className="icon ni ni-info"></em></a>
                                </div>
                                <div className="nk-block nk-block-middle nk-auth-body">
                                    {children}
                                </div>
                                <Footer />
                            </div>
                            <div className="nk-split-content nk-split-stretch bg-lighter bg-abstract d-flex toggle-break-lg toggle-slide toggle-slide-right" data-toggle-body="true" data-content="athPromo"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}