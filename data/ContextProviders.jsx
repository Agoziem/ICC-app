// ContextProviders.js

import { OrganizationContextProvider } from "@/data/organization/Organizationalcontextdata";
import { ArticleProvider } from "@/data/articles/Articlescontextdata";
import { CartProvider } from "@/data/carts/Cartcontext";
import { AdminContextProvider } from "@/data/users/Admincontextdata";
import { UserContextProvider } from "@/data/users/usercontextdata";
import { ProductProvider } from "@/data/product/Productcontext";
import { VideoProvider } from "@/data/videos/Videoscontext";
import { ServiceProvider } from "@/data/services/Servicescontext";
import { CategoriesProvider } from "@/data/categories/Categoriescontext";
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
