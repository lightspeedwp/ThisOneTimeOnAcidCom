# N014: Forms & Validation Guidelines

**Document ID:** N014  
**Category:** Organization (Forms)  
**Authority:** D4 (N-Document Approvals); D3 (WCAG 2.2 AAA accessibility)  
**Last Updated:** 2026-11-09

## Purpose

Establish patterns for form creation, validation, and error handling with emphasis on user experience and accessibility compliance.

## Form Structure

### HTML Semantics

- Use `<form>` element with descriptive name attribute
- Use `<fieldset>` to group related inputs
- Use `<legend>` to label field groups
- Label all inputs with `<label>` with for/id association

### Validation Strategy

- Client-side validation for immediate user feedback
- Server-side validation for security (never trust client input)
- Progressive enhancement: forms work without JavaScript
- Real-time validation for email/username availability

## Validation Libraries

```typescript
// Use Zod for schema validation and type safety
import { z } from 'zod';

const contactSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2).max(100),
  message: z.string().min(10).max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;
```typescript

## Error Handling

### User-Facing Errors

- Display validation errors inline near the field
- Use aria-describedby to link error messages to inputs
- Highlight invalid fields with visual indicator (red border)
- Summarize errors at form top for screen readers

### Server-Side Errors

```typescript
// Return structured error responses
{
  success: false,
  errors: {
    email: 'Email already registered',
    name: 'Name is required',
  },
  message: 'Please check the highlighted fields',
}
```typescript

## Accessibility Requirements

- All form fields must have associated labels
- Error messages must be programmatically associated (aria-describedby)
- Required fields must be marked with aria-required="true"
- Form submit buttons must have descriptive text (not just "Submit")
- Keyboard navigation must work without mouse

## Common Form Patterns

### Contact Form

```markdown
- Name: text input, required, max 100 chars
- Email: email input, required, validated on blur
- Subject: select dropdown, required
- Message: textarea, required, min 10 chars, max 1000 chars
- reCAPTCHA v3 (silent verification)
- Submit button: "Send Message"
```typescript

### Newsletter Signup

```markdown
- Email: email input, required, validated on blur
- Checkbox: "I consent to receive updates"
- Submit: "Subscribe"
- Post-submit: Success message with email confirmation
```typescript

## See Also

- **N011:** Accessibility Standards (WCAG 2.2 AAA compliance)
- **N003:** Component Library (form components)
- **Guidelines.md:** Development workflow
