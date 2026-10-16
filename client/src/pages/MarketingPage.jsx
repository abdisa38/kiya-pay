import { Link } from 'react-router-dom';
import {
  QrCode,
  Smartphone,
  Zap,
  TrendingDown,
  Layers,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';
import EnquiryForm from '../components/marketing/EnquiryForm';
import Badge from '../components/common/Badge';
import '../components/marketing/marketing.css';

export default function MarketingPage() {
  return (
    <div className="marketing-page-wrapper">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-pill-badge">
              <QrCode size={14} />
              <span>Modern Hospitality SaaS for Ethiopia</span>
            </div>

            <h1 className="hero-title">
              The Digital QR Menu &amp; Ordering Platform Built for{' '}
              <span className="hero-title-accent">Ethiopian Hospitality</span>
            </h1>

            <p className="hero-description">
              Replace costly, torn paper menus with high-speed digital menus that open instantly on
              any mobile phone camera. Allow guests to explore rich food photos, customize dishes,
              and order directly to your staff—with zero app downloads and zero diner sign-ups.
            </p>

            <div className="hero-cta-group">
              <Link
                to="/r/buna-bite?t=DEMO-TABLE-04"
                className="btn btn-primary btn-lg"
              >
                <span>Launch Interactive Menu Demo</span>
                <ArrowRight size={18} />
              </Link>

              <a href="#how-it-works" className="btn btn-secondary btn-lg">
                <span>How It Works</span>
              </a>
            </div>

            {/* Value Highlights */}
            <div className="hero-trust-row">
              <div className="trust-item">
                <CheckCircle size={16} className="trust-icon" />
                <span>Zero app install needed</span>
              </div>
              <div className="trust-item">
                <CheckCircle size={16} className="trust-icon" />
                <span>Instant price &amp; stock updates</span>
              </div>
              <div className="trust-item">
                <CheckCircle size={16} className="trust-icon" />
                <span>Cash &amp; Telebirr friendly</span>
              </div>
            </div>
          </div>

          {/* Interactive Phone Frame Mockup */}
          <div className="mockup-container">
            <div className="phone-device-frame">
              <div className="phone-screen">
                <div className="phone-speaker-notch" />
                <div className="phone-screen-content">
                  {/* Mockup Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          backgroundColor: 'var(--color-primary)',
                          color: '#FFFFFF',
                          fontSize: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '800',
                        }}
                      >
                        B&amp;B
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '800' }}>Buna &amp; Bite</span>
                    </div>
                    <span
                      style={{
                        fontSize: '9px',
                        backgroundColor: '#E8F0EC',
                        color: 'var(--color-primary)',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        fontWeight: '700',
                      }}
                    >
                      Table 04
                    </span>
                  </div>

                  {/* Mockup Food Card 1 */}
                  <div className="phone-preview-card">
                    <img
                      src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
                      alt="Special Shekla Tibs"
                      className="phone-preview-img"
                    />
                    <div className="phone-preview-body">
                      <div className="phone-preview-title">Special Shekla Tibs</div>
                      <div className="phone-preview-sub">Sizzling beef over clay charcoal burner</div>
                      <div className="phone-preview-price-row">
                        <span style={{ fontWeight: '800', fontSize: '12px', color: 'var(--color-primary)' }}>
                          460 ETB
                        </span>
                        <span
                          style={{
                            fontSize: '9px',
                            backgroundColor: '#FAF4E8',
                            color: '#8C6116',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontWeight: '600',
                          }}
                        >
                          Mild / Awaze
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mockup Food Card 2 */}
                  <div className="phone-preview-card">
                    <div className="phone-preview-body" style={{ padding: '8px 10px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <div className="phone-preview-title">Jebena Buna &amp; Popcorn</div>
                          <div className="phone-preview-sub">Sidama ceremonial clay brew</div>
                        </div>
                        <span style={{ fontWeight: '800', fontSize: '12px', color: 'var(--color-primary)' }}>
                          65 ETB
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <Link
                    to="/r/buna-bite?t=DEMO-TABLE-04"
                    className="phone-preview-cta"
                  >
                    <span>Tap to Test Live Mobile Menu</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Feature Pillars */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">Engineered for Hospitality</span>
            <h2 className="section-title">Designed for Real Restaurant Workflows</h2>
            <p className="section-subtitle">
              Built specifically to eliminate friction for both guests on mobile phones and staff in
              busy dining rooms.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-bubble">
                <Smartphone size={24} />
              </div>
              <h3 className="feature-card-title">Instant Browser Access</h3>
              <p className="feature-card-desc">
                Guests simply scan the table QR code. Menus load under 1.5 seconds without forcing
                patrons to install an app or register an account.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-bubble">
                <TrendingDown size={24} />
              </div>
              <h3 className="feature-card-title">Zero Paper Re-Printing Costs</h3>
              <p className="feature-card-desc">
                Stop throwing away expensive laminated menus every time ingredient prices change.
                Update menu prices in seconds from any browser.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-bubble">
                <Zap size={24} />
              </div>
              <h3 className="feature-card-title">Instant 86 &amp; Availability</h3>
              <p className="feature-card-desc">
                Ran out of avocados at 3:00 PM? Switch an item to &ldquo;Unavailable&rdquo; with one tap so
                customers never order dishes the kitchen cannot serve.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-bubble">
                <Layers size={24} />
              </div>
              <h3 className="feature-card-title">Table-Aware Ordering</h3>
              <p className="feature-card-desc">
                Orders are automatically tagged with the guest&apos;s exact table number, eliminating
                mix-ups and shaving 10–15 minutes off typical wait times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step "How It Works" Section */}
      <section id="how-it-works" className="steps-section">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">Simple 3-Step Flow</span>
            <h2 className="section-title">How GebetaQR Powers Your Floor</h2>
            <p className="section-subtitle">
              From table placement to kitchen delivery, here is how the guest journey works.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number-watermark">01</span>
              <h3 className="step-card-title">Place Table QR Placards</h3>
              <p className="step-card-desc">
                Each dining table or VIP lounge booth receives a durable, branded acrylic QR card
                with its unique table identifier.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number-watermark">02</span>
              <h3 className="step-card-title">Diners Scan &amp; Customize</h3>
              <p className="step-card-desc">
                Customers scan using their phone camera, explore full-color food photos, choose spice
                levels or fasting options, and submit their table ticket.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number-watermark">03</span>
              <h3 className="step-card-title">Staff Deliver &amp; Settle</h3>
              <p className="step-card-desc">
                Floor staff receive the ticket with exact table coordinates. When food is served,
                settlement is completed via Cash, Telebirr, or CBE Birr.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Plan Overview */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">Transparent SaaS Plans</span>
            <h2 className="section-title">Simple Subscription Packages</h2>
            <p className="section-subtitle">
              Straightforward pricing in Ethiopian Birr (ETB) designed for independent cafés,
              bustling restaurants, and luxury hotel dining rooms.
            </p>
          </div>

          <div className="pricing-grid">
            {/* Starter Plan */}
            <div className="pricing-card">
              <h3 className="pricing-plan-name">Digital Menu Starter</h3>
              <p className="pricing-plan-desc">
                Ideal for cafés, lounges, and restaurants wanting beautiful digital menus with
                view-only or waiter-assisted ordering.
              </p>
              <div className="pricing-amount-row">
                <span className="pricing-amount">1,400 ETB</span>
                <span className="pricing-freq">/ month billed annually</span>
              </div>
              <ul className="pricing-features-list">
                <li className="pricing-feature-item">
                  <CheckCircle size={16} color="var(--color-success)" />
                  <span>Up to 25 Table QR Placards</span>
                </li>
                <li className="pricing-feature-item">
                  <CheckCircle size={16} color="var(--color-success)" />
                  <span>Unlimited Menu Categories &amp; Items</span>
                </li>
                <li className="pricing-feature-item">
                  <CheckCircle size={16} color="var(--color-success)" />
                  <span>Real-Time Price &amp; Stock Updates</span>
                </li>
                <li className="pricing-feature-item">
                  <CheckCircle size={16} color="var(--color-success)" />
                  <span>View-Only &amp; Call Waiter Support</span>
                </li>
              </ul>
              <a href="#enquiry" className="btn btn-secondary btn-md btn-full">
                Get Started with Starter
              </a>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card featured">
              <div className="pricing-card-badge">
                <Badge variant="gold" size="md">Most Popular</Badge>
              </div>
              <h3 className="pricing-plan-name">Complete Dine-In Pro</h3>
              <p className="pricing-plan-desc">
                For busy dining venues wanting direct table-to-kitchen ordering, custom modifiers,
                and live staff dispatch.
              </p>
              <div className="pricing-amount-row">
                <span className="pricing-amount">2,800 ETB</span>
                <span className="pricing-freq">/ month billed annually</span>
              </div>
              <ul className="pricing-features-list">
                <li className="pricing-feature-item">
                  <CheckCircle size={16} color="var(--color-success)" />
                  <span>Unlimited Tables &amp; VIP Rooms</span>
                </li>
                <li className="pricing-feature-item">
                  <CheckCircle size={16} color="var(--color-success)" />
                  <span>Full Dine-In Table Ordering</span>
                </li>
                <li className="pricing-feature-item">
                  <CheckCircle size={16} color="var(--color-success)" />
                  <span>Live Staff Dispatch &amp; Sound Alerts</span>
                </li>
                <li className="pricing-feature-item">
                  <CheckCircle size={16} color="var(--color-success)" />
                  <span>Required &amp; Multi-Select Modifiers</span>
                </li>
                <li className="pricing-feature-item">
                  <CheckCircle size={16} color="var(--color-success)" />
                  <span>Onboarding &amp; High-Res QR Placard Kit</span>
                </li>
              </ul>
              <a href="#enquiry" className="btn btn-primary btn-md btn-full">
                Request Pro Setup
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry" className="enquiry-section">
        <div className="container">
          <EnquiryForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
