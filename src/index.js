import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./service/firebase";
import Gallery from "./pages/gallery/gallery";
import Home from "./pages/home";
import GalleryDetail from "./pages/gallery/galleryDetail/galleryDetail";
import GalleryLists from "./pages/gallery/galleryLists/galleryLists";
import AddGallery from "./pages/gallery/addGallery/addGallery";
import Login from "./components/user/login/login";
import Enquire from "./pages/enquire/enquire";
import { Authkakao } from "./components/user/login/auth";
import ProtectedRoute from "./pages/protectedRoute";
import GalleryEdit from "./pages/gallery/galleryEdit/galleryEdit";
import EnquireList from "./pages/enquire/enquireList/enquireList";
import EnquireDetail from "./pages/enquire/enquireDetail/enquireDetail";
import NotFound from "./pages/notFound/notFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { index: true, path: "", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <NotFound /> },
      { path: "/join", element: <Login /> },
      { path: "/oauth", element: <Authkakao />, redirect },
      {
        path: "/enquire",
        element: <Enquire />,
        children: [
          {
            path: "/enquire",
            element: <EnquireList />,
          },
          {
            path: "/enquire/:id",
            element: <EnquireDetail />,
          },
        ],
      },
      {
        path: "/gallery",
        element: <Gallery />,
        children: [
          {
            path: "/gallery",
            element: <GalleryLists />,
          },
          {
            path: "/gallery/addGallery",
            element: (
              <ProtectedRoute requireAdmin>
                <AddGallery />
              </ProtectedRoute>
            ),
          },
          {
            path: "/gallery/:id/galleryEdit",
            element: (
              <ProtectedRoute requireAdmin>
                <GalleryEdit />
              </ProtectedRoute>
            ),
          },
          {
            path: "/gallery/:id",
            element: <GalleryDetail />,
          },
        ],
      },
    ],
  },
]);
root.render(<RouterProvider router={router} />);
