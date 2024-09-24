// ContextProviders.js

import { OrganizationContextProvider } from "@/data/Organizationalcontextdata";
import { ArticleProvider } from "@/data/Articlescontextdata";
import { CartProvider } from "@/data/Cartcontext";
import { AdminContextProvider } from "@/data/Admincontextdata";
import { UserContextProvider } from "@/data/usercontextdata";
import { ProductProvider } from "@/data/Productcontext";
import { VideoProvider } from "@/data/Videoscontext";
import { ServiceProvider } from "@/data/Servicescontext";
import { CategoriesProvider } from "@/data/Categoriescontext";
import { Subcategoriesprovider } from "@/data/Subcategoriescontext";
import { ChatroomContextProvider } from "@/data/chatroomAPI/ChatroomContext";
import { ChatroomSocketProvider } from "@/data/chatroomAPI/ChatroomSocket";
import { NotificationsContextProvider } from "@/data/notificationsAPI/NotificationContext";
import { NotificationsSocketContextProvider } from "@/data/notificationsAPI/NotificationSocket";
import { WhatsappAPIProvider } from "@/data/whatsappAPI/WhatsappContext";
import { WhatsappAPISocketProvider } from "@/data/whatsappAPI/WhatsappSocketContext";
// import { EmailContextProvider } from "@/data/Emails/EmailContext";
import { EmailSocketContextProvider } from "@/data/Emails/EmailSocket";

const ContextProviders = ({ children }) => (
  <OrganizationContextProvider>
    <ArticleProvider>
      <AdminContextProvider>
        <UserContextProvider>
          <CartProvider>
            <ProductProvider>
              <VideoProvider>
                <ServiceProvider>
                  <CategoriesProvider>
                    <Subcategoriesprovider>
                      <ChatroomContextProvider>
                        <ChatroomSocketProvider>
                          <NotificationsContextProvider>
                            <NotificationsSocketContextProvider>
                              <WhatsappAPIProvider>
                                <WhatsappAPISocketProvider>
                                  {/* <EmailContextProvider> */}
                                    <EmailSocketContextProvider>
                                      {children}
                                    </EmailSocketContextProvider>
                                  {/* </EmailContextProvider> */}
                                </WhatsappAPISocketProvider>
                              </WhatsappAPIProvider>
                            </NotificationsSocketContextProvider>
                          </NotificationsContextProvider>
                        </ChatroomSocketProvider>
                      </ChatroomContextProvider>
                    </Subcategoriesprovider>
                  </CategoriesProvider>
                </ServiceProvider>
              </VideoProvider>
            </ProductProvider>
          </CartProvider>
        </UserContextProvider>
      </AdminContextProvider>
    </ArticleProvider>
  </OrganizationContextProvider>
);

export default ContextProviders;
