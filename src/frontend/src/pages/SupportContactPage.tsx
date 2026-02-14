import { Mail, MapPin, MessageCircle, HelpCircle, Package, CreditCard, RefreshCw, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function SupportContactPage() {
  return (
    <div className="container-custom py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-bold">Support & Contact</h1>
          <p className="text-lg text-muted-foreground">
            We're here to help! Get in touch or find answers to common questions.
          </p>
        </div>

        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>Contact our support team</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg bg-muted/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Email Support</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    For general inquiries, technical support, or account issues:
                  </p>
                  <a 
                    href="mailto:support@strager-marketplace.example.com" 
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    support@strager-marketplace.example.com
                  </a>
                  <p className="mt-2 text-xs text-muted-foreground">
                    We typically respond within 24-48 hours during business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg bg-muted/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Business Address</h4>
                  <p className="text-sm text-muted-foreground">
                    [Your Company Name]<br />
                    [Street Address]<br />
                    [City, State ZIP]<br />
                    [Country]
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground italic">
                    Note: Please replace with your actual business address before publishing to the Play Store.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-900 dark:text-blue-100">
                  <Shield className="h-4 w-4" />
                  Report Safety or Security Issues
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  If you encounter fraudulent activity, prohibited content, or security vulnerabilities, please email us immediately at:
                </p>
                <a 
                  href="mailto:security@strager-marketplace.example.com" 
                  className="mt-1 block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  security@strager-marketplace.example.com
                </a>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Quick answers to common questions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {/* Account Questions */}
                <AccordionItem value="account-1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span>How do I create an account?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Click the "Login" button in the header and authenticate using Internet Identity. After your first login, you'll be prompted to set up your profile with your name and email. You can also choose to become a seller at this time.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="account-2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>What is Internet Identity?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Internet Identity is a secure, privacy-preserving authentication system. It uses cryptographic keys instead of passwords, making your account more secure. You can use biometrics (fingerprint, Face ID) or security keys to log in.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="account-3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-primary" />
                      <span>How do I update my profile information?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Currently, profile information is set during initial setup. To update your details, please contact our support team at support@strager-marketplace.example.com with your requested changes.
                  </AccordionContent>
                </AccordionItem>

                {/* Buying Questions */}
                <AccordionItem value="buying-1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span>How do I place an order?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Browse products, click "Add to Cart" on items you want to purchase, then go to your cart and click "Proceed to Checkout." Enter your shipping information and confirm your order. You'll receive an order confirmation with details.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="buying-2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <span>What payment methods do you accept?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Payment processing is handled securely through our payment partners. We accept major credit cards, debit cards, and other payment methods depending on your region. Payment details are never stored on our servers.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="buying-3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span>How can I track my order?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Go to "Orders" in the navigation menu to view all your orders and their current status. Sellers are responsible for providing tracking information. If you haven't received tracking details, contact the seller directly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="buying-4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-primary" />
                      <span>What is your return and refund policy?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Return and refund policies are set by individual sellers. Check the product page for the seller's specific policy before purchasing. For issues with an order, contact the seller first. If you cannot resolve the issue, contact our support team for assistance.
                  </AccordionContent>
                </AccordionItem>

                {/* Selling Questions */}
                <AccordionItem value="selling-1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span>How do I start selling on Strager?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    When setting up your profile, select "I want to sell products." You can then access the Seller Dashboard from the navigation menu to create product listings. Make sure to provide accurate descriptions, clear images, and competitive pricing.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="selling-2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <span>Are there any fees for selling?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Strager may charge transaction fees or listing fees. These fees will be clearly disclosed in your Seller Dashboard before you list products. There are no hidden charges.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="selling-3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span>How do I manage my product listings?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Go to the Seller Dashboard to view all your products. You can edit product details, update stock quantities, adjust prices, or deactivate listings at any time. Deactivated products won't appear in search results but can be reactivated later.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="selling-4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>What items are prohibited from being sold?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Prohibited items include illegal goods, weapons, drugs, counterfeit products, adult content, and items that infringe on intellectual property rights. Review our Terms of Service for a complete list. Violations may result in account suspension.
                  </AccordionContent>
                </AccordionItem>

                {/* Technical Questions */}
                <AccordionItem value="tech-1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span>Can I use Strager on my mobile device?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Yes! Strager is a Progressive Web App (PWA) that works on all devices. You can install it on your phone for an app-like experience. Visit the "Install App" page for instructions on how to add Strager to your home screen.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tech-2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-primary" />
                      <span>The app isn't loading properly. What should I do?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Try these troubleshooting steps: 1) Clear your browser cache and cookies, 2) Make sure you have a stable internet connection, 3) Try using a different browser, 4) Update your browser to the latest version. If the problem persists, contact support with details about your device and browser.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tech-3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Is my personal information secure?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Yes. We use industry-standard encryption (HTTPS/TLS) to protect your data in transit. Internet Identity provides secure, password-less authentication. We never store payment information on our servers. Read our Privacy Policy for complete details on how we protect your information.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Additional Help */}
          <Card>
            <CardHeader>
              <CardTitle>Still Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                If you couldn't find the answer to your question in our FAQ, please don't hesitate to reach out to our support team. We're committed to providing excellent customer service and will respond to your inquiry as quickly as possible.
              </p>
              <p>
                When contacting support, please include:
              </p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>A detailed description of your issue or question</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Your account email (if applicable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Order number (for order-related inquiries)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Screenshots or error messages (if relevant)</span>
                </li>
              </ul>
              <p className="mt-4">
                Email us at: <a href="mailto:support@strager-marketplace.example.com" className="font-medium text-primary hover:underline">support@strager-marketplace.example.com</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
