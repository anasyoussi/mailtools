import ApplicationLogo from '@/components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import {
    NavigationMenu, 
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, 
  } from "@/components/ui/navigation-menu"
  
  
export default function Guest({ children }) {
    return (
        <div className="">
            <div className='border-b'>
                <NavigationMenu className='m-auto'>
                    <NavigationMenuList className='p-5'> 
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className='p-2 rounded-md hover:bg-gray-200'>
                                    Creative Translation
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem> 
 

                        <NavigationMenuItem>
                            <Link href="/DuplicateImgs" legacyBehavior passHref>
                                <NavigationMenuLink className='p-2 rounded-md hover:bg-gray-200'>
                                    Duplicate Imgs
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem> 
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="w-full pt-5">
                {children}
            </div>


            <footer class="border-t py-4 text-center mt-24 text-black">
                <p class="text-sm">Developed by <a href="" class="underline">Anas Youssi</a> for E-Impact team</p>
            </footer> 
        </div>
    );
}
