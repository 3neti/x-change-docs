/**
 * Custom Handlebars helpers for MkDocs + Mermaid + PDF Export
 * 
 * These helpers provide additional functionality for templating
 * in our export interface and dynamic content generation.
 */

(function() {
    'use strict';
    
    // Wait for Handlebars to be available
    function initializeHelpers() {
        if (typeof Handlebars === 'undefined') {
            setTimeout(initializeHelpers, 100);
            return;
        }
        
        console.log('Initializing Handlebars custom helpers...');
        
        /**
         * FORMAT DATE
         * Format a date object or string into a readable format
         * Usage: {{formatDate date}}
         * Usage: {{formatDate date "short"}}
         */
        Handlebars.registerHelper('formatDate', function(date, format) {
            if (!date) return '';
            
            const d = new Date(date);
            if (isNaN(d.getTime())) return '';
            
            const options = {};
            
            switch (format) {
                case 'short':
                    options.year = 'numeric';
                    options.month = 'short';
                    options.day = 'numeric';
                    break;
                case 'long':
                    options.year = 'numeric';
                    options.month = 'long';
                    options.day = 'numeric';
                    options.hour = '2-digit';
                    options.minute = '2-digit';
                    break;
                case 'time':
                    options.hour = '2-digit';
                    options.minute = '2-digit';
                    options.second = '2-digit';
                    break;
                default:
                    options.year = 'numeric';
                    options.month = 'long';
                    options.day = 'numeric';
            }
            
            return d.toLocaleDateString('en-US', options);
        });
        
        /**
         * FORMAT TIME
         * Format a date object into time string
         * Usage: {{formatTime date}}
         */
        Handlebars.registerHelper('formatTime', function(date) {
            if (!date) return '';
            
            const d = new Date(date);
            if (isNaN(d.getTime())) return '';
            
            return d.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        });
        
        /**
         * DIAGRAM COUNT
         * Count the number of Mermaid diagrams in content
         * Usage: {{diagramCount content}}
         */
        Handlebars.registerHelper('diagramCount', function(content) {
            if (typeof content === 'string') {
                const matches = content.match(/```mermaid/g);
                return matches ? matches.length : 0;
            } else {
                // Count diagrams in current page
                const diagrams = document.querySelectorAll('.mermaid');
                return diagrams.length;
            }
        });
        
        /**
         * FILE SIZE
         * Format bytes into human-readable file size
         * Usage: {{fileSize bytes}}
         */
        Handlebars.registerHelper('fileSize', function(bytes) {
            if (bytes === 0) return '0 Bytes';
            if (!bytes || bytes < 0) return 'Unknown';
            
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        });
        
        /**
         * ESTIMATE PDF SIZE
         * Estimate PDF file size based on content
         * Usage: {{estimatePdfSize}}
         */
        Handlebars.registerHelper('estimatePdfSize', function() {
            // Rough estimation based on content
            const textContent = document.body.textContent || '';
            const diagramCount = document.querySelectorAll('.mermaid').length;
            const imageCount = document.querySelectorAll('img').length;
            
            // Base size: ~2KB per 1000 characters of text
            const textSize = Math.ceil(textContent.length / 1000) * 2048;
            
            // Each diagram: ~50KB (estimated)
            const diagramSize = diagramCount * 51200;
            
            // Each image: ~100KB (estimated average)
            const imageSize = imageCount * 102400;
            
            // PDF overhead: ~50KB
            const overhead = 51200;
            
            const totalBytes = textSize + diagramSize + imageSize + overhead;
            
            return Handlebars.helpers.fileSize(totalBytes);
        });
        
        /**
         * PAGE URL
         * Generate full URL for a page slug
         * Usage: {{pageUrl slug}}
         */
        Handlebars.registerHelper('pageUrl', function(slug) {
            const baseUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
            return baseUrl + (slug ? slug + '/' : '');
        });
        
        /**
         * CURRENT PAGE INFO
         * Get information about the current page
         * Usage: {{currentPageInfo "title"}}
         */
        Handlebars.registerHelper('currentPageInfo', function(property) {
            const info = {
                title: document.title,
                url: window.location.href,
                path: window.location.pathname,
                slug: window.location.pathname.split('/').filter(p => p).pop() || 'home',
                diagramCount: document.querySelectorAll('.mermaid').length,
                wordCount: (document.body.textContent || '').split(/\s+/).length,
                lastModified: document.lastModified ? new Date(document.lastModified) : new Date()
            };
            
            return property ? info[property] : info;
        });
        
        /**
         * JOIN
         * Join array elements with separator
         * Usage: {{join array ", "}}
         */
        Handlebars.registerHelper('join', function(array, separator) {
            if (!Array.isArray(array)) return '';
            return array.join(separator || ', ');
        });
        
        /**
         * CONDITIONAL HELPERS
         */
        
        /**
         * IF EQUALS
         * Conditional helper for equality
         * Usage: {{#ifEquals value1 value2}}...{{/ifEquals}}
         */
        Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        });
        
        /**
         * IF GREATER
         * Conditional helper for greater than
         * Usage: {{#ifGreater value1 value2}}...{{/ifGreater}}
         */
        Handlebars.registerHelper('ifGreater', function(arg1, arg2, options) {
            return (arg1 > arg2) ? options.fn(this) : options.inverse(this);
        });
        
        /**
         * MATH HELPERS
         */
        
        /**
         * ADD
         * Add two numbers
         * Usage: {{add number1 number2}}
         */
        Handlebars.registerHelper('add', function(a, b) {
            return (parseFloat(a) || 0) + (parseFloat(b) || 0);
        });
        
        /**
         * MULTIPLY
         * Multiply two numbers
         * Usage: {{multiply number1 number2}}
         */
        Handlebars.registerHelper('multiply', function(a, b) {
            return (parseFloat(a) || 0) * (parseFloat(b) || 0);
        });
        
        /**
         * PERCENTAGE
         * Calculate percentage
         * Usage: {{percentage current total}}
         */
        Handlebars.registerHelper('percentage', function(current, total) {
            if (!total || total === 0) return 0;
            return Math.round((current / total) * 100);
        });
        
        /**
         * UTILITY HELPERS
         */
        
        /**
         * PLURALIZE
         * Pluralize words based on count
         * Usage: {{pluralize count "diagram" "diagrams"}}
         */
        Handlebars.registerHelper('pluralize', function(count, singular, plural) {
            return count === 1 ? singular : plural;
        });
        
        /**
         * CAPITALIZE
         * Capitalize first letter
         * Usage: {{capitalize text}}
         */
        Handlebars.registerHelper('capitalize', function(text) {
            if (!text || typeof text !== 'string') return '';
            return text.charAt(0).toUpperCase() + text.slice(1);
        });
        
        /**
         * TRUNCATE
         * Truncate text to specified length
         * Usage: {{truncate text 100}}
         */
        Handlebars.registerHelper('truncate', function(text, length) {
            if (!text || typeof text !== 'string') return '';
            if (text.length <= length) return text;
            return text.substring(0, length) + '...';
        });
        
        /**
         * DEBUG
         * Debug helper to log values
         * Usage: {{debug value}}
         */
        Handlebars.registerHelper('debug', function(value) {
            console.log('Handlebars debug:', value);
            return '';
        });
        
        /**
         * JSON
         * Convert object to JSON string
         * Usage: {{json object}}
         */
        Handlebars.registerHelper('json', function(obj) {
            try {
                return JSON.stringify(obj, null, 2);
            } catch (e) {
                return '';
            }
        });
        
        console.log('Handlebars custom helpers initialized successfully');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeHelpers);
    } else {
        initializeHelpers();
    }
})();