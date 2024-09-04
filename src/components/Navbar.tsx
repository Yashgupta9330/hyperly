import Logo from "../icons/Logo";
import SettingsIcon from "../icons/Settingsicons"


const Navbar = () => {
    return(
        <div className='w-full flex items-center h-[60px] justify-between px-8 mt-8'>
        <div className='flex items-center justify-center gap-1'>
           <Logo/>
        </div>
        <SettingsIcon />
      </div>
    )
}

export default Navbar;