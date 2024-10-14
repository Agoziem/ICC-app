// ContextProviders.js

import { OrganizationContextProvider } from "@/data/organization/Organizationalcontextdata";
import { ArticleProvider } from "@/data/articles/Articlescontextdata";
import { CartProvider } from "@/data/carts/Cartcontext";
import { AdminContextProvider } from "@/data/payments/Admincontextdata";
import { UserContextProvider } from "@/data/payments/usercontextdata";
import { ProductProvider } from "@/data/product/Productcontext";
import { VideoProvider } from "@/data/videos/Videoscontext";
import { ServiceProvider } from "@/data/services/Servicescontext";
import { Subcategoriesprovider } from "@/data/categories/Subcategoriescontext";
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
                  <Subcategoriesprovider>
                    <ChatroomContextProvider>
                      <ChatroomSocketProvider>
                        <NotificationsContextProvider>
                          <WhatsappAPIProvider>{children}</WhatsappAPIProvider>
                        </NotificationsContextProvider>
                      </ChatroomSocketProvider>
                    </ChatroomContextProvider>
                  </Subcategoriesprovider>
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
