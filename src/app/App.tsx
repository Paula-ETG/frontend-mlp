import { AppProvider } from "./provider";
import { Chat } from "./routes/chat/Chat";

function App() {
  return (
    <AppProvider>
      <Chat />
    </AppProvider>
  )
}

export default App
