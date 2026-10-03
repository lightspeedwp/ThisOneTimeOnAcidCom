# ⚛️ Dark Mode React Component Examples

Real-world React/TypeScript examples using the dark mode theme system.

**Version:** 2.0.0 | **Last Updated:** March 11, 2026

---

## 🎯 Table of Contents

1. [Basic Components](#basic-components)
2. [Form Components](#form-components)
3. [Layout Components](#layout-components)
4. [Interactive Components](#interactive-components)
5. [Feedback Components](#feedback-components)
6. [Hooks & Utilities](#hooks--utilities)

---

## 🧩 Basic Components

### Button Component

```typescript
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  var baseClass = 'button';
  var variantClass = 'button--' + variant;
  var sizeClass = size !== 'medium' ? 'button--' + size : '';
  var classes = [baseClass, variantClass, sizeClass, className]
    .filter(function(c) { return c !== ''; })
    .join(' ');

  return React.createElement(
    'button',
    {
      type: type,
      className: classes,
      onClick: onClick,
      disabled: disabled,
    },
    children
  );
}

// Usage
<Button variant="primary" size="large" onClick={() => console.log('Clicked')}>
  Click Me
</Button>
```

### Card Component

```typescript
import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  featured?: boolean;
  badge?: string;
  className?: string;
}

export function Card({
  title,
  description,
  children,
  featured = false,
  badge,
  className = '',
}: CardProps) {
  var baseClass = 'card';
  var featuredClass = featured ? 'card--featured' : '';
  var classes = [baseClass, featuredClass, className]
    .filter(function(c) { return c !== ''; })
    .join(' ');

  return React.createElement(
    'div',
    { className: classes },
    badge && React.createElement(
      'span',
      { className: 'card__badge' },
      badge
    ),
    title && React.createElement(
      'h3',
      { className: 'card__title' },
      title
    ),
    description && React.createElement(
      'p',
      { className: 'card__description' },
      description
    ),
    children
  );
}

// Usage
<Card 
  title="Featured Project" 
  description="This is a featured card with neon border"
  featured={true}
  badge="New"
>
  <p>Additional content goes here</p>
</Card>
```

### Badge Component

```typescript
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export function Badge({
  children,
  variant = 'primary',
  className = '',
}: BadgeProps) {
  var baseClass = 'badge';
  var variantClass = 'badge--' + variant;
  var classes = [baseClass, variantClass, className]
    .filter(function(c) { return c !== ''; })
    .join(' ');

  return React.createElement(
    'span',
    { className: classes },
    children
  );
}

// Usage
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Closed</Badge>
```

---

## 📝 Form Components

### Input Component

```typescript
import React from 'react';

interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  id: string;
}

export function Input({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  id,
}: InputProps) {
  var handleChange = function(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  };

  return React.createElement(
    'div',
    { className: 'form__group' },
    React.createElement(
      'label',
      { className: 'form__label', htmlFor: id },
      label,
      required && React.createElement(
        'span',
        { className: 'form__required' },
        ' *'
      )
    ),
    React.createElement('input', {
      type: type,
      id: id,
      className: 'form__input',
      placeholder: placeholder,
      value: value,
      onChange: handleChange,
      disabled: disabled,
      required: required,
      'aria-invalid': error != null,
      'aria-describedby': error != null ? id + '-error' : undefined,
    }),
    error && React.createElement(
      'span',
      { className: 'form__error', id: id + '-error' },
      error
    )
  );
}

// Usage with useState
function ContactForm() {
  var [email, setEmail] = React.useState('');
  var [error, setError] = React.useState('');

  var handleSubmit = function(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    // Submit form
  };

  return React.createElement(
    'form',
    { onSubmit: handleSubmit },
    React.createElement(Input, {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      value: email,
      onChange: setEmail,
      error: error,
      required: true,
      placeholder: 'you@example.com',
    }),
    React.createElement(
      Button,
      { type: 'submit', variant: 'primary' },
      'Submit'
    )
  );
}
```

### Textarea Component

```typescript
import React from 'react';

interface TextareaProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  id: string;
}

export function Textarea({
  label,
  placeholder = '',
  value,
  onChange,
  rows = 4,
  error,
  disabled = false,
  required = false,
  id,
}: TextareaProps) {
  var handleChange = function(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
  };

  return React.createElement(
    'div',
    { className: 'form__group' },
    React.createElement(
      'label',
      { className: 'form__label', htmlFor: id },
      label
    ),
    React.createElement('textarea', {
      id: id,
      className: 'form__textarea',
      placeholder: placeholder,
      value: value,
      onChange: handleChange,
      rows: rows,
      disabled: disabled,
      required: required,
    }),
    error && React.createElement(
      'span',
      { className: 'form__error' },
      error
    )
  );
}
```

### Checkbox Component

```typescript
import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id: string;
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  id,
}: CheckboxProps) {
  var handleChange = function(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked);
  };

  return React.createElement(
    'label',
    { className: 'form__checkbox' },
    React.createElement('input', {
      type: 'checkbox',
      id: id,
      checked: checked,
      onChange: handleChange,
      disabled: disabled,
    }),
    React.createElement('span', null, label)
  );
}

// Usage
function SettingsForm() {
  var [notifications, setNotifications] = React.useState(true);
  var [darkMode, setDarkMode] = React.useState(true);

  return React.createElement(
    'div',
    null,
    React.createElement(Checkbox, {
      id: 'notifications',
      label: 'Enable notifications',
      checked: notifications,
      onChange: setNotifications,
    }),
    React.createElement(Checkbox, {
      id: 'darkMode',
      label: 'Use dark mode',
      checked: darkMode,
      onChange: setDarkMode,
    })
  );
}
```

### Switch Component

```typescript
import React from 'react';

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id: string;
}

export function Switch({
  label,
  checked,
  onChange,
  disabled = false,
  id,
}: SwitchProps) {
  var handleChange = function(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked);
  };

  return React.createElement(
    'label',
    { className: 'switch' },
    React.createElement('input', {
      type: 'checkbox',
      id: id,
      checked: checked,
      onChange: handleChange,
      disabled: disabled,
    }),
    React.createElement('span', { className: 'switch__slider' }),
    React.createElement('span', { className: 'switch__label' }, label)
  );
}
```

---

## 🏗️ Layout Components

### Modal Component

```typescript
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  React.useEffect(
    function() {
      if (isOpen) {
        var handleEscape = function(e: KeyboardEvent) {
          if (e.key === 'Escape') {
            onClose();
          }
        };
        document.addEventListener('keydown', handleEscape);
        return function() {
          document.removeEventListener('keydown', handleEscape);
        };
      }
    },
    [isOpen, onClose]
  );

  if (!isOpen) {
    return null;
  }

  return React.createElement(
    'div',
    { className: 'modal' },
    React.createElement('div', {
      className: 'modal__backdrop',
      onClick: onClose,
    }),
    React.createElement(
      'div',
      { className: 'modal__content' },
      React.createElement('h2', null, title),
      children,
      React.createElement(
        'button',
        {
          className: 'modal__close',
          onClick: onClose,
          'aria-label': 'Close modal',
        },
        '×'
      )
    )
  );
}

// Usage
function App() {
  var [isModalOpen, setIsModalOpen] = React.useState(false);

  return React.createElement(
    'div',
    null,
    React.createElement(
      Button,
      { onClick: function() { setIsModalOpen(true); } },
      'Open Modal'
    ),
    React.createElement(
      Modal,
      {
        isOpen: isModalOpen,
        onClose: function() { setIsModalOpen(false); },
        title: 'Confirm Action',
      },
      React.createElement('p', null, 'Are you sure you want to proceed?'),
      React.createElement(
        'div',
        { className: 'button-group' },
        React.createElement(
          Button,
          {
            variant: 'secondary',
            onClick: function() { setIsModalOpen(false); },
          },
          'Cancel'
        ),
        React.createElement(
          Button,
          {
            variant: 'primary',
            onClick: function() {
              console.log('Confirmed');
              setIsModalOpen(false);
            },
          },
          'Confirm'
        )
      )
    )
  );
}
```

### Tabs Component

```typescript
import React from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  var [activeTab, setActiveTab] = React.useState(
    defaultTab != null ? defaultTab : tabs[0].id
  );

  var activeContent = tabs.find(function(tab) {
    return tab.id === activeTab;
  });

  return React.createElement(
    'div',
    { className: 'tabs' },
    React.createElement(
      'div',
      { className: 'tabs__list', role: 'tablist' },
      tabs.map(function(tab) {
        var isActive = tab.id === activeTab;
        return React.createElement(
          'button',
          {
            key: tab.id,
            className: isActive ? 'tabs__button tabs__button--active' : 'tabs__button',
            role: 'tab',
            'aria-selected': isActive,
            onClick: function() { setActiveTab(tab.id); },
          },
          tab.label
        );
      })
    ),
    React.createElement(
      'div',
      { className: 'tabs__panel', role: 'tabpanel' },
      activeContent != null ? activeContent.content : null
    )
  );
}

// Usage
function SettingsPage() {
  var tabs = [
    {
      id: 'profile',
      label: 'Profile',
      content: React.createElement('div', null, 'Profile settings here'),
    },
    {
      id: 'security',
      label: 'Security',
      content: React.createElement('div', null, 'Security settings here'),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      content: React.createElement('div', null, 'Notification settings here'),
    },
  ];

  return React.createElement(Tabs, { tabs: tabs, defaultTab: 'profile' });
}
```

### Breadcrumbs Component

```typescript
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return React.createElement(
    'nav',
    { className: 'breadcrumbs', 'aria-label': 'Breadcrumb' },
    items.map(function(item, index) {
      var isLast = index === items.length - 1;
      
      if (isLast) {
        return React.createElement(
          'span',
          {
            key: index,
            className: 'breadcrumbs__current',
            'aria-current': 'page',
          },
          item.label
        );
      }
      
      return React.createElement(
        React.Fragment,
        { key: index },
        item.href != null
          ? React.createElement(
              'a',
              { href: item.href, className: 'breadcrumbs__link' },
              item.label
            )
          : React.createElement('span', null, item.label),
        React.createElement(
          'span',
          { className: 'breadcrumbs__separator' },
          '/'
        )
      );
    })
  );
}

// Usage
<Breadcrumbs 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Article Title' },
  ]} 
/>
```

---

## 🎛️ Interactive Components

### Accordion Component

```typescript
import React from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  var [openItems, setOpenItems] = React.useState<string[]>([]);

  var toggleItem = function(id: string) {
    if (allowMultiple) {
      setOpenItems(function(prev) {
        var isOpen = prev.indexOf(id) !== -1;
        if (isOpen) {
          return prev.filter(function(item) { return item !== id; });
        }
        return prev.concat([id]);
      });
    } else {
      setOpenItems(function(prev) {
        var isOpen = prev.indexOf(id) !== -1;
        return isOpen ? [] : [id];
      });
    }
  };

  return React.createElement(
    'div',
    { className: 'accordion' },
    items.map(function(item) {
      var isOpen = openItems.indexOf(item.id) !== -1;
      
      return React.createElement(
        'div',
        { key: item.id, className: 'accordion__item' },
        React.createElement(
          'button',
          {
            className: isOpen ? 'accordion__header accordion__header--active' : 'accordion__header',
            onClick: function() { toggleItem(item.id); },
          },
          React.createElement('span', null, item.title),
          React.createElement(
            'svg',
            { className: 'accordion__icon' },
            '▼'
          )
        ),
        isOpen && React.createElement(
          'div',
          { className: 'accordion__content' },
          item.content
        )
      );
    })
  );
}

// Usage
function FAQSection() {
  var faqItems = [
    {
      id: 'faq-1',
      title: 'What is your return policy?',
      content: React.createElement('p', null, '30-day money-back guarantee.'),
    },
    {
      id: 'faq-2',
      title: 'How do I track my order?',
      content: React.createElement('p', null, 'Check your email for tracking info.'),
    },
  ];

  return React.createElement(Accordion, { items: faqItems });
}
```

### Dropdown Component

```typescript
import React from 'react';

interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

export function Dropdown({ trigger, items }: DropdownProps) {
  var [isOpen, setIsOpen] = React.useState(false);
  var dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(
    function() {
      var handleClickOutside = function(e: MouseEvent) {
        if (dropdownRef.current != null && !dropdownRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return function() {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    },
    [isOpen]
  );

  return React.createElement(
    'div',
    { className: 'dropdown', ref: dropdownRef },
    React.createElement(
      'button',
      {
        className: 'dropdown__trigger',
        onClick: function() { setIsOpen(!isOpen); },
      },
      trigger
    ),
    isOpen && React.createElement(
      'div',
      { className: 'dropdown__menu' },
      items.map(function(item) {
        return React.createElement(
          'button',
          {
            key: item.id,
            className: item.danger ? 'dropdown__item dropdown__item--danger' : 'dropdown__item',
            onClick: function() {
              item.onClick();
              setIsOpen(false);
            },
          },
          item.label
        );
      })
    )
  );
}

// Usage
function ActionMenu() {
  var menuItems = [
    { id: 'edit', label: 'Edit', onClick: function() { console.log('Edit'); } },
    { id: 'duplicate', label: 'Duplicate', onClick: function() { console.log('Duplicate'); } },
    { id: 'delete', label: 'Delete', danger: true, onClick: function() { console.log('Delete'); } },
  ];

  return React.createElement(
    Dropdown,
    {
      trigger: 'Options ▼',
      items: menuItems,
    }
  );
}
```

---

## 💬 Feedback Components

### Toast Component

```typescript
import React from 'react';

type ToastVariant = 'success' | 'warning' | 'error' | 'info';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  variant = 'info',
  onClose,
  duration = 5000,
}: ToastProps) {
  React.useEffect(
    function() {
      var timer = setTimeout(function() {
        onClose();
      }, duration);

      return function() {
        clearTimeout(timer);
      };
    },
    [duration, onClose]
  );

  var icon = variant === 'success' ? '✓' :
              variant === 'warning' ? '⚠' :
              variant === 'error' ? '✗' :
              'ℹ';

  return React.createElement(
    'div',
    { className: 'toast toast--' + variant },
    React.createElement('p', null, icon + ' ' + message),
    React.createElement(
      'button',
      {
        className: 'toast__close',
        onClick: onClose,
        'aria-label': 'Close',
      },
      '×'
    )
  );
}

// Toast Manager Hook
export function useToast() {
  var [toasts, setToasts] = React.useState<Array<{
    id: string;
    message: string;
    variant: ToastVariant;
  }>>([]);

  var showToast = function(message: string, variant: ToastVariant = 'info') {
    var id = Date.now().toString();
    setToasts(function(prev) {
      return prev.concat([{ id: id, message: message, variant: variant }]);
    });
  };

  var removeToast = function(id: string) {
    setToasts(function(prev) {
      return prev.filter(function(toast) { return toast.id !== id; });
    });
  };

  return {
    toasts: toasts,
    showToast: showToast,
    removeToast: removeToast,
  };
}

// Usage
function App() {
  var { toasts, showToast, removeToast } = useToast();

  return React.createElement(
    'div',
    null,
    React.createElement(
      Button,
      {
        onClick: function() {
          showToast('Settings saved successfully!', 'success');
        },
      },
      'Save Settings'
    ),
    React.createElement(
      'div',
      { style: { position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 } },
      toasts.map(function(toast) {
        return React.createElement(Toast, {
          key: toast.id,
          message: toast.message,
          variant: toast.variant,
          onClose: function() { removeToast(toast.id); },
        });
      })
    )
  );
}
```

### Alert Component

```typescript
import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  onClose?: () => void;
}

export function Alert({
  children,
  variant = 'info',
  onClose,
}: AlertProps) {
  return React.createElement(
    'div',
    { className: 'alert alert--' + variant },
    children,
    onClose && React.createElement(
      'button',
      {
        className: 'alert__close',
        onClick: onClose,
        'aria-label': 'Close alert',
      },
      '×'
    )
  );
}

// Usage
<Alert variant="success">
  <strong>Success!</strong> Your changes have been saved.
</Alert>

<Alert variant="error" onClose={() => console.log('Closed')}>
  <strong>Error:</strong> Something went wrong.
</Alert>
```

### Progress Bar Component

```typescript
import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  variant = 'default',
  showLabel = true,
}: ProgressBarProps) {
  var percentage = Math.min((value / max) * 100, 100);
  var displayLabel = label != null ? label : percentage.toFixed(0) + '%';

  return React.createElement(
    'div',
    { className: 'progress' },
    React.createElement('div', {
      className: variant === 'default' ? 'progress__bar' : 'progress__bar progress__bar--' + variant,
      style: { width: percentage + '%' },
      role: 'progressbar',
      'aria-valuenow': value,
      'aria-valuemin': 0,
      'aria-valuemax': max,
    }),
    showLabel && React.createElement(
      'span',
      { className: 'progress__label' },
      displayLabel
    )
  );
}

// Usage
<ProgressBar value={75} />
<ProgressBar value={100} variant="success" label="Complete!" />
<ProgressBar value={30} variant="warning" />
```

---

## 🪝 Hooks & Utilities

### useTheme Hook

```typescript
import React from 'react';

export function useTheme() {
  var [theme, setThemeState] = React.useState<'light' | 'dark'>(function() {
    if (typeof window !== 'undefined') {
      var stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'dark';
  });

  var setTheme = function(newTheme: 'light' | 'dark') {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  var toggleTheme = function() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  React.useEffect(function() {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return { theme: theme, setTheme: setTheme, toggleTheme: toggleTheme };
}

// Usage
function ThemeToggle() {
  var { theme, toggleTheme } = useTheme();

  return React.createElement(
    Button,
    { onClick: toggleTheme, variant: 'ghost' },
    theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'
  );
}
```

### useLocalStorage Hook

```typescript
import React from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  var [storedValue, setStoredValue] = React.useState<T>(function() {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    var item = window.localStorage.getItem(key);
    if (item != null) {
      return JSON.parse(item);
    }
    return initialValue;
  });

  var setValue = function(value: T | ((val: T) => T)) {
    var valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  };

  return [storedValue, setValue] as const;
}

// Usage
function UserPreferences() {
  var [notifications, setNotifications] = useLocalStorage('notifications', true);
  var [language, setLanguage] = useLocalStorage('language', 'en');

  return React.createElement(
    'div',
    null,
    React.createElement(Switch, {
      id: 'notifications',
      label: 'Enable notifications',
      checked: notifications,
      onChange: setNotifications,
    })
  );
}
```

---

## 🎨 Complete Example: Dashboard Page

```typescript
import React from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Modal } from './Modal';
import { useToast } from './Toast';

export function DashboardPage() {
  var [isModalOpen, setIsModalOpen] = React.useState(false);
  var { toasts, showToast, removeToast } = useToast();

  var handleCreateProject = function() {
    setIsModalOpen(false);
    showToast('Project created successfully!', 'success');
  };

  return React.createElement(
    'div',
    { className: 'dashboard-page' },
    
    React.createElement(
      'header',
      { className: 'dashboard-header' },
      React.createElement('h1', null, 'Dashboard'),
      React.createElement(
        Button,
        {
          variant: 'primary',
          onClick: function() { setIsModalOpen(true); },
        },
        'New Project'
      )
    ),

    React.createElement(
      'div',
      { className: 'stats-grid' },
      React.createElement(Card, {
        title: 'Total Users',
        description: '12,458 users',
      }),
      React.createElement(Card, {
        title: 'Revenue',
        description: '$48,592',
      }),
      React.createElement(Card, {
        title: 'Active Projects',
        description: '23 projects',
      })
    ),

    React.createElement(
      Modal,
      {
        isOpen: isModalOpen,
        onClose: function() { setIsModalOpen(false); },
        title: 'Create New Project',
      },
      React.createElement('p', null, 'Project creation form would go here'),
      React.createElement(
        'div',
        { className: 'button-group' },
        React.createElement(
          Button,
          {
            variant: 'secondary',
            onClick: function() { setIsModalOpen(false); },
          },
          'Cancel'
        ),
        React.createElement(
          Button,
          {
            variant: 'primary',
            onClick: handleCreateProject,
          },
          'Create'
        )
      )
    ),

    React.createElement(
      'div',
      { style: { position: 'fixed', top: '1rem', right: '1rem' } },
      toasts.map(function(toast) {
        return React.createElement(Toast, {
          key: toast.id,
          message: toast.message,
          variant: toast.variant,
          onClose: function() { removeToast(toast.id); },
        });
      })
    )
  );
}
```

---

## 📚 Additional Resources

- **Component Showcase:** `/docs/dark-mode-component-showcase.md`
- **Usage Guide:** `/docs/dark-mode-usage-guide.md`
- **Quick Reference:** `/docs/dark-mode-quick-reference.md`
- **Implementation Checklist:** `/tasks/dark-mode-implementation-checklist.md`

---

**Last Updated:** March 11, 2026  
**Version:** 2.0.0  
**Framework:** React 18+ with TypeScript
