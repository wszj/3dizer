import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home/index";
import MagicBrush from "./pages/magicbrush/index";
import Magic3D from "./pages/magic3d/index";
import Defi from "./pages/defi/index";
import NoPage from "./pages/noPage";
import Account from "./pages/account";
import Setting from "./pages/setting";
import Point from "./pages/point";
// import {store} from './stores/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './stores/index';
export const App = () => (
  // <Provider store={store}>
  //    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="magicbrush" element={<MagicBrush />} />
              <Route path="magic3d" element={<Magic3D />} />
              <Route path="defi" element={<Defi />} />
              <Route path="account" element={<Account />}>
                <Route path="" element={<Setting />} />
                <Route path="point" element={<Point />} />
              </Route>
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>

  //   </PersistGate>
  // </Provider>
)
