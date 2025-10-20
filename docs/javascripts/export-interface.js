/**
 * Export Interface for MkDocs + Mermaid + PDF Export
 * 
 * This class manages the dynamic export interface using Handlebars templates
 * and provides functionality for printing and exporting documents.
 */

class ExportInterface {
    constructor() {
        this.templates = {};
        this.isInitialized = false;
        this.exportInProgress = false;
        
        // Wait for dependencies
        this.waitForDependencies().then(() => {
            this.initialize();
        });
    }
    
    async waitForDependencies() {
        // Wait for Handlebars and helpers to be available
        while (typeof Handlebars === 'undefined') {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Wait for Mermaid to be initialized (diagrams need to be rendered)
        while (typeof mermaid === 'undefined') {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Give Mermaid extra time to render diagrams
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    initialize() {
        console.log('Initializing Export Interface...');
        
        this.createTemplateDefinitions();
        this.compileTemplates();
        this.createInterface();
        this.attachEventListeners();
        this.addPrintMetadata();
        
        this.isInitialized = true;
        console.log('Export Interface initialized successfully');
    }
    
    createTemplateDefinitions() {
        // Define HTML templates as strings (will be compiled by Handlebars)
        
        this.templateDefinitions = {
            // Main export menu
            exportMenu: `
                <div class="export-menu-overlay">
                    <div class="export-menu-content">
                        <div class="export-menu-header">
                            <h3>Export "{{pageTitle}}"</h3>
                            <button class="export-menu-close">&times;</button>
                        </div>
                        
                        <div class="export-page-info">
                            <div class="info-item">
                                <span class="info-label">📄 Content:</span>
                                <span class="info-value">{{wordCount}} words</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">📊 Diagrams:</span>
                                <span class="info-value">{{diagramCount}} {{pluralize diagramCount "diagram" "diagrams"}}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">📐 Est. Size:</span>
                                <span class="info-value">{{estimatedSize}}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">🕒 Generated:</span>
                                <span class="info-value">{{formatDate timestamp "short"}}</span>
                            </div>
                        </div>
                        
                        <div class="export-options">
                            {{#each exportTypes}}
                                <button class="export-option {{#unless available}}disabled{{/unless}}" 
                                        data-export-type="{{type}}" 
                                        {{#unless available}}disabled{{/unless}}>
                                    <div class="export-option-icon">{{icon}}</div>
                                    <div class="export-option-content">
                                        <div class="export-option-title">{{title}}</div>
                                        <div class="export-option-description">{{description}}</div>
                                        {{#unless available}}
                                            <div class="export-option-status">Coming Soon</div>
                                        {{/unless}}
                                    </div>
                                    {{#if processing}}
                                        <div class="export-option-spinner">⏳</div>
                                    {{/if}}
                                </button>
                            {{/each}}
                        </div>
                        
                        <div class="export-menu-footer">
                            <small>Export functionality powered by browser print and PDF generation</small>
                        </div>
                    </div>
                </div>
            `,
            
            // Floating export button
            exportButton: `
                <button class="export-float-button" title="Export Options">
                    <span class="export-icon">📄</span>
                    <span class="export-text">Export</span>
                </button>
            `,
            
            // Progress indicator
            exportProgress: `
                <div class="export-progress-overlay">
                    <div class="export-progress-content">
                        <div class="export-progress-header">
                            <h3>{{title}}</h3>
                        </div>
                        
                        <div class="export-progress-body">
                            <div class="export-progress-bar">
                                <div class="export-progress-fill" style="width: {{percentage}}%"></div>
                            </div>
                            
                            <div class="export-progress-text">
                                {{message}}
                            </div>
                            
                            {{#if showDetails}}
                                <div class="export-progress-details">
                                    <div>Processing: {{currentStep}} of {{totalSteps}}</div>
                                    <div>Status: {{status}}</div>
                                </div>
                            {{/if}}
                        </div>
                        
                        {{#if allowCancel}}
                            <div class="export-progress-footer">
                                <button class="export-progress-cancel">Cancel</button>
                            </div>
                        {{/if}}
                    </div>
                </div>
            `
        };
    }
    
    compileTemplates() {
        // Compile all templates
        for (const [name, definition] of Object.entries(this.templateDefinitions)) {
            try {
                this.templates[name] = Handlebars.compile(definition);
                console.log(`Template '${name}' compiled successfully`);
            } catch (error) {
                console.error(`Error compiling template '${name}':`, error);
            }
        }
    }
    
    createInterface() {
        // Create the main export interface container
        const container = document.createElement('div');
        container.id = 'export-interface-container';
        container.innerHTML = this.templates.exportButton({});
        
        // Add styles
        this.injectStyles();
        
        // Append to body
        document.body.appendChild(container);
    }
    
    attachEventListeners() {
        // Float button click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.export-float-button')) {
                this.showExportMenu();
            }
            
            if (e.target.closest('.export-menu-close')) {
                this.hideExportMenu();
            }
            
            if (e.target.closest('.export-option:not(.disabled)')) {
                const exportType = e.target.closest('.export-option').dataset.exportType;
                this.handleExport(exportType);
            }
        });
        
        // Close menu on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('export-menu-overlay')) {
                this.hideExportMenu();
            }
        });
        
        // ESC key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideExportMenu();
            }
        });
    }
    
    showExportMenu() {
        const data = this.getPageData();
        const menuHtml = this.templates.exportMenu(data);
        
        // Remove existing menu
        const existingMenu = document.querySelector('.export-menu-overlay');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Create new menu
        const menuElement = document.createElement('div');
        menuElement.innerHTML = menuHtml;
        document.body.appendChild(menuElement.firstElementChild);
        
        // Animate in
        requestAnimationFrame(() => {
            document.querySelector('.export-menu-overlay').classList.add('active');
        });
    }
    
    hideExportMenu() {
        const menu = document.querySelector('.export-menu-overlay');
        if (menu) {
            menu.classList.remove('active');
            setTimeout(() => {
                menu.remove();
            }, 300);
        }
    }
    
    getPageData() {
        const diagrams = document.querySelectorAll('.mermaid');
        const textContent = document.body.textContent || '';
        const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
        
        return {
            pageTitle: document.title.replace(' - Test Library - Mermaid Diagrams', ''),
            diagramCount: diagrams.length,
            wordCount: wordCount,
            estimatedSize: this.estimatePdfSize(),
            timestamp: new Date(),
            exportTypes: [
                {
                    type: 'print',
                    icon: '🖨️',
                    title: 'Print Current Page',
                    description: 'Print this page with optimized layout and Mermaid diagrams',
                    available: true,
                    processing: false
                },
                {
                    type: 'pdf-browser',
                    icon: '📄',
                    title: 'Save Page as PDF',
                    description: 'Use browser\'s Save as PDF with print-optimized styling',
                    available: true,
                    processing: false
                },
                {
                    type: 'pdf-complete',
                    icon: '📚',
                    title: 'Download Complete Documentation',
                    description: 'All 8 pages + diagrams combined (4.6MB PDF)',
                    available: true,
                    processing: false
                },
                {
                    type: 'pdf-custom',
                    icon: '⚙️',
                    title: 'Custom Export Options',
                    description: 'Choose specific pages, sections, or formats',
                    available: false,
                    processing: false
                }
            ]
        };
    }
    
    estimatePdfSize() {
        const textContent = document.body.textContent || '';
        const diagramCount = document.querySelectorAll('.mermaid').length;
        const imageCount = document.querySelectorAll('img').length;
        
        // Rough estimation
        const textSize = Math.ceil(textContent.length / 1000) * 2048; // ~2KB per 1000 chars
        const diagramSize = diagramCount * 51200; // ~50KB per diagram
        const imageSize = imageCount * 102400; // ~100KB per image
        const overhead = 51200; // ~50KB overhead
        
        const totalBytes = textSize + diagramSize + imageSize + overhead;
        
        // Convert to human readable
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (totalBytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(totalBytes) / Math.log(1024));
        return Math.round(totalBytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }
    
    async handleExport(exportType) {
        console.log('Handling export:', exportType);
        
        switch (exportType) {
            case 'print':
                this.handlePrint();
                break;
            case 'pdf-browser':
                this.handlePdfBrowser();
                break;
            case 'pdf-complete':
                this.handleCompleteDocumentation();
                break;
            case 'pdf-custom':
                this.showComingSoon('Custom PDF Export');
                break;
            default:
                console.warn('Unknown export type:', exportType);
        }
        
        this.hideExportMenu();
    }
    
    handlePrint() {
        // Add print-specific metadata
        this.addPrintMetadata();
        
        // Trigger print
        window.print();
    }
    
    handlePdfBrowser() {
        // Add print-specific metadata
        this.addPrintMetadata();
        
        // Show instruction
        alert('Use your browser\'s print function and choose "Save as PDF" as the destination. The page is optimized for PDF export.');
        
        // Trigger print dialog
        window.print();
    }
    
    handleCompleteDocumentation() {
        // Get the PDF URL - check both build output and relative path
        const pdfPaths = [
            'pdf/test-library-documentation.pdf',
            '/pdf/test-library-documentation.pdf',
            '../pdf/test-library-documentation.pdf'
        ];
        
        // Try to download the PDF
        this.downloadCompleteDocumentation(pdfPaths[0]);
    }
    
    async downloadCompleteDocumentation(pdfUrl) {
        try {
            // Check if PDF exists
            const response = await fetch(pdfUrl, { method: 'HEAD' });
            
            if (response.ok) {
                // Create download link
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = 'test-library-complete-documentation.pdf';
                link.style.display = 'none';
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                console.log('Complete documentation download initiated');
            } else {
                throw new Error('PDF not found');
            }
        } catch (error) {
            console.error('Error downloading complete documentation:', error);
            
            // Fallback: show instructions
            const message = `The complete documentation PDF is available but couldn't be automatically downloaded.\n\n` +
                          `You can manually download it by:\n` +
                          `1. Going to: ${window.location.origin}/pdf/test-library-documentation.pdf\n` +
                          `2. Or running: mkdocs build (to regenerate the PDF)\n\n` +
                          `The PDF contains all pages with Mermaid diagrams and is about 4.6MB.`;
            
            alert(message);
        }
    }
    
    addPrintMetadata() {
        // Add metadata attributes for print headers/footers
        document.body.setAttribute('data-page-title', document.title);
        document.body.setAttribute('data-site-name', 'Test Library - Mermaid Diagrams');
        document.body.setAttribute('data-generation-date', new Date().toLocaleDateString());
    }
    
    showComingSoon(feature) {
        alert(`${feature} is coming soon! Currently implementing this feature. For now, please use the Print or Save as PDF options.`);
    }
    
    injectStyles() {
        if (document.getElementById('export-interface-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'export-interface-styles';
        styles.textContent = `
            /* Export Interface Styles */
            
            .export-float-button {
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 1000;
                background: #2196F3;
                color: white;
                border: none;
                border-radius: 50px;
                padding: 12px 20px;
                box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
                transform: translateY(0);
            }
            
            .export-float-button:hover {
                background: #1976D2;
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(33, 150, 243, 0.5);
            }
            
            .export-float-button .export-icon {
                font-size: 16px;
            }
            
            /* Export Menu Overlay */
            .export-menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .export-menu-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            .export-menu-content {
                background: white;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                transform: translateY(50px) scale(0.9);
                transition: all 0.3s ease;
            }
            
            .export-menu-overlay.active .export-menu-content {
                transform: translateY(0) scale(1);
            }
            
            .export-menu-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px 24px 16px;
                border-bottom: 1px solid #eee;
            }
            
            .export-menu-header h3 {
                margin: 0;
                color: #333;
                font-size: 18px;
            }
            
            .export-menu-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .export-menu-close:hover {
                background: #f5f5f5;
                color: #333;
            }
            
            /* Page Info */
            .export-page-info {
                padding: 16px 24px;
                background: #f8f9fa;
                border-bottom: 1px solid #eee;
            }
            
            .info-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                font-size: 14px;
            }
            
            .info-item:last-child {
                margin-bottom: 0;
            }
            
            .info-label {
                color: #666;
                font-weight: 500;
            }
            
            .info-value {
                color: #333;
                font-weight: 600;
            }
            
            /* Export Options */
            .export-options {
                padding: 20px 24px;
            }
            
            .export-option {
                display: flex;
                align-items: center;
                width: 100%;
                padding: 16px;
                margin-bottom: 12px;
                background: #f8f9fa;
                border: 2px solid transparent;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: left;
            }
            
            .export-option:last-child {
                margin-bottom: 0;
            }
            
            .export-option:hover:not(.disabled) {
                background: #e3f2fd;
                border-color: #2196F3;
                transform: translateY(-1px);
            }
            
            .export-option.disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            
            .export-option-icon {
                font-size: 24px;
                margin-right: 16px;
                min-width: 32px;
            }
            
            .export-option-content {
                flex: 1;
            }
            
            .export-option-title {
                font-weight: 600;
                color: #333;
                margin-bottom: 4px;
            }
            
            .export-option-description {
                font-size: 13px;
                color: #666;
                line-height: 1.4;
            }
            
            .export-option-status {
                font-size: 12px;
                color: #999;
                font-style: italic;
                margin-top: 4px;
            }
            
            .export-option-spinner {
                margin-left: 12px;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            /* Menu Footer */
            .export-menu-footer {
                padding: 16px 24px;
                border-top: 1px solid #eee;
                text-align: center;
            }
            
            .export-menu-footer small {
                color: #999;
                font-size: 12px;
            }
            
            /* Hide on mobile landscape to avoid conflicts */
            @media (max-height: 500px) and (orientation: landscape) {
                .export-float-button {
                    bottom: 15px;
                    right: 15px;
                    padding: 8px 15px;
                    font-size: 12px;
                }
            }
            
            /* Print-specific hiding */
            @media print {
                .export-float-button,
                .export-menu-overlay,
                .export-interface {
                    display: none !important;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
}

// Initialize the export interface when the DOM is ready
(function() {
    let exportInterface = null;
    
    function initializeExportInterface() {
        if (exportInterface) return;
        
        try {
            exportInterface = new ExportInterface();
            window.exportInterface = exportInterface; // Make it globally available
        } catch (error) {
            console.error('Error initializing export interface:', error);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeExportInterface);
    } else {
        initializeExportInterface();
    }
})();