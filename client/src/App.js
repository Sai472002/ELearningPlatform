import { useEffect, useState } from "react";
import Routers from "./Routers";
import { MessageProvider } from "./Components/Common/CustomMessage";
import LoadingPage from "./Components/Student/Home/LoadingPage";
import { GET } from "./Components/ApiFunction/ApiFunction";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <MessageProvider>
      <Routers/>
    </MessageProvider>
  );
}

export default App;
