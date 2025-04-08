import Layout from "./layouts/Layout";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import InitializeAuth from "./auth/InitializeAuth";

function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <InitializeAuth>
            <RouterProvider router={router} />
          </InitializeAuth>
        </Provider>
    </div>
  );
}

export default App;
