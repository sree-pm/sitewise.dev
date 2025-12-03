'use client';

import { useState } from 'react';

export function AdvancedForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    interest: 'founder', // founder, investor, partner
    message: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateName = (name: string) => {
    return name.length >= 2;
  };

  const validateMessage = (message: string) => {
    return message.length >= 10;
  };

  const isFieldValid = (field: string) => {
    if (!touched[field]) return null;
    
    switch (field) {
      case 'email':
        return validateEmail(formData.email);
      case 'name':
        return validateName(formData.name);
      case 'message':
        return validateMessage(formData.message);
      default:
        return null;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as submitted
    setSubmitted({
      email: true,
      name: true,
      message: true,
    });

    // Validate all fields
    const isEmailValid = validateEmail(formData.email);
    const isNameValid = validateName(formData.name);
    const isMessageValid = validateMessage(formData.message);

    if (isEmailValid && isNameValid && isMessageValid) {
      console.log('Form submitted:', formData);
      // Reset form on successful submission
      setTimeout(() => {
        setFormData({ email: '', name: '', message: '' });
        setTouched({});
        setSubmitted({});
      }, 1000);
    }
  };

  const getFieldState = (field: string) => {
    if (!touched[field]) return 'default';
    const isValid = isFieldValid(field);
    return isValid ? 'success' : 'error';
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
      {/* Name Field */}
      <div className="relative">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=" "
          className={`input-focus w-full px-4 py-3 bg-transparent rounded-lg border-2 transition-all duration-300 font-medium ${
            getFieldState('name') === 'error'
              ? 'input-error border-red-500'
              : getFieldState('name') === 'success'
              ? 'input-success border-green-500'
              : 'border-gray-700'
          }`}
        />
        <label className="floating-label">Full Name</label>
        {getFieldState('name') === 'success' && (
          <span className="absolute right-3 top-3 text-green-500 text-lg">✓</span>
        )}
        {getFieldState('name') === 'error' && (
          <span className="absolute right-3 top-3 text-red-500 text-lg">✕</span>
        )}
      </div>

      {/* Email Field */}
      <div className="relative">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=" "
          className={`input-focus w-full px-4 py-3 bg-transparent rounded-lg border-2 transition-all duration-300 font-medium ${
            getFieldState('email') === 'error'
              ? 'input-error border-red-500'
              : getFieldState('email') === 'success'
              ? 'input-success border-green-500'
              : 'border-gray-700'
          }`}
        />
        <label className="floating-label">Email Address</label>
        {getFieldState('email') === 'success' && (
          <span className="absolute right-3 top-3 text-green-500 text-lg">✓</span>
        )}
        {getFieldState('email') === 'error' && (
          <span className="absolute right-3 top-3 text-red-500 text-lg">✕</span>
        )}
      </div>

      {/* Interest Field */}
      <div className="relative">
        <select
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          className="input-focus w-full px-4 py-3 bg-black/50 rounded-lg border-2 border-gray-700 transition-all duration-300 font-medium text-white focus:border-purple-500 focus:bg-black/70"
        >
          <option value="founder">I'm a Founder</option>
          <option value="investor">I'm an Investor</option>
          <option value="partner">I'm a Strategic Partner</option>
        </select>
      </div>

      {/* Message Field */}
      <div className="relative">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=" "
          rows={4}
          className={`input-focus w-full px-4 py-3 bg-transparent rounded-lg border-2 transition-all duration-300 font-medium resize-none ${
            getFieldState('message') === 'error'
              ? 'input-error border-red-500'
              : getFieldState('message') === 'success'
              ? 'input-success border-green-500'
              : 'border-gray-700'
          }`}
        />
        <label className="floating-label">Tell us about your vision</label>
        {getFieldState('message') === 'success' && (
          <span className="absolute right-3 top-3 text-green-500 text-lg">✓</span>
        )}
        {getFieldState('message') === 'error' && (
          <span className="absolute right-3 top-3 text-red-500 text-lg">✕</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="ripple w-full py-3 px-6 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95 transform"
      >
        {submitted.email ? 'Sending...' : 'Get in Touch'}
      </button>

      {/* Validation Messages */}
      {touched.name && getFieldState('name') === 'error' && (
        <p className="text-red-500 text-sm font-medium">Name must be at least 2 characters</p>
      )}
      {touched.email && getFieldState('email') === 'error' && (
        <p className="text-red-500 text-sm font-medium">Please enter a valid email</p>
      )}
      {touched.message && getFieldState('message') === 'error' && (
        <p className="text-red-500 text-sm font-medium">Message must be at least 10 characters</p>
      )}
    </form>
  );
}
