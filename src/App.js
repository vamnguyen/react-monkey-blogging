import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import PostDetailsPage from "pages/PostDetailsPage";
import DashboardLayout from "module/dashboard/DashboardLayout";
import DashboardPage from "pages/DashboardPage";
import PostManage from "module/post/PostManage";
import PostAddNew from "module/post/PostAddNew";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>

          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>

          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
