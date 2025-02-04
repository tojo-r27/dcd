import { Link } from "react-router";
import { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { useTranslation } from "react-i18next";
import { IconCloudUpload, IconFolderPlus, IconPlus } from "@tabler/icons-react";
import TablerIcon from "../TablerIcon";

export default function CreateUpload() {
    let { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen((prevState) => !prevState)
    };
    return(
        <>
            <Dropdown isOpen={open} className="dropdown" toggle={toggle}>
                <DropdownToggle 
                    tag="a" 
                    className="btn btn-trigger btn-icon" 
                    data-bs-toggle="dropdown"
                    onClick={(ev) => {
                        ev.preventDefault();
                    }}
                >
                    <TablerIcon IconComponent={IconPlus} />
                </DropdownToggle>
                <DropdownMenu end className="dropdown-menu dropdown-menu-end">
                    <ul className="link-list-opt no-bdr">
                        <li><Link to="#file-upload" data-bs-toggle="modal" onClick={toggle}><TablerIcon IconComponent={IconCloudUpload} /><span>Upload File</span></Link></li>
                        <li><Link to="#" onClick={toggle}><TablerIcon IconComponent={IconFolderPlus} /><span>Create Folder</span></Link></li>
                    </ul>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}