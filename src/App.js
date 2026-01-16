// src/App.jsx
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "./styles/GlobalStyles"
import { themes } from "./styles/themes"

// Pages
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/admin/AdminPage"
import CustomerFormPage from "./pages/form/CustomerFormPage"

function App() {
  const [currentTheme, setCurrentTheme] = useState("gold")

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <GlobalStyles />
      <Toaster position='top-right' />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/admin'
            element={<AdminPage setTheme={setCurrentTheme} />}
          />
          <Route path='/form/:slug' element={<CustomerFormPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
