"use client"

import { useState } from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Phone, Mail, Shirt, Tally4, Sparkles, ThumbsUp, ArrowRight, Calendar } from "lucide-react"

export default function Home() {
  // Form handling script
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submission started')

    setFormStatus({
      submitting: true,
      success: false,
      message: "",
    })

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())

    try {
      console.log('Sending data:', formJson) // Log the data being sent
      const response = await fetch("http://localhost/htrequests/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formJson),
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))
      
      const responseText = await response.text() // Get raw response text first
      console.log('Raw response:', responseText)
      
      let result
      try {
        result = JSON.parse(responseText) // Try to parse as JSON
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError)
        throw new Error('Invalid response format from server')
      }

      console.log('Parsed response:', result)

      if (result.success) {
        setFormStatus({
          submitting: false,
          success: true,
          message: result.message || "Your request has been submitted successfully!",
        })
        form.reset()
      } else {
        setFormStatus({
          submitting: false,
          success: false,
          message: result.message || "Something went wrong. Please try again.",
        })
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setFormStatus({
        submitting: false,
        success: false,
        message: error instanceof Error ? error.message : "An error occurred. Please try again or contact us directly.",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Ogor Dry Cleaning Ltd</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="#services" className="text-sm font-medium transition-colors hover:text-primary">
              Services
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="#contact">Schedule Pickup</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Professional Dry Cleaning Services You Can Trust
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  We take care of your garments with the highest quality cleaning techniques and eco-friendly solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="#contact">Schedule a Pickup</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#services">Our Services</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] aspect-video overflow-hidden rounded-xl">
                <Image
                  src="/images/professional-laundry.png"
                  alt="Professional carefully handling laundry with a washing machine"
                  width={800}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Introduction Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mx-auto w-full max-w-[500px] aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/images/laundry-service.png"
                  alt="Professional with freshly cleaned laundry"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Professional Laundry Care</h2>
                <p className="text-muted-foreground md:text-xl">
                  At Ogor Dry Cleaning Ltd, we handle your garments with the utmost care. Our professional team ensures
                  that each item receives the attention it deserves, from sorting to cleaning to folding.
                </p>
                <p className="text-muted-foreground">
                  We use premium detergents and state-of-the-art equipment to deliver exceptional results every time.
                  Whether it's everyday wear or special occasion pieces, we treat your clothes like our own.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link href="#services">Explore Our Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Us</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
                We combine modern technology with traditional craftsmanship to deliver exceptional results.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-3 p-6 border rounded-lg">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Premium Quality</h3>
                <p className="text-muted-foreground">
                  We use the finest cleaning agents and techniques to ensure your clothes look their best.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 border rounded-lg">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Fast Turnaround</h3>
                <p className="text-muted-foreground">
                  Get your garments back within 48 hours with our express service option.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 border rounded-lg">
                <div className="p-3 bg-primary/10 rounded-full">
                  <ThumbsUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Satisfaction Guaranteed</h3>
                <p className="text-muted-foreground">
                  If you're not completely satisfied, we'll re-clean your items at no additional cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Services in Action</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
                Quality care for all your garments, from everyday wear to special occasion pieces.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="overflow-hidden rounded-lg">
                <div className="relative aspect-square">
                  <Image
                    src="/images/ironing-service.png"
                    alt="Professional ironing service with pressed shirts"
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-4 bg-background">
                  <h3 className="font-semibold text-lg">Professional Pressing</h3>
                  <p className="text-muted-foreground">Expert ironing for crisp, wrinkle-free garments</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg">
                <div className="relative aspect-square">
                  <Image
                    src="/images/folded-laundry.png"
                    alt="Neatly folded colorful laundry with iron"
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-4 bg-background">
                  <h3 className="font-semibold text-lg">Laundry & Folding</h3>
                  <p className="text-muted-foreground">Perfectly cleaned and neatly folded garments</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg">
                <div className="relative aspect-square">
                  <Image
                    src="/images/washing-service.png"
                    alt="Washing machine with clean folded laundry"
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-4 bg-background">
                  <h3 className="font-semibold text-lg">Full Laundry Service</h3>
                  <p className="text-muted-foreground">Complete washing, drying, and pressing solutions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Services</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
                From everyday garments to special occasion wear, we provide comprehensive care for all your clothing
                needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background p-6 rounded-lg flex gap-4">
                <div className="p-3 bg-primary/10 rounded-full h-fit">
                  <Shirt className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Dry Cleaning</h3>
                  <p className="text-muted-foreground mb-4">
                    Professional cleaning for suits, dresses, formal wear, and delicate fabrics that require special
                    care.
                  </p>
                  <Link href="#pricing" className="text-primary font-medium inline-flex items-center">
                    View Pricing <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="bg-background p-6 rounded-lg flex gap-4">
                <div className="p-3 bg-primary/10 rounded-full h-fit">
                  <Tally4 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Laundry & Pressing</h3>
                  <p className="text-muted-foreground mb-4">
                    Wash, dry, and press service for everyday clothing items, including shirts, pants, and casual wear.
                  </p>
                  <Link href="#pricing" className="text-primary font-medium inline-flex items-center">
                    View Pricing <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="bg-background p-6 rounded-lg flex gap-4">
                <div className="p-3 bg-primary/10 rounded-full h-fit">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Specialty Cleaning</h3>
                  <p className="text-muted-foreground mb-4">
                    Expert care for wedding gowns, leather, suede, and other specialty items requiring detailed
                    attention.
                  </p>
                  <Link href="#pricing" className="text-primary font-medium inline-flex items-center">
                    View Pricing <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="bg-background p-6 rounded-lg flex gap-4">
                <div className="p-3 bg-primary/10 rounded-full h-fit">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Pickup & Delivery</h3>
                  <p className="text-muted-foreground mb-4">
                    Convenient door-to-door service with scheduled pickups and deliveries to save you time.
                  </p>
                  <Link href="#contact" className="text-primary font-medium inline-flex items-center">
                    Schedule Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Pricing</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
                Transparent pricing with no hidden fees. Volume discounts available for regular customers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary p-6">
                  <h3 className="text-xl font-bold text-primary-foreground">Basic Items</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Shirts/Blouses</span>
                    <span className="font-semibold">₦2,500</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Pants/Slacks</span>
                    <span className="font-semibold">₦3,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>T-shirts</span>
                    <span className="font-semibold">₦2,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Skirts (Simple)</span>
                    <span className="font-semibold">₦3,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sweaters</span>
                    <span className="font-semibold">₦4,000</span>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary p-6">
                  <h3 className="text-xl font-bold text-primary-foreground">Formal Wear</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Suits (2pc)</span>
                    <span className="font-semibold">₦8,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Dresses (Simple)</span>
                    <span className="font-semibold">₦6,500</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Dresses (Formal)</span>
                    <span className="font-semibold">₦10,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Blazers/Jackets</span>
                    <span className="font-semibold">₦5,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ties</span>
                    <span className="font-semibold">₦2,800</span>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden md:col-span-2 lg:col-span-1">
                <div className="bg-primary p-6">
                  <h3 className="text-xl font-bold text-primary-foreground">Specialty Items</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Wedding Gowns</span>
                    <span className="font-semibold">From ₦40,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Leather Jackets</span>
                    <span className="font-semibold">From ₦20,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Comforters</span>
                    <span className="font-semibold">From ₦12,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Curtains (per panel)</span>
                    <span className="font-semibold">From ₦8,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Area Rugs</span>
                    <span className="font-semibold">By Size</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">Need a custom quote for bulk orders or specialty items?</p>
              <Button asChild>
                <Link href="#contact">Contact Us for Custom Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About Ogor Dry Cleaning Ltd</h2>
                <p className="text-muted-foreground">
                  Founded in 2005, Ogor Dry Cleaning Ltd has been providing exceptional dry cleaning services to our
                  community for over 15 years. What started as a small family business has grown into a trusted name in
                  garment care.
                </p>
                <p className="text-muted-foreground">
                  Our commitment to quality, attention to detail, and customer satisfaction has earned us a loyal
                  customer base and numerous industry accolades. We continuously invest in the latest cleaning
                  technologies and eco-friendly solutions.
                </p>
                <p className="text-muted-foreground">
                  At Ogor Dry Cleaning Ltd, we believe that proper garment care extends the life of your clothing and
                  helps you look your best every day. Our team of experienced professionals treats each item with the
                  care it deserves.
                </p>
              </div>
              <div className="mx-auto w-full max-w-[500px] aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/images/about-team.png"
                  alt="Our professional team member carefully handling laundry"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
                Don't just take our word for it. Here's what our satisfied customers have to say.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-primary"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="italic">
                  "I've been using Ogor Dry Cleaning Ltd for over 5 years now, and they never disappoint. My suits
                  always come back looking brand new. Their pickup service is a lifesaver for my busy schedule!"
                </p>
                <div>
                  <p className="font-semibold">Michael T.</p>
                  <p className="text-sm text-muted-foreground">Business Executive</p>
                </div>
              </div>
              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-primary"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="italic">
                  "They saved my wedding dress after a disaster with another cleaner! The team went above and beyond to
                  restore it in time for my big day. I can't thank them enough!"
                </p>
                <div>
                  <p className="font-semibold">Sarah L.</p>
                  <p className="text-sm text-muted-foreground">Satisfied Bride</p>
                </div>
              </div>
              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-primary"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="italic">
                  "As a restaurant owner, I need reliable cleaning for tablecloths and napkins. Ogor Dry Cleaning Ltd
                  delivers consistent quality and always meets our tight deadlines. Highly recommended!"
                </p>
                <div>
                  <p className="font-semibold">David R.</p>
                  <p className="text-sm text-muted-foreground">Restaurant Owner</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Contact Us</h2>
                <p className="text-muted-foreground">
                  Have questions or ready to schedule a pickup? Reach out to us through any of these channels.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>09165244706</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>ibezimvictor05@gmail.com</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <span>
                      Kurudu phase 5 army estate
                      <br />
                      Abuja, Nigeria
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Business Hours:</p>
                      <p>Monday - Friday: 7:00 AM - 7:00 PM</p>
                      <p>Saturday: 8:00 AM - 5:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg border bg-background p-6">
                  <h3 className="text-xl font-bold mb-4">Schedule a Pickup</h3>
                  <form
                    id="contactForm"
                    className="space-y-4"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="first-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          First name
                        </label>
                        <input
                          id="first-name"
                          name="firstName"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="last-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Last name
                        </label>
                        <input
                          id="last-name"
                          name="lastName"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="service"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Service Needed
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="dry-cleaning">Dry Cleaning</option>
                        <option value="laundry">Laundry & Pressing</option>
                        <option value="specialty">Specialty Cleaning</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Special Instructions
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Any special instructions or requests"
                        required
                      ></textarea>
                    </div>
                    {formStatus.message && (
                      <div
                        className={`p-3 rounded-md ${formStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {formStatus.message}
                      </div>
                    )}
                    <Button type="submit" className="w-full" disabled={formStatus.submitting}>
                      {formStatus.submitting ? "Sending..." : "Schedule Pickup"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">© 2025 Ogor Dry Cleaning Ltd. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Careers
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
