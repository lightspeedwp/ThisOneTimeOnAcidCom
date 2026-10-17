import { Outlet } from "react-router";
import { Header } from "../common/Header";

export function AppLayout() {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
    </div>
  );
}
