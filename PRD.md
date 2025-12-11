# Perfume E-Commerce Website

## Product Requirements Document (PRD)

---

## **1. Project Overview**

A client needs a modern, fast, and user-friendly **e-commerce website for a perfume business**. The entire project must be completed within **5 days** with a budget of **1500 GHS**.

You will build the website using **Next.js** because:

* You are already skilled in React/Next.js.
* You have limited time.
* Laravel would slow development since you know less about it.
* Next.js provides built-in SEO support, SSR, API routes, and faster development.

The backend will use **NeonDB (PostgreSQL)** for simplicity, speed, and free tier hosting. Product images and banners will be stored on **Cloudinary**.

---

## **2. Objectives**

* Create a clean, mobile-friendly perfume e-commerce store.
* Allow admin (client) to upload/manage products easily.
* Provide a frictionless buying experience for customers.
* Support secure payments (Flutterwave/Paystack).

---

## **3. Main Features**

### **3.1 User Features**

* Browse perfumes by category, brand, type.
* Search and filter products.
* Product page with images, description, fragrance notes, price.
* Add to cart.
* Checkout.
* Payment integration (Flutterwave/Paystack).
* Order confirmation email.
* Customer account dashboard:

  * Profile
  * Order history

---

## **3.2 Admin Features**

* Admin login.
* Dashboard with basic analytics.
* Product Management:

  * Add product (name, price, description, type, tags, stock, images)
  * Edit product
  * Delete product
* Order Management:

  * View all orders
  * Update order status
* Manage homepage sliders & banners.

---

## **4. Technical Stack**

### **Frontend & Backend**

* **Next.js 16 (App Router)**
* **React 19**
* **Next Auth for admin login**
* **Next.js API routes for CRUD**

### **Database**

* **NeonDB (PostgreSQL)**

  * Fast setup
  * Free tier
  * Works great with Prisma

### **ORM**

* **Prisma**

### **Media Storage**

* **Cloudinary** for product images & banners.

### **Payment**

* **Flutterwave / Paystack API**

### **Deployment**

* **Vercel (Frontend + API)**
* NeonDB hosted externally
* Cloudinary hosted externally

---

## **5. System Architecture Overview**

1. **Next.js UI Layer** → Displays pages, SSR for SEO.
2. **Next.js API Layer** → Handles authentication, product CRUD, order logic.
3. **Prisma ORM** → Communicates with NeonDB.
4. **Cloudinary** → Stores images; API returns secure URLs.
5. **Flutterwave/Paystack** → Handles payment.
6. **Vercel** → Deployment.

---

## **6. Database Schema (Simplified)**

### **Tables:**

* **User**

  * id
  * name
  * email
  * password
  * role (admin/user)

* **Product**

  * id
  * name
  * description
  * price
  * type / fragrance family
  * brand
  * stock
  * images (JSON array)

* **Order**

  * id
  * userId
  * total
  * payment_status
  * order_status
  * createdAt

* **OrderItem**

  * id
  * orderId
  * productId
  * quantity

* **Banner**

  * id
  * imageURL
  * title
  * description

---

## **7. Pages & Flows**

### **Public Pages**

* Home
* Shop
* Product Details
* Cart
* Checkout
* About Us
* Contact Us

### **Admin Pages**

* Login
* Dashboard
* Products (List/Add/Edit)
* Orders
* Banners

---

## **8. User Journey**

1. User enters homepage → sees featured perfumes.
2. User clicks a product → reads details.
3. User adds item to cart.
4. User checks out → enters delivery info.
5. User pays → receives confirmation email.
6. Admin receives order notification.
7. Admin updates order status.

---

## **9. Security Requirements**

* Password hashing (bcrypt).
* JWT or NextAuth session-based auth.
* Admin routes protected via middleware.
* Rate limiting for API routes.
* Secure CORS.

---

## **10. Performance Requirements**

* < 2s load time.
* Optimized images via Cloudinary.
* Incremental static regeneration for product pages.
* Pagination for shop page.

---

## **11. Non-Functional Requirements**

* SEO Friendly.
* Fully responsive.
* Simple UI/UX.
* Accessible components.
* Scalable database structure.

---

## **12. Delivery Timeline (5 Days)**

### **Day 1**

* Setup project, database, Prisma schema.
* Build UI for homepage + shop page.

### **Day 2**

* Product details page.
* Cart + Checkout.

### **Day 3**

* Admin dashboard + Product CRUD.

### **Day 4**

* Payment integration.
* Cloudinary image upload.
* Order processing.

### **Day 5**

* Testing
* SEO optimization
* Deploy to Vercel

---

## **13. Deliverables**

* Fully functional e-commerce website.
* Admin dashboard.
* Source code repo.
* Deployment link.
* Documentation.
* Admin training (short demo).

---

## **14. Budget Breakdown (1500 GHS)**

* Development: 1300 GHS
* Domain/Hosting Support & Setup: 200 GHS
* Total: **1500 GHS**

---

## **15. Future Enhancements (Optional Upsells)**

* Mobile app (React Native).
* Loyalty system.
* SMS notifications.
* Advanced analytics.
* Product recommendation AI.
