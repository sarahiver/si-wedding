// src/App.js
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { ThemeProvider as MarketingThemeProvider } from "./context/ThemeContext"
import GlobalStyles from "./styles/GlobalStyles.js"
import { themes } from "./styles/themes"

// Pages
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/admin/AdminPage"
import CustomerFormPage from "./pages/form/CustomerFormPage"
import DemoPage from "./pages/DemoPage"  // NEU

function App() {
  const [currentTheme, setCurrentTheme] = useState("video")

  return (
    <MarketingThemeProvider>
      <ThemeProvider theme={themes[currentTheme]}>
        <GlobalStyles />
        <Toaster
          position='top-right'
          toastOptions={{
            duration: 4000,
            style: {
              background: themes[currentTheme].surface,
              color: themes[currentTheme].text,
              border: `1px solid ${themes[currentTheme].border}`,
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/demo' element={<DemoPage />} />  {/* NEU */}
            <Route
              path='/admin'
              element={<AdminPage setTheme={setCurrentTheme} />}
            />
            <Route path='/form/:slug' element={<CustomerFormPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </MarketingThemeProvider>
  )
}

export default App
