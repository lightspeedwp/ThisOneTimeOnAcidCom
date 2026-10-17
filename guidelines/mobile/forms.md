# Mobile Form Guidelines

Mobile-specific form patterns for optimal usability, accessibility, and conversion on touch devices.

## Purpose

Create mobile-friendly forms with:
- Touch-optimized input sizing
- Appropriate keyboard types
- Real-time validation feedback
- Accessibility compliance
- Progressive enhancement
- Error prevention
- Auto-save capabilities

---

## Core Principles

### 1. Minimum Input Size: 44x44px

Touch targets must be at least 44x44 pixels per Apple and WCAG guidelines.

```tsx
// ❌ WRONG - Too small for touch
<input 
  type="text"
  className="px-2 py-1 text-sm"
/>

// ✅ CORRECT - Touch-friendly size
<input 
  type="text"
  className="
    w-full 
    px-4 py-3           /* Adequate padding */
    min-h-[44px]        /* Minimum touch target */
    text-base           /* 16px prevents iOS zoom */
    rounded-lg
    border border-gray-300
  "
/>
```

---

## Input Sizing

### Mobile-Optimized Input Fields

```tsx
// Standard Text Input
<input 
  type="text"
  className="
    w-full 
    px-4 py-3 
    text-base 
    rounded-lg 
    border border-gray-300
    focus:outline-none 
    focus:ring-2 
    focus:ring-pink-200 
    focus:border-pink-500
    font-body
  "
  placeholder="Your name"
/>

// Email Input
<input 
  type="email"
  inputMode="email"
  autoComplete="email"
  className="
    w-full 
    px-4 py-3 
    text-base 
    rounded-lg 
    border border-gray-300
    focus:outline-none 
    focus:ring-2 
    focus:ring-pink-200 
    focus:border-pink-500
  "
  placeholder="your@email.com"
/>

// Phone Input
<input 
  type="tel"
  inputMode="tel"
  autoComplete="tel"
  className="
    w-full 
    px-4 py-3 
    text-base 
    rounded-lg 
    border border-gray-300
  "
  placeholder="(555) 123-4567"
/>

// Textarea
<textarea 
  rows={5}
  className="
    w-full 
    px-4 py-3 
    text-base 
    rounded-lg 
    border border-gray-300
    resize-vertical      /* Allow vertical resize only */
    min-h-[120px]       /* Minimum comfortable height */
  "
  placeholder="Tell me about your event..."
/>
```

---

## Keyboard Types (inputMode)

### Correct Keyboard for Context

```tsx
// Text (default keyboard)
<input type="text" inputMode="text" />

// Email (@ and . easily accessible)
<input type="email" inputMode="email" />

// Phone (numeric keypad)
<input type="tel" inputMode="tel" />

// Numbers only
<input type="text" inputMode="numeric" pattern="[0-9]*" />

// Decimal numbers
<input type="text" inputMode="decimal" />

// URL (/ and .com easily accessible)
<input type="url" inputMode="url" />

// Search (shows "search" button on keyboard)
<input type="search" inputMode="search" />
```

### Complete Contact Form Example

```tsx
function ContactForm() {
  return (
    <form className="space-y-4">
      {/* Name */}
      <div>
        <label 
          htmlFor="name"
          className="block text-sm font-body font-medium text-gray-700 mb-2"
        >
          Name *
        </label>
        <input 
          id="name"
          type="text"
          inputMode="text"
          autoComplete="name"
          required
          className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-200"
          placeholder="Ashley Shaw"
        />
      </div>
      
      {/* Email */}
      <div>
        <label 
          htmlFor="email"
          className="block text-sm font-body font-medium text-gray-700 mb-2"
        >
          Email *
        </label>
        <input 
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-200"
          placeholder="ashley@example.com"
        />
      </div>
      
      {/* Phone */}
      <div>
        <label 
          htmlFor="phone"
          className="block text-sm font-body font-medium text-gray-700 mb-2"
        >
          Phone
        </label>
        <input 
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-200"
          placeholder="(555) 123-4567"
        />
      </div>
      
      {/* Message */}
      <div>
        <label 
          htmlFor="message"
          className="block text-sm font-body font-medium text-gray-700 mb-2"
        >
          Message *
        </label>
        <textarea 
          id="message"
          rows={5}
          required
          className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 resize-vertical min-h-[120px] focus:ring-2 focus:ring-pink-200"
          placeholder="Tell me about your makeup needs..."
        />
      </div>
      
      {/* Submit */}
      <button 
        type="submit"
        className="w-full bg-gradient-pink-purple-blue text-white px-6 py-4 text-base font-body font-medium rounded-lg shadow-lg hover:shadow-xl transition-shadow min-h-[44px]"
      >
        Send Message
      </button>
    </form>
  );
}
```

