import React, { useState } from "react";
import Login from "./components/Login";
import TaskList from "./components/TaskList";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            {!isLoggedIn ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <TaskList />
            )}
        </div>
    );
}

export default App;
