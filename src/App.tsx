import { BrowserRouter } from 'react-router'
import Layout from './components/layout/Layout'

function App() {
  return (
    <BrowserRouter>
      {/* sample page for broker role */}
      <Layout role="broker">
        <h1 className="text-2xl font-bold text-gray-900">
          AL-Web
        </h1>

        <p className="mt-2 text-gray-600">
          Application layout is working.
        </p>
      </Layout>
    </BrowserRouter>
  )
}

export default App