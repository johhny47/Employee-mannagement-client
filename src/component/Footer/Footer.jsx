
import logo from "../../assets/resourcer-logo-inv.png"
const Footer = () => {
    return (
       



<footer class="bg-[#1E429F] rounded-lg shadow dark:bg-gray-900 m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
        <img src={logo} className="h-10" alt="" />
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium  text-white sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm  text-white sm:text-center dark:text-gray-400">© 2025 <a href="https://flowbite.com/" class="hover:underline">Resourcer™</a>. All Rights Reserved.</span>
    </div>
</footer>



    );
};

export default Footer;