---

## AutoComplete Attributes

### Improve Form Fill Speed

```tsx
// Personal Info
<input type="text" autoComplete="name" />
<input type="text" autoComplete="given-name" />
<input type="text" autoComplete="family-name" />
<input type="email" autoComplete="email" />
<input type="tel" autoComplete="tel" />

// Address
<input type="text" autoComplete="street-address" />
<input type="text" autoComplete="address-line1" />
<input type="text" autoComplete="address-line2" />
<input type="text" autoComplete="address-level2" />  // City
<input type="text" autoComplete="address-level1" />  // State
<input type="text" autoComplete="postal-code" />
<input type="text" autoComplete="country" />

// Payment (use with caution)
<input type="text" autoComplete="cc-name" />
<input type="text" autoComplete="cc-number" inputMode="numeric" />
<input type="text" autoComplete="cc-exp" />
<input type="text" autoComplete="cc-csc" />

// Collaboration Form Example
<input type="date" autoComplete="bday" />         // Birthday
// ... existing code ...
function CollaborationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const validate = (field: string, value: string) => {
    let error = '';
    
    switch (field) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        break;
      
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email';
        }
        break;
      
      case 'date':
        if (!value) {
          error = 'Date is required';
        } else if (new Date(value) < new Date()) {
          error = 'Date must be in the future';
        }
        break;
      
      case 'message':
        if (!value) error = 'Please enter a message';
        break;
    }
    
    return error;
  };
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      const error = validate(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };
  
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validate(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(field => {
      const error = validate(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({
        ...acc,
        [key]: true
      }), {}));
      
      // Focus first error
      const firstError = Object.keys(newErrors)[0];
      document.getElementById(firstError)?.focus();
      
      return;
    }
    
    // Submit form
    submitInquiry(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields with validation */}
    </form>
  );
}
```

---

## Select and Dropdown

### Mobile-Friendly Select

```tsx
// Native Select (recommended for mobile)
<div>
  <label 
    htmlFor="service"
    className="block text-sm font-body font-medium text-gray-700 mb-2"
  >
    Service Type *
  </label>
  
  <select 
    id="service"
    required
    className="
      w-full 
      px-4 py-3 
      text-base 
      rounded-lg 
      border border-gray-300
      bg-white
      focus:outline-none 
      focus:ring-2 
      focus:ring-pink-200
      appearance-none
      background-image-select-arrow
    "
  >
    <option value="">Select a service</option>
    <option value="festival">Festival Makeup</option>
    <option value="editorial">Editorial Shoot</option>
    <option value="wedding">Wedding Makeup</option>
    <option value="special-event">Special Event</option>
  </select>
</div>

// Custom select arrow
<div className="relative">
  <select className="...">
    <option>Select...</option>
  </select>
  
  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
    <ChevronDown className="w-5 h-5 text-gray-400" />
  </div>
</div>
```

---

## Radio Buttons and Checkboxes

### Touch-Optimized Radio Buttons

```tsx
function ServiceSelector() {
  const [selected, setSelected] = useState('');
  
  const services = [
    { id: 'festival', label: 'Festival Makeup', icon: Sparkles },
    { id: 'editorial', label: 'Editorial Shoot', icon: Camera },
    { id: 'wedding', label: 'Wedding Makeup', icon: Heart },
    { id: 'special', label: 'Special Event', icon: Calendar }
  ];
  
  return (
    <div className="space-y-3">
      <p className="text-sm font-body font-medium text-gray-700 mb-3">
        Select Service Type *
      </p>
      
      {services.map(service => {
        const Icon = service.icon;
        const isSelected = selected === service.id;
        
        return (
          <label
            key={service.id}
            className={`
              flex items-center gap-3
              p-4 rounded-lg border-2 cursor-pointer
              transition-all duration-200
              min-h-[44px]
              ${isSelected
                ? 'border-pink-500 bg-pink-50'
                : 'border-gray-300 hover:border-pink-300'
              }
            `}
          >
            <input 
              type="radio"
              name="service"
              value={service.id}
              checked={isSelected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-5 h-5 text-pink-600 focus:ring-pink-200"
            />
            
            <Icon className={`w-5 h-5 ${isSelected ? 'text-pink-600' : 'text-gray-500'}`} />
            
            <span className="text-base font-body font-medium">
              {service.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
```

### Touch-Optimized Checkboxes

