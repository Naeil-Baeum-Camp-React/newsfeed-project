import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SupabaseExample from '../pages/SupabaseExample.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/supabase" element={<SupabaseExample/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;