import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import "./App.css"
import ReportForm from "./features/reports/components/ReportForm"
import ReportInfo from "./features/reports/components/ReportInfo"
import ReportsTableWrapper from "./features/reports/components/ReportsTableWrapper"
import MainLayout from "./layouts/MainLayout"

function App() {
  const [tab, setTab] = useState(0)

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-white mb-8">
        Cuidamos de tu bienestar,{" "}
        <span className="font-normal">estamos para ayudarte</span>
      </h1>

      <Box className="bg-white min-h-[50vh] flex flex-col w-full">
        <Tabs
          value={tab}
          onChange={(_, val) => setTab(val)}
          className="border-b border-gray-200"
        >
          <Tab label="Reportar un problema" />
          <Tab label="Mis reportes" />
        </Tabs>

        <div className="flex-1">
          {tab === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <ReportForm />
              <ReportInfo />
            </div>
          )}
          {tab === 1 && <ReportsTableWrapper />}
        </div>
      </Box>
    </MainLayout>
  )
}

export default App
