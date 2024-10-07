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
import { WhatsappAPIProvider } from "@/data/whatsappAPI/WhatsappContext";

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
                            <WhatsappAPIProvider>
                              {children}
                            </WhatsappAPIProvider>
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
