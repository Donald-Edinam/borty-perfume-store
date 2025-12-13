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
    <div className="min-h-screen flex flex-col">
      {/* <div className="grow bg-muted" /> */}
      <footer className="border-t">
        {/* Video Showcase Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div>

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
              <Logo />

              <p className="mt-4 text-muted-foreground">
                Your destination for premium fragrances. Discover your signature scent with us.
              </p>
            </div>

            <div>
              <h6 className="font-medium">Shop</h6>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link href="/shop" className="text-muted-foreground hover:text-foreground">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/shop?sort=newest" className="text-muted-foreground hover:text-foreground">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-muted-foreground hover:text-foreground">
                    Best Sellers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="font-medium">Company</h6>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="font-medium">Account</h6>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link href="/profile" className="text-muted-foreground hover:text-foreground">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="text-muted-foreground hover:text-foreground">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-muted-foreground hover:text-foreground">
                    Login / Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Subscribe Newsletter */}
            <div className="col-span-2">
              <h6 className="font-medium">Stay up to date</h6>
              <form className="mt-6 flex items-center gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="grow max-w-64"
                />
                <Button>Subscribe</Button>
              </form>
            </div>
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                Borty&apos;s Perfume Store
              </Link>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link href="#" target="_blank" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank" aria-label="Twitter">
                <X className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
