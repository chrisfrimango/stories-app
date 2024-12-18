import { lazy } from "react";
import type { PageComponents } from "../types/layoutTypes";


export const Home = lazy(
  () => import("../pages/Home")
) as PageComponents["Home"];
export const Login = lazy(
  () => import("../pages/Login")
) as PageComponents["Login"];
export const Register = lazy(
  () => import("../pages/Register")
) as PageComponents["Register"];
