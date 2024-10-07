import Messaging from "@/components/messaging/Messaging";
import PageTitle from "@/components/PageTitle/PageTitle";

const MessagingPage = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <PageTitle pathname="Messaging & Notifications" />
      <Messaging />
    </div>
  );
};

export default MessagingPage;