```tsx
function InterestSelector() {
  const [interests, setInterests] = useState<string[]>([]);
  
  const options = [
    'Makeup Tutorial',
    'Product Reviews',
    'Behind the Scenes',
    'Tips & Tricks'
  ];
  
  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };
  
  return (
    <div className="space-y-3">
      <p className="text-sm font-body font-medium text-gray-700 mb-3">
        Interests
      </p>
      
      {options.map(option => {
        const isChecked = interests.includes(option);
        
        return (
          <label
            key={option}
            className={`
              flex items-center gap-3
              p-4 rounded-lg border-2 cursor-pointer
              transition-all duration-200
              min-h-[44px]
              ${isChecked
                ? 'border-pink-500 bg-pink-50'
                : 'border-gray-300 hover:border-pink-300'
              }
            `}
          >
            <input 
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleInterest(option)}
              className="w-5 h-5 text-pink-600 rounded focus:ring-pink-200"
            />
            
            <span className="text-base font-body">
              {option}
            </span>
          </label>
        );
      })}
    </div>
  );
}
```

---

## Date and Time Inputs

### Native Date/Time Pickers

```tsx
// Date Input
<div>
  <label 
    htmlFor="event-date"
    className="block text-sm font-body font-medium text-gray-700 mb-2"
  >
    Preferred Date *
  </label>
  
  <input 
    id="event-date"
    type="date"
    min={new Date().toISOString().split('T')[0]}
    required
    className="
      w-full 
      px-4 py-3 
      text-base 
      rounded-lg 
      border border-gray-300
      focus:ring-2 focus:ring-pink-200
    "
  />
</div>

// Time Input
<div>
  <label 
    htmlFor="event-time"
    className="block text-sm font-body font-medium text-gray-700 mb-2"
  >
    Preferred Time *
  </label>
  
  <input 
    id="event-time"
    type="time"
    min="09:00"
    max="18:00"
    required
    className="
      w-full 
      px-4 py-3 
      text-base 
      rounded-lg 
      border border-gray-300
      focus:ring-2 focus:ring-pink-200
    "
  />
</div>
```

---

## Error Handling

### Inline Error Messages

```tsx
<div>
  <label htmlFor="email" className="...">Email *</label>
  
  <input 
    id="email"
    type="email"
    aria-invalid={hasError}
    aria-describedby={hasError ? 'email-error' : undefined}
    className={`... ${hasError ? 'border-red-500' : 'border-gray-300'}`}
  />
  
  {hasError && (
    <div 
      id="email-error"
      role="alert"
      className="mt-2 flex items-start gap-2 text-sm text-red-600"
    >
      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <span>Please enter a valid email address</span>
    </div>
  )}
</div>
```

### Form-Level Error Summary

```tsx
{errors.length > 0 && (
  <div 
    role="alert"
    className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
  >
    <div className="flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
      
      <div>
        <h3 className="text-base font-body font-semibold text-red-800 mb-2">
          Please fix the following errors:
        </h3>
        
        <ul className="list-disc list-inside space-y-1">
          {errors.map((error, index) => (
            <li key={index} className="text-sm text-red-700">
              {error}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}
```

---

## Success Feedback

### Success Message

```tsx
{submitted && (
  <div 
    role="status"
    className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg"
  >
    <div className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
      
      <div>
        <h3 className="text-base font-body font-semibold text-green-800 mb-1">
          Success!
        </h3>
        <p className="text-sm text-green-700">
          Your inquiry has been submitted. I'll get back to you within 24 hours.
        </p>
      </div>
    </div>
  </div>
)}
```

---

## Common Mistakes

### ❌ Mistake 1: Small Text in Inputs

```tsx
// ❌ WRONG - iOS will zoom
<input className="text-sm px-2 py-1" />
```

**Solution:**
```tsx
// ✅ CORRECT - 16px minimum
<input className="text-base px-4 py-3" />
```

### ❌ Mistake 2: Wrong Keyboard Type

```tsx
// ❌ WRONG - Text keyboard for email
<input type="text" placeholder="Email" />
```

**Solution:**
```tsx
// ✅ CORRECT - Email keyboard
<input type="email" inputMode="email" />
```

### ❌ Mistake 3: No Touch-Friendly Spacing

```tsx
// ❌ WRONG - Inputs too close
<input className="mb-2" />
<input className="mb-2" />
```

**Solution:**
```tsx
// ✅ CORRECT - Adequate spacing
<div className="space-y-4">
  <input />
  <input />
</div>
```

---

## Related Documentation

- **[mobile/typography.md](./typography.md)** - Mobile typography
- **[components/ContactForm.md](../components/ContactForm.md)** - Contact form component

---

**Last Updated:** January 2025  
**Version:** 3.2.0