import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className='flex items-start justify-between'>
			<div className='flex items-start gap-3 mb-8'>
				<Link to='/' className='rounded-lg'>
					<img src='/vibeDrip.png' className='size-12 text-black' />
				</Link>
				<div>
					<h1 className='text-2xl font-bold'>Music Manager</h1>
					<p className='text-zinc-400 text-sm mt-1'>Manage your music catalog</p>
				</div>
			</div>
      <div className="scale-140 origin-center">
        <UserButton />
      </div>
		</div>
	);
};
export default Header;