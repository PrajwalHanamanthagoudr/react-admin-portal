import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Index from "./router/index";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main
          style={{
            flexGrow: 1,
            marginTop: "65px",
          }}
        >
          <Index />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
