import { FileText, ShoppingCart, AlertTriangle, DollarSign, Scale, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function TermsOfServicePage() {
  return (
    <div className="container-custom py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-bold">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Agreement to Terms</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Welcome to Strager Marketplace. These Terms of Service ("Terms") govern your access to and use of our marketplace platform, website, and mobile application (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.
              </p>
              <p>
                If you do not agree to these Terms, you may not access or use the Service. We reserve the right to modify these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.
              </p>
            </CardContent>
          </Card>

          {/* Account Terms */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Account Registration and Use</CardTitle>
                  <CardDescription>Your responsibilities as a user</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="mb-2 font-semibold">Account Creation</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>You must be at least 13 years old to create an account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>You must provide accurate, current, and complete information during registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>You are responsible for maintaining the security of your Internet Identity credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>You are responsible for all activities that occur under your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>You must notify us immediately of any unauthorized use of your account</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 font-semibold">Acceptable Use</h4>
                <p className="mb-2 text-muted-foreground">You agree not to:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Use the Service for any illegal purpose or in violation of any laws</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Impersonate any person or entity or misrepresent your affiliation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Interfere with or disrupt the Service or servers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Attempt to gain unauthorized access to any part of the Service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Use automated systems (bots, scrapers) without our permission</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Marketplace Terms */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Marketplace Transactions</CardTitle>
                  <CardDescription>Buying and selling on Strager</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="mb-2 font-semibold">For Buyers</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>All purchases are binding contracts between you and the seller</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>You agree to pay the listed price plus any applicable taxes and shipping fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Product descriptions, images, and availability are provided by sellers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>You must provide accurate shipping information for order fulfillment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Disputes should be resolved directly with the seller first</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 font-semibold">For Sellers</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>You must accurately describe your products and provide truthful information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>You are responsible for fulfilling orders in a timely manner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>You must have the legal right to sell the products you list</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>You are responsible for customer service and handling returns/refunds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>You agree to comply with all applicable laws and regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Strager is not a party to transactions between buyers and sellers</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 font-semibold">Platform Role</h4>
                <p className="text-muted-foreground">
                  Strager acts as a marketplace platform connecting buyers and sellers. We do not take possession of products, process payments directly, or guarantee the quality, safety, or legality of items listed. Transactions are between users, and we are not responsible for disputes, though we may assist in resolution at our discretion.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <CardTitle>Prohibited Content and Activities</CardTitle>
                  <CardDescription>What you cannot sell or do on Strager</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>The following items and activities are strictly prohibited on our platform:</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✕</span>
                  <span>Illegal items, drugs, weapons, or stolen goods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✕</span>
                  <span>Counterfeit, replica, or unauthorized branded products</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✕</span>
                  <span>Adult content, pornography, or sexually explicit material</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✕</span>
                  <span>Hate speech, harassment, or discriminatory content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✕</span>
                  <span>Misleading, fraudulent, or deceptive listings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✕</span>
                  <span>Items that infringe on intellectual property rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✕</span>
                  <span>Hazardous materials or recalled products</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✕</span>
                  <span>Services or items requiring professional licenses without proper credentials</span>
                </li>
              </ul>
              <p className="mt-3">
                We reserve the right to remove any content or suspend accounts that violate these prohibitions without prior notice.
              </p>
            </CardContent>
          </Card>

          {/* Payment and Refunds */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Payment, Refunds, and Returns</CardTitle>
                  <CardDescription>Financial terms and policies</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="mb-2 font-semibold">Payment Processing</h4>
                <p className="text-muted-foreground">
                  Payment processing is handled through secure third-party payment providers. By making a purchase, you agree to their terms of service. All prices are listed in the currency specified on the product page and are subject to applicable taxes.
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 font-semibold">Refunds and Returns</h4>
                <p className="mb-2 text-muted-foreground">
                  Refund and return policies are set by individual sellers. Before purchasing:
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Review the seller's return policy on the product page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Contact the seller directly for return or refund requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Strager may assist in dispute resolution but is not obligated to provide refunds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Certain items may not be eligible for return due to hygiene or safety reasons</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 font-semibold">Fees</h4>
                <p className="text-muted-foreground">
                  Strager may charge sellers transaction fees or listing fees. These fees will be clearly disclosed before you list a product. Buyers are not charged platform fees, but may be responsible for shipping costs and applicable taxes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                The Service and its original content, features, and functionality are owned by Strager and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p>
                When you upload content (product images, descriptions, etc.), you grant Strager a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content in connection with the Service. You represent that you have all necessary rights to grant this license.
              </p>
              <p>
                If you believe your intellectual property rights have been violated, please contact us with details of the alleged infringement.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Disclaimers and Limitation of Liability</CardTitle>
                  <CardDescription>Important legal protections</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="mb-2 font-semibold">Service "As Is"</h4>
                <p className="text-muted-foreground">
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 font-semibold">Limitation of Liability</h4>
                <p className="text-muted-foreground">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, STRAGER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
                </p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Your use or inability to use the Service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Any conduct or content of third parties on the Service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Unauthorized access to or alteration of your data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Transactions between users</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 font-semibold">Indemnification</h4>
                <p className="text-muted-foreground">
                  You agree to indemnify, defend, and hold harmless Strager and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of or related to your use of the Service, your violation of these Terms, or your violation of any rights of another party.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
              <p>
                All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>Governing Law and Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising out of or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of [Arbitration Organization], except that either party may seek injunctive relief in court for intellectual property infringement.
              </p>
              <p className="text-xs italic">
                Note: Please consult with legal counsel to specify the appropriate jurisdiction and dispute resolution mechanism for your business before publishing to the Play Store.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              <p>
                By continuing to access or use our Service after revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you must stop using the Service.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Questions about these terms</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="font-medium text-foreground">Email:</p>
                <p className="text-sm">legal@strager-marketplace.example.com</p>
                <p className="mt-3 font-medium text-foreground">Mailing Address:</p>
                <p className="text-sm">
                  [Your Company Name]<br />
                  [Street Address]<br />
                  [City, State ZIP]<br />
                  [Country]
                </p>
              </div>
              <p className="text-xs italic">
                Note: Please replace the placeholder contact information above with your actual business contact details before publishing to the Play Store.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
