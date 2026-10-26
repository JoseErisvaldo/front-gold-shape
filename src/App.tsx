import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { LoginView } from "./modules/root/pages/features/auth";
import { CategoriesView } from "./modules/root/pages/features/categories";
import { DeliveryAreasListView } from "./modules/root/pages/features/delivery-areas";
import { HomeView } from "./modules/root/pages/features/home";
import { NotFoundView } from "./modules/root/pages/features/not-found";
import { ProductsListView } from "./modules/root/pages/features/products";
import { CreateProductView } from "./modules/root/pages/features/products/views/create-product.view";
import { StoresView } from "./modules/root/pages/features/store";
import { ProfileView } from "./modules/root/pages/features/users";
import { StoreProfileView } from "./modules/root/pages/features-public/store-profile";
import { StorefrontView } from "./modules/root/pages/features-public/storefront";
import { AppLayout } from "./shared/components/layout";
import { queryClient } from "./shared/services/queries";
import { useAuthStore } from "./shared/store";

function LoginRoute() {
  const session = useAuthStore((state) => state.session);

  return session ? <Navigate to="/home" replace /> : <LoginView />;
}

function ProtectedHomeRoute() {
  const session = useAuthStore((state) => state.session);

  if (!session) return <Navigate to="/session" replace />;

  return <Outlet />;
}

function AuthenticatedLayout() {
  const clearSession = useAuthStore((state) => state.clearSession);

  return (
    <AppLayout
      onLogout={() => {
        clearSession();
        queryClient.clear();
      }}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />

      <Routes>
        <Route path="/session" element={<LoginRoute />} />
        <Route path="/" element={<StorefrontView />} />
        <Route path="/store" element={<StoreProfileView />} />
        <Route element={<ProtectedHomeRoute />}>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/home" element={<HomeView />} />
            <Route path="/store-manage" element={<StoresView />} />
            <Route path="/categories" element={<CategoriesView />} />
            <Route path="/products" element={<ProductsListView />} />
            <Route path="/products/create" element={<CreateProductView />} />
            <Route path="/delivery-areas" element={<DeliveryAreasListView />} />
            <Route path="/profile" element={<ProfileView />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
