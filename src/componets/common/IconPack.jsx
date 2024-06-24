import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import SearchIcon from '@mui/icons-material/Search';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LoginIcon from '@mui/icons-material/Login';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { IconCaretRightFilled, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";


const IconPack = ({ icon, size , className }) => {

  switch (icon) {
    case "youtube":
      return (
        <>
          <YouTubeIcon fontSize={size || "medium"} className={className ? className : ""}/>
        </>
      );
    case "instagram":
      return (
        <>
          <InstagramIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "facebook":
      return (
        <>
          <FacebookTwoToneIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "twitter":
      return (
        <>
          <TwitterIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "pinterest":
      return (
        <>
          <PinterestIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "search":
      return (
        <>
          <SearchIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "cart":
      return (
        <>
          <LocalMallOutlinedIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "close":
      return (
        <>
          <CloseOutlinedIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "heart":
      return (
        <>
          <FavoriteBorderOutlinedIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "user":
      return (
        <>
          <PersonOutlineOutlinedIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "nav":
      return (
        <>
          <ClearAllOutlinedIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "shipping":
      return (
        <>
          <LocalShippingOutlinedIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "rightarrow":
      return (
        <>
          <KeyboardArrowRightIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "leftarrow":
      return (
        <>
          <ChevronLeftIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "downarrow":
      return (
        <>
          <KeyboardArrowDownIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "toparrow":
      return (
        <>
          <KeyboardArrowUpIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "dashboard":
      return (
        <>
          <DashboardIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "setting":
      return (
        <>
          <SettingsIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "theme":
      return (
        <>
          <AutoAwesomeIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "login":
      return (
        <>
          <LoginIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "filladd":
      return (
        <>
          <AddCircleIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "product":
      return (
        <>
          <CategoryIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "delete":
      return (
        <>
          <DeleteIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "add":
      return (
        <>
          <AddIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "view":
      return (
        <>
          <RemoveRedEyeIcon fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "eye":
      return (
        <>
          <IconEye fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "trash":
      return (
        <>
          <IconTrash fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "edit":
      return (
        <>
          <IconEdit fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );
    case "caret-right":
      return (
        <>
          <IconCaretRightFilled fontSize={size || "medium"} className={className ? className : ""} />
        </>
      );

    default:
      break;
  }
};

export default IconPack;
