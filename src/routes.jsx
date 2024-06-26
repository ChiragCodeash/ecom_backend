import Dashboard from "./componets/Dashboard";
import AddVarient from "./componets/Product/AddVariant";
import CreateProduct from "./componets/Product/CreateProduct";
import ViewProduct from "./componets/Product/ViewProduct";
import Theme from "./componets/Theme";

const routes = [
  {
    path: "/",
    component: Dashboard,
    exact: true,
    title: "Dashboard",
  },
  {
    path: "/theme",
    component: Theme,
    exact: true,
    title: "Theme",
  },
  // {
  //   path: "/addproduct",
  //   component: AddProductLayout,
  //   exact: true,
  //   title: "Add Product",
  //   NestedRoutes: [
  //     {
  //       path: "",
  //       component: CreateProduct,
  //       exact: true,
  //       title: "Create A product",
  //     },
  //     {
  //       path: "createvariant",
  //       component: AddVarient,
  //       exact: true,
  //       title: "Create A Variant",
  //     },
  //   ],
  // },
  {
    path: "/addproduct",
    component: CreateProduct,
    exact: true,
    title: "Create product",
  },
  {
    path: "/addproduct/createvariant",
    component: AddVarient,
    exact: true,
    title: "Create Variant",
  },
  {
    path: "/updatevariant",
    component: AddVarient,
    exact: true,
    title: "Update Variant",
  },

  {
    path: "/viewproduct",
    component: ViewProduct,
    exact: true,
    title: "View Product",
  },
];

export default routes;
