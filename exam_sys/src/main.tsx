
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import store from './store/index.ts'
import { Provider } from 'react-redux'



createRoot(document.getElementById('root')!).render(
  <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
  </HashRouter>
)
