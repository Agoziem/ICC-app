import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  XIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

const ShareButtons = ({ url, title,setToastMessage }) => {
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    document.getElementById("liveToast").classList.replace("hide", "show");
    setTimeout(() => {
      document.getElementById("liveToast").classList.replace("show", "hide");
      setToastMessage({
        title: "",
        message: "",
        time: "",
      });
    }, 3000);
  };
  return (
    <>
      <div className="d-flex">
        <div
          className="rounded-circle d-flex justify-content-center align-items-center  me-2"
          style={{
            cursor: "pointer",
            width: "32px",
            height: "32px",
            backgroundColor: "var(--bgDarkerColor)",
            color: "var(--light)",
          }}
          onClick={()=> {
            setToastMessage({
              title: "Link copied",
              message: "your Article Link is copied to your clipboard",
              time: new Date().toLocaleTimeString(),
            });
            copyLink();
          }}
        >
          <i className="bi bi-link-45deg h5 mb-0"></i>
        </div>
        <FacebookShareButton url={url} quote={title} className="me-2">
          <FacebookIcon size={32} round={true} style={{ cursor: "pointer" }} />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title} className="me-2">
          <XIcon size={32} round={true} style={{ cursor: "pointer" }} />
        </TwitterShareButton>
        <LinkedinShareButton url={url} title={title} className="me-2">
          <LinkedinIcon size={32} round={true} style={{ cursor: "pointer" }} />
        </LinkedinShareButton>
        <WhatsappShareButton
          url={url}
          title={title}
          separator=":: "
          className="me-2"
        >
          <WhatsappIcon size={32} round={true} style={{ cursor: "pointer" }} />
        </WhatsappShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
