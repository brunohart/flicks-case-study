import { Routes, Route } from "react-router-dom";
import { GalleryPage } from "./screens/gallery/GalleryPage";
import { ScreenViewerLayout } from "./layouts/ScreenViewerLayout";

export default function App() {
  return (
    <Routes>
      <Route index element={<GalleryPage />} />
      <Route path="app/:screenId" element={<ScreenViewerLayout />} />
    </Routes>
  );
}
