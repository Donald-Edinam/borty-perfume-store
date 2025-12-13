import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Instagram,
  Facebook,
  X,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";



const Footer = () => {
  return (
    <footer className="border-t bg-gray-900 text-white">
      {/* Video Showcase Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10 py-4"></div>

        <div className="relative h-[40vh] overflow-hidden">
          <video
            className="absolute w-full h-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://videos.pexels.com/video-files/10537262/10537262-uhd_2732_1440_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Discover Your Signature Scent</h2>
            <p className="text-lg text-gray-300 max-w-2xl mb-8">Explore our curated collection of premium fragrances and find the perfect scent that defines you.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white font-medium py-6 px-8 rounded-lg transition-colors">
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent hover:bg-white/10 border border-white text-white font-medium py-6 px-8 rounded-lg transition-colors hover:text-white">
                <Link href="/shop">View Collections</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-(--breakpoint-xl) mx-auto">
        <div className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-8 gap-y-10 px-6 xl:px-0">
          <div className="col-span-full xl:col-span-2">
            {/* Logo */}
            <Logo className="!text-white" />

            <p className="mt-4 text-gray-400">
              Your destination for premium fragrances. Discover your signature scent with us.
            </p>
          </div>

          <div>
            <h6 className="font-medium text-white">Shop</h6>
            <ul className="mt-6 space-y-4">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?sort=newest" className="text-gray-400 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-medium text-white">Company</h6>
            <ul className="mt-6 space-y-4">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-medium text-white">Account</h6>
            <ul className="mt-6 space-y-4">
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-white transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe Newsletter */}
          <div className="col-span-2">
            <h6 className="font-medium text-white">Stay up to date</h6>
            <form className="mt-6 flex items-center gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="grow max-w-64 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button>Subscribe</Button>
            </form>
          </div>
        </div>
        <Separator className="bg-gray-800" />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-gray-400">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" target="_blank" className="hover:text-white transition-colors">
              Borty&apos;s Perfume Store
            </Link>
            . All rights reserved.
          </span>

          <div className="flex items-center gap-5 text-gray-400">
            <Link href="#" target="_blank" aria-label="Instagram" className="hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank" aria-label="Facebook" className="hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank" aria-label="Twitter" className="hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
