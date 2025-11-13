import RadixCounter from '../components/RadixCounter.jsx';
import Value from '../components/Value.jsx';
import Adder from '../components/Adder.jsx';
import Timer from '../components/Timer.jsx';
import Temperature from '../components/Temperature.jsx';
import { useState } from 'react';

const components = () => {

      const [counter, setCounter] = useState(0)

    return ( 
        <>
        <h2 className='text-center'>COMPONENT PAGE (Week 6)</h2>
        <div>
      <RadixCounter />
      <Value name={'COUNTER'} value={counter} setValue={setCounter}/>
      <Adder name="ADDER"/>
      <Timer />
      <Temperature />
      {/* ลบชื่อและรหัสนิสิตจากหน้านี้ */}
    </div></>
     )
}
 
export default components;