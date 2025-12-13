import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
    title: "Contact Us - Borty's Perfume Store",
    description: "Get in touch with us. We are here to help you find your perfect scent.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-(--breakpoint-xl)">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                <p className="text-lg text-gray-600">
                    Have a question about a product, your order, or just want to talk perfume? We'd love to hear from you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Contact Information */}
                <div className="bg-gray-50 p-8 md:p-12 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Phone</h3>
                                <p className="text-gray-600 mb-1">+233 24 123 4567</p>
                                <p className="text-gray-500 text-sm">Mon-Sat from 8am to 6pm</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Email</h3>
                                <p className="text-gray-600 mb-1">support@bortyperfumes.com</p>
                                <p className="text-gray-500 text-sm">We'll respond within 24 hours</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Office</h3>
                                <p className="text-gray-600 mb-1">123 Fragrance Avenue</p>
                                <p className="text-gray-600">Accra, Ghana</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> First name </label>
                                <Input id="firstName" placeholder="John" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Last name </label>
                                <Input id="lastName" placeholder="Doe" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Email </label>
                            <Input id="email" type="email" placeholder="john@example.com" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Subject </label>
                            <Input id="subject" placeholder="How can we help?" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Message </label>
                            <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" required />
                        </div>

                        <Button type="submit" className="w-full md:w-auto" size="lg">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
