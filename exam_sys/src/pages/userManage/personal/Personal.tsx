




import React, { useState } from 'react';
import Edit from './components/Edit'
import Modify from './components/Modify'


const Personal: React.FC  = () => {
  const [showEdit, setShowEdit] = useState(true)



  return (
   <>
   {showEdit 
   ? <Edit onchange={()=>setShowEdit(false)}></Edit> 
   : <Modify oncancel={()=>setShowEdit(true)}></Modify>}
   </>
  )
}

export default Personal
