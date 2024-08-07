import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { OrganizationContextProvider } from "@/data/Organizationalcontextdata";
import BootstrapJs from "@/components/BootstrapJs";
import { SessionProvider } from "next-auth/react";
import { ArticleProvider } from "@/data/Articlescontextdata";
import { CartProvider } from "@/data/Cartcontext";
import { AdminContextProvider } from "@/data/Admincontextdata";
import { UserContextProvider } from "@/data/usercontextdata";
import OffCanvas from "@/components/Offcanvas/OffCanvas";
import { ProductProvider } from "@/data/Productcontext";
import { VideoProvider } from "@/data/Videoscontext";
import { ServiceProvider } from "@/data/Servicescontext";
import { CategoriesProvider } from "@/data/Categoriescontext";
import { Subcategoriesprovider } from "@/data/Subcategoriescontext";

export const metadata = {
  title: "ICC Online Center",
  description:
    "Innovation Cybercafe is a platform that provides innovative solutions to all online and Offline related educational problems to students across the trans secondary to tertiary level.",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className="body">
        <SessionProvider session={session}>
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
                            {children}
                            <OffCanvas />
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
        </SessionProvider>
        <BootstrapJs />
      </body>
    </html>
  );
}
