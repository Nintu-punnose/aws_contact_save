import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Add from "./Components/add_page"
import View from "./Components/view"
import Register from "./Components/register"

const router = createBrowserRouter([
    { path: '/', element: <App/> },
    { path: 'addPage', element: <Add/> },
    { path: 'view', element: <View/>},
    { path:'register', element:<Register/>}
]);

export default router;