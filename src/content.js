import { BRAND } from "./brand";

const phone = BRAND.phone;
const email = BRAND.email;
const legal = BRAND.legal;

export const PAGES = {
  contact: {
    title: "Contact Us",
    html: `
      <p>We would love to hear from you. Whether it is a question about our products, your order, or a wholesale request, we are here to help.</p>
      <p><strong>Hours</strong>: ${BRAND.hours}<br>
      <strong>Email</strong>: <a href="${BRAND.emailHref}">${email}</a><br>
      <strong>Phone</strong>: <a href="${BRAND.phoneHref}">${phone}</a></p>
      <p><strong>Address</strong>:<br>
      ${legal}<br>
      ${BRAND.address.join("<br>")}</p>
      <p>Thank you for supporting ${legal} - craftsmanship meets timeless walnut beauty.</p>
    `,
  },
  "our-story": {
    title: "Our Story",
    html: `
      <p class="lede">Starts from a big love for solid walnut.</p>
      <h2>We are ${BRAND.name},</h2>
      <p>A Hong Kong workshop and trading house with a deep respect for pure, natural walnut wood. No fillers. No shortcuts. Just the real thing, the way nature intended.</p>
      <p>${legal} was built around a simple belief: only genuine hardwood is worth bringing into a home. We source, finish, and deliver solid wood crafts that feel warm to the touch and grow more beautiful with time.</p>
      <h2>When you step into our world, we want you to feel two things right away.</h2>
      <h3>First,</h3>
      <p>The comfort of knowing every piece is made from genuine, natural hard wood.</p>
      <h3>Second,</h3>
      <p>The quiet joy of slowing down and truly connecting with your home and your life.</p>
      <p>If we would not love it in our own homes, we will not sell it. That is the promise of ${legal}.</p>
    `,
  },
  faqs: {
    title: "FAQs",
    html: `
      <h3>1. Ordering</h3>
      <p><strong>Can I modify my order after placing it?</strong><br>Orders cannot be modified once submitted. Please ensure all information is accurate before placing your order. If you notice an error after ordering, contact us within 24 hours to cancel the order.</p>
      <p><strong>Can I cancel my order?</strong><br>Orders can be canceled within 24 hours of placement. After 24 hours, cancellation is no longer possible.</p>
      <p><strong>How do I use a discount code or promotion?</strong><br>If a discount code is available, it will usually be displayed on the product page. Copy the code and enter it during checkout. For direct price reductions, no code is needed - the checkout price already reflects the discount.</p>
      <h3>2. Payment</h3>
      <p><strong>Which payment methods do you accept?</strong><br>We accept PayPal, Google Pay, Apple Pay, UnionPay, American Express, Mastercard, and Visa.</p>
      <p><strong>Is my payment secure?</strong><br>Yes, all payments are processed with industry-standard encryption to ensure your information is safe.</p>
      <p><strong>What should I do if payment fails?</strong><br>Check your payment details and contact your bank if necessary, or try another payment method.</p>
      <h3>3. Shipping & Delivery</h3>
      <p><strong>Which shipping methods are available?</strong><br>We ship via SF International and CNE from our workshop in China.</p>
      <p><strong>How long will my order take to arrive?</strong><br>For most destinations, shipping takes 7-12 days, and normally no later than 15 days. Severe weather or other uncontrollable events may cause delays.</p>
      <p><strong>Do you offer free shipping?</strong><br>Orders of 45 USD or more qualify for free shipping. Orders below this amount incur a 6.9 USD shipping fee.</p>
      <h3>4. Returns</h3>
      <p>We offer a 30-day return or exchange policy from the day you receive your items. Contact us at <a href="${BRAND.emailHref}">${email}</a> with your order number to start a request.</p>
    `,
  },
  "order-shipping-policy": {
    title: "Order & Shipping Policy",
    html: `
      <p>At ${legal}, we want your shopping experience to be simple, smooth, and worry-free.</p>
      <h3>Processing & Shipping Time</h3>
      <p><strong>Processing time</strong>: Our order processing time is approximately <strong>3 business days</strong>. Each product is carefully handpicked and prepared with care before shipping.</p>
      <p><strong>Shipping time</strong>: For most destinations, delivery takes <strong>7-12 days</strong> and normally will not exceed 15 days. In rare cases, such as severe weather or other unforeseen events, delivery may be delayed.</p>
      <p>We ship via SF International / CNE Express from our workshop in China.</p>
      <p><strong>Shipping fee</strong>: Orders of <strong>USD 45</strong> or more qualify for <strong>Free Shipping</strong>. For orders below USD 45, a shipping fee of <strong>USD 6.9</strong> applies.</p>
      <p><strong>Shipping areas</strong>: Australia, Canada, Cyprus, Czechia, Denmark, Estonia, Finland, Germany, Greece, Hungary, Iceland, Ireland, Israel, Italy, Japan, Kuwait, Latvia, Lithuania, Luxembourg, Malaysia, Malta, Netherlands, New Zealand, Norway, Poland, Portugal, Romania, Saudi Arabia, Serbia, Singapore, Slovakia, Slovenia, South Korea, Spain, Sweden, Switzerland, United Arab Emirates, United Kingdom, United States (excludes Alaska, Guam, Hawaii, Northern Mariana Islands, Puerto Rico, U.S. Virgin Islands).</p>
      <h3>Modify My Order</h3>
      <p>Please double-check your shipping address before placing your order. Once your order has been processed, changes cannot be made.</p>
      <h3>Cancel My Order</h3>
      <p>Orders can be canceled within <strong>24 hours</strong> of placement. After 24 hours, the order will be processed and cannot be canceled or modified.</p>
      <h3>Need help?</h3>
      <p>Email us at <a href="${BRAND.emailHref}">${email}</a> or call <a href="${BRAND.phoneHref}">${phone}</a>.</p>
    `,
  },
  "estimated-shipping-time": {
    title: "Estimated Shipping Time",
    html: `
      <p>Below are the estimated shipping time references for different countries and regions based on our recent shipping data. Delivery times may vary depending on the destination country, local customs processing, holidays, weather conditions, and carrier operations.</p>
      <p>Last updated: May 16, 2026.</p>
      <h3>North America</h3>
      <p>01 United States - Most likely arrival: 6-10 days<br>02 Canada - Most likely arrival: 6-10 days</p>
      <h3>Europe</h3>
      <p>01 United Kingdom - Most likely arrival: 3-5 days<br>02 Germany - Most likely arrival: 6-10 days<br>03 France - Most likely arrival: 6-10 days</p>
      <h3>Asia Pacific</h3>
      <p>01 Japan - Most likely arrival: 6-10 days<br>02 Singapore - Most likely arrival: 6-10 days<br>03 Australia - Most likely arrival: 6-12 days</p>
    `,
  },
  "return-refund-policy": {
    title: "Return & Refund Policy",
    html: `
      <p>We want you to love your purchase from ${legal}. If you are not completely satisfied, we are here to help. We offer a <strong>30-day return or exchange</strong> policy starting from the day you receive your items.</p>
      <h3>When You Can Return or Exchange</h3>
      <p>Quality issues, damaged/missing parts, or wrong items received: Free return label provided.</p>
      <p>Other reasons (for example, change of mind, wrong order): Return shipping cost is the customer's responsibility.</p>
      <p>Special offer items: Cannot be returned or exchanged for non-quality reasons.</p>
      <h3>How to Start</h3>
      <p>Contact us at <a href="${BRAND.emailHref}">${email}</a> with your order number and photos/videos if needed. Our team will review your request within <strong>24 hours</strong>.</p>
      <p>If approved: Return label sent within 2 business days. Ship back your item with original packaging within 7 days.</p>
      <h3>Refunds</h3>
      <p>Quality issues, damaged items, or wrong items: Full refund provided. Refunds processed within 3-5 business days after approval.</p>
    `,
  },
  "payment-methods": {
    title: "Payment Methods",
    html: `
      <p>We offer a variety of secure and convenient payment methods to make your shopping experience smooth and worry-free.</p>
      <h3>We currently accept:</h3>
      <p>PayPal | Google Pay | Apple Pay | UnionPay | American Express | Mastercard | Visa</p>
      <h3>Pay With Credit/Debit Card</h3>
      <p>We accept major credit and debit cards, including Visa, Mastercard, American Express, and UnionPay. Your card information is never stored by us. All transactions are securely processed through our payment gateways.</p>
      <h3>Google Pay & Apple Pay</h3>
      <p>If you have Google Pay or Apple Pay set up on your device, you can pay quickly and securely with just a few taps.</p>
      <p>At ${legal}, we prioritize security and convenience. All payment methods use industry-standard encryption to keep your data safe.</p>
    `,
  },
  "privacy-policy": {
    title: "Privacy Policy",
    html: `
      <p>At ${legal}, your privacy is important to us. This policy explains how we collect, use, and protect your information when you visit our store or make a purchase.</p>
      <h3>1. What Information We Collect</h3>
      <p>When you purchase items from our store, we collect personal information necessary to process your order, such as name, billing and shipping addresses, email address, and phone number.</p>
      <p>When you subscribe, we collect your email to send updates, coupons, promotions, and new product announcements. You can unsubscribe at any time.</p>
      <h3>2. How We Use Your Information</h3>
      <p>We use the information we collect to process purchases, payments, returns, and refunds, provide after-sale service, and send marketing communications you have opted into.</p>
      <h3>3. Contact</h3>
      <p>Questions about privacy can be sent to <a href="${BRAND.emailHref}">${email}</a>, or by writing to ${legal} at ${BRAND.address.join(", ")}.</p>
    `,
  },
  "terms-of-service": {
    title: "Terms of Service",
    html: `
      <p>Welcome to ${legal}. By visiting our website or making a purchase, you agree to be bound by the following terms and conditions.</p>
      <h3>1. General Conditions</h3>
      <p>We reserve the right to refuse service to anyone for any reason at any time. You may not copy, reproduce, or sell any part of our services without our written permission.</p>
      <h3>2. Changes to Terms</h3>
      <p>We may update or modify these Terms at any time. The latest version will always be posted on our website.</p>
      <h3>3. User Responsibilities</h3>
      <p>You agree that you meet the legal age requirements of your jurisdiction, will not use our products or services for illegal purposes, and will not violate copyright or other local laws.</p>
      <h3>4. Services and Pricing</h3>
      <p>We reserve the right to modify or discontinue services, products, or pricing at any time without prior notice.</p>
      <h3>5. Contact</h3>
      <p>${legal}<br>${BRAND.address.join("<br>")}<br><a href="${BRAND.emailHref}">${email}</a><br>${phone}</p>
    `,
  },
  "price-protection": {
    title: "Price Protection Policy",
    html: `
      <p>At ${legal}, we believe your shopping experience should be as smooth and worry-free as the fine walnut wood we work with. That is why we back every purchase with our 30-Day Price Protection Guarantee.</p>
      <h3>What This Means for You</h3>
      <p>If you purchase a product from us and its price drops within 30 days, we will refund you the difference. Reach out to our support team at <a href="${BRAND.emailHref}">${email}</a> with your order details, and we will take care of the rest.</p>
      <h3>Why You Can Trust This</h3>
      <p>Our promise applies only to the exact same product you purchased on this website. Prices listed on other platforms or channels are not connected to ${legal} and do not qualify for our guarantee.</p>
      <h3>Our Commitment</h3>
      <p>When you choose ${legal}, you are choosing quality, transparency, and peace of mind.</p>
    `,
  },
};
