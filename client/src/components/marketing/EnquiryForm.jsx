import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import Button from '../common/Button';
import './marketing.css';

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    contactName: '',
    businessName: '',
    businessType: 'Restaurant',
    city: 'Addis Ababa',
    phone: '',
    tableCount: '15',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.contactName.trim() || !formData.businessName.trim() || !formData.phone.trim()) {
      setError('Please fill in your name, business name, and contact phone number.');
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="enquiry-success-card" role="status">
        <div className="enquiry-success-icon">
          <CheckCircle2 size={36} color="var(--color-success)" />
        </div>
        <h3 className="enquiry-success-title">Onboarding Enquiry Received!</h3>
        <p className="enquiry-success-desc">
          Thank you, <strong>{formData.contactName}</strong> from <strong>{formData.businessName}</strong> ({formData.city}).
        </p>
        <div className="enquiry-demo-disclaimer">
          <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            <strong>Local Demonstration Note:</strong> This form validated locally. In the production SaaS release, this notifies the GebetaQR operations team via Telegram/SMS to schedule table placard delivery.
          </span>
        </div>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              contactName: '',
              businessName: '',
              businessType: 'Restaurant',
              city: 'Addis Ababa',
              phone: '',
              tableCount: '15',
            });
          }}
        >
          Submit Another Demonstration Request
        </button>
      </div>
    );
  }

  return (
    <form className="enquiry-form-card" onSubmit={handleSubmit} noValidate>
      <div className="enquiry-form-head">
        <h3 className="enquiry-card-title">Bring GebetaQR to Your Tables</h3>
        <p className="enquiry-card-desc">
          Schedule a personalized demonstration or set up your digital menu placard trial in Addis Ababa.
        </p>
      </div>

      {error && (
        <div className="modal-validation-error" style={{ marginBottom: '16px' }} role="alert">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="form-grid-two">
        <div className="form-group">
          <label htmlFor="contactName" className="form-label">
            Your Name *
          </label>
          <input
            id="contactName"
            type="text"
            name="contactName"
            className="form-input"
            placeholder="e.g. Dawit Tadesse"
            value={formData.contactName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="businessName" className="form-label">
            Business / Restaurant Name *
          </label>
          <input
            id="businessName"
            type="text"
            name="businessName"
            className="form-input"
            placeholder="e.g. Addis Heritage Kitchen"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-grid-three">
        <div className="form-group">
          <label htmlFor="businessType" className="form-label">
            Venue Type
          </label>
          <select
            id="businessType"
            name="businessType"
            className="form-select"
            value={formData.businessType}
            onChange={handleChange}
          >
            <option value="Restaurant">Restaurant</option>
            <option value="Café / Pastry">Café / Pastry</option>
            <option value="Hotel Dining">Hotel Dining</option>
            <option value="Lounge / Bar">Lounge / Bar</option>
            <option value="Cultural Kitchen">Cultural Kitchen</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <select
            id="city"
            name="city"
            className="form-select"
            value={formData.city}
            onChange={handleChange}
          >
            <option value="Addis Ababa">Addis Ababa</option>
            <option value="Hawassa">Hawassa</option>
            <option value="Adama">Adama</option>
            <option value="Bishoftu">Bishoftu</option>
            <option value="Bahir Dar">Bahir Dar</option>
            <option value="Other">Other Region</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            className="form-input"
            placeholder="0911 234 567"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '20px' }}>
        <label htmlFor="tableCount" className="form-label">
          Approximate Number of Tables
        </label>
        <select
          id="tableCount"
          name="tableCount"
          className="form-select"
          value={formData.tableCount}
          onChange={handleChange}
        >
          <option value="1-10">1 – 10 Tables</option>
          <option value="11-25">11 – 25 Tables</option>
          <option value="26-50">26 – 50 Tables</option>
          <option value="50+">50+ Tables (Multi-floor / Hotel)</option>
        </select>
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        fullWidth
        icon={Send}
        iconPosition="right"
      >
        <span>Request Demonstration Trial</span>
      </Button>

      <p className="form-footer-privacy">
        No credit card required. We will present a tailored demo with your sample menu items.
      </p>
    </form>
  );
}
