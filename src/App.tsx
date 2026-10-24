import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { CreateProductView } from "./modules/root/pages/features/products/views/create-product.view";
import { Toaster } from "sonner";
import { LoginView } from "./modules/root/pages/features/auth";
import { HomeView } from "./modules/root/pages/features/home";
import { NotFoundView } from "./modules/root/pages/features/not-found";
import { StoresView } from "./modules/root/pages/features/store";
import { CategoriesView } from "./modules/root/pages/features/categories";
import { AppLayout } from "./shared/components/layout";
import { useAuthStore } from "./shared/store";
import { ProductsListView } from "./modules/root/pages/features/products";

function LoginRoute() {
  const session = useAuthStore((state) => state.session);

  return session ? <Navigate to="/home" replace /> : <LoginView />;
}

function ProtectedHomeRoute() {
  const session = useAuthStore((state) => state.session);

  if (!session) return <Navigate to="/" replace />;

  return <Outlet />;
}

function AuthenticatedLayout() {
  const clearSession = useAuthStore((state) => state.clearSession);

  return (
    <AppLayout
      onLogout={() => {
        clearSession();
      }}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />

      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route element={<ProtectedHomeRoute />}>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/home" element={<HomeView />} />
            <Route path="/store" element={<StoresView />} />
            <Route path="/categories" element={<CategoriesView />} />
            <Route path="/products" element={<ProductsListView />} />
            <Route path="/products/create" element={<CreateProductView />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
