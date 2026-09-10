/**
 * Force Dark Mode Script
 * Run this in the browser console to force dark mode if it's not showing
 */

// Clear any stored theme preferences
localStorage.removeItem('theme');

// Set dark mode preference
localStorage.setItem('theme', 'dark');

// Apply dark class immediately
document.documentElement.classList.add('dark');
document.documentElement.setAttribute('data-theme', 'dark');

console.log('✅ Dark mode forced!');
console.log('Theme in localStorage:', localStorage.getItem('theme'));
console.log('HTML has .dark class:', document.documentElement.classList.contains('dark'));
console.log('data-theme attribute:', document.documentElement.getAttribute('data-theme'));
