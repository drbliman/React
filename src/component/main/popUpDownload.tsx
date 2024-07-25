import React from "react";
import store from "../store/store";
import { useTheme } from "../ThemeContext";
import { removeAll } from "../store/store";
import { useDispatch } from "react-redux";
import CsvDownloader from "../api/CsvDownloader";
import "../../../public/css/main/popUpDownload.scss";

const PopUpDownload = () => {
  const { theme } = useTheme();
  const [state, setNumPosts] = React.useState(store.getState().elements.length);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setNumPosts(store.getState().elements.length);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleClickRemoveAll = () => {
    dispatch(removeAll());
  }

  return <div className={`popUpDownload ${theme} ${state > 0 ? 'active': ''}`}>
    <div className={`popUpDownloadState ${theme}`}>{`Load ${state} items`}</div>
    <button className={`buttonDownload ${theme}`} onClick={CsvDownloader}>Download</button>
    <button className={`buttonUnselectAll ${theme}`} onClick={handleClickRemoveAll}>Unselect all</button>
  </div>
}

export default PopUpDownload;