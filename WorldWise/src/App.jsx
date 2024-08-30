import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./pages/ProtectedRoute";

// const Homepage = lazy(() =>
//   import(/* webpackPrefetch: true */ "./pages/HomePage.jsx")
// );
// const Pricing = lazy(() =>
//   import(/* webpackPrefetch: true */ "./pages/Pricing.jsx")
// );
// const Login = lazy(() =>
//   import(/* webpackPrefetch: true */ "./pages/Login.jsx")
// );
// const AppLayout = lazy(() =>
//   import(/* webpackPrefetch: true */ "./pages/AppLayout.jsx")
// );
// const PageNotFound = lazy(() =>
//   import(/* webpackPrefetch: true */ "./pages/PageNotFound.jsx")
// );
// const Product = lazy(() =>
//   import(/* webpackPrefetch: true */ "./pages/Product.jsx")
// );
// const ProtectedRoute = lazy(() =>
//   import(/* webpackPrefetch: true */ "./pages/ProtectedRoute")
// );

function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />}></Route>
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
