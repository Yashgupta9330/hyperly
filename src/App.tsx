import './App.css';
import { src } from './lib/data';



function App() {

  return (
    <div className='flex flex-col gap-2 w-[450px] bg-black text-[#FFFFFF] p-4'>
      <div className='flex items-center w-full justify-start text-[#FFFFFF] font-bold text-3xl font-bold text-3xl'>
        <img src={src} alt="logo" className='w-24' />
        <span>KLEO</span>
      </div>
      <span className='font-bold text-3xl'>How to Use Kleo?</span>
      <span><span className='text-xl font-bold'>Step1: </span><span className='text-xl'>Navigate to Linkdin</span></span>
      <span><span className='text-xl font-bold'>Step2: </span><span className='text-xl'>Click on the blue Kleo icon in the top right corner of the screen</span></span>
    </div>
  );
}

export default App;