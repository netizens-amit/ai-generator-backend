// src/generation/prompts/industry-templates.ts

export interface IndustryTemplate {
  name: string;
  sections: string[];
  features: string[];
  ctas: string[];
  contentGuidelines: string;
}

export const INDUSTRY_TEMPLATES: Record<string, IndustryTemplate> = {
  ecommerce: {
    name: 'E-Commerce',
    sections: [
      'Navigation bar with logo, search, cart icon (with count), user menu',
      'Hero banner with main product showcase and promotional CTA',
      'Featured products grid (6-8 products) with image, title, price, rating, "Add to Cart" button',
      'Product categories section with icon cards',
      'Special offers banner with countdown timer',
      'Best sellers carousel',
      'Customer reviews section with star ratings and photos',
      'Newsletter signup with discount offer',
      'Footer with payment methods, shipping info, return policy links',
    ],
    features: [
      'Product search with real-time filtering',
      'Add to cart with quantity selector',
      'Product quick view modal',
      'Image zoom on hover',
      'Size/color variant selector',
      'Price filtering slider',
      'Sort by: price, popularity, rating',
      'Wishlist toggle',
      'Cart summary sidebar',
    ],
    ctas: ['Shop Now', 'Add to Cart', 'View Details', 'Buy Now', 'Quick View'],
    contentGuidelines: `
- Use product images: https://via.placeholder.com/400x500
- Show prices in format: $XX.XX with strikethrough for sale prices
- Display stock status: "In Stock" (green) / "Low Stock" (orange) / "Out of Stock" (red)
- Add product badges: "NEW", "SALE 20%", "BESTSELLER"
- Show star ratings out of 5 with review count (e.g., "4.5 ★ (128 reviews)")
- Include trust badges: "Free Shipping", "30-Day Returns", "Secure Checkout"
- Use action-oriented language
- Add product categories: Electronics, Fashion, Home, Beauty, Sports
`,
  },

  restaurant: {
    name: 'Restaurant',
    sections: [
      'Navigation with logo, menu sections, reservation button, contact',
      'Hero with high-quality food image and "Reserve Table" CTA',
      'Menu section with tabs: Appetizers, Main Course, Desserts, Beverages',
      'Chef\'s special recommendations with images',
      'Online reservation form with date/time picker',
      'Gallery section showing restaurant ambiance and signature dishes',
      'Customer testimonials with ratings',
      'Location map with opening hours',
      'Footer with address, phone, social media, careers link',
    ],
    features: [
      'Interactive menu with expandable items',
      'Dietary filter badges (Vegan, Gluten-Free, Spicy)',
      'Table reservation date picker',
      'Guest count selector',
      'Special requests textarea',
      'Image lightbox gallery',
      'Opening hours with current status (Open/Closed)',
      'One-click call button',
      'Direction map integration',
    ],
    ctas: ['Reserve Table', 'Order Online', 'View Menu', 'Call Now', 'Get Directions'],
    contentGuidelines: `
- Use appetizing food images: https://via.placeholder.com/600x400
- Menu items format: "Dish Name | $XX.XX | Description (2-3 lines)"
- Show dietary icons: [V] Vegan, [GF] Gluten-Free, [Spicy Icon]
- Display prep time: "Ready in 15 mins"
- Opening hours: "Mon-Fri: 11AM-10PM, Sat-Sun: 10AM-11PM"
- Add chef's badge: "Chef's Recommendation"
- Include atmosphere tags: "Romantic", "Family-Friendly", "Fine Dining"
- Show awards: "Michelin Star", "Best Restaurant 2024"
`,
  },

  healthcare: {
    name: 'Healthcare',
    sections: [
      'Navigation with logo, services, doctors, appointments, contact, patient portal',
      'Hero with trust message and "Book Appointment" CTA',
      'Services grid with icons (Cardiology, Pediatrics, Dental, etc.)',
      'Meet our doctors section with photos, specialties, credentials',
      'Appointment booking form with service selector',
      'Insurance partners logos',
      'Patient testimonials with success stories',
      'Health resources and blog articles',
      'Emergency contact banner (always visible)',
      'Footer with certifications, privacy policy, accreditations',
    ],
    features: [
      'Appointment scheduler with available time slots',
      'Doctor profile modals with bio and education',
      'Service search and filtering',
      'Insurance verification form',
      'Symptom checker tool',
      'FAQ accordion by category',
      'Live chat for inquiries',
      'Patient portal login',
      'Health blog with categories',
    ],
    ctas: ['Book Appointment', 'Emergency Care', 'Find a Doctor', 'Patient Portal', 'Contact Us'],
    contentGuidelines: `
- Use professional, calming colors (blues, whites, light greens)
- Doctor cards: Photo, Name, Specialty, Credentials (MD, PhD), Years of Experience
- Show certifications: "Board Certified", "AMA Member"
- Display accepted insurance: Blue Cross, Aetna, Medicare, etc.
- Add trust symbols: Lock icon for privacy, Checkmark for verified
- Emergency banner: "24/7 Emergency: Call XXX-XXXX" in red
- Include accessibility note: "Wheelchair Accessible"
- Show patient satisfaction rate: "98% Patient Satisfaction"
`,
  },

  technology: {
    name: 'Technology SaaS',
    sections: [
      'Navigation with logo, features, pricing, resources, login, signup',
      'Hero with product tagline, demo video, "Start Free Trial" CTA',
      'Key features grid with icons and descriptions',
      'Interactive product demo or screenshots carousel',
      'Integration partners logos wall',
      'Pricing plans comparison table (Free, Pro, Enterprise)',
      'Customer success stories with metrics and logos',
      'Developer resources and API documentation link',
      'FAQ section with categories',
      'Footer with resources, support, terms, social links',
    ],
    features: [
      'Interactive feature demos with hover effects',
      'Pricing calculator',
      'Live chat support widget',
      'Video demo player',
      'API playground preview',
      'Plan comparison toggle',
      'Customer logo carousel',
      'Newsletter signup',
      'Trial signup form with email validation',
    ],
    ctas: ['Start Free Trial', 'Watch Demo', 'Get Started', 'Contact Sales', 'View Documentation'],
    contentGuidelines: `
- Use tech-forward design with gradients and modern fonts
- Feature cards: Icon, Title, 2-line description
- Screenshots: https://via.placeholder.com/1200x800
- Metrics format: "10,000+ Users", "99.9% Uptime", "50M+ API Calls"
- Pricing: $0/mo (Free), $29/mo (Pro), $99/mo (Enterprise)
- Show features included: Checkmarks for included, X for not included
- Customer logos: Display recognizable brand logos
- Add social proof: "Trusted by 500+ companies"
- Include security badges: "SOC 2 Certified", "GDPR Compliant"
`,
  },

  realestate: {
    name: 'Real Estate',
    sections: [
      'Navigation with logo, buy, rent, sell, agents, contact',
      'Hero with property search bar (location, price range, type)',
      'Featured properties grid with images, price, beds/baths, sqft',
      'Property type filters: Houses, Apartments, Commercial, Land',
      'Interactive map view with property markers',
      'Property comparison tool',
      'Meet our agents section with profiles',
      'Mortgage calculator widget',
      'Neighborhood guides',
      'Footer with office locations, licensing, social links',
    ],
    features: [
      'Advanced search with multiple filters',
      'Price range slider',
      'Map-based browsing',
      'Property detail modal with image gallery',
      'Save to favorites',
      'Schedule viewing form',
      '360° virtual tour viewer',
      'Mortgage calculator',
      'Share property via email/social',
    ],
    ctas: ['View Property', 'Schedule Tour', 'Contact Agent', 'Save Property', 'Calculate Mortgage'],
    contentGuidelines: `
- Property cards: Large image, Price ($XXX,XXX), Beds (3), Baths (2), Sqft (2,500), Location
- Use high-quality property images: https://via.placeholder.com/800x600
- Status badges: "For Sale", "Sold", "Pending", "New Listing"
- Agent cards: Photo, Name, Title, Phone, Email, "View Listings" button
- Show key features: "Pool", "Garage", "Garden", "Fireplace"
- Add neighborhood info: "Walkability Score: 85/100"
- Display price per sqft: "$250/sqft"
- Include financing estimate: "Est. $2,500/mo at 6% APR"
`,
  },

  finance: {
    name: 'Financial Services',
    sections: [
      'Navigation with logo, services, solutions, resources, login',
      'Hero with value proposition and "Open Account" CTA',
      'Services overview with icons (Banking, Investments, Loans, Insurance)',
      'Security and compliance badges prominently displayed',
      'Product comparison table',
      'Client testimonials with metrics',
      'Financial calculators (loan, savings, retirement)',
      'Resources and education center',
      'Contact and consultation form',
      'Footer with regulatory information and certifications',
    ],
    features: [
      'Loan calculator with sliders',
      'Investment return calculator',
      'Account comparison tool',
      'Secure login portal',
      'Document upload area',
      'Live interest rates',
      'Appointment booking',
      'FAQ with search',
      'Newsletter subscription',
    ],
    ctas: ['Open Account', 'Apply Now', 'Get Started', 'Schedule Consultation', 'Learn More'],
    contentGuidelines: `
- Use professional, trust-building design (blues, grays, gold accents)
- Show security: Lock icons, "Bank-Level Encryption", "FDIC Insured"
- Display certifications: "SEC Registered", "BBB A+ Rating"
- Interest rates format: "2.5% APY" with date "as of [date]"
- Calculator results: "$XXX monthly payment"
- Add disclaimers at bottom in small text
- Show customer protection: "Your deposits are insured up to $250,000"
- Include transparency: "No hidden fees", "Clear terms"
`,
  },

  education: {
    name: 'Education & E-Learning',
    sections: [
      'Navigation with logo, courses, instructors, about, login/signup',
      'Hero with course enrollment message and CTA',
      'Popular courses grid with thumbnails, ratings, student count',
      'Course categories with icons',
      'Instructor profiles with credentials',
      'Student success stories and testimonials',
      'Free sample lessons or trial',
      'Pricing and payment plans',
      'Enrollment process steps',
      'Footer with accreditations and contact',
    ],
    features: [
      'Course search and filtering',
      'Video preview player',
      'Course syllabus accordion',
      'Student reviews and ratings',
      'Enrollment form',
      'Payment plan calculator',
      'Certificate showcase',
      'Progress tracker',
      'Live class schedule',
    ],
    ctas: ['Enroll Now', 'Start Free Trial', 'View Courses', 'Download Syllabus', 'Watch Preview'],
    contentGuidelines: `
- Course cards: Thumbnail image, Title, Instructor, Rating (4.8★), Students (12,450), Price ($49)
- Use educational imagery: https://via.placeholder.com/600x400
- Show duration: "8 weeks", "40 hours of content"
- Display difficulty: "Beginner", "Intermediate", "Advanced"
- Include what you'll learn: Bullet points (5-6 items)
- Instructor info: Photo, Name, Title, Bio (2 lines), "View Profile"
- Add outcomes: "Certificate of Completion", "Lifetime Access"
- Show stats: "95% Completion Rate", "4.9/5 Average Rating"
`,
  },

  portfolio: {
    name: 'Portfolio / Personal Brand',
    sections: [
      'Navigation with logo/name, work, about, services, blog, contact',
      'Hero with professional intro, tagline, and primary CTA',
      'Featured work showcase with project cards and images',
      'Skills and expertise section with icons or progress bars',
      'Work experience timeline',
      'Client testimonials with company logos',
      'Services offered with pricing (if applicable)',
      'Blog/articles section (if applicable)',
      'Contact form with social links',
      'Footer with copyright, resume download, social media',
    ],
    features: [
      'Project filtering by category/tag',
      'Lightbox image gallery',
      'Project detail modals with case studies',
      'Skills visualization (bars/circles)',
      'Downloadable resume PDF',
      'Contact form with validation',
      'Social media feed integration',
      'Smooth scroll navigation',
      'Dark/light mode toggle',
    ],
    ctas: ['View Work', 'Hire Me', 'Download Resume', 'Get in Touch', 'Start Project'],
    contentGuidelines: `
- Project cards: Large image, Title, Category, Technologies used, "View Details"
- Use portfolio-quality images: https://via.placeholder.com/1000x600
- Show tech stack: React, Node.js, TypeScript (as badges)
- Include metrics: "Increased conversion by 45%", "Built in 3 weeks"
- Client names with logos (if allowed)
- Add project roles: "Lead Developer", "UI/UX Designer"
- Display case study button: "Read Case Study"
- Show testimonial format: Quote, Name, Position, Company
`,
  },

  blog: {
    name: 'Blog / Content Site',
    sections: [
      'Navigation with logo, categories, about, contact, search',
      'Hero with featured article image and excerpt',
      'Recent posts grid with thumbnails and meta info',
      'Categories sidebar or navigation',
      'Search bar with autocomplete',
      'Popular/trending posts widget',
      'Newsletter subscription form',
      'Author bio section',
      'Related posts at article end',
      'Footer with archive, categories, social links',
    ],
    features: [
      'Article search functionality',
      'Category and tag filtering',
      'Reading time estimate',
      'Social sharing buttons',
      'Comment section (or comment count)',
      'Table of contents for long articles',
      'Author profile links',
      'Newsletter popup',
      'Pagination or infinite scroll',
    ],
    ctas: ['Read More', 'Subscribe', 'Share Article', 'Leave Comment', 'Follow'],
    contentGuidelines: `
- Article cards: Featured image, Category tag, Title, Excerpt (2 lines), Meta (Author, Date, Read time)
- Images: https://via.placeholder.com/1200x600
- Meta format: "By John Doe • Mar 15, 2024 • 5 min read"
- Categories: Tech, Lifestyle, Business, Travel (as colored tags)
- Show engagement: "142 shares", "28 comments"
- Add author: Small avatar, name, "View all posts by [author]"
- Include related posts: "You might also like" (3-4 cards)
- Social share buttons: Twitter, Facebook, LinkedIn, Copy link
`,
  },

  travel: {
    name: 'Travel & Tourism',
    sections: [
      'Navigation with logo, destinations, packages, tours, about, contact',
      'Hero with destination search bar and inspiring image',
      'Popular destinations grid with images and starting prices',
      'Travel packages/deals section',
      'Booking form with date range picker',
      'Customer reviews with traveler photos',
      'Travel guides and tips section',
      'Destination highlights video or slideshow',
      'Newsletter with exclusive deals',
      'Footer with support, policies, social links',
    ],
    features: [
      'Destination search with autocomplete',
      'Date range picker for travel dates',
      'Guest/traveler count selector',
      'Price comparison and filtering',
      'Interactive destination map',
      'Photo gallery with filters',
      'Review filtering by rating',
      'Multi-step booking form',
      'Itinerary builder',
    ],
    ctas: ['Book Now', 'Explore', 'Get Quote', 'View Package', 'Plan Trip'],
    contentGuidelines: `
- Destination cards: Stunning image, Location name, Starting price (From $XX), Rating (4.7★), Duration
- Images: https://via.placeholder.com/900x600
- Package includes: "Flights, Hotels, Meals, Tours" with icons
- Show traveler count: "Perfect for couples", "Family-friendly"
- Display availability: Calendar with available/unavailable dates
- Reviews format: "Amazing experience!" - Sarah M. (with photo)
- Add highlights: "Beach Paradise", "Cultural Heritage", "Adventure"
- Include policies: "Free cancellation up to 7 days before"
`,
  },

  business: {
    name: 'Business / Corporate',
    sections: [
      'Navigation with logo, services, about, team, blog, contact',
      'Hero with company mission and CTA',
      'Services overview with icons',
      'Why choose us / Value proposition section',
      'Team members with photos and roles',
      'Client logos and testimonials',
      'Case studies or success stories',
      'Blog or news section',
      'Contact form and location info',
      'Footer with company info, social links, sitemap',
    ],
    features: [
      'Service detail modals',
      'Team member profile cards',
      'Testimonial carousel',
      'Case study filtering',
      'Contact form with validation',
      'Multi-location map',
      'FAQ accordion',
      'Newsletter signup',
      'Live chat widget',
    ],
    ctas: ['Get Started', 'Request Quote', 'Contact Us', 'Learn More', 'Schedule Meeting'],
    contentGuidelines: `
- Service cards: Icon, Title, Description (3-4 lines), "Learn More" button
- Use professional imagery: https://via.placeholder.com/800x500
- Team format: Photo, Name, Position, LinkedIn icon
- Show stats: "15+ Years Experience", "500+ Clients", "98% Satisfaction"
- Client logos: Display recognizable company logos
- Testimonials: Quote (2-3 lines), Name, Position, Company
- Add case studies: Problem, Solution, Results (with metrics)
- Include accreditations: "ISO Certified", "Industry Leader"
`,
  },
};
