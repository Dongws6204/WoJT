import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from './Routes/index';
import DefaultLayout from "./components/Layout/DefaultLayout/DefaultLayout";
import { Fragment } from "react";

function App() {
  return (
    <div className="App">
      <Routes>
        {router.map((route, index) => {
          
          const Page = route.component
          let Layout = DefaultLayout

          if (route.layout) {
            Layout = route.layout
          } else if (route.layout === null){
            Layout = Fragment
          }
          return <Route key={index} path={route.path} element={
            <Layout>
              <Page />
            </Layout>
          } />
        })}
      </Routes>
    </div>
  )
}
export default App
