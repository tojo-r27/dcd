import { Menu } from "@mantine/core";
import { Link } from "react-router";
import TablerIcon from "~/components/TablerIcon";

export const DropdownMenuItem = ({ link, icon, text, color, children, onClick }) => {

  return (
    <>
      {link ? (
        <li>
          <Link to={link} onClick={onClick}>
            <Menu.Item color={color} component="">
              {icon && <TablerIcon IconComponent={icon} />} <span className="ms-1">{text || children}</span>
            </Menu.Item>
          </Link>
        </li>
      ) : (
        <li>
          <Menu.Item color={color} component="">
            {icon && <TablerIcon IconComponent={icon} />} <span className="ms-1">{text || children}</span>
          </Menu.Item>
        </li>
      )}
    </>
  );
};

export const DropdownMenuList = ({ children }) => {
    return <Menu.Dropdown>{children}</Menu.Dropdown>;
};